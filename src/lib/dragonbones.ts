import { Texture } from "pixi.js";
import { PixiFactory } from "pixi-dragonbones-runtime";

type DragonBonesJson = Record<string, unknown>;

const parseLocks = new Map<string, Promise<string>>();

async function loadJson(url: string): Promise<DragonBonesJson> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load ${url} (${response.status})`);
  }
  return (await response.json()) as DragonBonesJson;
}

async function loadTexture(url: string): Promise<Texture> {
  const image = new Image();
  image.crossOrigin = "anonymous";
  image.src = url;
  await image.decode();
  return Texture.from(image, true);
}

function cacheNameFromJson(data: DragonBonesJson, fallback: string): string {
  return typeof data.name === "string" && data.name.length > 0 ? data.name : fallback;
}

export async function ensureDragonBonesParsed(
  skePath: string,
  texPath: string,
  texturePath: string,
): Promise<string> {
  const key = `${skePath}|${texPath}|${texturePath}`;
  const existing = parseLocks.get(key);
  if (existing) return existing;

  const pending = (async () => {
    const factory = PixiFactory.factory;
    const [skeJson, texJson, texture] = await Promise.all([
      loadJson(skePath),
      loadJson(texPath),
      loadTexture(texturePath),
    ]);

    // Unique factory key so Paw Scrathers `cat` and FishCat `Cat` stay separate.
    const dragonBonesName = cacheNameFromJson(skeJson, skePath) + "@" + skePath;
    if (!factory.getDragonBonesData(dragonBonesName)) {
      factory.parseDragonBonesData(skeJson, dragonBonesName);
    }
    if (!factory.getTextureAtlasData(dragonBonesName)?.length) {
      factory.parseTextureAtlasData(texJson, texture, dragonBonesName);
    }
    return dragonBonesName;
  })();

  parseLocks.set(key, pending);
  try {
    return await pending;
  } catch (error) {
    parseLocks.delete(key);
    throw error;
  }
}

export function pickAnimationName(
  names: readonly string[],
  preferred?: string,
): string | null {
  if (preferred && names.includes(preferred)) return preferred;
  if (names.includes("idle")) return "idle";
  return names[0] ?? null;
}

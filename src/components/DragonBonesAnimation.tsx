import { useEffect, useRef } from "react";
import { Application } from "pixi.js";
import { PixiFactory } from "pixi-dragonbones-runtime";
import type { PixiArmatureDisplay } from "pixi-dragonbones-runtime";
import { ensureDragonBonesParsed, pickAnimationName } from "../lib/dragonbones";

export type DragonBonesAnimationProps = {
  skePath: string;
  texPath: string;
  texturePath: string;
  armature?: string;
  animation?: string;
  width?: number;
  height?: number;
  scale?: number;
  offsetX?: number;
  offsetY?: number;
  className?: string;
};

function fitArmature(
  display: PixiArmatureDisplay,
  width: number,
  height: number,
  extraScale: number,
  offsetX: number,
  offsetY: number,
): void {
  const aabb = display.armature.armatureData.aabb;
  const contentW = Math.max(aabb.width, 1);
  const contentH = Math.max(aabb.height, 1);
  const padding = 12;
  const fit = Math.min((width - padding * 2) / contentW, (height - padding * 2) / contentH);
  const s = fit * extraScale;
  display.scale.set(s);
  display.x = (width - contentW * s) / 2 - aabb.x * s + offsetX;
  display.y = (height - contentH * s) / 2 - aabb.y * s + offsetY;
}

export default function DragonBonesAnimation({
  skePath,
  texPath,
  texturePath,
  armature = "Armature",
  animation = "idle",
  width = 280,
  height = 320,
  scale = 1,
  offsetX = 0,
  offsetY = 0,
  className = "",
}: DragonBonesAnimationProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const displayRef = useRef<PixiArmatureDisplay | null>(null);
  const animationRef = useRef(animation);
  animationRef.current = animation;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;
    let app: Application | null = null;
    let armatureDisplay: PixiArmatureDisplay | null = null;

    const setup = async () => {
      const pixi = new Application();
      await pixi.init({
        width,
        height,
        backgroundAlpha: 0,
        antialias: true,
        resolution: Math.min(window.devicePixelRatio || 1, 2),
        autoDensity: true,
      });

      if (cancelled) {
        pixi.destroy(true);
        return;
      }

      app = pixi;
      pixi.canvas.style.display = "block";
      pixi.canvas.style.width = "100%";
      pixi.canvas.style.height = "100%";
      pixi.canvas.style.pointerEvents = "none";
      host.appendChild(pixi.canvas);

      const dragonBonesName = await ensureDragonBonesParsed(skePath, texPath, texturePath);
      if (cancelled) return;

      const factory = PixiFactory.factory;
      const display = factory.buildArmatureDisplay(armature, dragonBonesName);
      if (!display) {
        console.error(`DragonBones armature "${armature}" was not found`);
        return;
      }

      fitArmature(display, width, height, scale, offsetX, offsetY);
      pixi.stage.addChild(display);
      armatureDisplay = display;
      displayRef.current = display;

      const playName = pickAnimationName(display.animation.animationNames, animationRef.current);
      if (playName) {
        display.animation.play(playName, 0);
      }
    };

    void setup().catch((error: unknown) => {
      if (!cancelled) {
        console.error("DragonBones failed to load", error);
      }
    });

    return () => {
      cancelled = true;
      armatureDisplay?.dispose();
      armatureDisplay = null;
      displayRef.current = null;
      if (app) {
        app.destroy(true);
        app = null;
      } else {
        host.replaceChildren();
      }
    };
  }, [skePath, texPath, texturePath, armature, width, height, scale, offsetX, offsetY]);

  useEffect(() => {
    const display = displayRef.current;
    if (!display) return;
    const playName = pickAnimationName(display.animation.animationNames, animation);
    if (playName) {
      display.animation.play(playName, 0);
    }
  }, [animation]);

  return (
    <div
      ref={hostRef}
      className={className}
      style={{
        width,
        height,
        maxWidth: "100%",
        background: "transparent",
        lineHeight: 0,
        overflow: "visible",
      }}
      aria-hidden
    />
  );
}

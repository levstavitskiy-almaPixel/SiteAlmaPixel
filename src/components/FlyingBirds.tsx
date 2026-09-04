import { useEffect, useRef } from "react";
import { Application } from "pixi.js";
import { PixiFactory } from "pixi-dragonbones-runtime";
import type { PixiArmatureDisplay } from "pixi-dragonbones-runtime";
import { ensureDragonBonesParsed, pickAnimationName } from "../lib/dragonbones";

const BIRD_SKE = "/animations/bird_ske.json";
const BIRD_TEX = "/animations/bird_tex.json";
const BIRD_PNG = "/animations/bird_tex.png";
const BIRD_COUNT_MIN = 2;
const BIRD_COUNT_MAX = 5;

type FlockBird = {
  display: PixiArmatureDisplay;
  x: number;
  baseY: number;
  amp: number;
  speed: number;
  phase: number;
  scale: number;
  facing: 1 | -1;
};

function layoutBird(
  bird: FlockBird,
  aabbX: number,
  aabbY: number,
  aabbW: number,
  aabbH: number,
): void {
  const s = bird.scale;
  bird.display.scale.set(s * bird.facing, s);
  const y = bird.baseY + Math.sin(bird.phase) * bird.amp;
  bird.display.x = bird.x - (aabbX + aabbW / 2) * bird.display.scale.x;
  bird.display.y = y - (aabbY + aabbH / 2) * s;
}

export default function FlyingBirds() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;
    let app: Application | null = null;
    const flock: FlockBird[] = [];

    const setup = async () => {
      const pixi = new Application();
      await pixi.init({
        resizeTo: window,
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

      const dragonBonesName = await ensureDragonBonesParsed(BIRD_SKE, BIRD_TEX, BIRD_PNG);
      if (cancelled) return;

      const factory = PixiFactory.factory;
      const viewW = () => pixi.screen.width;
      const viewH = () => pixi.screen.height;
      const birdCount =
        BIRD_COUNT_MIN + Math.floor(Math.random() * (BIRD_COUNT_MAX - BIRD_COUNT_MIN + 1));

      let aabbX = -43;
      let aabbY = -25;
      let aabbW = 86;
      let aabbH = 58;

      for (let i = 0; i < birdCount; i++) {
        const display = factory.buildArmatureDisplay("Armature", dragonBonesName);
        if (!display) continue;

        const playName = pickAnimationName(display.animation.animationNames, "fly");
        if (playName) display.animation.play(playName, 0);

        if (i === 0) {
          const aabb = display.armature.armatureData.aabb;
          aabbX = aabb.x;
          aabbY = aabb.y;
          aabbW = Math.max(aabb.width, 1);
          aabbH = Math.max(aabb.height, 1);
        }

        const leftToRight = i % 2 === 0;
        const size = 44 + (i % 4) * 8;
        const scale = size / Math.max(aabbW, aabbH);
        const vw = viewW();
        const vh = viewH();
        const bird: FlockBird = {
          display,
          facing: leftToRight ? -1 : 1,
          speed: (leftToRight ? 1 : -1) * (55 + (i % 7) * 12),
          baseY: 48 + ((i * 73) % Math.max(vh - 80, 120)),
          amp: 16 + (i % 5) * 7,
          phase: i * 0.9,
          scale,
          x: (i / Math.max(birdCount, 1)) * (vw + 280) - 140,
        };
        layoutBird(bird, aabbX, aabbY, aabbW, aabbH);
        pixi.stage.addChild(display);
        flock.push(bird);
      }
      host.dataset.birdCount = String(flock.length);

      pixi.ticker.add((ticker) => {
        const dt = ticker.deltaMS / 1000;
        const w = viewW();
        const h = viewH();
        const margin = 160;
        for (const bird of flock) {
          bird.x += bird.speed * dt;
          bird.phase += dt * 1.4;
          if (bird.speed > 0 && bird.x > w + margin) {
            bird.x = -margin;
            bird.baseY = 48 + Math.random() * Math.max(h - 80, 80);
          } else if (bird.speed < 0 && bird.x < -margin) {
            bird.x = w + margin;
            bird.baseY = 48 + Math.random() * Math.max(h - 80, 80);
          }
          layoutBird(bird, aabbX, aabbY, aabbW, aabbH);
        }
      });
    };

    void setup().catch((error: unknown) => {
      if (!cancelled) console.error("Flying birds failed to load", error);
    });

    return () => {
      cancelled = true;
      for (const bird of flock) bird.display.dispose();
      flock.length = 0;
      if (app) {
        app.destroy(true);
        app = null;
      } else {
        host.replaceChildren();
      }
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className="pointer-events-none"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 40,
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
      aria-hidden
    />
  );
}

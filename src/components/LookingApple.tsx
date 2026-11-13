import { useEffect, useRef, useState } from "react";
import { Application } from "pixi.js";
import { PixiFactory } from "pixi-dragonbones-runtime";
import type { Bone, PixiArmatureDisplay } from "pixi-dragonbones-runtime";
import { ensureDragonBonesParsed, pickAnimationName } from "../lib/dragonbones";

type LookingAppleProps = {
  className?: string;
  size?: number;
  /** Pause Pixi when the apple is clipped away / off-screen. */
  active?: boolean;
};

const APPLE_SKE = "/animations/menu/Apple_ske.json?v=2";
const APPLE_TEX = "/animations/menu/Apple_tex.json?v=2";
const APPLE_PNG = "/animations/menu/Apple_tex.png?v=2";
const EYE_BONE = "eye";
const AABB_W = 386;
const AABB_H = 444.08;
const CANVAS_PAD = 40;
const MAX_LOOK = 20;

export function appleBoxHeight(size: number): number {
  return Math.round(size * (AABB_H / AABB_W)) + CANVAS_PAD * 2;
}

function fitArmature(
  display: PixiArmatureDisplay,
  width: number,
  height: number,
  extraScale: number,
): void {
  const aabb = display.armature.armatureData.aabb;
  const contentW = Math.max(aabb.width, 1);
  const contentH = Math.max(aabb.height, 1);
  const padding = CANVAS_PAD;
  const fit = Math.min((width - padding * 2) / contentW, (height - padding * 2) / contentH);
  const s = fit * extraScale;
  display.scale.set(s);
  display.x = (width - contentW * s) / 2 - aabb.x * s;
  display.y = (height - contentH * s) / 2 - aabb.y * s + 12;
}

function clampLook(x: number, y: number, max: number): { x: number; y: number } {
  const dist = Math.hypot(x, y);
  if (dist <= max || dist < 1e-6) return { x, y };
  const scale = max / dist;
  return { x: x * scale, y: y * scale };
}

/**
 * Hero apple: DragonBones idle, bone `eye` aims at pointer presses.
 */
export default function LookingApple({
  className = "",
  size = 420,
  active = true,
}: LookingAppleProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const reduceMotionRef = useRef(false);
  const activeRef = useRef(active);
  const appRef = useRef<Application | null>(null);
  const armatureRef = useRef<PixiArmatureDisplay | null>(null);
  const playNameRef = useRef<string | null>(null);
  const width = size + CANVAS_PAD * 2;
  const height = Math.round(size * (AABB_H / AABB_W)) + CANVAS_PAD * 2;

  useEffect(() => {
    activeRef.current = active;
    const app = appRef.current;
    const display = armatureRef.current;
    if (!app) return;
    if (active) {
      app.ticker.start();
      const playName = playNameRef.current;
      if (playName && !reduceMotionRef.current && display) {
        display.animation.play(playName, 0);
      }
    } else {
      app.ticker.stop();
      display?.animation.stop();
    }
  }, [active]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setReduceMotion(mq.matches);
      reduceMotionRef.current = mq.matches;
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;
    let app: Application | null = null;
    let armatureDisplay: PixiArmatureDisplay | null = null;
    let raf = 0;
    let cleanupLook: (() => void) | null = null;

    const setup = async () => {
      const pixi = new Application();
      await pixi.init({
        width,
        height,
        backgroundAlpha: 0,
        antialias: false,
        resolution: Math.min(window.devicePixelRatio || 1, 1.5),
        autoDensity: true,
        powerPreference: "low-power",
      });

      if (cancelled) {
        pixi.destroy(true);
        return;
      }

      app = pixi;
      appRef.current = pixi;
      pixi.canvas.style.display = "block";
      pixi.canvas.style.width = "100%";
      pixi.canvas.style.height = "100%";
      pixi.canvas.style.pointerEvents = "none";
      host.appendChild(pixi.canvas);

      const dragonBonesName = await ensureDragonBonesParsed(APPLE_SKE, APPLE_TEX, APPLE_PNG);
      if (cancelled) return;

      const factory = PixiFactory.factory;
      const display = factory.buildArmatureDisplay("Armature", dragonBonesName);
      if (!display) {
        console.error('DragonBones armature "Armature" was not found for Apple');
        return;
      }

      const playName = pickAnimationName(display.animation.animationNames, "idle");
      playNameRef.current = playName;
      if (playName && !reduceMotionRef.current) {
        display.animation.play(playName, 0);
      } else if (playName) {
        display.animation.gotoAndStopByProgress(playName, 0);
      }

      fitArmature(display, width, height, 1);
      display.eventMode = "none";
      pixi.stage.addChild(display);
      armatureDisplay = display;
      armatureRef.current = display;

      if (!activeRef.current) {
        pixi.ticker.stop();
        display.animation.stop();
      }

      const eye = display.armature.getBone(EYE_BONE);
      if (!eye) {
        console.error(`DragonBones bone "${EYE_BONE}" was not found`);
        return;
      }

      const target = { x: 0, y: 0 };
      const current = { x: 0, y: 0 };
      let pressed = false;

      const aimAtClient = (clientX: number, clientY: number) => {
        if (reduceMotionRef.current || !activeRef.current) {
          target.x = 0;
          target.y = 0;
          return;
        }

        const canvas = pixi.canvas;
        const rect = canvas.getBoundingClientRect();
        if (rect.width < 1 || rect.height < 1) return;

        const viewX = ((clientX - rect.left) / rect.width) * pixi.screen.width;
        const viewY = ((clientY - rect.top) / rect.height) * pixi.screen.height;
        const local = display.toLocal({ x: viewX, y: viewY });
        const parent = eye.parent;
        if (!parent) return;

        parent.updateGlobalTransform();
        eye.updateGlobalTransform();
        const matrix = parent.globalTransformMatrix;
        const worldOffX = matrix.a * eye.offset.x + matrix.c * eye.offset.y;
        const worldOffY = matrix.b * eye.offset.x + matrix.d * eye.offset.y;
        const restX = eye.global.x - worldOffX;
        const restY = eye.global.y - worldOffY;
        // bone1 is ~-90°: parent X is screen-down, parent Y is screen-right
        const look = clampLook(local.x - restX, local.y - restY, MAX_LOOK);
        target.x = look.y;
        target.y = look.x;
      };

      const applyLook = (bone: Bone) => {
        current.x += (target.x - current.x) * 0.28;
        current.y += (target.y - current.y) * 0.28;
        if (Math.abs(current.x) < 0.01) current.x = 0;
        if (Math.abs(current.y) < 0.01) current.y = 0;
        bone.offset.x = current.x;
        bone.offset.y = current.y;
        bone.invalidUpdate();
      };

      const tick = () => {
        if (!activeRef.current) {
          raf = 0;
          return;
        }
        applyLook(eye);
        const settling =
          Math.abs(target.x - current.x) > 0.02 || Math.abs(target.y - current.y) > 0.02;
        if (pressed || settling) {
          raf = requestAnimationFrame(tick);
        } else {
          raf = 0;
        }
      };

      const ensureTick = () => {
        if (!raf && activeRef.current) raf = requestAnimationFrame(tick);
      };

      const onPointerDown = (event: PointerEvent) => {
        if (!activeRef.current) return;
        pressed = true;
        aimAtClient(event.clientX, event.clientY);
        ensureTick();
      };
      const onPointerMove = (event: PointerEvent) => {
        if (!pressed) return;
        aimAtClient(event.clientX, event.clientY);
        ensureTick();
      };
      const onPointerUp = () => {
        pressed = false;
        target.x = 0;
        target.y = 0;
        ensureTick();
      };

      window.addEventListener("pointerdown", onPointerDown, { passive: true });
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerup", onPointerUp, { passive: true });
      window.addEventListener("pointercancel", onPointerUp, { passive: true });

      cleanupLook = () => {
        window.removeEventListener("pointerdown", onPointerDown);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
        window.removeEventListener("pointercancel", onPointerUp);
      };

      if (cancelled) {
        cleanupLook();
        cleanupLook = null;
      }
    };

    void setup().catch((error: unknown) => {
      if (!cancelled) {
        console.error("Apple DragonBones failed to load", error);
      }
    });

    return () => {
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
      cleanupLook?.();
      cleanupLook = null;
      armatureDisplay?.dispose();
      armatureDisplay = null;
      armatureRef.current = null;
      playNameRef.current = null;
      if (app) {
        app.destroy(true);
        app = null;
      } else {
        host.replaceChildren();
      }
      appRef.current = null;
    };
  }, [size, width, height]);

  return (
    <div
      ref={hostRef}
      className={className}
      style={{
        position: "relative",
        width,
        height,
        lineHeight: 0,
        filter: reduceMotion ? undefined : "drop-shadow(0 14px 28px rgba(0,0,0,0.32))",
        pointerEvents: "none",
        userSelect: "none",
        overflow: "visible",
      }}
      aria-hidden
    />
  );
}

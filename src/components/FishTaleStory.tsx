import { useCallback, useEffect, useRef, useState } from "react";
import type { GameAnimation } from "../data/games";
import GameCharacterAnimation from "./GameCharacterAnimation";

const HOOK_SRC = "/animations/fishCat/Hook1.png";
const HOOK_WIDTH = 34;
const HOOK_HEIGHT = 58;
const LINE_COLOR = "#8b8b8b";

const FISH: GameAnimation[] = [
  {
    skePath: "/animations/fish/fish1_ske.json",
    texPath: "/animations/fish/fish1_tex.json",
    texturePath: "/animations/fish/fish1_tex.png",
    armature: "Armature",
    animation: "idle",
    width: 220,
    height: 150,
    scale: 0.95,
  },
  {
    skePath: "/animations/fish/fish2_ske.json",
    texPath: "/animations/fish/fish2_tex.json",
    texturePath: "/animations/fish/fish2_tex.png",
    armature: "Armature",
    animation: "indle",
    width: 260,
    height: 140,
    scale: 0.92,
  },
  {
    skePath: "/animations/fish/fish3_ske.json",
    texPath: "/animations/fish/fish3_tex.json",
    texturePath: "/animations/fish/fish3_tex.png",
    armature: "Armature",
    animation: "idle",
    width: 230,
    height: 190,
    scale: 0.9,
  },
];

type Point = { x: number; y: number };

type FishTaleStoryProps = {
  lead: string;
  body: string[];
  cat: GameAnimation;
  hookSrc?: string;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function FishTaleStory({ lead, body, cat, hookSrc = HOOK_SRC }: FishTaleStoryProps) {
  const paragraphs = [lead, ...body];
  const trailRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<HTMLDivElement>(null);
  const depthRef = useRef<HTMLDivElement>(null);
  const boneLocalRef = useRef<Point | null>(null);
  const [origin, setOrigin] = useState<Point>({ x: 0, y: 0 });
  const [hook, setHook] = useState<Point>({ x: 0, y: 0 });
  const [lineSize, setLineSize] = useState({ w: 0, h: 0 });

  const onAnchor = useCallback((point: Point | null) => {
    boneLocalRef.current = point;
  }, []);

  useEffect(() => {
    const place = () => {
      const trail = trailRef.current;
      const catBoxEl = catRef.current;
      const depth = depthRef.current;
      if (!trail || !catBoxEl || !depth) return;

      const trailBox = trail.getBoundingClientRect();
      const catBox = catBoxEl.getBoundingClientRect();
      const depthBox = depth.getBoundingClientRect();
      const bone = boneLocalRef.current;

      const fallback: Point = {
        x: catBox.left - trailBox.left + catBox.width * 0.78,
        y: catBox.top - trailBox.top + catBox.height * 0.38,
      };

      const nextOrigin = bone
        ? {
            x: catBox.left - trailBox.left + bone.x,
            y: catBox.top - trailBox.top + bone.y,
          }
        : fallback;

      const minY = nextOrigin.y + 18;
      const maxY = Math.max(minY, depthBox.bottom - trailBox.top - HOOK_HEIGHT * 0.15);
      const focus = window.innerHeight * 0.42;
      const nextHook: Point = {
        x: nextOrigin.x - HOOK_WIDTH / 2,
        y: clamp(focus - trailBox.top, minY, maxY),
      };

      setOrigin(nextOrigin);
      setHook(nextHook);
      setLineSize({ w: trailBox.width, h: trail.scrollHeight });
    };

    let raf = 0;
    const schedule = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        place();
      });
    };

    place();
    const boot = window.setTimeout(place, 120);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const timer = window.setInterval(place, 80);

    return () => {
      window.clearTimeout(boot);
      window.clearInterval(timer);
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const hookEye: Point = {
    x: hook.x + HOOK_WIDTH / 2,
    y: hook.y + 6,
  };

  return (
    <div ref={trailRef} className="relative space-y-10 text-[#1a2e34]">
      <div className="flex justify-center">
        <div ref={catRef}>
          <GameCharacterAnimation
            clip={{ ...cat, width: 320, height: 280, scale: 1, offsetX: -6, offsetY: 10 }}
            anchorBone="LineStart"
            onAnchor={onAnchor}
          />
        </div>
      </div>

      <div ref={depthRef} className="space-y-10">
        {paragraphs.map((paragraph, index) => (
          <div key={paragraph} className="space-y-8">
            <p className="text-base md:text-lg leading-relaxed text-[#5a6f76] max-w-2xl mx-auto">
              {paragraph}
            </p>
            {FISH[index] ? (
              <div className="flex justify-center">
                <div className="-scale-x-100">
                  <GameCharacterAnimation clip={FISH[index]} />
                </div>
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <svg
        className="absolute top-0 left-0 z-[5] pointer-events-none overflow-visible"
        width={lineSize.w}
        height={lineSize.h}
        aria-hidden
      >
        <line
          x1={origin.x}
          y1={origin.y}
          x2={hookEye.x}
          y2={hookEye.y}
          stroke={LINE_COLOR}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      <img
        src={hookSrc}
        alt=""
        className="absolute z-10 pointer-events-none select-none"
        style={{
          width: HOOK_WIDTH,
          height: HOOK_HEIGHT,
          left: hook.x,
          top: hook.y,
          objectFit: "contain",
        }}
        draggable={false}
      />
    </div>
  );
}

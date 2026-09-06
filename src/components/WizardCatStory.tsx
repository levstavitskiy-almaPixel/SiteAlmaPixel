import { useEffect, useState } from "react";
import type { GameAnimation } from "../data/games";
import GameCharacterAnimation from "./GameCharacterAnimation";

const ITEMS = [
  { src: "/item1.png", x: 7, delay: 0, spin: -12, size: 78 },
  { src: "/item2.png", x: 26, delay: 0.06, spin: 10, size: 72 },
  { src: "/item3.png", x: 68, delay: 0.1, spin: -8, size: 82 },
  { src: "/item4.png", x: 86, delay: 0.04, spin: 14, size: 70 },
];

type WizardCatStoryProps = {
  lead: string;
  body: string[];
  cat: GameAnimation;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function itemY(progress: number, viewportH: number, size: number) {
  const start = -size * 0.35;
  const mid = viewportH * 0.38;
  const end = viewportH + size * 0.2;
  if (progress < 0.5) return lerp(start, mid, progress / 0.5);
  return lerp(mid, end, (progress - 0.5) / 0.5);
}

export default function WizardCatStory({ lead, body, cat }: WizardCatStoryProps) {
  const paragraphs = [lead, ...body];
  const [flight, setFlight] = useState({ progress: 0, height: 800 });

  useEffect(() => {
    const update = () => {
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      setFlight({
        progress: clamp(window.scrollY / maxScroll, 0, 1),
        height: window.innerHeight,
      });
    };

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        update();
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="relative space-y-8 text-[#1a2e34]">
      <div className="flex justify-center">
        <GameCharacterAnimation
          clip={{
            ...cat,
            animation: "wizard",
            width: 220,
            height: 260,
            scale: 1,
            offsetY: 8,
          }}
        />
      </div>

      {paragraphs.map((paragraph) => (
        <p
          key={paragraph}
          className="text-base md:text-lg leading-relaxed text-[#5a6f76] max-w-2xl mx-auto"
        >
          {paragraph}
        </p>
      ))}

      <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
        {ITEMS.map((item) => {
          const local = clamp((flight.progress - item.delay) / (1 - item.delay * 0.6), 0, 1);
          const y = itemY(local, flight.height, item.size);
          const wobble = Math.sin(local * Math.PI * 2 + item.spin) * 14;
          const rotate = item.spin + local * 26;
          return (
            <img
              key={item.src}
              src={item.src}
              alt=""
              className="absolute select-none"
              style={{
                width: item.size,
                height: item.size,
                left: `${item.x}%`,
                top: 0,
                objectFit: "contain",
                filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.18))",
                transform: `translate3d(-50%, ${y}px, 0) translateX(${wobble}px) rotate(${rotate}deg)`,
              }}
              draggable={false}
            />
          );
        })}
      </div>
    </div>
  );
}

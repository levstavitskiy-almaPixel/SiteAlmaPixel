import { useEffect, useRef, useState, type ReactNode } from "react";
import type { GameAnimation } from "../data/games";
import GameCharacterAnimation from "./GameCharacterAnimation";

const CARD_SRC = "/Card_0.png?v=3";
const OWL_WIDTH = 112;
const OWL_HEIGHT = 134;
const OWL_OFFSET_X = 12;
const KING_WIDTH = 136;
const KING_HEIGHT = 162;
const CARD_WIDTH = 72;

type OwlTaleStoryProps = {
  hook?: string;
  lead: string;
  body: string[];
  crownSrc?: string;
  owl: GameAnimation;
  king?: GameAnimation;
};

type Point = { x: number; y: number };

function owlPointOnCard(card: HTMLElement, trail: HTMLElement): Point {
  const trailBox = trail.getBoundingClientRect();
  const cardBox = card.getBoundingClientRect();
  return {
    x: cardBox.left - trailBox.left + (cardBox.width - OWL_WIDTH) / 2 + OWL_OFFSET_X,
    y: cardBox.top - trailBox.top + cardBox.height * 0.08,
  };
}

function StoryCard({
  cardRef,
  occupant,
}: {
  cardRef?: (node: HTMLDivElement | null) => void;
  occupant?: ReactNode;
}) {
  return (
    <div className="flex justify-center">
      <div ref={cardRef} className="relative" style={{ width: CARD_WIDTH }}>
        <img src={CARD_SRC} alt="" className="w-full h-auto select-none" draggable={false} />
        {occupant ? (
          <div
            className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
            style={{ top: "2%" }}
          >
            {occupant}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function OwlTaleStory({ hook, lead, body, crownSrc, owl, king }: OwlTaleStoryProps) {
  const paragraphs = [lead, ...body];
  const owlPadCount = paragraphs.length;
  const trailRef = useRef<HTMLDivElement>(null);
  const padRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [pos, setPos] = useState<Point>({ x: 0, y: 0 });
  const [duration, setDuration] = useState(0);
  const [owlAnim, setOwlAnim] = useState("idle");
  const padRef = useRef(0);
  const posRef = useRef(pos);

  useEffect(() => {
    posRef.current = pos;
  }, [pos]);

  useEffect(() => {
    const trail = trailRef.current;
    if (!trail) return;

    const place = (next: number, animate: boolean) => {
      const card = padRefs.current[next];
      if (!card) return;
      const point = owlPointOnCard(card, trail);
      const prev = posRef.current;
      const dist = Math.hypot(point.x - prev.x, point.y - prev.y);
      const running = animate && dist > 12;
      setDuration(running ? Math.min(1100, Math.max(420, dist * 1.05)) : 0);
      setOwlAnim(running ? "run" : "idle");
      setPos(point);
      padRef.current = next;
    };

    const pickPad = () => {
      const focus = window.innerHeight * 0.4;
      let next = 0;
      padRefs.current.forEach((card, index) => {
        if (!card) return;
        if (card.getBoundingClientRect().top < focus) next = index;
      });
      return next;
    };

    const sync = (animate: boolean) => {
      place(pickPad(), animate);
    };

    const onScroll = () => {
      const next = pickPad();
      if (next !== padRef.current) place(next, true);
    };

    sync(false);
    const boot = window.setTimeout(() => sync(false), 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.clearTimeout(boot);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [owlPadCount]);

  return (
    <div ref={trailRef} className="relative space-y-6 text-[#1a2e34]">
      {crownSrc ? (
        <div className="flex justify-center">
          <img
            src={crownSrc}
            alt=""
            className="max-h-40 md:max-h-52 w-auto object-contain"
            draggable={false}
          />
        </div>
      ) : null}

      {hook ? (
        <p className="text-lg md:text-xl leading-relaxed text-[#1a2e34] text-center font-chiron-heading max-w-2xl mx-auto">
          {hook}
        </p>
      ) : null}

      <StoryCard
        cardRef={(node) => {
          padRefs.current[0] = node;
        }}
      />

      {paragraphs.map((paragraph, index) => (
        <div key={paragraph} className="space-y-6">
          <p className="text-base md:text-lg leading-relaxed text-[#5a6f76] max-w-2xl mx-auto">{paragraph}</p>
          {index < paragraphs.length - 1 ? (
            <StoryCard
              cardRef={(node) => {
                padRefs.current[index + 1] = node;
              }}
            />
          ) : null}
        </div>
      ))}

      {king ? (
        <StoryCard
          occupant={
            <GameCharacterAnimation
              clip={{ ...king, width: KING_WIDTH, height: KING_HEIGHT, scale: 1 }}
            />
          }
        />
      ) : null}

      <div
        className="absolute top-0 left-0 z-10 pointer-events-none"
        style={{
          width: OWL_WIDTH,
          height: OWL_HEIGHT,
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
          transition: duration ? `transform ${duration}ms linear` : "none",
        }}
        onTransitionEnd={() => setOwlAnim("idle")}
      >
        <GameCharacterAnimation
          clip={{ ...owl, width: OWL_WIDTH, height: OWL_HEIGHT, scale: 0.9 }}
          animation={owlAnim}
        />
      </div>
    </div>
  );
}

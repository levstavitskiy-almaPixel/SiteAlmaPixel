import React, { useEffect, useRef, useState } from "react";

type LookingAppleProps = {
  className?: string;
  size?: number;
};

/** Eye centers in apple.svg viewBox 1024×768 (normalized 0..1). */
const EYES = [
  { x: 362.79 / 1024, y: 315.24 / 768 },
  { x: 647.06 / 1024, y: 313.05 / 768 },
] as const;

const ASPECT = 768 / 1024;

/**
 * User SVG apple (raster underlay + vector face). Pupils follow pointer.
 */
export default function LookingApple({
  className = "",
  size = 420,
}: LookingAppleProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [pupil, setPupil] = useState({ x: 0, y: 0 });
  const [reduceMotion, setReduceMotion] = useState(false);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);

  const height = size * ASPECT;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setPupil({ x: 0, y: 0 });
      return;
    }

    const max = Math.max(6, size * 0.018);
    const onMove = (clientX: number, clientY: number) => {
      const el = rootRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height * 0.41;
      const dx = clientX - cx;
      const dy = clientY - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const pull = Math.min(1, dist / 240);
      target.current = {
        x: (dx / dist) * max * pull,
        y: (dy / dist) * max * pull,
      };
    };

    const onPointer = (e: PointerEvent) => onMove(e.clientX, e.clientY);

    const tick = () => {
      const c = current.current;
      const t = target.current;
      c.x += (t.x - c.x) * 0.22;
      c.y += (t.y - c.y) * 0.22;
      setPupil({ x: c.x, y: c.y });
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onPointer, { passive: true });
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onPointer);
      if (raf.current != null) cancelAnimationFrame(raf.current);
    };
  }, [reduceMotion, size]);

  const pupilSize = size * 0.035;

  return (
    <div
      ref={rootRef}
      className={className}
      style={{
        position: "relative",
        width: size,
        height,
        lineHeight: 0,
        filter: "drop-shadow(0 14px 28px rgba(0,0,0,0.32))",
        pointerEvents: "none",
        userSelect: "none",
      }}
      aria-hidden
    >
      <img
        src="/apple.svg"
        alt=""
        draggable={false}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          display: "block",
        }}
      />
      {EYES.map((eye) => (
        <span
          key={`${eye.x}-${eye.y}`}
          style={{
            position: "absolute",
            left: `${eye.x * 100}%`,
            top: `${eye.y * 100}%`,
            width: pupilSize,
            height: pupilSize,
            marginLeft: -pupilSize / 2,
            marginTop: -pupilSize / 2,
            borderRadius: "50%",
            background: "#1a1a1a",
            transform: `translate(${pupil.x}px, ${pupil.y}px)`,
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}

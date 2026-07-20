import React, { useEffect, useRef, useState } from "react";

type LookingAppleProps = {
  className?: string;
  size?: number;
};

/**
 * Hand-drawn vector apple; pupils follow the pointer.
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

    const max = 14;
    const onMove = (clientX: number, clientY: number) => {
      const el = rootRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height * 0.48;
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
      c.x += (t.x - c.x) * 0.2;
      c.y += (t.y - c.y) * 0.2;
      setPupil({ x: c.x, y: c.y });
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onPointer, { passive: true });
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onPointer);
      if (raf.current != null) cancelAnimationFrame(raf.current);
    };
  }, [reduceMotion]);

  const eye = (cx: number, cy: number) => (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={34}
        fill="#fffef8"
        stroke="#1a1a1a"
        strokeWidth={6}
      />
      {/* short eyelashes */}
      <path
        d={`M${cx - 18} ${cy - 28} q -3 -8 0 -12`}
        fill="none"
        stroke="#1a1a1a"
        strokeWidth={4.5}
        strokeLinecap="round"
      />
      <path
        d={`M${cx - 1} ${cy - 33} v -11`}
        fill="none"
        stroke="#1a1a1a"
        strokeWidth={4.5}
        strokeLinecap="round"
      />
      <path
        d={`M${cx + 16} ${cy - 28} q 4 -7 8 -10`}
        fill="none"
        stroke="#1a1a1a"
        strokeWidth={4.5}
        strokeLinecap="round"
      />
      <circle cx={cx + pupil.x} cy={cy + pupil.y} r={10} fill="#1a1a1a" />
    </g>
  );

  return (
    <div
      ref={rootRef}
      className={className}
      style={{
        width: size,
        height: size * 0.88,
        lineHeight: 0,
        filter: "drop-shadow(0 14px 28px rgba(0,0,0,0.3))",
        pointerEvents: "none",
        userSelect: "none",
      }}
      aria-hidden
    >
      <svg
        viewBox="0 0 400 320"
        width={size}
        height={size * 0.88}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* apple body — wider */}
        <path
          d="M200 72
             C268 66 352 108 362 178
             C370 242 328 300 248 312
             C210 318 160 318 122 308
             C48 286 28 220 42 164
             C56 108 132 74 200 72 Z"
          fill="#e07068"
          stroke="#1a1a1a"
          strokeWidth={8}
          strokeLinejoin="round"
        />
        {/* highlight */}
        <path
          d="M88 150 C108 118 142 104 168 108"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth={12}
          strokeLinecap="round"
        />

        {/* stem grows from apple top */}
        <path
          d="M198 74 C194 58 198 44 204 34"
          fill="none"
          stroke="#1a1a1a"
          strokeWidth={7}
          strokeLinecap="round"
        />
        {/* leaf */}
        <path
          d="M204 42 C224 24 252 32 260 54 C236 58 216 52 204 42 Z"
          fill="#6fbf66"
          stroke="#1a1a1a"
          strokeWidth={5}
          strokeLinejoin="round"
        />
        <path
          d="M212 46 C228 40 244 46 252 54"
          fill="none"
          stroke="#1a1a1a"
          strokeWidth={3}
          strokeLinecap="round"
        />
        <path
          d="M218 50 L226 40 M228 54 L236 44 M240 56 L246 48"
          fill="none"
          stroke="#1a1a1a"
          strokeWidth={2.5}
          strokeLinecap="round"
        />

        {eye(128, 168)}
        {eye(272, 168)}

        {/* mouth between the eyes */}
        <path
          d="M178 176 C190 186 210 186 222 176"
          fill="none"
          stroke="#1a1a1a"
          strokeWidth={5.5}
          strokeLinecap="round"
        />
        <path
          d="M178 176 L174 182 M222 176 L226 182"
          fill="none"
          stroke="#1a1a1a"
          strokeWidth={4.5}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

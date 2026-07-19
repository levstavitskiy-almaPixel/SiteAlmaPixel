import React from "react";

type WaveDividerProps = {
  fill?: string;
  flip?: boolean;
  className?: string;
};

/** Scalloped section edge — Massive Monster style */
export default function WaveDivider({
  fill = "#f5f4f0",
  flip = false,
  className = "",
}: WaveDividerProps) {
  return (
    <div
      className={className}
      aria-hidden
      style={{
        pointerEvents: "none",
        position: "absolute",
        left: 0,
        right: 0,
        zIndex: 20,
        lineHeight: 0,
        ...(flip
          ? { top: 0, transform: "rotate(180deg)" }
          : { bottom: 0 }),
      }}
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        style={{ display: "block", width: "100%", height: 64 }}
      >
        <path
          fill={fill}
          d="M0,40 C60,70 120,10 180,40 C240,70 300,10 360,40 C420,70 480,10 540,40 C600,70 660,10 720,40 C780,70 840,10 900,40 C960,70 1020,10 1080,40 C1140,70 1200,10 1260,40 C1320,70 1380,10 1440,40 L1440,80 L0,80 Z"
        />
      </svg>
    </div>
  );
}

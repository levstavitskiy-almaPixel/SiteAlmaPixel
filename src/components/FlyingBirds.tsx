import React, { useMemo } from "react";
import { motion } from "framer-motion";
import MovieClipAnimation from "./MovieClipAnimation";

interface Bird {
  id: number;
  startX: number | string;
  endX: number | string;
  startY: number;
  curveY: number[];
  delay: number;
  duration: number;
  size: number;
  scaleX: number[];
}

function buildBirds(count: number): Bird[] {
  const birds: Bird[] = [];

  for (let i = 0; i < count; i++) {
    const leftToRight = i % 2 === 0;
    const startY = 40 + ((i * 67) % 72) * 8; // spread across viewport height
    const amp = 18 + (i % 5) * 8;
    const size = 48 + (i % 4) * 6; // 48–66px
    const duration = 9 + (i % 7) * 1.4;
    const delay = (i * 1.1) % 14;

    birds.push({
      id: i + 1,
      startX: leftToRight ? -180 : "calc(100vw + 180px)",
      endX: leftToRight ? "calc(100vw + 180px)" : -180,
      startY,
      curveY: [startY, startY - amp, startY + amp * 0.7, startY],
      delay,
      duration,
      size,
      scaleX: leftToRight ? [-1, -1, -1, -1] : [1, 1, 1, 1],
    });
  }

  return birds;
}

const FlyingBirds: React.FC = () => {
  const birds = useMemo(() => buildBirds(18), []);

  return (
    <div
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
    >
      {birds.map((bird) => (
        <motion.div
          key={bird.id}
          className="absolute"
          style={{
            left: bird.startX,
            top: bird.startY,
            width: bird.size,
            height: bird.size,
            overflow: "visible",
          }}
          animate={{
            x: [bird.startX, bird.endX],
            y: bird.curveY,
            scaleX: bird.scaleX,
          }}
          transition={{
            duration: bird.duration,
            delay: bird.delay,
            repeat: Infinity,
            ease: "easeInOut",
            scaleX: {
              duration: 0.1,
              ease: "linear",
            },
          }}
        >
          <MovieClipAnimation
            mcPath="/animations/bird_ske_mc.json"
            texturePath="/animations/bird_ske_tex.png"
            width={bird.size}
            height={bird.size}
            scale={bird.size / 76}
            loop
            animation="fly"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FlyingBirds;

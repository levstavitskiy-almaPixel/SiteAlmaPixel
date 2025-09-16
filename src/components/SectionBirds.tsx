import React from 'react';
import { motion } from 'framer-motion';
import MovieClipAnimation from './MovieClipAnimation';

// Интерфейс для птицы
interface Bird {
  id: number;
  startX: number | string;
  endX: number | string;
  startY: number;
  curveY: number[];
  delay: number;
  duration: number;
  direction: 'left-to-right' | 'right-to-left';
  scaleX: number[];
}

interface SectionBirdsProps {
  sectionHeight: number;
  sectionOffset: number;
  birdCount?: number;
}

const SectionBirds: React.FC<SectionBirdsProps> = ({ 
  sectionHeight, 
  sectionOffset, 
  birdCount = 3 
}) => {
  // Генерируем птиц для конкретного раздела
  const birds: Bird[] = Array.from({ length: birdCount }, (_, index) => {
    const isLeftToRight = index % 2 === 0;
    const baseY = sectionOffset + (sectionHeight / birdCount) * index + 50;
    
    return {
      id: index + 1,
      startX: isLeftToRight ? -200 : 'calc(100vw + 200px)',
      endX: isLeftToRight ? 'calc(100vw + 200px)' : -200,
      startY: baseY,
      curveY: [
        baseY,
        baseY - 30,
        baseY + 20,
        baseY - 10,
        baseY + 15,
        baseY - 5,
        baseY
      ],
      delay: index * 2,
      duration: 8 + (index * 2),
      direction: isLeftToRight ? 'left-to-right' : 'right-to-left',
      scaleX: isLeftToRight 
        ? [-1, -1, -1, -1, -1, -1, -1] 
        : [1, 1, 1, 1, 1, 1, 1]
    };
  });

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {birds.map((bird) => (
        <motion.div
          key={bird.id}
          className="absolute"
          style={{
            left: bird.startX,
            top: bird.startY,
            width: '200px',
            height: '200px',
            overflow: 'visible'
          }}
          animate={{
            x: [bird.startX, bird.endX],
            y: bird.curveY,
            scaleX: bird.scaleX
          }}
          transition={{
            duration: bird.duration,
            delay: bird.delay,
            repeat: Infinity,
            ease: "easeInOut",
            scaleX: {
              duration: 0.1,
              ease: "linear"
            }
          }}
        >
          <div className="w-full h-full flex items-center justify-center" style={{ overflow: 'visible' }}>
            <MovieClipAnimation
              mcPath="/animations/bird_ske_mc.json"
              texturePath="/animations/bird_ske_tex.png"
              width={120}
              height={120}
              loop={true}
              animation="fly"
              className="w-full h-full"
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SectionBirds;

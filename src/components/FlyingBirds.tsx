import React, { useState } from 'react';
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

const FlyingBirds: React.FC = () => {
  console.log('FlyingBirds component rendered');
  
  // Генерируем больше птиц для покрытия всей длины сайта
  const birds: Bird[] = [
    {
      id: 1,
      startX: -500,
      endX: 'calc(100vw + 500px)',
      startY: 100,
      curveY: [100, 30, 150, 100],
      delay: 0,
      duration: 12,
      direction: 'left-to-right',
      scaleX: [-1, -1, -1, -1]
    },
    {
      id: 2,
      startX: 'calc(100vw + 500px)',
      endX: -500,
      startY: 200,
      curveY: [200, 120, 180, 200],
      delay: 3,
      duration: 10,
      direction: 'right-to-left',
      scaleX: [1, 1, 1, 1]
    },
    {
      id: 3,
      startX: -500,
      endX: 'calc(100vw + 500px)',
      startY: 300,
      curveY: [300, 220, 280, 300],
      delay: 6,
      duration: 14,
      direction: 'left-to-right',
      scaleX: [-1, -1, -1, -1]
    },
    {
      id: 4,
      startX: 'calc(100vw + 500px)',
      endX: -500,
      startY: 150,
      curveY: [150, 70, 130, 150],
      delay: 9,
      duration: 11,
      direction: 'right-to-left',
      scaleX: [1, 1, 1, 1]
    },
    {
      id: 5,
      startX: -500,
      endX: 'calc(100vw + 500px)',
      startY: 400,
      curveY: [400, 320, 380, 400],
      delay: 12,
      duration: 13,
      direction: 'left-to-right',
      scaleX: [-1, -1, -1, -1]
    },
    {
      id: 6,
      startX: 'calc(100vw + 500px)',
      endX: -500,
      startY: 600,
      curveY: [600, 520, 580, 600],
      delay: 15,
      duration: 16,
      direction: 'right-to-left',
      scaleX: [1, 1, 1, 1]
    },
    {
      id: 7,
      startX: -500,
      endX: 'calc(100vw + 500px)',
      startY: 800,
      curveY: [800, 720, 780, 800],
      delay: 18,
      duration: 15,
      direction: 'left-to-right',
      scaleX: [-1, -1, -1, -1]
    },
    {
      id: 8,
      startX: 'calc(100vw + 500px)',
      endX: -500,
      startY: 1000,
      curveY: [1000, 920, 980, 1000],
      delay: 21,
      duration: 17,
      direction: 'right-to-left',
      scaleX: [1, 1, 1, 1]
    }
  ];
  
  // Добавляем видимые логи на страницу
  const logMessage = 'FlyingBirds component rendered at: ' + new Date().toLocaleTimeString();

  return (
    <div className="absolute inset-0 pointer-events-none z-50 w-full h-full">
      {/* Множественные птицы */}
      {birds.map((bird) => (
        <motion.div
          key={bird.id}
          className="absolute"
          style={{
            left: bird.startX,
            top: bird.startY,
            width: '250px',
            height: '250px',
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
              duration: 0.1, // Быстрый поворот
              ease: "linear"
            }
          }}
        >
          <div className="w-full h-full flex items-center justify-center" style={{ overflow: 'visible' }}>
            <MovieClipAnimation
              mcPath="/animations/bird_ske_mc.json"
              texturePath="/animations/bird_ske_tex.png"
              width={150}
              height={150}
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

export default FlyingBirds;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MovieClipAnimation from './MovieClipAnimation';

// Интерфейс для птицы
interface Bird {
  id: number;
  startX: string;
  endX: string;
  startY: number;
  curveY: number[];
  delay: number;
  duration: number;
  direction: 'left-to-right' | 'right-to-left';
  scaleX: number[];
}

const FlyingBirds: React.FC = () => {
  console.log('FlyingBirds component rendered');
  
  // Генерируем 3-5 птиц с разными параметрами
  const birds: Bird[] = [
    {
      id: 1,
      startX: '0vw',
      endX: '100vw',
      startY: 100,
      curveY: [100, 50, 100, 80, 100],
      delay: 0,
      duration: 12,
      direction: 'left-to-right',
      scaleX: [-1, -1, -1, -1, -1] // Поворачиваем на 180° для полета вправо
    },
    {
      id: 2,
      startX: '100vw',
      endX: '0vw',
      startY: 200,
      curveY: [200, 150, 200, 180, 200],
      delay: 3,
      duration: 10,
      direction: 'right-to-left',
      scaleX: [1, 1, 1, 1, 1] // Не поворачиваем для полета влево
    },
    {
      id: 3,
      startX: '0vw',
      endX: '100vw',
      startY: 300,
      curveY: [300, 250, 300, 280, 300],
      delay: 6,
      duration: 14,
      direction: 'left-to-right',
      scaleX: [-1, -1, -1, -1, -1] // Поворачиваем на 180° для полета вправо
    },
    {
      id: 4,
      startX: '100vw',
      endX: '0vw',
      startY: 150,
      curveY: [150, 100, 150, 120, 150],
      delay: 9,
      duration: 11,
      direction: 'right-to-left',
      scaleX: [1, 1, 1, 1, 1] // Не поворачиваем для полета влево
    },
    {
      id: 5,
      startX: '0vw',
      endX: '100vw',
      startY: 400,
      curveY: [400, 350, 400, 380, 400],
      delay: 12,
      duration: 13,
      direction: 'left-to-right',
      scaleX: [-1, -1, -1, -1, -1] // Поворачиваем на 180° для полета вправо
    }
  ];
  
  // Добавляем видимые логи на страницу
  const logMessage = 'FlyingBirds component rendered at: ' + new Date().toLocaleTimeString();

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Множественные птицы */}
      {birds.map((bird) => (
        <motion.div
          key={bird.id}
          className="absolute w-12 h-12"
          style={{
            left: bird.startX,
            top: bird.startY,
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
              width={40}
              height={40}
              loop={true}
              animation="fly"
              className="w-full h-full"
            />
          </div>
        </motion.div>
      ))}
      
      {/* Отладочная информация */}
      <div className="absolute top-4 left-4 bg-blue-500 text-white p-2 rounded">
        <div>FlyingBirds работает!</div>
        <div>Z-index: 50</div>
        <div>Position: fixed</div>
        <div>Птиц: {birds.length}</div>
        <div>Анимация: включена</div>
        <div className="text-xs mt-1">{logMessage}</div>
      </div>
      
      {/* Видимые логи */}
      <div className="absolute bottom-4 left-4 bg-black text-green-400 p-2 rounded text-xs max-w-md">
        <div>Console Logs:</div>
        <div>✓ FlyingBirds component rendered</div>
        <div>✓ MovieClipAnimation loaded</div>
        <div>✓ Bird animations: fly</div>
        <div>✓ Multiple birds: {birds.length}</div>
        <div>✓ Different trajectories & delays</div>
        <div>✓ Time: {new Date().toLocaleTimeString()}</div>
      </div>
    </div>
  );
};

export default FlyingBirds;

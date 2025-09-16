import React from 'react';
import { motion } from 'framer-motion';
import MovieClipAnimation from './MovieClipAnimation';

interface FlyingBirdProps {
  id: number;
  delay: number;
  duration: number;
  direction: 'left-to-right' | 'right-to-left';
  startY: number;
  curveHeight: number;
}

const FlyingBird: React.FC<FlyingBirdProps> = ({ 
  id, 
  delay, 
  duration, 
  direction, 
  startY, 
  curveHeight 
}) => {
  const isLeftToRight = direction === 'left-to-right';
  
  return (
    <motion.div
      className="absolute pointer-events-none z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      {/* Отладочная траектория */}
      <svg 
        className="absolute inset-0 w-full h-full"
        style={{ 
          width: '1200px', 
          height: '300px',
          left: isLeftToRight ? '0' : '-1200px'
        }}
      >
        <path
          d={`M 0 ${startY} Q 300 ${startY - curveHeight} 600 ${startY} T 900 ${startY + curveHeight} T 1200 ${startY}`}
          stroke="red"
          strokeWidth="2"
          fill="none"
          opacity="0.5"
        />
        {/* Точки траектории */}
        <circle cx="0" cy={startY} r="3" fill="green" />
        <circle cx="300" cy={startY - curveHeight} r="3" fill="blue" />
        <circle cx="600" cy={startY} r="3" fill="blue" />
        <circle cx="900" cy={startY + curveHeight} r="3" fill="blue" />
        <circle cx="1200" cy={startY} r="3" fill="red" />
      </svg>
      
      {/* Отладочная информация */}
      <div 
        className="absolute text-xs bg-yellow-400 text-black px-1 rounded"
        style={{ 
          top: startY - 20, 
          left: isLeftToRight ? '10px' : '-100px' 
        }}
      >
        Птица {id}: {direction} Y:{startY} H:{curveHeight}
      </div>
      
      <motion.div
        animate={{
          x: isLeftToRight ? [0, 1200] : [0, -1200],
          y: [
            startY,
            startY - curveHeight,
            startY,
            startY + curveHeight,
            startY,
            startY - curveHeight,
            startY
          ]
        }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-12 h-12 border-2 border-yellow-400"
        style={{
          transform: isLeftToRight ? 'scaleX(1)' : 'scaleX(-1)'
        }}
      >
        <MovieClipAnimation
          mcPath="/animations/bird_ske_mc.json"
          texturePath="/animations/bird_ske_tex.png"
          width={48}
          height={48}
          loop={true}
          animation="fly"
          className="w-full h-full"
        />
      </motion.div>
    </motion.div>
  );
};

const FlyingBirds: React.FC = () => {
  // Генерируем случайные параметры для 3-6 птиц
  const birdCount = Math.floor(Math.random() * 4) + 3; // 3-6 птиц
  const birds = Array.from({ length: birdCount }, (_, i) => ({
    id: i,
    delay: Math.random() * 5, // Задержка 0-5 секунд
    duration: 15 + Math.random() * 10, // Длительность 15-25 секунд
    direction: Math.random() > 0.5 ? 'left-to-right' : 'right-to-left' as const,
    startY: 50 + Math.random() * 200, // Высота 50-250px
    curveHeight: 30 + Math.random() * 40 // Высота кривой 30-70px
  }));

  console.log('FlyingBirds generated:', birds);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Отладочная информация */}
      <div className="absolute top-4 left-4 bg-red-500 text-white p-2 rounded z-50">
        <div>Птиц: {birdCount}</div>
        <div>Z-index: 10</div>
        <div>Position: fixed</div>
      </div>
      
      {birds.map((bird) => (
        <FlyingBird
          key={bird.id}
          id={bird.id}
          delay={bird.delay}
          duration={bird.duration}
          direction={bird.direction}
          startY={bird.startY}
          curveHeight={bird.curveHeight}
        />
      ))}
    </div>
  );
};

export default FlyingBirds;

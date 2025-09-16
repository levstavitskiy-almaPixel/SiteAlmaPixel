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
        className="w-12 h-12"
        style={{
          transform: isLeftToRight ? 'scaleX(1)' : 'scaleX(-1)' // Отражаем птицу для полета влево
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

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
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

import React from 'react';
import { motion } from 'framer-motion';

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
  
  // Создаем кривую траекторию для птицы
  const path = isLeftToRight 
    ? `M -100 ${startY} Q 50 ${startY - curveHeight} 100 ${startY} T 300 ${startY + curveHeight} T 500 ${startY} T 700 ${startY - curveHeight} T 900 ${startY} T 1100 ${startY + curveHeight}`
    : `M 1100 ${startY} Q 900 ${startY + curveHeight} 700 ${startY} T 500 ${startY - curveHeight} T 300 ${startY} T 100 ${startY + curveHeight} T -100 ${startY}`;

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
        className="w-8 h-8"
      >
        {/* SVG птица с анимацией крыльев */}
        <svg
          viewBox="0 0 24 24"
          className="w-full h-full text-blue-300 opacity-80"
          style={{
            filter: 'drop-shadow(0 0 4px rgba(147, 197, 253, 0.5))'
          }}
        >
          {/* Тело птицы */}
          <ellipse
            cx="12"
            cy="12"
            rx="6"
            ry="4"
            fill="currentColor"
          />
          
          {/* Крылья с анимацией */}
          <motion.g
            animate={{
              rotate: [-10, 10, -10]
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <path
              d="M 6 12 Q 2 8 6 6 Q 10 8 6 12"
              fill="currentColor"
              opacity="0.8"
            />
            <path
              d="M 18 12 Q 22 8 18 6 Q 14 8 18 12"
              fill="currentColor"
              opacity="0.8"
            />
          </motion.g>
          
          {/* Хвост */}
          <path
            d="M 2 12 Q 4 14 6 12"
            fill="currentColor"
            opacity="0.7"
          />
          
          {/* Глаз */}
          <circle
            cx="14"
            cy="10"
            r="1"
            fill="white"
          />
          <circle
            cx="14"
            cy="10"
            r="0.5"
            fill="black"
          />
        </svg>
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

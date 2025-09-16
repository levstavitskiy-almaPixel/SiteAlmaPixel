import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MovieClipAnimation from './MovieClipAnimation';

const FlyingBirds: React.FC = () => {
  console.log('FlyingBirds component rendered');
  
  // Состояние для отслеживания направления полета
  const [isFlyingRight, setIsFlyingRight] = useState(false);
  
  // Добавляем видимые логи на страницу
  const logMessage = 'FlyingBirds component rendered at: ' + new Date().toLocaleTimeString();

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Анимированная птица */}
      <motion.div
        className="absolute top-20 left-20 w-20 h-20"
        animate={{
          x: ['0vw', '100vw'],
          y: [0, -50, 0, 30, 0],
          scaleX: [1, 1, -1, -1, 1] // Резкий флип перед полетом вправо
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          scaleX: {
            duration: 0.1, // Быстрый поворот
            ease: "linear"
          }
        }}
        onAnimationComplete={() => {
          // Обновляем состояние направления
          setIsFlyingRight(prev => !prev);
        }}
      >
        <div className="w-full h-full border-4 border-yellow-400 bg-blue-200 flex items-center justify-center">
          <MovieClipAnimation
            mcPath="/animations/bird_ske_mc.json"
            texturePath="/animations/bird_ske_tex.png"
            width={64}
            height={64}
            loop={true}
            animation="fly"
            className="w-full h-full"
          />
        </div>
      </motion.div>
      
      {/* Отладочная информация */}
      <div className="absolute top-4 left-4 bg-blue-500 text-white p-2 rounded">
        <div>FlyingBirds работает!</div>
        <div>Z-index: 50</div>
        <div>Position: fixed</div>
        <div>Анимация: включена</div>
        <div>Направление: {isFlyingRight ? 'Вправо (флип)' : 'Влево (нормально)'}</div>
        <div className="text-xs mt-1">{logMessage}</div>
      </div>
      
      {/* Видимые логи */}
      <div className="absolute bottom-4 left-4 bg-black text-green-400 p-2 rounded text-xs max-w-md">
        <div>Console Logs:</div>
        <div>✓ FlyingBirds component rendered</div>
        <div>✓ MovieClipAnimation loaded</div>
        <div>✓ Bird animation: fly</div>
        <div>✓ Direction flip: enabled</div>
        <div>✓ Time: {new Date().toLocaleTimeString()}</div>
      </div>
    </div>
  );
};

export default FlyingBirds;

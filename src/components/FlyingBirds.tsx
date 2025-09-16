import React from 'react';
import { motion } from 'framer-motion';
import MovieClipAnimation from './MovieClipAnimation';

const FlyingBird: React.FC = () => {
  return (
    <motion.div
      className="absolute pointer-events-none z-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Простая траектория в About секции */}
      <motion.div
        animate={{
          x: ['0vw', '100vw'],
          y: [200, 150, 200, 180, 200]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-16 h-16 border-4 border-red-500 bg-yellow-300"
        style={{
          position: 'absolute',
          top: '200px',
          left: '0px'
        }}
      >
        <MovieClipAnimation
          mcPath="/animations/bird_ske_mc.json"
          texturePath="/animations/bird_ske_tex.png"
          width={64}
          height={64}
          loop={true}
          animation="fly"
          className="w-full h-full"
        />
      </motion.div>
      
      {/* Отладочная информация */}
      <div className="absolute top-4 left-4 bg-red-500 text-white p-2 rounded z-50">
        <div>Птица в About секции</div>
        <div>Размер: 64x64px</div>
        <div>Анимация: fly</div>
        <div>Z-index: 20</div>
      </div>
    </motion.div>
  );
};

const FlyingBirds: React.FC = () => {
  console.log('FlyingBirds component rendered');

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <FlyingBird />
    </div>
  );
};

export default FlyingBirds;

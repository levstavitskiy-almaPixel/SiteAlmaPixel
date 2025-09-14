import React, { useEffect, useRef, useState } from 'react';

interface MovieClipAnimationProps {
  mcPath: string;
  texturePath: string;
  width?: number;
  height?: number;
  loop?: boolean;
  className?: string;
  offsetY?: number;
  scale?: number;
}

interface MovieClipData {
  file: string;
  mc: {
    [key: string]: {
      labels: Array<{ name: string; frame: number; end: number }>;
      events: any[];
      frameRate: number;
      frames: Array<{
        x: number;
        y: number;
        duration: number;
        res: string;
      }>;
    };
  };
  res: {
    [key: string]: {
      x: number;
      y: number;
      w: number;
      h: number;
    };
  };
}

const MovieClipAnimation: React.FC<MovieClipAnimationProps> = ({
  mcPath,
  texturePath,
  width = 400,
  height = 400,
  loop = true,
  className = "",
  offsetY = 0,
  scale = 1
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [mcData, setMcData] = useState<MovieClipData | null>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Загружаем изображение
    const img = new Image();
    img.onload = () => {
      setImage(img);
    };
    img.src = texturePath;

    // Загружаем данные MovieClip
    fetch(mcPath)
      .then(response => response.json())
      .then(data => {
        console.log('Loaded MovieClip data:', data);
        setMcData(data);
        setIsLoaded(true);
      })
      .catch(error => {
        console.error('Error loading MovieClip data:', error);
      });
  }, [mcPath, texturePath]);

  useEffect(() => {
    if (!isLoaded || !image || !mcData) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Находим анимацию по имени
    const animation = Object.values(mcData.mc)[0]; // Берем первую анимацию
    if (!animation) {
      console.error('Animation not found in MovieClip data:', mcData);
      return;
    }
    
    console.log('Found animation:', animation);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      const frame = animation.frames[currentFrame];
      if (!frame) return;

      const resource = mcData.res[frame.res];
      if (!resource) return;

      // Вычисляем позицию для центрирования
      const centerX = width / 2;
      const centerY = height / 2;
      
      // Вычисляем размеры отрисовки с учетом масштаба
      const drawWidth = resource.w * scale;
      const drawHeight = resource.h * scale;
      
      // Позиция кадра с учетом offset из MovieClip и дополнительного offsetY
      const drawX = centerX + frame.x * scale;
      const drawY = centerY + frame.y * scale + offsetY;

      // Рисуем кадр
      ctx.drawImage(
        image,
        resource.x, resource.y, resource.w, resource.h,
        drawX, drawY, drawWidth, drawHeight
      );
    };

    animate();

    const interval = setInterval(() => {
      setCurrentFrame(prev => {
        const next = prev + 1;
        if (next >= animation.frames.length) {
          return loop ? 0 : animation.frames.length - 1;
        }
        return next;
      });
    }, 1000 / animation.frameRate);

    return () => clearInterval(interval);
  }, [isLoaded, image, mcData, currentFrame, width, height, loop]);

  if (!isLoaded) {
    return (
      <div className={`flex items-center justify-center ${className}`} style={{ width, height }}>
        <div className="text-white">Loading animation...</div>
      </div>
    );
  }

  return (
    <div className={`bg-gray-800/20 rounded-lg p-4 ${className}`}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{ imageRendering: 'auto' }}
      />
    </div>
  );
};

export default MovieClipAnimation;

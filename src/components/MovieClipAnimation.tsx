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
  animation?: string; // Добавляем поддержку выбора анимации
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
  scale = 1,
  animation = "idle" // По умолчанию "idle", но можно указать "fly"
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
    const animationData = Object.values(mcData.mc)[0]; // Берем первую анимацию
    if (!animationData) {
      console.error('Animation not found in MovieClip data:', mcData);
      return;
    }
    
    console.log('Found animation data:', animationData);
    
    // Находим нужную анимацию по имени
    const animationLabel = animationData.labels.find(label => label.name === animation);
    if (!animationLabel) {
      console.error(`Animation "${animation}" not found. Available animations:`, animationData.labels.map(l => l.name));
      return;
    }
    
    console.log(`Playing animation "${animation}":`, animationLabel);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Вычисляем индекс кадра с учетом выбранной анимации
      const frameIndex = animationLabel.frame - 1 + currentFrame; // -1 потому что индексы с 0
      const frame = animationData.frames[frameIndex];
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
        const maxFrames = animationLabel.end - animationLabel.frame + 1; // Количество кадров в анимации
        if (next >= maxFrames) {
          return loop ? 0 : maxFrames - 1;
        }
        return next;
      });
    }, 1000 / animationData.frameRate);

    return () => clearInterval(interval);
  }, [isLoaded, image, mcData, currentFrame, width, height, loop, animation]);

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

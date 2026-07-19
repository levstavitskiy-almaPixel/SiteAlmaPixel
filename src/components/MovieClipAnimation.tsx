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
  animation?: string;
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
  animation = "idle",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [texture, setTexture] = useState<HTMLImageElement | null>(null);
  const [mcData, setMcData] = useState<MovieClipData | null>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const img = new Image();
    img.onload = () => {
      if (cancelled) return;
      setTexture(img);
    };
    img.src = texturePath;

    fetch(mcPath)
      .then((response) => response.json())
      .then((data) => {
        if (cancelled) return;
        setMcData(data);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.error('Error loading MovieClip data:', error);
      });

    return () => {
      cancelled = true;
    };
  }, [mcPath, texturePath]);

  useEffect(() => {
    if (!isLoaded || !texture || !mcData) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animationData = Object.values(mcData.mc)[0];
    if (!animationData) return;

    const animationLabel =
      animationData.labels.find((label) => label.name === animation) ||
      animationData.labels[0];

    if (!animationLabel) return;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const frameIndex = animationLabel.frame - 1 + currentFrame;
      const frame = animationData.frames[frameIndex];
      if (!frame) return;

      const resource = mcData.res[frame.res];
      if (!resource) return;

      const centerX = width / 2;
      const centerY = height / 2;
      const drawWidth = resource.w * scale;
      const drawHeight = resource.h * scale;
      const drawX = centerX + frame.x * scale;
      const drawY = centerY + frame.y * scale + offsetY;

      ctx.drawImage(
        texture,
        resource.x,
        resource.y,
        resource.w,
        resource.h,
        drawX,
        drawY,
        drawWidth,
        drawHeight
      );
    };

    animate();

    const interval = setInterval(() => {
      setCurrentFrame((prev) => {
        const next = prev + 1;
        const maxFrames = animationLabel.end - animationLabel.frame + 1;
        if (next >= maxFrames) {
          return loop ? 0 : maxFrames - 1;
        }
        return next;
      });
    }, 1000 / animationData.frameRate);

    return () => clearInterval(interval);
  }, [isLoaded, texture, mcData, currentFrame, width, height, loop, animation, scale, offsetY]);

  if (!isLoaded || !texture) {
    return (
      <div
        className={className}
        style={{ width, height, background: "transparent" }}
        aria-hidden
      />
    );
  }

  return (
    <div
      className={className}
      style={{
        width,
        height,
        background: "transparent",
        lineHeight: 0,
        overflow: "visible",
      }}
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{
          display: "block",
          background: "transparent",
          imageRendering: "auto",
        }}
      />
    </div>
  );
};

export default MovieClipAnimation;

import React, { useState, useEffect, useRef, useCallback } from 'react';

interface GameState {
  isPlaying: boolean;
  isGameOver: boolean;
  score: number;
  dinoY: number;
  dinoVelocity: number;
  obstacles: Array<{
    id: number;
    x: number;
    height: number;
  }>;
  gameSpeed: number;
}

const DinoGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number>();
  const [gameState, setGameState] = useState<GameState>({
    isPlaying: false,
    isGameOver: false,
    score: 0,
    dinoY: 0,
    dinoVelocity: 0,
    obstacles: [],
    gameSpeed: 2
  });

  const GRAVITY = 0.6;
  const JUMP_FORCE = -12;
  const GROUND_Y = 150;
  const DINO_SIZE = 30;
  const OBSTACLE_WIDTH = 20;

  // Отрисовка игры
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Очистка canvas
    ctx.fillStyle = '#edc77b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Земля
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(0, GROUND_Y, canvas.width, canvas.height - GROUND_Y);

    // Динозаврик (пиксельный стиль)
    const dinoX = 50;
    const dinoBottomY = GROUND_Y - gameState.dinoY;
    
    // Тело динозаврика
    ctx.fillStyle = '#2D5016';
    ctx.fillRect(dinoX, dinoBottomY - DINO_SIZE, DINO_SIZE, DINO_SIZE);
    
    // Глаз
    ctx.fillStyle = '#000';
    ctx.fillRect(dinoX + 20, dinoBottomY - DINO_SIZE + 8, 4, 4);
    
    // Ноги
    ctx.fillStyle = '#1A3009';
    ctx.fillRect(dinoX + 5, dinoBottomY - 5, 6, 5);
    ctx.fillRect(dinoX + 19, dinoBottomY - 5, 6, 5);

    // Препятствия (кактусы)
    gameState.obstacles.forEach(obstacle => {
      ctx.fillStyle = '#228B22';
      ctx.fillRect(obstacle.x, GROUND_Y - obstacle.height, OBSTACLE_WIDTH, obstacle.height);
      
      // Детали кактуса
      ctx.fillStyle = '#006400';
      ctx.fillRect(obstacle.x + 5, GROUND_Y - obstacle.height + 10, 10, 8);
      ctx.fillRect(obstacle.x + 2, GROUND_Y - obstacle.height + 20, 16, 8);
    });

    // Счет
    ctx.fillStyle = '#000';
    ctx.font = '20px monospace';
    ctx.fillText(`Score: ${gameState.score}`, 10, 30);

    // Инструкции
    if (!gameState.isPlaying && !gameState.isGameOver) {
      ctx.fillStyle = '#000';
      ctx.font = '16px monospace';
      ctx.fillText('Press SPACE or click to start', 10, canvas.height - 20);
    }

    // Game Over
    if (gameState.isGameOver) {
      ctx.fillStyle = '#000';
      ctx.font = '24px monospace';
      ctx.fillText('GAME OVER', canvas.width / 2 - 80, canvas.height / 2);
      ctx.font = '16px monospace';
      ctx.fillText('Press SPACE to restart', canvas.width / 2 - 80, canvas.height / 2 + 30);
    }
  }, [gameState]);

  // Игровой цикл
  const gameLoop = useCallback(() => {
    if (!gameState.isPlaying || gameState.isGameOver) return;

    setGameState(prevState => {
      let newState = { ...prevState };

      // Физика динозаврика
      newState.dinoVelocity += GRAVITY;
      newState.dinoY += newState.dinoVelocity;

      // Ограничение на землю
      if (newState.dinoY > 0) {
        newState.dinoY = 0;
        newState.dinoVelocity = 0;
      }

      // Движение препятствий
      newState.obstacles = newState.obstacles.map(obstacle => ({
        ...obstacle,
        x: obstacle.x - newState.gameSpeed
      })).filter(obstacle => obstacle.x > -OBSTACLE_WIDTH);

      // Добавление новых препятствий
      if (Math.random() < 0.01) {
        newState.obstacles.push({
          id: Date.now(),
          x: 400,
          height: 30 + Math.random() * 20
        });
      }

      // Проверка коллизий
      const dinoX = 50;
      const dinoBottomY = GROUND_Y - newState.dinoY;
      
      for (const obstacle of newState.obstacles) {
        if (obstacle.x < dinoX + DINO_SIZE &&
            obstacle.x + OBSTACLE_WIDTH > dinoX &&
            dinoBottomY - DINO_SIZE < GROUND_Y - obstacle.height) {
          newState.isGameOver = true;
          newState.isPlaying = false;
          break;
        }
      }

      // Увеличение счета
      newState.score += 1;

      // Увеличение скорости
      if (newState.score % 100 === 0) {
        newState.gameSpeed = Math.min(newState.gameSpeed + 0.2, 8);
      }

      return newState;
    });
  }, [gameState.isPlaying, gameState.isGameOver]);

  // Обработка нажатий
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.code === 'Space') {
      e.preventDefault();
      
      if (!gameState.isPlaying && !gameState.isGameOver) {
        // Начало игры
        setGameState(prev => ({
          ...prev,
          isPlaying: true,
          isGameOver: false,
          score: 0,
          dinoY: 0,
          dinoVelocity: 0,
          obstacles: [],
          gameSpeed: 2
        }));
      } else if (gameState.isGameOver) {
        // Перезапуск игры
        setGameState(prev => ({
          ...prev,
          isPlaying: true,
          isGameOver: false,
          score: 0,
          dinoY: 0,
          dinoVelocity: 0,
          obstacles: [],
          gameSpeed: 2
        }));
      } else if (gameState.isPlaying && gameState.dinoY === 0) {
        // Прыжок
        setGameState(prev => ({
          ...prev,
          dinoVelocity: JUMP_FORCE
        }));
      }
    }
  }, [gameState]);

  // Обработка клика
  const handleClick = useCallback(() => {
    if (!gameState.isPlaying && !gameState.isGameOver) {
      setGameState(prev => ({
        ...prev,
        isPlaying: true,
        isGameOver: false,
        score: 0,
        dinoY: 0,
        dinoVelocity: 0,
        obstacles: [],
        gameSpeed: 2
      }));
    } else if (gameState.isGameOver) {
      setGameState(prev => ({
        ...prev,
        isPlaying: true,
        isGameOver: false,
        score: 0,
        dinoY: 0,
        dinoVelocity: 0,
        obstacles: [],
        gameSpeed: 2
      }));
    } else if (gameState.isPlaying && gameState.dinoY === 0) {
      setGameState(prev => ({
        ...prev,
        dinoVelocity: JUMP_FORCE
      }));
    }
  }, [gameState]);

  // Эффекты
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Установка размера canvas
    canvas.width = 400;
    canvas.height = 200;

    // Обработчики событий
    window.addEventListener('keydown', handleKeyPress);
    canvas.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      canvas.removeEventListener('click', handleClick);
    };
  }, [handleKeyPress, handleClick]);

  // Игровой цикл
  useEffect(() => {
    if (gameState.isPlaying && !gameState.isGameOver) {
      gameLoopRef.current = requestAnimationFrame(() => {
        gameLoop();
        draw();
        if (gameState.isPlaying && !gameState.isGameOver) {
          gameLoopRef.current = requestAnimationFrame(() => {
            gameLoop();
            draw();
          });
        }
      });
    } else {
      draw();
    }

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState, gameLoop, draw]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <h3 className="text-xl font-bold text-white font-chiron-heading">Alma Pixel Dino</h3>
      <div className="bg-gray-800 rounded-lg p-4">
        <canvas
          ref={canvasRef}
          className="border-2 border-gray-600 rounded cursor-pointer"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>
      <p className="text-sm text-gray-300 text-center max-w-md">
        Нажмите SPACE или кликните для прыжка. Избегайте кактусов!<br/>
        Соберите как можно больше очков.
      </p>
    </div>
  );
};

export default DinoGame;

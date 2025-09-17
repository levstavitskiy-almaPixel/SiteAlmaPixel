import React, { useRef } from 'react';
import { motion } from 'framer-motion';

interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  duration: string;
  src: string;
  cover: string;
}

interface MusicCardProps {
  track: MusicTrack;
  isPlaying: boolean;
  onPlay: (trackId: string) => void;
  onStop: () => void;
}

const MusicCard: React.FC<MusicCardProps> = ({ track, isPlaying, onPlay, onStop }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  // Останавливаем все аудио элементы при смене трека
  React.useEffect(() => {
    if (!isPlaying && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [isPlaying]);

  const handlePlay = () => {
    if (isPlaying) {
      onStop();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    } else {
      // Останавливаем все другие аудио элементы
      const allAudioElements = document.querySelectorAll('audio');
      allAudioElements.forEach(audio => {
        if (audio !== audioRef.current) {
          audio.pause();
          audio.currentTime = 0;
        }
      });
      
      onPlay(track.id);
      if (audioRef.current) {
        audioRef.current.play();
      }
    }
  };

  return (
    <div className="w-full h-full">
      <motion.div
        className="bg-gray-800 rounded-lg overflow-hidden shadow-2xl group cursor-pointer"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        onClick={handlePlay}
      >
        {/* Обложка трека */}
        <div className="relative w-full h-[180px] overflow-hidden">
          <img 
            src={track.cover} 
            alt={`${track.title} cover`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              // Fallback если изображение не загружается
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          {/* Fallback градиент */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center" style={{ display: 'none' }}>
            <div className="text-6xl text-white/80">
              {isPlaying ? '⏸️' : '🎵'}
            </div>
          </div>
          
          {/* Иконка при наведении */}
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
            {isPlaying ? (
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-black rounded-sm"></div>
              </div>
            ) : (
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <div className="w-0 h-0 border-l-[12px] border-l-black border-y-[8px] border-y-transparent ml-1"></div>
              </div>
            )}
          </div>
          
          {isPlaying && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-10">
              <div className="w-8 h-8 border-2 border-white rounded-full animate-spin"></div>
            </div>
          )}
        </div>
        
        {/* Информация о треке */}
        <div className="p-4 h-[150px] flex flex-col justify-between bg-gray-800">
          <h3 className="font-semibold text-white truncate" style={{ fontSize: '16px', lineHeight: '1.3' }}>{track.title}</h3>
          <p className="text-gray-300 truncate" style={{ fontSize: '14px', lineHeight: '1.3' }}>{track.artist}</p>
          <p className="text-gray-400" style={{ fontSize: '12px', lineHeight: '1.3' }}>{track.duration}</p>
          
          {/* Кнопка воспроизведения */}
          <div className="flex items-center justify-center">
            <button
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                isPlaying 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-green-500 hover:bg-green-600'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handlePlay();
              }}
            >
              {isPlaying ? (
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              ) : (
                <div className="w-0 h-0 border-l-[5px] border-l-white border-y-[4px] border-y-transparent ml-0.5"></div>
              )}
            </button>
          </div>
        </div>
        
        {/* Скрытый audio элемент */}
        <audio
          ref={audioRef}
          src={track.src}
          preload="metadata"
          onEnded={() => onStop()}
        />
      </motion.div>
    </div>
  );
};

export default MusicCard;

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

  const handlePlay = () => {
    if (isPlaying) {
      onStop();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    } else {
      onPlay(track.id);
      if (audioRef.current) {
        audioRef.current.play();
      }
    }
  };

  return (
    <div className="flex-shrink-0 w-80">
      <motion.div
        className="bg-gray-800 rounded-lg overflow-hidden shadow-2xl group cursor-pointer"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        onClick={handlePlay}
      >
        {/* Обложка трека */}
        <div className="relative w-full h-64 bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
          <div className="text-6xl text-white/80">
            {isPlaying ? '⏸️' : '🎵'}
          </div>
          {isPlaying && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white rounded-full animate-spin"></div>
            </div>
          )}
        </div>
        
        {/* Информация о треке */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-white mb-2 truncate">{track.title}</h3>
          <p className="text-sm text-gray-300 mb-1 truncate">{track.artist}</p>
          <p className="text-xs text-gray-400">{track.duration}</p>
          
          {/* Кнопка воспроизведения */}
          <div className="mt-4 flex items-center justify-center">
            <button
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
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
                <div className="w-0 h-0 border-l-[6px] border-l-white border-y-[4px] border-y-transparent ml-1"></div>
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

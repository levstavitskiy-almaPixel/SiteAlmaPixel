import React, { useRef } from "react";

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

const MusicCard: React.FC<MusicCardProps> = ({
  track,
  isPlaying,
  onPlay,
  onStop,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);

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
      document.querySelectorAll("audio").forEach((audio) => {
        if (audio !== audioRef.current) {
          audio.pause();
          audio.currentTime = 0;
        }
      });

      onPlay(track.id);
      audioRef.current?.play();
    }
  };

  return (
    <button
      type="button"
      onClick={handlePlay}
      className="w-full flex items-center gap-4 py-3 px-2 text-left transition-opacity hover:opacity-90"
      style={{ background: "transparent", border: "none", cursor: "pointer" }}
    >
      <span
        className="flex-shrink-0 flex items-center justify-center rounded-full"
        style={{
          width: 44,
          height: 44,
          background: isPlaying ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.18)",
          border: "1px solid rgba(255,255,255,0.35)",
        }}
        aria-hidden
      >
        {isPlaying ? (
          <span
            style={{
              width: 12,
              height: 12,
              background: "#163f4a",
              borderRadius: 2,
            }}
          />
        ) : (
          <span
            style={{
              width: 0,
              height: 0,
              marginLeft: 3,
              borderLeft: "12px solid #fff",
              borderTop: "8px solid transparent",
              borderBottom: "8px solid transparent",
            }}
          />
        )}
      </span>

      <span
        className="font-chiron-heading text-white truncate"
        style={{ fontSize: "1.15rem", letterSpacing: "0.02em" }}
      >
        {track.title}
      </span>

      <audio
        ref={audioRef}
        src={track.src}
        preload="metadata"
        onEnded={() => onStop()}
      />
    </button>
  );
};

export default MusicCard;

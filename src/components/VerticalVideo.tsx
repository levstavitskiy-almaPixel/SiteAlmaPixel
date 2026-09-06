import { useEffect, useRef, useState } from "react";

type VerticalVideoProps = {
  src?: string;
  poster?: string;
  title: string;
  placeholder: string;
  label: string;
};

function stopVideo(video: HTMLVideoElement | null) {
  if (!video) return;
  video.pause();
  video.currentTime = 0;
  video.removeAttribute("src");
  video.querySelectorAll("source").forEach((source) => source.removeAttribute("src"));
  video.load();
}

export default function VerticalVideo({
  src,
  poster,
  title,
  placeholder,
  label,
}: VerticalVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const showVideo = Boolean(src) && !failed;

  useEffect(() => {
    setFailed(false);
  }, [src]);

  useEffect(() => {
    const video = videoRef.current;
    return () => stopVideo(video);
  }, [src]);

  return (
    <figure className="phone-frame mx-auto">
      <div className="phone-notch" aria-hidden />
      <div className="phone-frame-screen">
        {showVideo ? (
          <video
            key={src}
            ref={videoRef}
            className="w-full h-full object-cover"
            width={1080}
            height={2400}
            poster={poster}
            controls
            playsInline
            loop
            muted
            preload="metadata"
            onError={() => setFailed(true)}
          >
            <source src={src} />
          </video>
        ) : (
          <div className="phone-placeholder">
            {poster ? (
              <img src={poster} alt="" className="phone-placeholder-bg" />
            ) : null}
            <div className="phone-placeholder-copy">
              <span className="phone-play" aria-hidden>
                ▶
              </span>
              <p className="font-chiron-heading">{label}</p>
              <p>{placeholder}</p>
            </div>
          </div>
        )}
      </div>
      <figcaption className="sr-only">{title}</figcaption>
    </figure>
  );
}

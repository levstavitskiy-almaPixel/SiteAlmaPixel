import { useState } from "react";
import { motion } from "framer-motion";
import MusicCard from "./MusicCard";
import MovieClipAnimation from "./MovieClipAnimation";
import WaveDivider from "./WaveDivider";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import Container from "./Container";
import { type Locale } from "../locales";

interface MusicPageProps {
  locale: Locale;
  language: "en" | "ru";
}

export default function MusicPage({ locale }: MusicPageProps) {
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);

  const handlePlayTrack = (trackId: string) => {
    document.querySelectorAll("audio").forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
    setCurrentTrack(trackId);
  };

  const handleStopTrack = () => {
    document.querySelectorAll("audio").forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
    setCurrentTrack(null);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden font-chiron-body">
      <SiteHeader variant="solid" />

      <section className="relative pt-28 pb-16 md:pt-32 md:pb-24 overflow-hidden min-h-[calc(100vh-5rem)]">
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: "url(/Grass.png)",
            backgroundSize: "auto 100%",
            backgroundRepeat: "repeat-x",
            backgroundPosition: "0 0",
            animation: "grassWave 4s ease-in-out infinite",
          }}
        />
        <div className="absolute inset-0 bg-[#163f4a]/35" />
        <WaveDivider fill="#f5f4f0" />

        <Container className="relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1
              className="font-bold font-chiron-heading section-title uppercase text-white"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.4rem)",
                textShadow: "0 3px 16px rgba(0,0,0,0.45)",
              }}
            >
              {locale.sections.music.title}
            </h1>
            <p className="mt-3 text-white/85 max-w-2xl mx-auto text-base md:text-lg">
              {locale.sections.music.description}
            </p>
          </motion.div>

          <div className="max-w-md mx-auto flex flex-col gap-1">
            {locale.musicTracks.map((track) => (
              <MusicCard
                key={track.id}
                track={track}
                isPlaying={currentTrack === track.id}
                onPlay={handlePlayTrack}
                onStop={handleStopTrack}
              />
            ))}
          </div>
        </Container>

        <Container className="relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-20 relative flex justify-center"
          >
            <div className="flex flex-row items-center justify-center">
              <div style={{ marginRight: "-200px", zIndex: 1 }}>
                <MovieClipAnimation
                  mcPath="/animations/frog_bard_mc.json"
                  texturePath="/animations/frog_bard_tex.png"
                  width={300}
                  height={350}
                  loop
                  offsetY={35}
                  animation="damage"
                />
              </div>
              <div style={{ zIndex: 2 }}>
                <MovieClipAnimation
                  mcPath="/animations/musicKar_mc.json"
                  texturePath="/animations/musicKar_tex.png"
                  width={300}
                  height={350}
                  loop
                  offsetY={20}
                  animation="idle"
                />
              </div>
              <div style={{ marginLeft: "-200px", zIndex: 1 }}>
                <MovieClipAnimation
                  mcPath="/animations/fox_Music_mc.json"
                  texturePath="/animations/fox_Music_tex.png"
                  width={300}
                  height={350}
                  loop
                  animation="music"
                />
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      <SiteFooter />
    </div>
  );
}

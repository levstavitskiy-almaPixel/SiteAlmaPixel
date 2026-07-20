import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MusicCard from "./MusicCard";
import MovieClipAnimation from "./MovieClipAnimation";
import WaveDivider from "./WaveDivider";
import { type Locale } from "../locales";

const Container = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`w-full max-w-[1100px] mx-auto px-5 sm:px-8 md:px-10 ${className}`}
  >
    {children}
  </div>
);

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
      <header className="site-header is-scrolled sticky top-0 z-50 border-b">
        <Container>
          <div className="flex h-16 md:h-20 items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 md:gap-3 transition-opacity hover:opacity-85"
            >
              <div
                className="flex items-center justify-center"
                style={{ width: 48, height: 48 }}
              >
                <img
                  src="/AlmaPixelLogo.png?v=3"
                  alt="Alma Pixel"
                  className="w-full h-full object-contain"
                  draggable={false}
                />
              </div>
              <span className="brand-name font-bold font-chiron-heading text-lg md:text-xl">
                {locale.brand}
              </span>
            </Link>

            <nav className="flex items-center gap-5 md:gap-8">
              <Link
                to="/#games"
                className="nav-link font-medium text-sm md:text-base"
              >
                {locale.nav.games}
              </Link>
              <Link
                to="/#about"
                className="nav-link font-medium text-sm md:text-base"
              >
                {locale.nav.about}
              </Link>
              <span
                className="nav-link font-medium text-sm md:text-base"
                style={{ color: "#216477" }}
              >
                {locale.sections.music.title}
              </span>
              <Link
                to="/contact"
                className="nav-link font-medium text-sm md:text-base"
              >
                {locale.nav.contact}
              </Link>
            </nav>
          </div>
        </Container>
      </header>

      <section className="relative py-16 md:py-24 overflow-hidden min-h-[calc(100vh-5rem)]">
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

      <footer className="relative py-10 panel-cream border-t border-[#216477]/15">
        <Container>
          <div className="text-center text-[#5a6f76] space-y-2">
            <p>
              © {new Date().getFullYear()} {locale.brand}.{" "}
              {locale.footer.copyright}
            </p>
            <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              <Link
                to="/privacy"
                className="text-[#216477] hover:text-[#163f4a] transition-colors underline underline-offset-4"
              >
                {locale.footer.privacyLink}
              </Link>
              <Link
                to="/privacy/almabreak"
                className="text-[#216477] hover:text-[#163f4a] transition-colors underline underline-offset-4"
              >
                {locale.footer.privacyAlmaBreak}
              </Link>
            </p>
          </div>
        </Container>
      </footer>
    </div>
  );
}

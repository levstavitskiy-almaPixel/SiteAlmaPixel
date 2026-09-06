import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import Container from "./Container";
import VerticalVideo from "./VerticalVideo";
import GameCharacterAnimation from "./GameCharacterAnimation";
import GameCard from "./GameCard";
import OwlTaleStory from "./OwlTaleStory";
import { getGame, publishedGames } from "../data/games";
import { useLanguage } from "../context/LanguageContext";

export default function GamePage() {
  const { slug } = useParams<{ slug: string }>();
  const { language, locale } = useLanguage();
  const game = getGame(slug);

  if (!game || game.hidden) {
    return <Navigate to="/" replace />;
  }

  const copy = game.copy[language];
  const others = publishedGames().filter((item) => item.slug !== game.slug).slice(0, 3);
  const storyOwl = copy.storyHook ? game.animations?.[0] : undefined;
  const heroClips = storyOwl ? [] : game.animations ?? [];

  return (
    <div className="min-h-screen w-full overflow-x-hidden font-chiron-body panel-cream">
      <SiteHeader variant="solid" />

      <section
        className="relative pt-28 pb-16 md:pt-32 md:pb-24 panel-games overflow-hidden"
        style={{ ["--game-accent" as string]: game.accent }}
      >
        <Container className="relative z-10">
          <Link
            to="/#games"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm mb-8"
          >
            ← {locale.gamePage.back}
          </Link>

          <div className={heroClips.length ? "grid lg:grid-cols-[minmax(0,1fr)_280px] gap-10 lg:gap-16 items-start" : ""}>
            <div>
              <p className="uppercase tracking-[0.2em] text-white/70 text-xs mb-3">
                {copy.statusLabel}
              </p>
              <motion.h1
                className="font-chiron-heading text-white"
                style={{ fontSize: "clamp(2.2rem, 6vw, 4.2rem)", lineHeight: 0.95 }}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                {copy.title}
              </motion.h1>
              <motion.p
                className="mt-4 text-lg md:text-xl text-white/85 max-w-xl"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                {copy.subtitle}
              </motion.p>
              {!storyOwl ? (
                <motion.p
                  className="mt-6 text-base md:text-lg leading-relaxed text-white/90 max-w-2xl"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.18 }}
                >
                  {copy.lead}
                </motion.p>
              ) : null}
              {game.store?.googlePlay ? (
                <motion.a
                  href={game.store.googlePlay}
                  target="_blank"
                  rel="noreferrer"
                  className="hero-cta mt-8 inline-flex items-center gap-3 px-6 py-3.5 text-white text-sm font-chiron-heading uppercase tracking-wider"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.26 }}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg width="18" height="20" viewBox="0 0 18 20" fill="currentColor" aria-hidden>
                    <path d="M.5 1.4v17.2c0 .8.9 1.3 1.6.9l14.6-8.6c.7-.4.7-1.4 0-1.8L2.1.5C1.4.1.5.6.5 1.4Z" />
                  </svg>
                  {locale.gamePage.playOnGoogle}
                </motion.a>
              ) : null}
            </div>

            {heroClips.length ? (
              <motion.div
                className="flex justify-center lg:justify-end"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.15 }}
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  {heroClips.map((clip) => (
                    <GameCharacterAnimation
                      key={clip.skePath ?? clip.mcPath ?? clip.texturePath}
                      clip={clip}
                    />
                  ))}
                </motion.div>
              </motion.div>
            ) : !storyOwl ? (
              <motion.div
                className="game-poster w-[240px] mx-auto lg:ml-auto"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <img
                  src={game.cover}
                  alt={copy.title}
                  className="game-cover-cutout w-full h-full object-contain"
                  draggable={false}
                />
              </motion.div>
            ) : null}
          </div>
        </Container>
      </section>

      <section className="relative py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-[minmax(0,1fr)_300px] gap-12 lg:gap-16 items-start">
            <article className="space-y-5 text-[#1a2e34] max-w-2xl">
              {storyOwl ? (
                <OwlTaleStory
                  hook={copy.storyHook}
                  lead={copy.lead}
                  body={copy.body}
                  crownSrc={game.storyBeforeImage}
                  owl={storyOwl}
                  king={game.storyAfter}
                />
              ) : (
                <>
                  {copy.body.map((paragraph) => (
                    <p key={paragraph} className="text-base md:text-lg leading-relaxed text-[#5a6f76]">
                      {paragraph}
                    </p>
                  ))}
                </>
              )}
            </article>

            <div>
              <p className="font-chiron-heading text-[#216477] uppercase tracking-[0.16em] text-xs mb-4 text-center">
                {locale.gamePage.videoLabel}
              </p>
              <VerticalVideo
                key={game.slug}
                src={game.video}
                poster={game.videoPoster ?? game.cover}
                title={copy.title}
                label={locale.gamePage.videoLabel}
                placeholder={locale.gamePage.videoPlaceholder}
              />
            </div>
          </div>
        </Container>
      </section>

      {others.length > 0 ? (
        <section className="relative pt-8 pb-24 panel-games overflow-hidden">
          <Container>
            <h2 className="font-chiron-heading text-white text-center mb-10 uppercase tracking-wide">
              {locale.gamePage.moreGames}
            </h2>
            <div className="flex flex-wrap justify-center gap-8">
              {others.map((item, index) => (
                <div key={item.slug} className="w-[220px] sm:w-[240px]">
                  <GameCard game={item} language={language} index={index} />
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <SiteFooter />
    </div>
  );
}

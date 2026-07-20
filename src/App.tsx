import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { motion } from "framer-motion";
import FlyingBirds from "./components/FlyingBirds";
import ContactPage from "./components/ContactPage";
import MusicPage from "./components/MusicPage";
import PrivacyPage from "./components/PrivacyPage";
import FreeBusincaPrivacyPage from "./components/FreeBusincaPrivacyPage";
import BlogPostPage from "./components/BlogPostPage";
import Hero from "./components/Hero";
import WaveDivider from "./components/WaveDivider";
import ScrollReveal from "./components/ScrollReveal";
import { locales, type Locale } from "./locales";

const generateGames = (locale: Locale) => {
  const games = [];
  const maxImages = 8;

  for (let i = 1; i <= maxImages; i++) {
    const titleIndex = (i - 1) % locale.gameTitles.length;
    const subtitleIndex = (i - 1) % locale.gameSubtitles.length;
    const statusIndex = (i - 1) % locale.gameStatuses.length;

    games.push({
      title: locale.gameTitles[titleIndex],
      subtitle: locale.gameSubtitles[subtitleIndex],
      src: `/shot-${i}.png`,
      alt: `${locale.gameTitles[titleIndex]} - screenshot`,
      status: locale.gameStatuses[statusIndex],
    });
  }

  return games;
};

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

const HorizontalScroll = ({ children }: { children: React.ReactNode }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const lastMoveTime = useRef(0);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollLeft = 0;
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    scrollRef.current.style.cursor = "grabbing";
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    if (scrollRef.current) scrollRef.current.style.cursor = "grab";
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (scrollRef.current) scrollRef.current.style.cursor = "grab";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const now = Date.now();
    if (now - lastMoveTime.current < 16) return;
    lastMoveTime.current = now;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = scrollLeft - (x - startX) * 1.2;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const now = Date.now();
    if (now - lastMoveTime.current < 16) return;
    lastMoveTime.current = now;
    e.preventDefault();
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = scrollLeft - (x - startX) * 1.2;
  };

  return (
    <div className="relative h-[560px] md:h-[600px] w-full max-w-full px-4 sm:px-8 md:px-16 lg:px-24">
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto overflow-y-hidden pb-4 games-scroll cursor-grab select-none h-full w-full"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => setIsDragging(false)}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          scrollBehavior: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {children}
      </div>
      <div className="absolute left-0 top-0 bottom-4 w-8 md:w-16 bg-gradient-to-r from-[#216477] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-4 w-8 md:w-16 bg-gradient-to-l from-[#216477] to-transparent pointer-events-none" />
    </div>
  );
};

const GameCard = ({ game, index }: { game: any; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.65, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    className="game-card group cursor-pointer w-full h-full flex flex-col rounded-xl overflow-hidden"
    style={{ backgroundColor: "#163f4a" }}
  >
    <div className="relative flex-1 overflow-hidden">
      <img
        src={game.src}
        alt={game.alt}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />
    </div>

    <div
      className="px-4 py-3 flex flex-col justify-center items-center text-center"
      style={{ height: 110, backgroundColor: "#163f4a" }}
    >
      <h3 className="text-sm font-semibold text-white font-chiron-heading mb-1 leading-tight">
        {game.title}
      </h3>
      <p className="text-xs text-white/70 mb-2 leading-tight">{game.subtitle}</p>
      <span className="text-xs font-medium" style={{ color: "#e8c56a" }}>
        {game.status}
      </span>
    </div>
  </motion.div>
);

function HomePage() {
  const [language, setLanguage] = useState<"en" | "ru">("en");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const locale = locales[language];

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden font-chiron-body panel-cream">
      {/* Header overlays hero */}
      <header
        className={`site-header fixed top-0 left-0 right-0 z-50 border-b ${
          scrolled ? "is-scrolled" : "is-top"
        }`}
      >
        <Container>
          <div className="flex h-16 md:h-20 items-center justify-between">
            <a
              href="/"
              className="flex items-center gap-2 md:gap-3 transition-opacity hover:opacity-85"
              aria-label={locale.brand}
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
              <span className="brand-name hidden sm:block font-bold font-chiron-heading text-lg md:text-xl">
                {locale.brand}
              </span>
            </a>

            <nav className="hidden md:flex items-center gap-7 lg:gap-9">
              <a href="#games" className="nav-link font-medium text-sm lg:text-base">
                {locale.nav.games}
              </a>
              <a href="#about" className="nav-link font-medium text-sm lg:text-base">
                {locale.nav.about}
              </a>
              <Link
                to="/music"
                className="nav-link font-medium text-sm lg:text-base"
              >
                {locale.sections.music.title}
              </Link>
              <Link
                to="/contact"
                className="nav-link font-medium text-sm lg:text-base"
              >
                {locale.nav.contact}
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <div
                className="lang-switch-wrap flex gap-1 rounded-lg p-1"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                <button
                  onClick={() => setLanguage("en")}
                  className={`lang-switch px-3 py-1 rounded-md text-sm font-medium ${
                    language === "en"
                      ? scrolled
                        ? "bg-white shadow-sm"
                        : "bg-white/90"
                      : ""
                  }`}
                  style={{
                    color:
                      language === "en"
                        ? "#216477"
                        : scrolled
                          ? "#5a6f76"
                          : "rgba(255,255,255,0.85)",
                  }}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage("ru")}
                  className={`lang-switch px-3 py-1 rounded-md text-sm font-medium ${
                    language === "ru"
                      ? scrolled
                        ? "bg-white shadow-sm"
                        : "bg-white/90"
                      : ""
                  }`}
                  style={{
                    color:
                      language === "ru"
                        ? "#216477"
                        : scrolled
                          ? "#5a6f76"
                          : "rgba(255,255,255,0.85)",
                  }}
                >
                  RU
                </button>
              </div>

              <button
                className={`md:hidden p-2 transition-colors ${
                  scrolled ? "text-[#216477]" : "text-white"
                }`}
                aria-label="Menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {menuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile nav */}
          <motion.div
            initial={false}
            animate={{
              height: menuOpen ? "auto" : 0,
              opacity: menuOpen ? 1 : 0,
            }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-3 pb-4 pt-1">
              {[
                { href: "#games", label: locale.nav.games },
                { href: "#about", label: locale.nav.about },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="nav-link font-medium py-1"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Link
                to="/music"
                className="nav-link font-medium py-1"
                onClick={() => setMenuOpen(false)}
              >
                {locale.sections.music.title}
              </Link>
              <Link
                to="/contact"
                className="nav-link font-medium py-1"
                onClick={() => setMenuOpen(false)}
              >
                {locale.nav.contact}
              </Link>
            </div>
          </motion.div>
        </Container>
      </header>

      {/* Hero — Massive Monster style full-bleed */}
      <Hero
        brand={locale.brand}
        tagline={locale.tagline}
        description={locale.description}
        ctaLabel={locale.heroCta}
        ctaHref="#games"
      />

      {/* About intro on cream */}
      <section id="about" className="relative py-20 md:py-28 panel-cream">
        <Container>
          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <p className="font-chiron-heading uppercase tracking-[0.18em] text-[#216477]/text-sm mb-4">
              {locale.sections.about.title}
            </p>
            <h2
              className="font-chiron-heading section-title text-[#1a2e34] mb-6"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
            >
              {locale.sections.about.description1}
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-[#5a6f76]">
              {locale.sections.about.description2}
            </p>
            <motion.a
              href="#games"
              className="hero-cta mt-10 inline-flex items-center justify-center px-8 py-3.5 font-chiron-heading uppercase tracking-wider text-white text-sm"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {locale.heroCta}
            </motion.a>
          </ScrollReveal>
        </Container>
      </section>

      {/* Games */}
      <section id="games" className="relative pt-24 pb-32 min-h-[720px] panel-teal overflow-hidden">
        <WaveDivider fill="#f5f4f0" flip />

        <Container className="relative z-10">
          <ScrollReveal className="text-center mb-10">
            <h2
              className="font-bold font-chiron-heading section-title uppercase text-white"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.4rem)",
                textShadow: "0 3px 16px rgba(0,0,0,0.35)",
              }}
            >
              {locale.sections.games.title}
            </h2>
            <p className="mt-3 text-white/80 max-w-xl mx-auto text-base md:text-lg">
              {locale.sections.games.description}
            </p>
          </ScrollReveal>
        </Container>

        <div className="relative z-10 mt-4">
          <HorizontalScroll>
            {generateGames(locale).map((game, i) => (
              <div key={i} className="flex-shrink-0 w-[300px] sm:w-[340px] h-[540px] md:h-[560px]">
                <GameCard game={game} index={i} />
              </div>
            ))}
          </HorizontalScroll>
        </div>

        <WaveDivider fill="#f5f4f0" />
      </section>

      {/* Footer */}
      <footer className="relative py-14 panel-cream border-t border-[#216477]/15">
        <Container>
          <ScrollReveal className="text-center text-[#5a6f76] space-y-3">
            <p className="font-chiron-heading text-[#216477] text-lg">
              {locale.brand}
            </p>
            <p>
              © {new Date().getFullYear()} {locale.brand}. {locale.footer.copyright}
            </p>
            <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              <Link
                to="/privacy"
                className="text-[#216477] hover:text-[#163f4a] transition-colors underline underline-offset-4"
              >
                {locale.footer.privacyLink}
              </Link>
              <Link
                to="/privacy/freebusinca"
                className="text-[#216477] hover:text-[#163f4a] transition-colors underline underline-offset-4"
              >
                {locale.footer.privacyFreeBusinca}
              </Link>
            </p>
          </ScrollReveal>
        </Container>
      </footer>
    </div>
  );
}

function App() {
  const [language] = useState<"en" | "ru">("en");
  const locale = locales[language];

  return (
    <BrowserRouter>
      <FlyingBirds />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/music"
          element={<MusicPage locale={locale} language={language} />}
        />
        <Route
          path="/contact"
          element={
            <div className="min-h-screen w-full overflow-x-hidden font-chiron-body panel-cream">
              <ContactPage locale={locale} language={language} />
            </div>
          }
        />
        <Route
          path="/privacy"
          element={
            <div className="min-h-screen w-full overflow-x-hidden font-chiron-body panel-cream">
              <PrivacyPage locale={locale} language={language} />
            </div>
          }
        />
        <Route
          path="/privacy/freebusinca"
          element={
            <div className="min-h-screen w-full overflow-x-hidden font-chiron-body panel-cream">
              <FreeBusincaPrivacyPage language={language} />
            </div>
          }
        />
        <Route
          path="/blog/:slug"
          element={<BlogPostPage locale={locale} language={language} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

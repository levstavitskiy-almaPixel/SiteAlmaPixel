import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import FlyingBirds from "./components/FlyingBirds";
import ContactPage from "./components/ContactPage";
import MusicPage from "./components/MusicPage";
import PrivacyPage from "./components/PrivacyPage";
import AlmaBreakPrivacyPage from "./components/AlmaBreakPrivacyPage";
import BlogPostPage from "./components/BlogPostPage";
import Hero from "./components/Hero";
import WaveDivider from "./components/WaveDivider";
import ScrollReveal from "./components/ScrollReveal";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import Container from "./components/Container";
import GameCard from "./components/GameCard";
import GamePage from "./components/GamePage";
import NewsPage, { NewsPreview } from "./components/NewsPage";
import SocialLinks from "./components/SocialLinks";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import { publishedGames } from "./data/games";
import { STUDIO } from "./data/studio";

function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      });
      return;
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  return null;
}

function HomePage() {
  const { language, locale } = useLanguage();
  const games = publishedGames();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden font-chiron-body panel-cream">
      <SiteHeader variant="overlay" />

      <Hero
        brand={locale.brand}
        tagline={locale.tagline}
        description={locale.description}
        ctaLabel={locale.heroCta}
        ctaHref="#games"
      />

      <section id="about" className="relative py-20 md:py-28 panel-cream">
        <Container>
          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <p className="font-chiron-heading uppercase tracking-[0.18em] text-[#216477] text-sm mb-4">
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
            <p className="mt-5 text-base md:text-lg leading-relaxed text-[#1a2e34]">
              {locale.sections.about.collaboration}{" "}
              <a
                href={`mailto:${STUDIO.email}`}
                className="text-[#216477] underline underline-offset-4"
              >
                {STUDIO.email}
              </a>
              .
            </p>
            <div className="mt-8 flex justify-center">
              <SocialLinks />
            </div>
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

      <section id="games" className="relative pt-24 pb-28 panel-games overflow-hidden">
        <WaveDivider fill="#f5f4f0" flip />

        <Container className="relative z-10">
          <ScrollReveal className="text-center mb-12">
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

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 justify-items-center">
            {games.map((game, index) => (
              <div key={game.slug} className="w-full max-w-[230px]">
                <GameCard game={game} language={language} index={index} />
              </div>
            ))}
          </div>
        </Container>

        <WaveDivider fill="#f5f4f0" />
      </section>

      <NewsPreview />

      <SiteFooter />
    </div>
  );
}

function InnerPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full overflow-x-hidden font-chiron-body panel-cream">
      <SiteHeader variant="solid" />
      <div className="pt-20">{children}</div>
      <SiteFooter />
    </div>
  );
}

function AppRoutes() {
  const { locale, language } = useLanguage();

  return (
    <>
      <ScrollToHash />
      <FlyingBirds />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/games/:slug" element={<GamePage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/music" element={<MusicPage locale={locale} language={language} />} />
        <Route
          path="/contact"
          element={
            <InnerPage>
              <ContactPage locale={locale} language={language} />
            </InnerPage>
          }
        />
        <Route
          path="/privacy"
          element={
            <InnerPage>
              <PrivacyPage locale={locale} language={language} />
            </InnerPage>
          }
        />
        <Route
          path="/privacy/almabreak"
          element={
            <InnerPage>
              <AlmaBreakPrivacyPage language={language} />
            </InnerPage>
          }
        />
        <Route path="/privacy/freebusinca" element={<Navigate to="/privacy/almabreak" replace />} />
        <Route
          path="/blog/:slug"
          element={
            <InnerPage>
              <BlogPostPage locale={locale} language={language} />
            </InnerPage>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;

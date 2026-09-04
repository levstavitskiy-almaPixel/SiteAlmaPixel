import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Container from "./Container";
import SocialLinks from "./SocialLinks";
import { useLanguage } from "../context/LanguageContext";
import { STUDIO } from "../data/studio";

type SiteHeaderProps = {
  variant?: "overlay" | "solid";
};

export default function SiteHeader({ variant = "solid" }: SiteHeaderProps) {
  const { language, setLanguage, locale } = useLanguage();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(variant === "solid");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (variant === "solid") {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const headerClass =
    variant === "solid" || scrolled ? "is-scrolled" : "is-top";

  const nav = [
    { to: "/#games", label: locale.nav.games },
    { to: "/news", label: locale.nav.news },
    { to: "/#about", label: locale.nav.about },
    { to: "/music", label: locale.sections.music.title },
    { to: "/contact", label: locale.nav.contact },
  ];

  const langBtn = (code: "en" | "ru") => (
    <button
      onClick={() => setLanguage(code)}
      className={`lang-switch px-3 py-1 rounded-md text-sm font-medium ${
        language === code ? (scrolled || variant === "solid" ? "bg-white shadow-sm" : "bg-white/90") : ""
      }`}
      style={{
        color:
          language === code
            ? "#216477"
            : scrolled || variant === "solid"
              ? "#5a6f76"
              : "rgba(255,255,255,0.85)",
      }}
    >
      {code.toUpperCase()}
    </button>
  );

  return (
    <header
      className={`site-header fixed top-0 left-0 right-0 z-50 border-b ${headerClass}`}
    >
      <Container>
        <div className="flex h-16 md:h-20 items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 md:gap-3 transition-opacity hover:opacity-85"
            aria-label={locale.brand}
          >
            <div className="flex items-center justify-center" style={{ width: 48, height: 48 }}>
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
          </Link>

          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="nav-link font-medium text-sm xl:text-base"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={`mailto:${STUDIO.email}`}
              className="header-email hidden lg:inline text-sm font-medium whitespace-nowrap"
            >
              {STUDIO.email}
            </a>
            <SocialLinks compact iconClass="w-4 h-4" />
            <div
              className="lang-switch-wrap flex gap-1 rounded-lg p-1"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              {langBtn("en")}
              {langBtn("ru")}
            </div>

            <button
              className={`lg:hidden p-2 transition-colors ${
                scrolled || variant === "solid" ? "text-[#216477]" : "text-white"
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

        <motion.div
          initial={false}
          animate={{ height: menuOpen ? "auto" : 0, opacity: menuOpen ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="lg:hidden overflow-hidden"
        >
          <div className="flex flex-col gap-3 pb-4 pt-1">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="nav-link font-medium py-1"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`mailto:${STUDIO.email}`}
              className="nav-link font-medium py-1"
              onClick={() => setMenuOpen(false)}
            >
              {STUDIO.email}
            </a>
            <SocialLinks compact iconClass="w-4 h-4" className="pt-1" />
          </div>
        </motion.div>
      </Container>
    </header>
  );
}

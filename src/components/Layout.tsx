import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { type Locale } from "../locales";

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-[200px] xl:px-[200px]">{children}</div>
);

interface LayoutProps {
  children: React.ReactNode;
  locale: Locale;
  dark: boolean;
  setDark: (dark: boolean) => void;
  language: 'en' | 'ru';
  setLanguage: (lang: 'en' | 'ru') => void;
}

const IconSun = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const IconMoon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" />
  </svg>
);

export default function Layout({ children, locale, dark, setDark, language, setLanguage }: LayoutProps) {
  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen text-white" style={{ backgroundColor: '#edc77b', fontFamily: 'KosugiMaru, sans-serif' }}>
        {/* Header */}
        <header className="sticky top-0 z-40 backdrop-blur-sm bg-black/80 border-b border-gray-800">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Container>
              <div className="flex h-[326px] items-start justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative z-10 pt-2">
                <Link to="/" className="flex items-center gap-3">
                  <div className="w-[110px] h-[110px] flex items-center justify-center">
                    <img 
                      src="/AlmaPixelLogo.png?v=3" 
                      alt="Alma Pixel Logo" 
                      className="w-full h-full object-contain"
                      draggable={false}
                      onDragStart={(e) => e.preventDefault()}
                    />
                  </div>
                  <div>
                    <h1 className="font-bold font-chiron-heading" style={{ fontSize: '40px', color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>{locale.brand}</h1>
                    <p className="text-sm -mt-1" style={{ color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>{locale.tagline}</p>
                  </div>
                </Link>
                
                <nav className="hidden md:flex items-center gap-8">
                  <Link to="/#games" className="text-gray-300 hover:text-amber-400 transition-colors">{locale.nav.games}</Link>
                  <Link to="/#about" className="text-gray-300 hover:text-amber-400 transition-colors">{locale.nav.about}</Link>
                  <Link to="/music" className="text-gray-300 hover:text-amber-400 transition-colors">{locale.sections.music.title}</Link>
                  <Link to="/contact" className="text-gray-300 hover:text-amber-400 transition-colors">{locale.nav.contact}</Link>
                  <Link to="/privacy" className="text-gray-300 hover:text-amber-400 transition-colors">{locale.nav.privacy}</Link>
                </nav>

                <div className="flex items-center gap-2" style={{ position: 'absolute', right: '10px', top: '10px' }}>
                  {/* Language Switcher */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setLanguage('en')}
                      className={`px-3 py-1 rounded text-sm transition-colors ${
                        language === 'en' 
                          ? 'bg-amber-500 text-white' 
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      EN
                    </button>
                    <button
                      onClick={() => setLanguage('ru')}
                      className={`px-3 py-1 rounded text-sm transition-colors ${
                        language === 'ru' 
                          ? 'bg-amber-500 text-white' 
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      RU
                    </button>
                  </div>
                  
                  {/* Theme Toggle */}
                  <button
                    onClick={() => setDark(!dark)}
                    className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                    aria-label="Toggle theme"
                  >
                    {dark ? <IconSun /> : <IconMoon />}
                  </button>
                </div>
              </div>
            </Container>
          </motion.div>
        </header>

        {/* Main Content */}
        {children}

        {/* Footer */}
        <footer className="py-12 border-t border-gray-800">
          <Container>
            <div className="text-center text-gray-400 space-y-2">
              <p>© {new Date().getFullYear()} {locale.brand}. {locale.footer.copyright}</p>
              <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                <Link to="/privacy" className="text-amber-400 hover:text-amber-300 transition-colors underline">
                  {locale.footer.privacyLink}
                </Link>
                <Link to="/privacy/almabreak" className="text-amber-400 hover:text-amber-300 transition-colors underline">
                  {locale.footer.privacyAlmaBreak}
                </Link>
              </p>
            </div>
          </Container>
        </footer>
      </div>
    </div>
  );
}

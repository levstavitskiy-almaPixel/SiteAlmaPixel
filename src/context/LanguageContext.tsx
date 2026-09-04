import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { locales, type Locale } from "../locales";

export type Language = "en" | "ru";

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  locale: Locale;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "alma-pixel-lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "ru") {
        setLanguageState(saved);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      locale: locales[language],
    }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}

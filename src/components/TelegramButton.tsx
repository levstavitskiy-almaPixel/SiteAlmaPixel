import { motion } from "framer-motion";
import { STUDIO } from "../data/studio";
import { useLanguage } from "../context/LanguageContext";

type TelegramButtonProps = {
  compact?: boolean;
  className?: string;
};

export default function TelegramButton({
  compact = false,
  className = "",
}: TelegramButtonProps) {
  const { locale } = useLanguage();

  return (
    <motion.a
      href={STUDIO.socials.telegramGroup}
      target="_blank"
      rel="noreferrer"
      aria-label={locale.telegramCta}
      className={`telegram-btn ${compact ? "telegram-btn--compact" : ""} ${className}`.trim()}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="telegram-btn__shine" aria-hidden />
      <svg
        className={compact ? "w-4 h-4" : "w-5 h-5"}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
      >
        <path d="M21.5 4.4 18.7 20c-.2 1-1.2 1.4-2 .9l-5-3.8-2.6 2.5c-.3.3-.8.1-.9-.3l-.6-5.3L3 11.4c-1-.3-.9-1.7.2-2l17.2-5.3c1-.3 1.9.6 1.1 2.3Z" />
      </svg>
      <span className="telegram-btn__label">{locale.telegramCta}</span>
    </motion.a>
  );
}

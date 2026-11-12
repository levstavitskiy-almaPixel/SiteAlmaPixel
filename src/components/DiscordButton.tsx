import { motion } from "framer-motion";
import { STUDIO } from "../data/studio";
import { useLanguage } from "../context/LanguageContext";

type DiscordButtonProps = {
  compact?: boolean;
  className?: string;
};

const SPARKLES = [
  { top: "18%", left: "12%", delay: "0s", size: 7 },
  { top: "28%", right: "14%", delay: "0.45s", size: 5 },
  { top: "62%", left: "22%", delay: "0.9s", size: 4 },
  { top: "70%", right: "18%", delay: "1.2s", size: 6 },
  { top: "42%", left: "48%", delay: "0.25s", size: 3 },
];

export default function DiscordButton({
  compact = false,
  className = "",
}: DiscordButtonProps) {
  const { locale } = useLanguage();

  return (
    <motion.a
      href={STUDIO.socials.discord}
      target="_blank"
      rel="noreferrer"
      aria-label={locale.discordCta}
      className={`discord-btn ${compact ? "discord-btn--compact" : ""} ${className}`.trim()}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="discord-btn__shine" aria-hidden />
      <span className="discord-btn__glitter" aria-hidden />
      {SPARKLES.map((sparkle, index) => (
        <span
          key={index}
          className="discord-btn__sparkle"
          aria-hidden
          style={{
            top: sparkle.top,
            left: sparkle.left,
            right: sparkle.right,
            width: sparkle.size,
            height: sparkle.size,
            animationDelay: sparkle.delay,
          }}
        />
      ))}
      <svg
        className={compact ? "w-4 h-4" : "w-5 h-5"}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
      >
        <path d="M20.317 4.37a19.8 19.8 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03ZM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z" />
      </svg>
      <span className="discord-btn__label">{locale.discordCta}</span>
    </motion.a>
  );
}

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Game } from "../data/games";
import type { Language } from "../context/LanguageContext";
import { useLanguage } from "../context/LanguageContext";

export default function GameCard({
  game,
  language,
  index,
}: {
  game: Game;
  language: Language;
  index: number;
}) {
  const copy = game.copy[language];
  const { locale } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      <Link
        to={`/games/${game.slug}`}
        className="game-card group block w-full"
        style={{ ["--game-accent" as string]: game.accent }}
      >
        <div className="relative overflow-visible">
          <div className="game-poster">
            <img
              src={game.cover}
              alt={copy.title}
              className="w-full h-full object-contain"
              draggable={false}
            />
          </div>
        </div>
        <div className="mt-4 text-center px-2">
          <h3 className="font-chiron-heading text-white text-lg leading-tight">
            {copy.title}
          </h3>
          <p className="mt-1 text-sm text-white/75 leading-snug">{copy.subtitle}</p>
          <span
            className={`inline-block mt-2 text-xs font-medium tracking-wide uppercase ${
              game.status === "released" ? "game-status-released" : ""
            }`}
            style={game.status === "released" ? undefined : { color: "#e8c56a" }}
          >
            {copy.statusLabel}
          </span>
        </div>
      </Link>
      {game.store?.googlePlay ? (
        <a
          href={game.store.googlePlay}
          target="_blank"
          rel="noreferrer"
          className="mt-3 mx-auto flex items-center justify-center gap-2 text-xs font-chiron-heading uppercase tracking-wider text-white/90 hover:text-white"
        >
          {locale.gamePage.playOnGoogle}
        </a>
      ) : null}
    </motion.div>
  );
}

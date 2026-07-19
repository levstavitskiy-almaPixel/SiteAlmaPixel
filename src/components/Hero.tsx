import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import WaveDivider from "./WaveDivider";
import MovieClipAnimation from "./MovieClipAnimation";

type HeroProps = {
  brand: string;
  tagline: string;
  description: string;
  ctaLabel: string;
  ctaHref?: string;
};

const fillParent: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};

export default function Hero({
  brand,
  tagline,
  description,
  ctaLabel,
  ctaHref = "#games",
}: HeroProps) {
  const { scrollY } = useScroll();
  const cloudY = useTransform(scrollY, [0, 500], [0, 60]);
  const contentY = useTransform(scrollY, [0, 400], [0, 60]);
  const contentOpacity = useTransform(scrollY, [0, 320], [1, 0]);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <section
      className="hero"
      style={{
        position: "relative",
        minHeight: "100svh",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        className="hero-sky"
        style={{
          ...fillParent,
          background:
            "radial-gradient(ellipse 120% 80% at 50% 0%, #7eb8c9 0%, transparent 55%), linear-gradient(180deg, #5aa8bc 0%, #2f7f94 42%, #216477 78%, #1a5260 100%)",
        }}
      />

      <div
        className="hero-hills"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "45%",
          pointerEvents: "none",
          background:
            "linear-gradient(180deg, transparent 0%, rgba(22, 63, 74, 0.35) 40%, rgba(22, 63, 74, 0.75) 100%)",
        }}
      />

      <motion.div
        style={{
          ...fillParent,
          pointerEvents: "none",
          opacity: 0.7,
          overflow: "hidden",
          ...(reduceMotion ? {} : { y: cloudY }),
        }}
      >
        <div
          className={reduceMotion ? undefined : "cloud-ribbon"}
          style={{
            position: "absolute",
            top: "22%",
            left: 0,
            display: "flex",
            height: "42%",
            width: "max-content",
          }}
        >
          {[0, 1, 2].map((i) => (
            <img
              key={i}
              src="/Cloud.png"
              alt=""
              aria-hidden={i > 0}
              draggable={false}
              style={{
                height: "100%",
                width: "auto",
                display: "block",
                flexShrink: 0,
              }}
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        style={{
          position: "relative",
          zIndex: 10,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "6rem 1.5rem 8rem",
          color: "#fff",
          ...(reduceMotion ? {} : { y: contentY, opacity: contentOpacity }),
        }}
      >
        <motion.div
          aria-hidden
          style={{
            width: 280,
            height: 280,
            marginBottom: 12,
            filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.25))",
          }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <MovieClipAnimation
            mcPath="/animations/Yabloko_mc.json"
            texturePath="/animations/Yabloko_tex.png"
            width={280}
            height={280}
            scale={0.72}
            loop
            animation="animtion0"
          />
        </motion.div>

        <motion.h1
          className="font-chiron-heading"
          style={{
            fontSize: "clamp(2.75rem, 8vw, 5.5rem)",
            textShadow: "0 4px 24px rgba(0,40,50,0.35)",
            color: "#fff",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            margin: 0,
          }}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {brand}
        </motion.h1>

        <motion.p
          className="font-chiron-heading"
          style={{
            marginTop: 12,
            fontSize: "clamp(0.85rem, 2vw, 1.1rem)",
            color: "rgba(255,255,255,0.92)",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          {tagline}
        </motion.p>

        <motion.p
          className="font-chiron-body"
          style={{
            marginTop: 24,
            maxWidth: 560,
            fontSize: "clamp(1rem, 2vw, 1.125rem)",
            lineHeight: 1.65,
            color: "rgba(255,255,255,0.88)",
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          {description}
        </motion.p>

        <motion.a
          href={ctaHref}
          className="hero-cta font-chiron-heading"
          style={{
            marginTop: 40,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "14px 32px",
            color: "#fff",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            fontSize: "0.95rem",
            textDecoration: "none",
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          {ctaLabel}
        </motion.a>
      </motion.div>

      <WaveDivider fill="#f5f4f0" />
    </section>
  );
}

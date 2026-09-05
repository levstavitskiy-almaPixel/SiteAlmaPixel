import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type HeroProps = {
  brand: string;
  tagline: string;
  description: string;
};

export default function Hero({
  brand,
  tagline,
  description,
}: HeroProps) {
  const { scrollY } = useScroll();
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
      className="hero panel-sky"
      style={{
        position: "relative",
        minHeight: "100svh",
        width: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <motion.div
        style={{
          position: "relative",
          zIndex: 10,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          textAlign: "center",
          padding: "7.5rem 1.5rem 0",
          color: "var(--alma-ink)",
          ...(reduceMotion ? {} : { y: contentY, opacity: contentOpacity }),
        }}
      >
        <motion.h1
          className="font-chiron-heading"
          style={{
            fontSize: "clamp(2.75rem, 8vw, 5.5rem)",
            color: "var(--alma-teal-deep)",
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
            color: "var(--alma-teal)",
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
            color: "var(--alma-muted)",
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          {description}
        </motion.p>
      </motion.div>
    </section>
  );
}

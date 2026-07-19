import React from "react";
import { motion, type Variants } from "framer-motion";

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
};

const variants: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0 },
};

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  y = 36,
  once = true,
}: ScrollRevealProps) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      transition={{
        duration: 0.75,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      custom={y}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}

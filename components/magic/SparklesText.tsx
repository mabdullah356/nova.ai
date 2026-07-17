"use client";

import { motion } from "framer-motion";

interface SparklesTextProps {
  text: string;
  className?: string;
}

export function SparklesText({ text, className }: SparklesTextProps) {
  const letters = text.split("");

  return (
    <span className={className}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.03, duration: 0.4 }}
          whileHover={{ scale: 1.3, color: "#7c3aed", transition: { duration: 0.15 } }}
          className="inline-block cursor-default"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
}

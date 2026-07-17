"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function BlurText({ text, className, delay = 0 }: BlurTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.span
      ref={ref}
      initial={{ filter: "blur(12px)", opacity: 0, y: 16 }}
      animate={
        inView
          ? { filter: "blur(0px)", opacity: 1, y: 0 }
          : { filter: "blur(12px)", opacity: 0, y: 16 }
      }
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {text}
    </motion.span>
  );
}

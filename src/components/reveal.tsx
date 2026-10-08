"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const hidden = reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 };
  const visible = { opacity: 1, y: 0 };

  return (
    <motion.div
      className={"reveal " + className}
      initial={hidden}
      whileInView={visible}
      viewport={{ once: false, amount: 0.14, margin: "-5% 0px -8% 0px" }}
      transition={{
        duration: reduceMotion ? 0 : 0.55,
        delay: reduceMotion ? 0 : Math.min(delay, 0.16),
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

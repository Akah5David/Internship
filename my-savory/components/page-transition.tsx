"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  Easing,
} from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  const ease: Easing = [0.22, 1, 0.36, 1]; // type annotation
  const transition = { duration: reduce ? 0 : 0.5, ease };

  return (
    <AnimatePresence mode="wait" initial>
      <motion.div
        key={pathname}
        layout
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12, scale: 0.992 }}
        transition={transition}
        style={{ willChange: "opacity, transform" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

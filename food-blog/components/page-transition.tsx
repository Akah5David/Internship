"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const reduce = useReducedMotion()

  const transition = { duration: reduce ? 0 : 0.45, ease: "easeInOut" }

  return (
    <AnimatePresence mode="wait" initial>
      <motion.div
        key={pathname}
        layout
        initial={{ opacity: 0, y: 16, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.995 }}
        transition={transition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

"use client";

import { motion } from "framer-motion";
import { DUR_FAST, EASE_OUT_EXPO } from "@/lib/motion";

export function PageMotion({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DUR_FAST, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.div>
  );
}

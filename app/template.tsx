"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(10px)", scale: 0.98 }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
      exit={{ opacity: 0, y: 20, filter: "blur(10px)", scale: 0.98 }}
      transition={{ type: "spring", stiffness: 200, damping: 20, mass: 1 }}
      className="w-full min-h-screen"
    >
      {children}
    </motion.div>
  );
}

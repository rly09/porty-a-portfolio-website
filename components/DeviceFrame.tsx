"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import { useDevice } from "./DeviceContext";
import { cn } from "@/lib/utils";

const deviceStyles = {
  mobile: {
    width: 280,
    height: 520,
    borderRadius: 36,
    innerBorderRadius: 28,
    padding: 10,
  },
  tablet: {
    width: 440,
    height: 520,
    borderRadius: 24,
    innerBorderRadius: 16,
    padding: 14,
  },
  desktop: {
    width: 800,
    height: 480,
    borderRadius: 16,
    innerBorderRadius: 8,
    padding: 24,
  },
};

export function DeviceFrame({ children }: { children: ReactNode }) {
  const { device } = useDevice();
  const currentStyle = deviceStyles[device];
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (typeof window === "undefined") return;
      const maxWidth = window.innerWidth - 32;
      const maxHeight = window.innerHeight - 220;
      const scaleX = maxWidth / currentStyle.width;
      const scaleY = maxHeight / currentStyle.height;
      setScale(Math.min(1, scaleX, scaleY));
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [currentStyle.width, currentStyle.height]);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-full relative py-8">
      {/* Container that allows hardware buttons to overflow without being clipped by the corner-fix */}
      <motion.div
        animate={{
          width: currentStyle.width,
          height: currentStyle.height,
          scale: scale,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25, mass: 1 }}
        className="relative flex items-center justify-center"
      >
        {/* Hardware Buttons - OUTSIDE the clipped area */}
        <AnimatePresence>
          {device !== "desktop" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none"
            >
              <div className="absolute -right-[4px] md:-right-[6px] top-24 w-1 md:w-1.5 h-12 md:h-16 bg-mono-300 dark:bg-[#333] rounded-r-md" />
              <div className="absolute -left-[4px] md:-left-[6px] top-20 w-1 md:w-1.5 h-10 md:h-12 bg-mono-300 dark:bg-[#333] rounded-l-md" />
              <div className="absolute -left-[4px] md:-left-[6px] top-36 w-1 md:w-1.5 h-10 md:h-12 bg-mono-300 dark:bg-[#333] rounded-l-md" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Frame with Clean Rounded Corners */}
        <motion.div
          animate={{
            borderRadius: currentStyle.borderRadius,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 25, mass: 1 }}
          style={{ willChange: "border-radius" }}
          className={cn(
            "w-full h-full relative overflow-hidden bg-white dark:bg-black",
            "border-[2px] md:border-[3px] border-mono-300 dark:border-[#333] shadow-inner",
            "shadow-2xl shadow-black/20 dark:shadow-black/70 flex flex-col"
          )}
        >
          {/* Camera Dot */}
          {device !== "mobile" && (
            <div className="absolute top-1.5 md:top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#0a0a0a] ring-1 ring-white/10 z-50" />
          )}

          {/* Actual Screen Viewport */}
          <motion.div 
            animate={{
              borderRadius: currentStyle.innerBorderRadius,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 25, mass: 1 }}
            className={cn(
              "absolute overflow-hidden bg-mono-50 dark:bg-[#0f0f0f] flex flex-col",
              device === "mobile" ? "inset-2 md:inset-2.5" : "inset-2.5 md:inset-3"
            )}
          >
            {/* Subtle Screen Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 dark:from-transparent dark:via-white/0 dark:to-white/5 pointer-events-none z-50" />

            {/* Dynamic Island / Notch (Mobile only) */}
            {device === "mobile" && (
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-50 flex justify-end items-center px-2 shadow-sm shadow-black/50">
                <div className="w-2.5 h-2.5 rounded-full bg-[#1a1a1a] ring-1 ring-white/5" />
              </div>
            )}

            {/* Desktop Window Controls */}
            {device === "desktop" && (
              <div className="absolute top-0 left-0 w-full h-8 bg-mono-200/50 dark:bg-white/5 border-b border-black/5 dark:border-white/5 z-40 flex items-center px-4 gap-1.5 backdrop-blur-md">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/80 dark:bg-white/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80 dark:bg-white/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/80 dark:bg-white/20" />
              </div>
            )}

            {/* Screen Content Wrapper */}
            <div 
              className={cn(
                "relative z-10 w-full h-full flex flex-col",
                device === "desktop" ? "pt-10" : device === "mobile" ? "pt-10" : "pt-4"
              )}
              style={{ 
                paddingLeft: currentStyle.padding, 
                paddingRight: currentStyle.padding, 
                paddingBottom: currentStyle.padding 
              }}
            >
              {children}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Desktop Monitor Stand */}
      <AnimatePresence>
        {device === "desktop" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="relative z-0 flex flex-col items-center"
          >
            <div className="w-24 h-16 bg-gradient-to-b from-mono-300 to-mono-400 dark:from-[#222] dark:to-[#111] border-x border-mono-400 dark:border-[#333]" />
            <div className="w-48 h-3 bg-gradient-to-b from-mono-300 to-mono-400 dark:from-[#333] dark:to-[#111] rounded-t-sm shadow-xl" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

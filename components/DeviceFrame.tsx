"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
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
    padding: 12,
  },
  desktop: {
    width: 800,
    height: 480,
    borderRadius: 16,
    innerBorderRadius: 8,
    padding: 16,
  },
};

export function DeviceFrame({ children }: { children: ReactNode }) {
  const { device } = useDevice();
  const currentStyle = deviceStyles[device];

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-full perspective-1000 relative">
      <motion.div
        layout
        initial={false}
        animate={{
          width: currentStyle.width,
          height: currentStyle.height,
          borderRadius: currentStyle.borderRadius,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 25,
          mass: 1,
        }}
        className={cn(
          "relative",
          "border-[2px] md:border-[3px] border-mono-300 dark:border-[#333] shadow-inner", // outer metallic rim
          "bg-white dark:bg-black", // inner bezel (white in light mode, black in dark mode)
          "shadow-2xl shadow-black/20 dark:shadow-black/70",
          "flex flex-col"
        )}
      >
        {/* Hardware Buttons (Mobile & Tablet) */}
        {device !== "desktop" && (
          <div className="absolute inset-0 pointer-events-none rounded-[inherit]">
            {/* Power Button */}
            <motion.div layout className="absolute -right-[4px] md:-right-[6px] top-24 w-1 md:w-1.5 h-12 md:h-16 bg-mono-300 dark:bg-[#333] rounded-r-md" />
            {/* Volume Up */}
            <motion.div layout className="absolute -left-[4px] md:-left-[6px] top-20 w-1 md:w-1.5 h-10 md:h-12 bg-mono-300 dark:bg-[#333] rounded-l-md" />
            {/* Volume Down */}
            <motion.div layout className="absolute -left-[4px] md:-left-[6px] top-36 w-1 md:w-1.5 h-10 md:h-12 bg-mono-300 dark:bg-[#333] rounded-l-md" />
          </div>
        )}

        {/* Camera Dot in Bezel (Tablet & Desktop) */}
        {device !== "mobile" && (
          <motion.div layout className="absolute top-1.5 md:top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#0a0a0a] ring-1 ring-white/10 z-50" />
        )}

        {/* Actual Screen Viewport */}
        <motion.div 
          layout
          initial={false}
          animate={{
            borderRadius: currentStyle.innerBorderRadius,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 25,
            mass: 1,
          }}
          className={cn(
            "absolute overflow-hidden bg-mono-50 dark:bg-[#0a0a0a] flex flex-col",
            device === "mobile" ? "inset-2 md:inset-2.5" : "inset-2.5 md:inset-3"
          )}
        >
          {/* Subtle Screen Reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 dark:from-transparent dark:via-white/0 dark:to-white/5 pointer-events-none z-50" />

          {/* Dynamic Island / Notch (Mobile only) */}
          {device === "mobile" && (
            <motion.div
              layout
              className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-50 flex justify-end items-center px-2 shadow-sm shadow-black/50"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-[#0a0a2a] ring-1 ring-white/5" />
            </motion.div>
          )}

          {/* Desktop Window Controls */}
          {device === "desktop" && (
            <motion.div
              layout
              className="absolute top-0 left-0 w-full h-8 bg-mono-200/50 dark:bg-white/5 border-b border-black/5 dark:border-white/5 z-40 flex items-center px-4 gap-1.5 backdrop-blur-md"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/80 dark:bg-white/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80 dark:bg-white/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400/80 dark:bg-white/20" />
            </motion.div>
          )}

          {/* Screen Content Wrapper */}
          <motion.div 
            layout 
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
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Desktop Monitor Stand */}
      {device === "desktop" && (
        <motion.div
          layout
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="relative z-0 flex flex-col items-center"
        >
          {/* Stand Neck */}
          <div className="w-24 h-16 bg-gradient-to-b from-mono-300 to-mono-400 dark:from-[#222] dark:to-[#111] border-x border-mono-400 dark:border-[#333]" />
          {/* Stand Base */}
          <div className="w-48 h-3 bg-gradient-to-b from-mono-300 to-mono-400 dark:from-[#333] dark:to-[#111] rounded-t-sm shadow-xl" />
        </motion.div>
      )}
    </div>
  );
}

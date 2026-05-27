"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface WidgetCardProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export function WidgetCard({ href, children, className }: WidgetCardProps) {
  const router = useRouter();

  return (
    <motion.button
      whileHover={{ scale: 0.98 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => router.push(href)}
      className={cn(
        "relative w-full h-full text-left overflow-hidden rounded-xl md:rounded-2xl",
        "bg-white/40 dark:bg-black/40 backdrop-blur-xl",
        "border border-black/5 dark:border-white/10",
        "shadow-sm transition-colors hover:bg-white/60 dark:hover:bg-white/5",
        "group",
        className
      )}
    >
      {/* Subtle hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      {children}
    </motion.button>
  );
}

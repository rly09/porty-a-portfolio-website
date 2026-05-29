"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const WORDS = [
  "CODE", "DESIGN", "BUILD", "SOLVE", "DEBUG", "UI", "UX", "DATA", "LOGIC", "FAST",
  "SMART", "CLEAN", "PURE", "MINIMAL", "BOLD", "THINK", "DREAM", "NEXT", "REACT", "TS",
  "JS", "CSS", "HTML", "NODE", "CORE", "ROOT", "LOOP", "SYNC", "ASYNC", "GIT",
  "API", "WEB", "APP", "DEV", "OPS", "GO", "RUST", "AI", "ML", "CLOUD",
  "WAVE", "PULSE", "BASE", "FLOW", "SHIFT", "KEY", "LINK", "GRID", "CELL", "NODE"
];

interface FloatingWord {
  id: number;
  text: string;
  gridX: number;
  gridY: number;
  duration: number;
  delay: number;
  offset: { x: number; y: number };
}

export function FloatingQuotes() {
  const [words, setWords] = useState<FloatingWord[]>([]);

  useEffect(() => {
    const gridCols = 8;
    const gridRows = 8;
    const newWords: FloatingWord[] = [];
    
    const positions: { x: number; y: number }[] = [];
    for (let x = 0; x < gridCols; x++) {
      for (let y = 0; y < gridRows; y++) {
        positions.push({ x, y });
      }
    }

    const shuffledPositions = [...positions].sort(() => Math.random() - 0.5);
    
    for (let i = 0; i < Math.min(WORDS.length, shuffledPositions.length); i++) {
      const pos = shuffledPositions[i];
      newWords.push({
        id: i,
        text: WORDS[i],
        gridX: (pos.x * (100 / gridCols)) + 5,
        gridY: (pos.y * (100 / gridRows)) + 5,
        duration: Math.random() * 10 + 20,
        delay: Math.random() * -20,
        offset: {
          x: (Math.random() - 0.5) * 8, // Reduced offset to minimize overlap
          y: (Math.random() - 0.5) * 8
        }
      });
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setWords(newWords);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
      {words.map((word) => (
        <motion.div
          key={word.id}
          initial={{ 
            left: `${word.gridX}%`, 
            top: `${word.gridY}%`, 
            opacity: 0 
          }}
          animate={{
            left: [
              `${word.gridX}%`,
              `${word.gridX + word.offset.x}%`,
              `${word.gridX - word.offset.x}%`,
              `${word.gridX}%`,
            ],
            top: [
              `${word.gridY}%`,
              `${word.gridY + word.offset.y}%`,
              `${word.gridY - word.offset.y}%`,
              `${word.gridY}%`,
            ],
            opacity: [0, 0.5, 0.2, 0.5, 0],
          }}
          transition={{
            duration: word.duration,
            repeat: Infinity,
            delay: word.delay,
            ease: "easeInOut",
          }}
          className="absolute whitespace-nowrap text-xs md:text-lg font-black text-mono-950/20 dark:text-mono-50/15 tracking-[0.2em]"
        >
          {word.text}
        </motion.div>
      ))}
    </div>
  );
}

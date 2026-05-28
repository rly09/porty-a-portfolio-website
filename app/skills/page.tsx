"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Footer } from "@/components/Footer";

const skillCategories = [
  {
    title: "Mobile & Extensions",
    skills: [
      { name: "Flutter", level: 94 },
      { name: "Kotlin", level: 78 },
      { name: "Chrome Extensions", level: 91 },
      { name: "Cross-Platform Apps", level: 84 },
    ]
  },
  {
    title: "Backend Development",
    skills: [
      { name: "Flask", level: 82 },
      { name: "FastAPI", level: 80 },
      { name: "Firebase", level: 84 },
      { name: "Supabase", level: 86 },
    ]
  },
  {
    title: "AI & Automation",
    skills: [
      { name: "Prompt Engineering", level: 92 },
      { name: "LLM Integration", level: 86 },
      { name: "AI Workflow Design", level: 85 },
      { name: "Automation Systems", level: 82 },
    ]
  },
  {
    title: "Programming & Problem Solving",
    skills: [
      { name: "C++", level: 84 },
      { name: "DSA", level: 80 },
      { name: "System Design Thinking", level: 78 },
    ]
  }
];

export default function SkillsPage() {
  return (
    <div className="min-h-screen p-6 md:p-12 lg:p-24 max-w-4xl mx-auto">
      <nav className="flex items-center justify-between mb-16">
        <Link 
          href="/"
          className="flex items-center gap-2 text-mono-600 dark:text-mono-400 hover:text-mono-950 dark:hover:text-mono-50 transition-colors font-mono text-sm tracking-tight"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO HOME</span>
        </Link>
        <ThemeToggle />
      </nav>

      <header className="mb-16">
        <h1 className="text-5xl md:text-7xl font-display tracking-tight text-mono-950 dark:text-mono-50 mb-4">
          Skills
        </h1>
        <p className="text-lg md:text-xl font-mono text-mono-600 dark:text-mono-400 max-w-2xl leading-relaxed">
          The technical foundation I use to build robust, intelligent digital products.
        </p>
      </header>

      <div className="grid gap-16">
        {skillCategories.map((category, idx) => (
          <motion.div 
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <h2 className="text-xl md:text-2xl font-display text-mono-950 dark:text-mono-50 mb-8 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-accent-blue/30" />
              {category.title}
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {category.skills.map((skill) => (
                <div key={skill.name} className="flex flex-col gap-3">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-mono font-medium text-mono-800 dark:text-mono-200 uppercase tracking-widest">{skill.name}</span>
                    <span className="text-[10px] font-mono text-mono-400">{skill.level}%</span>
                  </div>
                  <div className="h-1 w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, type: "spring", bounce: 0 }}
                      className="h-full bg-accent-blue/80 dark:bg-accent-blue/60 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

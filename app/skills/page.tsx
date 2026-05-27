"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const skillCategories = [
  {
    title: "App Development",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "React Native", level: 85 },
      { name: "Tailwind CSS", level: 95 },
    ]
  },
  {
    title: "Backend & Systems",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Python", level: 80 },
      { name: "PostgreSQL", level: 75 },
      { name: "Docker", level: 70 },
    ]
  },
  {
    title: "Design & UX",
    skills: [
      { name: "Framer Motion", level: 90 },
      { name: "Figma", level: 80 },
      { name: "UI/UX Prototyping", level: 85 },
    ]
  }
];

export default function SkillsPage() {
  return (
    <div className="min-h-screen p-6 md:p-12 lg:p-24 max-w-4xl mx-auto">
      <nav className="flex items-center justify-between mb-16">
        <Link 
          href="/"
          className="flex items-center gap-2 text-mono-600 dark:text-mono-400 hover:text-mono-900 dark:hover:text-mono-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </Link>
        <ThemeToggle />
      </nav>

      <header className="mb-16">
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-mono-950 dark:text-mono-50 mb-4">
          Skills
        </h1>
        <p className="text-lg text-mono-600 dark:text-mono-400">
          Tools and technologies I use to build digital experiences.
        </p>
      </header>

      <div className="grid gap-12">
        {skillCategories.map((category, idx) => (
          <motion.div 
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <h2 className="text-2xl font-medium text-mono-900 dark:text-mono-100 mb-6">
              {category.title}
            </h2>
            <div className="grid gap-4">
              {category.skills.map((skill) => (
                <div key={skill.name} className="flex flex-col gap-2">
                  <div className="flex justify-between text-sm text-mono-600 dark:text-mono-400">
                    <span>{skill.name}</span>
                  </div>
                  <div className="h-1.5 w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, type: "spring", bounce: 0 }}
                      className="h-full bg-mono-900 dark:bg-mono-100 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

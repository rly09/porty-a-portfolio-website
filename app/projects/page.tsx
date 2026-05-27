"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Code2 } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const projects = [
  {
    id: 1,
    title: "AI Code Assistant",
    description: "A context-aware intelligent programming assistant that helps developers write better code faster.",
    tags: ["Next.js", "TypeScript", "LLMs", "Tailwind CSS"],
    year: "2024",
  },
  {
    id: 2,
    title: "NeuroFinance App",
    description: "A personal finance tracker powered by machine learning for predictive budget forecasting.",
    tags: ["React Native", "Python", "FastAPI", "TensorFlow"],
    year: "2023",
  },
  {
    id: 3,
    title: "Minimal OS Framework",
    description: "A web-based window management system mirroring desktop operating systems in the browser.",
    tags: ["React", "Framer Motion", "Zustand"],
    year: "2023",
  }
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen p-6 md:p-12 lg:p-24 max-w-5xl mx-auto">
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
          Projects
        </h1>
        <p className="text-lg text-mono-600 dark:text-mono-400">
          Selected case studies and applications I've built.
        </p>
      </header>

      <div className="grid gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative flex flex-col md:flex-row gap-6 p-6 rounded-3xl bg-white/5 dark:bg-black/5 border border-black/5 dark:border-white/5 hover:bg-white/10 dark:hover:bg-black/10 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-2xl font-medium text-mono-900 dark:text-mono-100">
                  {project.title}
                </h2>
                <span className="text-sm px-2 py-1 rounded-full bg-black/5 dark:bg-white/5 text-mono-600 dark:text-mono-400">
                  {project.year}
                </span>
              </div>
              <p className="text-mono-600 dark:text-mono-400 mb-6 max-w-xl text-lg leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm px-3 py-1 rounded-full bg-mono-100 dark:bg-mono-900 text-mono-600 dark:text-mono-400 border border-black/5 dark:border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex items-start gap-3 md:opacity-0 md:-translate-x-4 md:group-hover:opacity-100 md:group-hover:translate-x-0 transition-all duration-300">
              <button className="p-3 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                <Code2 className="w-5 h-5 text-mono-900 dark:text-mono-100" />
              </button>
              <button className="p-3 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                <ExternalLink className="w-5 h-5 text-mono-900 dark:text-mono-100" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

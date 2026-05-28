"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Code2 } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Footer } from "@/components/Footer";

const projects = [
  {
    id: 1,
    title: "Bolo AI – AI Powered Voice Assistant & Device Automation Platform",
    description: "Built a cross-platform voice assistant for Android using Flutter and Supabase, automating hands-free device actions (calls, alarms, WhatsApp messaging, media playback).",
    tags: ["Flutter", "Supabase", "HiveDb", "LLMs", "Gemini API"],
    year: "2026",
  },
  {
    id: 2,
    title: "CaseLens – AI Powered Legal Intelligence Platform",
    description: "A legal intelligence platform that uses AI to analyze and predict legal outcomes.",
    tags: ["Flutter", "FastAPI", "Linear Regression", "FAISS"],
    year: "2026",
  },
  {
    id: 3,
    title: "Career Verse",
    description: "A full-stack Flutter app that provides personalized career paths by analyzing quiz responses and strengths using AI-powered recommendations.",
    tags: ["Flutter", "Supabase"],
    year: "2025",
  },
  {
    id: 4,
    title: "SyncMind",
    description: "Built a Chrome extension that transfers conversations between Claude, ChatGPT, Gemini, and Perplexity with one click.",
    tags: ["Chrome Extension", "React", "Tailwind CSS", "Plasmo Framework"],
    year: "2026",
  }
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen p-6 md:p-12 lg:p-24 max-w-5xl mx-auto">
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
          Projects
        </h1>
        <p className="text-lg md:text-xl font-mono text-mono-600 dark:text-mono-400 max-w-2xl leading-relaxed">
          A selection of case studies, open-source work, and experimental digital products.
        </p>
      </header>

      <div className="grid gap-12">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative flex flex-col md:flex-row gap-8 p-8 rounded-[2rem] bg-white/5 dark:bg-black/5 border border-black/5 dark:border-white/5 hover:bg-white/10 dark:hover:bg-black/10 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xs font-mono font-bold text-accent-amber/80 uppercase tracking-widest px-3 py-1 rounded-full bg-accent-amber/10 border border-accent-amber/20">
                  {project.year}
                </span>
                <h2 className="text-2xl md:text-3xl font-display text-mono-950 dark:text-mono-50">
                  {project.title}
                </h2>
              </div>
              <p className="text-mono-600 dark:text-mono-400 mb-8 max-w-2xl text-lg leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-3">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono font-bold px-3 py-1 rounded-md bg-black/5 dark:bg-white/5 text-mono-500 dark:text-mono-400 uppercase tracking-tighter"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <button className="p-4 rounded-full bg-black/5 dark:bg-white/5 hover:bg-accent-amber/10 hover:text-accent-amber transition-all group/btn">
                <Code2 className="w-5 h-5" />
              </button>
              <button className="p-4 rounded-full bg-black/5 dark:bg-white/5 hover:bg-accent-amber/10 hover:text-accent-amber transition-all group/btn">
                <ExternalLink className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

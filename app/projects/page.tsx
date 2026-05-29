"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Code2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Footer } from "@/components/Footer";

const projects = [
  {
    id: 1,
    title: "Bolo AI",
    subtitle: "AI Powered Voice Assistant & Device Automation Platform",
    description: "Built a cross-platform voice assistant for Android using Flutter and Supabase, automating hands-free device actions (calls, alarms, WhatsApp messaging, media playback).",
    tags: ["Flutter", "Supabase", "HiveDb", "LLMs", "Gemini API"],
    year: "2026",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop",
    githubRepo: "https://github.com/rly09/hey_bolo"
  },
  {
    id: 2,
    title: "CaseLens",
    subtitle: "AI Powered Legal Intelligence Platform",
    description: "A legal intelligence platform that uses AI to analyze and predict legal outcomes based on historical case data and current statutes.",
    tags: ["Flutter", "FastAPI", "Linear Regression", "FAISS"],
    year: "2026",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop",
    githubRepo: "https://github.com/yourusername/caselens"
  },
  {
    id: 3,
    title: "Career Verse",
    description: "A full-stack Flutter app that provides personalized career paths by analyzing quiz responses and strengths using AI-powered recommendations.",
    tags: ["Flutter", "Supabase"],
    year: "2025",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop",
    githubRepo: "https://github.com/yourusername/career-verse"
  },
  {
    id: 4,
    title: "SyncMind",
    description: "Built a Chrome extension that transfers conversations between Claude, ChatGPT, Gemini, and Perplexity with one click, preserving context.",
    tags: ["Chrome Extension", "React", "Tailwind CSS", "Plasmo Framework"],
    year: "2026",
    image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=800&auto=format&fit=crop",
    githubRepo: "https://github.com/yourusername/syncmind"
  }
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen p-6 md:p-12 lg:p-24 max-w-6xl mx-auto">
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
            className="group relative flex flex-col md:flex-row gap-8 p-6 md:p-8 rounded-[2rem] bg-white/5 dark:bg-black/5 border border-black/5 dark:border-white/5 hover:bg-white/10 dark:hover:bg-black/10 transition-all duration-500"
          >
            {/* Project Image Container */}
            <div className="w-full md:w-72 lg:w-96 aspect-video md:aspect-square rounded-2xl overflow-hidden bg-mono-200 dark:bg-mono-800 shrink-0 relative">
              <Image 
                src={project.image} 
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-110 group-hover:scale-100"
              />
            </div>

            <div className="flex-1 flex flex-col">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="text-xs font-mono font-bold text-accent-amber/80 uppercase tracking-widest px-3 py-1 rounded-full bg-accent-amber/10 border border-accent-amber/20">
                  {project.year}
                </span>
                <div className="flex flex-col">
                  <h2 className="text-2xl md:text-3xl font-display text-mono-950 dark:text-mono-50 group-hover:text-accent-amber transition-colors">
                    {project.title}
                  </h2>
                  {"subtitle" in project && (
                    <span className="text-xs font-mono text-mono-400 uppercase tracking-tighter mt-1">{project.subtitle}</span>
                  )}
                </div>
              </div>
              
              <p className="text-mono-600 dark:text-mono-400 mb-8 max-w-2xl text-base md:text-lg leading-relaxed">
                {project.description}
              </p>

              <div className="mt-auto flex flex-col gap-6">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] md:text-[10px] font-mono font-bold px-3 py-1 rounded-md bg-black/5 dark:bg-white/5 text-mono-500 dark:text-mono-400 uppercase tracking-tighter"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center">
                  <a 
                    href={project.githubRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-6 py-3 rounded-full bg-mono-950 dark:bg-mono-50 text-mono-50 dark:text-mono-950 font-mono text-xs font-bold uppercase tracking-widest hover:bg-accent-amber dark:hover:bg-accent-amber hover:text-mono-950 transition-all active:scale-95"
                  >
                    <Code2 className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

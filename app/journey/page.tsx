"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Footer } from "@/components/Footer";

const timeline = [
  {
    year: "Jan 2026 - Apr 2026",
    title: "Project Intern",
    company: "Trucxo",
    description: "Built and implemented a cross-platform mobile and web application using Flutter and Firebase, gaining hands-on experience with localization, authentication, and real-time backend integration."
  },
  {
    year: "Oct 2025 - Feb 2026",
    title: "Flutter Developer Intern",
    company: "Spazorlabs",
    description: "Developed and deployed cross-platform mobile apps using Flutter and Supabase."
  },
  {
    year: "May 2024 - May 2028",
    title: "B.Tech Computer Science",
    company: "SRM Institute of Science and Technology",
    description: "Pursuing a Bachelor's degree in Computer Science with a focus on Data Structures & Algorithms, Full-Stack Development, Mobile App Development, and Artificial Intelligence. Actively building real-world projects and exploring scalable software systems."
  }
];

export default function JourneyPage() {
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
          Journey
        </h1>
        <p className="text-lg md:text-xl font-mono text-mono-600 dark:text-mono-400 max-w-2xl leading-relaxed">
          A professional timeline of my experience, education, and growth as an engineer.
        </p>
      </header>

      <div className="relative border-l border-black/10 dark:border-white/10 ml-3 md:ml-0 md:pl-12 pb-12">
        {timeline.map((item, idx) => (
          <motion.div 
            key={item.year}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: idx * 0.1 }}
            className="mb-16 relative pl-8 md:pl-0"
          >
            <div className="absolute w-4 h-4 bg-accent-rose rounded-full -left-[1.55rem] md:-left-[3.5rem] top-2 ring-4 ring-white dark:ring-[#0f0f0f] shadow-[0_0_15px_rgba(244,63,94,0.3)]" />
            
            <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 mb-4">
              <span className="text-xs font-mono font-bold text-accent-rose uppercase tracking-[0.2em] min-w-[140px]">
                {item.year}
              </span>
              <h3 className="text-2xl md:text-3xl font-display text-mono-950 dark:text-mono-50">
                {item.title}
              </h3>
            </div>
            
            <div className="md:ml-[172px]">
              <span className="text-sm font-mono font-medium text-mono-600 dark:text-mono-400 mb-4 block uppercase tracking-widest">
                @ {item.company}
              </span>
              <p className="text-mono-600 dark:text-mono-400 leading-relaxed max-w-2xl text-lg">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

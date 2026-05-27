"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const timeline = [
  {
    year: "2024 - Present",
    title: "Senior Frontend Engineer",
    company: "TechNova",
    description: "Leading the development of next-generation AI-powered web applications using Next.js and React Server Components."
  },
  {
    year: "2022 - 2024",
    title: "Full Stack Developer",
    company: "Nexus Labs",
    description: "Built scalable microservices in Node.js and interactive dashboards in React, improving internal operations efficiency by 40%."
  },
  {
    year: "2020 - 2022",
    title: "UI/UX Engineer",
    company: "Creative Studio",
    description: "Designed and implemented award-winning landing pages with complex animations and 3D web experiences."
  },
  {
    year: "2016 - 2020",
    title: "B.S. Computer Science",
    company: "State University",
    description: "Focused on human-computer interaction and distributed systems. Graduated with honors."
  }
];

export default function JourneyPage() {
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
          Journey
        </h1>
        <p className="text-lg text-mono-600 dark:text-mono-400">
          My professional timeline and education.
        </p>
      </header>

      <div className="relative border-l border-black/10 dark:border-white/10 ml-3 md:ml-0 md:pl-8 pb-12">
        {timeline.map((item, idx) => (
          <motion.div 
            key={item.year}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: idx * 0.1 }}
            className="mb-12 relative pl-8 md:pl-0"
          >
            <div className="absolute w-3 h-3 bg-mono-900 dark:bg-mono-100 rounded-full -left-[1.35rem] md:-left-[2.4rem] top-1.5 ring-4 ring-white dark:ring-[#0a0a0a]" />
            
            <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-2">
              <span className="text-sm font-medium text-mono-600 dark:text-mono-400 min-w-[120px]">
                {item.year}
              </span>
              <h3 className="text-xl font-medium text-mono-950 dark:text-mono-50">
                {item.title}
              </h3>
            </div>
            
            <div className="md:ml-[144px]">
              <span className="text-sm font-medium text-mono-600 dark:text-mono-400 mb-3 block">
                {item.company}
              </span>
              <p className="text-mono-600 dark:text-mono-400 leading-relaxed max-w-xl">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

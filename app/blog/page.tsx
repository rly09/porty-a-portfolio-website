"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Footer } from "@/components/Footer";

const posts = [
  {
    id: 1,
    title: "The Future of Interface Design",
    excerpt: "Exploring the shift towards minimal, monochromatic, and deeply interactive digital environments.",
    date: "May 24, 2026",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Building Fluid Animations with Framer Motion",
    excerpt: "A deep dive into creating natural, spring-based interactions in React applications.",
    date: "April 12, 2026",
    readTime: "8 min read",
  },
  {
    id: 3,
    title: "Why Minimalism Matters in Code",
    excerpt: "How writing less code often leads to more robust, maintainable, and beautiful software.",
    date: "March 03, 2026",
    readTime: "4 min read",
  }
];

export default function BlogPage() {
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
          Blog
        </h1>
        <p className="text-lg md:text-xl font-mono text-mono-600 dark:text-mono-400 max-w-2xl leading-relaxed">
          Writing on design systems, code architecture, and the evolution of digital interfaces.
        </p>
      </header>

      <div className="grid gap-8">
        {posts.map((post, idx) => (
          <motion.article 
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group block p-8 rounded-[2rem] bg-white/5 dark:bg-black/5 border border-black/5 dark:border-white/5 hover:bg-white/10 dark:hover:bg-black/10 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-4 font-mono text-[10px] md:text-xs text-mono-500 dark:text-mono-400 mb-6 uppercase tracking-widest">
              <time dateTime={post.date} className="text-accent-emerald/80">{post.date}</time>
              <span className="w-1 h-1 rounded-full bg-mono-300 dark:bg-mono-700" />
              <span>{post.readTime}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-display text-mono-950 dark:text-mono-50 mb-4 group-hover:text-accent-emerald transition-colors">
              {post.title}
            </h2>
            <p className="text-mono-600 dark:text-mono-400 leading-relaxed text-lg max-w-2xl">
              {post.excerpt}
            </p>
          </motion.article>
        ))}
      </div>
      <Footer />
    </div>
  );
}

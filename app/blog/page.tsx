"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Footer } from "@/components/Footer";

type ContentBlock = 
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "blockquote"; text: string; author?: string };

interface Post {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  content: ContentBlock[];
}

const rawPosts: Post[] = [
  {
    id: 1,
    title: "Why I Build Before I Feel Ready",
    excerpt: "My approach to learning by building real products instead of waiting until I've mastered every technology.",
    date: "May 27, 2026",
    content: [
      { type: "p", text: "There's a common trap in software engineering: the \"Learning Loop.\" It's that feeling that you need to watch just one more tutorial, read one more documentation page, or finish one more course before you can start building something real." },
      { type: "p", text: "I've found that the most effective way to learn is to dive into the deep end before you're ready. When you build something real, you encounter real problems. You don't just learn how to use a tool; you learn why it exists and when it fails." },
      { type: "h3", text: "The \"Build-First\" Philosophy" },
      { type: "p", text: "When I started Bolo AI, I didn't know everything about Supabase or complex Android automation. But I had a goal: a voice assistant that actually worked. Every roadblock became a lesson. Instead of theoretical knowledge, I gained functional expertise." },
      { type: "p", text: "Building before you're ready forces you to be resourceful. It teaches you how to read documentation for specific solutions, how to debug effectively, and most importantly, how to finish things." },
      { type: "blockquote", text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
      { type: "p", text: "Don't wait for permission or perfection. Just start building. The mastery will come from the wreckage of your first few attempts." }
    ]
  },
  {
    id: 2,
    title: "My Process for Turning Ideas into MVPs",
    excerpt: "My way from idea → prototype → working product.",
    date: "May 28, 2026",
    content: [
      { type: "p", text: "Every great product starts as a messy idea. The difference between a dreamer and a builder is the process of refinement. Here’s how I take a concept from a fleeting thought to a functional Minimum Viable Product (MVP)." },
      { type: "h3", text: "Step 1: Problem Definition" },
      { type: "p", text: "I never start with a feature; I start with a pain point. What is annoying? What takes too long? If I'm building it for myself, I'm the first customer. If I can't explain the problem in one sentence, I haven't defined it well enough." },
      { type: "h3", text: "Step 2: Scoping (The Art of Saying No)" },
      { type: "p", text: "An MVP should be minimal. I list all the \"cool\" features and then cut 80% of them. If the core functionality doesn't provide value on its own, the extra features won't save it. For SyncMind, the core was just \"transfer text between LLMs.\" Everything else came later." },
      { type: "h3", text: "Step 3: Rapid Prototyping" },
      { type: "p", text: "I don't worry about perfect architecture in the first week. I use tools that let me move fast—Flutter for mobile, Next.js for web, and Supabase for the backend. The goal is to see it working on a device as soon as possible." },
      { type: "p", text: "The feedback loop is everything. Once you have an MVP, you're no longer guessing; you're iterating based on reality." }
    ]
  },
  {
    id: 3,
    title: "Building in the Age of AI",
    excerpt: "My thoughts on how AI changes software development.",
    date: "May 29, 2026",
    content: [
      { type: "p", text: "AI isn't going to replace developers, but developers who use AI will replace those who don't. We are entering a new era of \"Augmented Development\" where the barrier to entry is lower, but the ceiling for quality is higher." },
      { type: "h3", text: "The Shifting Skillset" },
      { type: "p", text: "In the past, knowing syntax was a massive competitive advantage. Today, syntax is a commodity. The real value has shifted to architecture, system design, and prompt engineering. You need to know what to build more than how to type it." },
      { type: "p", text: "I use AI as a high-powered intern. It handles the boilerplate, suggests optimizations, and explains obscure bugs. This frees me up to focus on the user experience and the core logic that makes a product unique." },
      { type: "h3", text: "The Danger of \"Lazy Coding\"" },
      { type: "p", text: "The risk is relying too much on generated code without understanding it. If you can't debug what the AI wrote, you don't own the project—it owns you. We must remain the architects, not just the assemblers." },
      { type: "p", text: "The future belongs to the builders who can orchestrate these powerful tools to create experiences that were previously impossible for a single developer to build." }
    ]
  }
];

function calculateReadTime(content: ContentBlock[]): string {
  const wordsPerMinute = 200;
  const totalWords = content.reduce((acc, block) => acc + block.text.split(/\s+/).length, 0);
  const minutes = Math.ceil(totalWords / wordsPerMinute);
  return `${minutes} min read`;
}

function renderContent(content: ContentBlock[]) {
  return content.map((block, idx) => {
    switch (block.type) {
      case "p":
        return <p key={idx}>{block.text}</p>;
      case "h3":
        return <h3 key={idx} className="text-2xl font-display text-mono-950 dark:text-mono-50 mt-8 mb-4">{block.text}</h3>;
      case "blockquote":
        return (
          <blockquote key={idx} className="border-l-4 border-accent-emerald bg-accent-emerald/5 py-4 px-6 rounded-r-xl italic text-mono-700 dark:text-mono-300 my-8">
            &quot;{block.text}&quot;
            {block.author && <span className="block mt-2 text-sm font-mono not-italic text-mono-500">— {block.author}</span>}
          </blockquote>
        );
      default:
        return null;
    }
  });
}

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<(Post & { readTime: string }) | null>(null);

  const posts = useMemo(() => {
    return rawPosts
      .map(post => ({
        ...post,
        readTime: calculateReadTime(post.content)
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, []);

  // Scroll to top when post is selected
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedPost]);

  return (
    <div className="min-h-screen p-6 md:p-12 lg:p-24 max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {!selectedPost ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
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
                  onClick={() => setSelectedPost(post)}
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
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="pb-12"
          >
            <nav className="flex items-center justify-between mb-16">
              <button 
                onClick={() => setSelectedPost(null)}
                className="flex items-center gap-2 text-mono-600 dark:text-mono-400 hover:text-mono-950 dark:hover:text-mono-50 transition-colors font-mono text-sm tracking-tight"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>BACK TO BLOG</span>
              </button>
              <ThemeToggle />
            </nav>

            <article>
              <header className="mb-12">
                <div className="flex items-center gap-4 font-mono text-xs text-mono-500 mb-6 uppercase tracking-widest">
                  <span className="flex items-center gap-1.5 text-accent-emerald">
                    <Calendar className="w-3.5 h-3.5" />
                    {selectedPost.date}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-mono-300 dark:bg-mono-700" />
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {selectedPost.readTime}
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display text-mono-950 dark:text-mono-50 mb-8 leading-tight">
                  {selectedPost.title}
                </h1>
                <p className="text-xl md:text-2xl font-mono text-mono-400 italic leading-relaxed border-l-2 border-mono-200 dark:border-mono-800 pl-6">
                  {selectedPost.excerpt}
                </p>
              </header>

              <div className="font-mono text-mono-600 dark:text-mono-400 text-lg leading-relaxed max-w-none space-y-6">
                {renderContent(selectedPost.content)}
              </div>
            </article>
            <div className="mt-24 pt-12 border-t border-black/5 dark:border-white/5">
              <button 
                onClick={() => setSelectedPost(null)}
                className="group flex items-center gap-3 text-mono-400 hover:text-mono-950 dark:hover:text-mono-50 transition-colors font-mono uppercase tracking-widest text-sm"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>BACK TO ALL POSTS</span>
              </button>
            </div>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

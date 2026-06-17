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
    id: 11,
    title: "The Art of Continuous Learning in Tech",
    excerpt: "How to stay relevant and curious in an industry that never stops moving.",
    date: "June 17, 2026",
    content: [
      { type: "p", text: "In the world of technology, the only constant is change. What was cutting-edge last year might be legacy today. This rapid evolution can be overwhelming, but it's also what makes our field so exciting." },
      { type: "h3", text: "Embracing a Growth Mindset" },
      { type: "p", text: "Continuous learning isn't just about picking up the latest framework; it's about developing a mindset that welcomes new challenges. It's about being comfortable with not knowing everything and having the confidence to figure it out." },
      { type: "p", text: "I've found that the best way to keep up is to focus on fundamentals. While tools change, the core principles of software engineering, design, and problem-solving remain remarkably stable." },
      { type: "blockquote", text: "Live as if you were to die tomorrow. Learn as if you were to live forever.", author: "Mahatma Gandhi" },
      { type: "p", text: "Whether it's reading a technical book, contributing to open source, or building a small side project, every bit of learning compounds over time. The goal isn't to be an expert in everything, but to be a lifelong student of the craft." }
    ]
  },
  {
    id: 10,
    title: "Building a Portfolio That Evolves With You",
    excerpt: "Why a personal site should be a living product—not a static snapshot frozen in time.",
    date: "June 10, 2026",
    content: [
      { type: "p", text: "For a long time, I treated my portfolio like a brochure: design it once, ship it, and move on. That worked when my work was a fixed set of projects. But as I kept building, the site fell behind. New projects sat in folders while the homepage still showed last year's highlights." },
      { type: "h3", text: "A Portfolio Is a Product" },
      { type: "p", text: "The shift came when I started thinking of Porty less as a showcase and more as a product I use every day. It has a blog, widgets, a design system, and room to grow. That mindset changes how you build it—you optimize for iteration, not perfection on day one." },
      { type: "p", text: "A living portfolio lets you document what you're learning in real time. A blog post about a design decision you made this week is more honest than a polished case study written six months later from memory." },
      { type: "blockquote", text: "Your portfolio is not a museum. It's a workshop with a window.", author: "Personal note" },
      { type: "h3", text: "Small Updates, Steady Presence" },
      { type: "p", text: "I don't wait for a major redesign to update the site. A new blog entry, a refined animation, a project card swapped in—these small changes keep the portfolio current without demanding a full rewrite." },
      { type: "p", text: "The goal isn't to impress with complexity. It's to give anyone visiting a clear, up-to-date picture of who I am as a builder right now. That only works if the site evolves as I do." }
    ]
  },
  {
    id: 9,
    title: "The Future of Minimalist Interfaces",
    excerpt: "Exploring why simplicity remains the most powerful design philosophy in an increasingly complex digital world.",
    date: "June 9, 2026",
    content: [
      { type: "p", text: "In an era of information overload, minimalism is no longer just a style; it's a necessity. As digital products become more feature-rich, the role of the designer is to distill that complexity into something intuitive and calm." },
      { type: "h3", text: "Clarity Over Clutter" },
      { type: "p", text: "Minimalism isn't about removing features; it's about removing friction. Every element on the screen should earn its place. If it doesn't help the user achieve their goal, it's a distraction." },
      { type: "p", text: "I've found that the most successful interfaces are those that disappear, leaving only the user and their task. This requires a deep understanding of user intent and a willingness to say no to unnecessary decorations." },
      { type: "blockquote", text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
      { type: "p", text: "As we look forward, the challenge will be to maintain this simplicity while integrating increasingly powerful AI and automation features. The best interfaces will be those that manage that complexity behind the scenes." }
    ]
  },
  {
    id: 8,
    title: "Refining the User Experience: Small Touches, Big Impact",
    excerpt: "How minor interface adjustments can significantly improve how users feel about a product.",
    date: "June 8, 2026",
    content: [
      { type: "p", text: "Often, the difference between a good product and a great one lies in the details that users might not even consciously notice. Micro-interactions, subtle animations, and thoughtful typography all contribute to a sense of polish and care." },
      { type: "h3", text: "The Power of Micro-interactions" },
      { type: "p", text: "A gentle bounce when a list reaches the end, a smooth transition between states, or a well-timed haptic response—these small moments provide feedback and delight. They make the digital feel tangible." },
      { type: "p", text: "In my recent work on Porty, I focused on these tiny transitions. By ensuring that every action has a corresponding visual reaction, the entire experience feels more responsive and alive." },
      { type: "p", text: "Never underestimate the impact of 'invisible' design. When something works perfectly, users don't think about the design; they just feel empowered." }
    ]
  },
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
  },
  {
    id: 4,
    title: "The Importance of Design Systems",
    excerpt: "Why consistency is the foundation of any great digital product.",
    date: "June 1, 2026",
    content: [
      { type: "p", text: "Design systems are more than just a collection of UI components. They are the language through which a product communicates with its users. Consistency isn't just about aesthetics; it's about building trust and reducing cognitive load." },
      { type: "h3", text: "Scaling Creativity" },
      { type: "p", text: "A well-implemented design system allows developers and designers to focus on solving high-level problems rather than reinventing the wheel for every new feature. It provides a shared source of truth that bridges the gap between design and implementation." },
      { type: "p", text: "In my recent projects, I've seen how a robust system can speed up the development cycle by up to 40%. When the foundation is solid, the rest of the building goes up much faster." },
      { type: "blockquote", text: "Design is not just what it looks like and feels like. Design is how it works.", author: "Steve Jobs" },
      { type: "p", text: "Investing in a design system early on is one of the best decisions a team can make. It's an investment in the long-term health and scalability of the product." }
    ]
  },
  {
    id: 5,
    title: "Optimizing Performance in Modern Web Apps",
    excerpt: "Techniques for building lightning-fast user experiences.",
    date: "June 2, 2026",
    content: [
      { type: "p", text: "Performance is a feature. In an era where users expect instant feedback, even a few hundred milliseconds of delay can lead to a significant drop in engagement. Optimizing performance isn't just a technical task; it's a core part of the user experience." },
      { type: "h3", text: "Beyond the Basics" },
      { type: "p", text: "While minification and image optimization are standard, modern web apps require more sophisticated techniques. Server-side rendering (SSR), static site generation (SSG), and edge computing are now essential tools in a developer's arsenal." },
      { type: "p", text: "I've been experimenting with partial hydration and streaming to deliver content faster. By only loading the JavaScript that's absolutely necessary for the current view, we can significantly reduce the Time to Interactive (TTI)." },
      { type: "p", text: "Every millisecond counts. As builders, we have a responsibility to respect our users' time and bandwidth by delivering the most efficient experiences possible." }
    ]
  },
  {
    id: 6,
    title: "Shipping Small Improvements Every Day",
    excerpt: "Why steady, visible progress beats waiting for one perfect release.",
    date: "June 4, 2026",
    content: [
      { type: "p", text: "The most reliable way I have found to improve a product is to ship small, useful changes consistently. A tiny improvement that reaches users today teaches more than a large feature that stays unfinished for weeks." },
      { type: "p", text: "Small releases reduce pressure because each decision has a narrower blast radius. If something does not work, it is easier to understand, fix, or roll back. That makes experimentation feel practical instead of risky." },
      { type: "h3", text: "Momentum Comes from Closure" },
      { type: "p", text: "Completing a small slice gives a project rhythm. It turns vague ambition into a working artifact, and that artifact becomes the next thing to refine. The habit matters as much as the feature." },
      { type: "p", text: "This approach also protects focus. Instead of trying to redesign an entire system at once, I ask what one change would make the experience clearer, faster, or more useful today." },
      { type: "blockquote", text: "Progress compounds when you make it easy to finish.", author: "Personal note" },
      { type: "p", text: "The goal is not to move carelessly. It is to keep the feedback loop alive so quality improves through contact with reality." }
    ]
  },
  {
    id: 7,
    title: "What I Look for Before Starting a New Project",
    excerpt: "The checklist I use to decide whether an idea is worth building now.",
    date: "June 5, 2026",
    content: [
      { type: "p", text: "Before I start a new project, I try to separate excitement from signal. New ideas are easy to love in the first hour, but a strong project needs a clear problem, a reachable first version, and a reason to keep improving it after the launch energy fades." },
      { type: "h3", text: "A Clear User Pain" },
      { type: "p", text: "The first question is simple: who is this for, and what friction does it remove? If I cannot describe the pain in plain language, I probably do not understand the product yet." },
      { type: "h3", text: "A Small First Version" },
      { type: "p", text: "I also look for a version that can be built quickly without pretending it solves everything. A focused first version gives me something concrete to test, improve, and explain." },
      { type: "h3", text: "Room to Grow" },
      { type: "p", text: "The best ideas have a useful core and a natural path forward. They can start small, but they should not be dead ends. There should be obvious ways to deepen the experience once the foundation works." },
      { type: "p", text: "When an idea passes those checks, I can start with confidence. Not because success is guaranteed, but because the next step is clear enough to build." }
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

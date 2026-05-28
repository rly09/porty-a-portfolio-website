import { WidgetCard } from "./WidgetCard";
import { PenTool, ArrowUpRight } from "lucide-react";

export function BlogWidget() {
  return (
    <WidgetCard href="/blog" className="p-2 md:p-3 flex flex-col justify-between h-full">
      <div className="flex items-start justify-between">
        <div className="relative">
          {/* Realistic App Icon */}
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-accent-emerald/20 to-accent-emerald/5 border border-accent-emerald/20 shadow-sm flex items-center justify-center relative overflow-hidden group/icon">
            <div className="absolute inset-0 bg-gradient-to-tr from-accent-emerald/10 via-transparent to-white/10" />
            <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 drop-shadow-md">
              <path d="M16 2H8a2 2 0 00-2 2v16a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2z" stroke="url(#emerald-grad)" strokeWidth="2" fill="none" />
              <path d="M10 6h4M10 10h4M10 14h2" stroke="url(#emerald-grad)" strokeWidth="2" strokeLinecap="round" />
              <defs>
                <linearGradient id="emerald-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--accent-emerald)" />
                  <stop offset="100%" stopColor="#059669" stopOpacity="0.8" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <ArrowUpRight className="w-4 h-4 text-mono-400 group-hover:text-accent-emerald transition-colors" />
      </div>
      <div className="mt-1 md:mt-2">
        <h3 className="text-xs md:text-base font-display text-mono-950 dark:text-mono-50 line-clamp-1">Blog</h3>
        <p className="text-[8px] md:text-[10px] font-mono text-mono-600 dark:text-mono-400 mt-0.5 line-clamp-1 md:line-clamp-2 uppercase tracking-tight">Thoughts & ideas</p>
      </div>
    </WidgetCard>
  );
}

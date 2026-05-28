import { WidgetCard } from "./WidgetCard";
import { Workflow, ArrowUpRight } from "lucide-react";

export function ProjectsWidget() {
  return (
    <WidgetCard href="/projects" className="p-2 md:p-3 flex flex-col justify-between h-full">
      <div className="flex items-start justify-between">
        <div className="relative">
          {/* Realistic App Icon */}
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-accent-amber/20 to-accent-amber/5 border border-accent-amber/20 shadow-sm flex items-center justify-center relative overflow-hidden group/icon">
            <div className="absolute inset-0 bg-gradient-to-tr from-accent-amber/10 via-transparent to-white/10" />
            <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 drop-shadow-md">
              <rect x="3" y="4" width="18" height="14" rx="2" stroke="url(#amber-grad)" strokeWidth="2" fill="none" />
              <path d="M7 8h10M7 12h5" stroke="url(#amber-grad)" strokeWidth="2" strokeLinecap="round" />
              <circle cx="18" cy="14" r="3" fill="url(#amber-grad)" fillOpacity="0.4" stroke="url(#amber-grad)" strokeWidth="1.5" />
              <defs>
                <linearGradient id="amber-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--accent-amber)" />
                  <stop offset="100%" stopColor="#d97706" stopOpacity="0.8" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <ArrowUpRight className="w-4 h-4 text-mono-400 group-hover:text-accent-amber transition-colors" />
      </div>
      <div className="mt-1 md:mt-2">
        <h3 className="text-xs md:text-base font-display text-mono-950 dark:text-mono-50 line-clamp-1">Projects</h3>
        <p className="text-[8px] md:text-[10px] font-mono text-mono-600 dark:text-mono-400 mt-0.5 line-clamp-1 md:line-clamp-2 uppercase tracking-tight">Featured case studies</p>
      </div>
    </WidgetCard>
  );
}

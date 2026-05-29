import { WidgetCard } from "./WidgetCard";
import { ArrowUpRight } from "lucide-react";

export function SkillsWidget() {
  return (
    <WidgetCard href="/skills" className="p-2 md:p-3 flex flex-col justify-between h-full">
      <div className="flex items-start justify-between">
        <div className="relative">
          {/* Realistic App Icon */}
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-accent-blue/20 to-accent-blue/5 border border-accent-blue/20 shadow-sm flex items-center justify-center relative overflow-hidden group/icon">
            <div className="absolute inset-0 bg-gradient-to-tr from-accent-blue/10 via-transparent to-white/10" />
            <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 drop-shadow-md">
              <path d="M8 6l-6 6 6 6" stroke="url(#blue-grad)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 18l6-6-6-6" stroke="url(#blue-grad)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14 4l-4 16" stroke="url(#blue-grad)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <defs>
                <linearGradient id="blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--accent-blue)" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <ArrowUpRight className="w-4 h-4 text-mono-400 group-hover:text-accent-blue transition-colors" />
      </div>
      <div className="mt-1 md:mt-2">
        <h3 className="text-xs md:text-base font-display text-mono-950 dark:text-mono-50 line-clamp-1">Skills</h3>
        <p className="text-[8px] md:text-[10px] font-mono text-mono-600 dark:text-mono-400 mt-0.5 line-clamp-1 md:line-clamp-2 uppercase tracking-tight">Tech stack & tools</p>
      </div>
    </WidgetCard>
  );
}

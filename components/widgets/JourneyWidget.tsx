import { WidgetCard } from "./WidgetCard";
import { Milestone, ArrowUpRight } from "lucide-react";

export function JourneyWidget() {
  return (
    <WidgetCard href="/journey" className="p-2 md:p-3 flex flex-col justify-between h-full">
      <div className="flex items-start justify-between">
        <div className="relative">
          {/* Realistic App Icon */}
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-accent-rose/20 to-accent-rose/5 border border-accent-rose/20 shadow-sm flex items-center justify-center relative overflow-hidden group/icon">
            <div className="absolute inset-0 bg-gradient-to-tr from-accent-rose/10 via-transparent to-white/10" />
            <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 drop-shadow-md">
              <path d="M12 2v20M5 5l14 3.5-14 3.5M5 12l14 3.5-14 3.5" stroke="url(#rose-grad)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <defs>
                <linearGradient id="rose-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--accent-rose)" />
                  <stop offset="100%" stopColor="#e11d48" stopOpacity="0.8" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <ArrowUpRight className="w-4 h-4 text-mono-400 group-hover:text-accent-rose transition-colors" />
      </div>
      <div className="mt-1 md:mt-2">
        <h3 className="text-xs md:text-base font-display text-mono-950 dark:text-mono-50 line-clamp-1">Journey</h3>
        <p className="text-[8px] md:text-[10px] font-mono text-mono-600 dark:text-mono-400 mt-0.5 line-clamp-1 md:line-clamp-2 uppercase tracking-tight">Experience & timeline</p>
      </div>
    </WidgetCard>
  );
}

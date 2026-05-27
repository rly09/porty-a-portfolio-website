import { WidgetCard } from "./WidgetCard";
import { FolderGit2, ArrowUpRight } from "lucide-react";

export function ProjectsWidget() {
  return (
    <WidgetCard href="/projects" className="p-3 md:p-4 flex flex-col justify-between h-full">
      <div className="flex items-start justify-between">
        <div className="p-2 bg-black/5 dark:bg-white/5 rounded-xl">
          <FolderGit2 className="w-6 h-6 text-mono-900 dark:text-mono-100" />
        </div>
        <ArrowUpRight className="w-5 h-5 text-mono-400 group-hover:text-mono-900 dark:group-hover:text-mono-100 transition-colors" />
      </div>
      <div className="mt-2 md:mt-4">
        <h3 className="text-sm md:text-lg font-medium text-mono-950 dark:text-mono-50 line-clamp-1">Projects</h3>
        <p className="text-[10px] md:text-xs text-mono-600 dark:text-mono-400 mt-0.5 line-clamp-1 md:line-clamp-2">Featured case studies & apps</p>
      </div>
    </WidgetCard>
  );
}

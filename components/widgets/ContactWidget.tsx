import { Mail, Code2, Briefcase } from "lucide-react";

export function ContactWidget() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between h-full px-4 border-t border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] rounded-b-[inherit]">
      <h3 className="text-xs md:text-sm font-medium text-mono-900 dark:text-mono-100 hidden md:block">
        Let’s build together.
      </h3>
      <div className="flex items-center gap-3 md:gap-4 h-full">
        <a
          href="mailto:contact@example.com"
          className="p-2.5 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          aria-label="Email"
        >
          <Mail className="w-4 h-4 md:w-5 md:h-5 text-mono-900 dark:text-mono-100" />
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          aria-label="GitHub"
        >
          <Code2 className="w-4 h-4 md:w-5 md:h-5 text-mono-900 dark:text-mono-100" />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          aria-label="LinkedIn"
        >
          <Briefcase className="w-4 h-4 md:w-5 md:h-5 text-mono-900 dark:text-mono-100" />
        </a>
      </div>
    </div>
  );
}

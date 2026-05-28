"use client";

export function ContactWidget() {
  return (
    <div className="flex items-center justify-between h-full px-3 md:px-4 bg-black/[0.03] dark:bg-white/[0.03] rounded-xl md:rounded-2xl border border-black/5 dark:border-white/5">
      <h3 className="text-[9px] md:text-xs font-display text-mono-900 dark:text-mono-100 tracking-wide truncate pr-2">
        Let’s build together.
      </h3>
      <div className="flex items-center gap-1.5 md:gap-3 shrink-0">
        <a
          href="mailto:yogiroshan2005@gmail.com"
          className="p-1.5 md:p-2 rounded-full bg-white dark:bg-white/5 shadow-sm border border-black/5 dark:border-white/5 hover:scale-110 transition-transform"
          aria-label="Gmail"
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 md:w-4 md:h-4">
            <path d="M24 4.5v15c0 .85-.65 1.5-1.5 1.5H21V7.39l-9 6.58-9-6.58V21H1.5c-.85 0-1.5-.65-1.5-1.5v-15c0-.85.65-1.5 1.5-1.5H3.1L12 11.02 20.9 3h1.6c.85 0 1.5.65 1.5 1.5z" fill="#EA4335" />
          </svg>
        </a>
        <a
          href="https://github.com/rly09"
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 md:p-2 rounded-full bg-white dark:bg-white/5 shadow-sm border border-black/5 dark:border-white/5 hover:scale-110 transition-transform"
          aria-label="GitHub"
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 md:w-4 md:h-4">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="currentColor" className="text-black dark:text-white" />
          </svg>
        </a>
        <a
          href="https://linkedin.com/in/roshanlalyogi"
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 md:p-2 rounded-full bg-white dark:bg-white/5 shadow-sm border border-black/5 dark:border-white/5 hover:scale-110 transition-transform"
          aria-label="LinkedIn"
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 md:w-4 md:h-4">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" fill="#0A66C2" />
          </svg>
        </a>
      </div>
    </div>
  );
}

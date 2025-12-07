// src/components/layout/theme-toggle.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="inline-flex items-center gap-2 rounded-full bg-black/5 px-2 py-1 text-xs text-[#6A4A35] dark:bg-white/5 dark:text-neutral-200"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black/10 dark:bg-white/10" />
        <span className="pr-1 text-[11px]">Theme</span>
      </button>
    );
  }

  const current = theme === "system" ? systemTheme : theme;
  const isDark = current === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle dark / light mode"
      className="
        inline-flex items-center gap-2 rounded-full px-2 py-1 text-xs font-medium
        bg-black/5 text-[#6A4A35]
        hover:bg-black/10
        dark:bg-white/5 dark:text-neutral-100 dark:hover:bg-white/10
        transition-all hover:-translate-y-0.5 hover:shadow-soft
      "
    >
      <span
        className="
          flex h-6 w-6 items-center justify-center rounded-full
          bg-gradient-to-tr from-brand-caramel to-brand-gold
          text-white shadow-md
          dark:from-neutral-100 dark:to-neutral-300 dark:text-neutral-900
        "
      >
        {isDark ? (
          <Moon className="h-3.5 w-3.5" />
        ) : (
          <Sun className="h-3.5 w-3.5" />
        )}
      </span>
      <span className="pr-1 text-[11px] tracking-wide">
        {isDark ? "Dark" : "Light"}
      </span>
    </button>
  );
}

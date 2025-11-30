'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle tema"
      className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-text-light shadow-sm transition hover:bg-gray-100 dark:border-border-soft-dark dark:text-text-dark dark:hover:bg-neutral-800"
    >
      <span className="h-4 w-4 rounded-full border border-gray-400 bg-white dark:border-border-soft-dark dark:bg-bg-dark" />
      <span>{isDark ? 'Mode Gelap' : 'Mode Terang'}</span>
    </button>
  );
}

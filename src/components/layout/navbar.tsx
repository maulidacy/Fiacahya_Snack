'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ThemeToggle } from './theme-toggle';

const navItems = [
  { href: "/", label: "Home" },
  { href: "/produk", label: "Produk" },
  { href: "/produksi", label: "Produksi" },
  { href: "/qc", label: "QC" },
  { href: "/galeri", label: "Galeri" },
  { href: "/dokumentasi", label: "Dokumentasi" },
  { href: "/profil", label: "Profil & Kontak" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-bg-light/95 backdrop-blur-sm dark:border-border-soft-dark dark:bg-bg-dark/95">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 bg-white text-xs font-semibold tracking-tight text-coffee shadow-sm dark:border-border-soft-dark dark:bg-neutral-900">
            FS
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight">
              FiaCahya Snack
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Unit Produksi Kue Basah
            </span>
          </div>
        </div>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          <ul className="flex items-center gap-4 text-sm">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`rounded-full px-3 py-1 transition ${
                      active
                        ? 'bg-coffee text-white'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-neutral-800'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ThemeToggle />
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigasi"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 shadow-sm dark:border-border-soft-dark dark:bg-neutral-900 dark:text-gray-100"
          >
            <span className="sr-only">Menu</span>
            <div className="flex flex-col gap-1">
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
            </div>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-gray-200 bg-bg-light px-4 py-3 text-sm shadow-sm dark:border-border-soft-dark dark:bg-bg-dark md:hidden">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-full px-3 py-2 ${
                      active
                        ? 'bg-coffee text-white'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-neutral-800'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}

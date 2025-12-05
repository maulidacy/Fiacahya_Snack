// src/components/layout/navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { motion, AnimatePresence } from "framer-motion";

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
  const [scrolled, setScrolled] = useState(false);

  // shadow & blur ketika scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur-xl transition-all ${
        scrolled
          ? "bg-[#FFF6EA]/90 border-[#E3C9A8]/70 shadow-sm dark:bg-[#050402]/90 dark:border-neutral-800"
          : "bg-[#FFF6EA]/60 border-transparent dark:bg-[#050402]/60 dark:border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        {/* BRAND */}
        <div className="flex items-center gap-2">
          <div className="relative h-9 w-9 rounded-2xl bg-gradient-to-tr from-[#C48A4A] to-[#F4C58A] shadow-md overflow-hidden flex items-center justify-center text-xs font-semibold text-white">
            FS
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-serif text-lg tracking-tight text-[#3A261A] dark:text-neutral-50">
              Fiacahya Snack
            </span>
            <span className="text-[11px] uppercase tracking-[0.18em] text-[#B8865A] dark:text-amber-200/80">
              Premium Bakery & Snack
            </span>
          </div>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden items-center gap-6 md:flex">
          <ul className="flex items-center gap-2 text-sm">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group relative inline-flex items-center px-3 py-1.5 text-xs font-medium"
                  >
                    {/* background pill animasi */}
                    <span
                      className={`absolute inset-0 rounded-full transition-all duration-200 ease-out scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 ${
                        active
                          ? "scale-100 opacity-100 bg-white/90 shadow-sm dark:bg-neutral-900/90"
                          : "bg-white/80 shadow-sm dark:bg-neutral-900/80"
                      }`}
                    />
                    {/* text */}
                    <span
                      className={`relative z-10 transition-colors ${
                        active
                          ? "text-[#3A261A] dark:text-amber-100"
                          : "text-[#6A4A35] group-hover:text-[#3A261A] dark:text-neutral-200 dark:group-hover:text-amber-100"
                      }`}
                    >
                      {item.label}
                    </span>
                    {/* underline */}
                    <span
                      className={`pointer-events-none absolute left-3 right-3 -bottom-1 h-[2px] origin-center rounded-full bg-gradient-to-r from-[#C48A4A] to-[#F4C58A] transition-transform duration-200 ${
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
          <ThemeToggle />
        </div>

        {/* MOBILE NAV */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigasi"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E3C9A8]/80 bg-white/80 text-[#3A261A] shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-neutral-700 dark:bg-neutral-900/80 dark:text-neutral-100"
          >
            <span className="sr-only">Menu</span>
            <div className="flex flex-col gap-1.5">
              <span
                className={`block h-0.5 w-5 rounded-full bg-current transition-transform ${
                  open ? "translate-y-[5px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-current transition-opacity ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`block h-0.5 w-5 rounded-full bg-current transition-transform ${
                  open ? "-translate-y-[5px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* MOBILE DROPDOWN */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden border-t border-[#E3C9A8]/70 bg-[#FFF6EA]/95 px-4 py-3 text-sm shadow-sm dark:border-neutral-800 dark:bg-[#050402]/95"
          >
            <ul className="flex flex-col gap-1.5">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`block rounded-full px-3 py-2 transition ${
                        active
                          ? "bg-white text-[#3A261A] shadow-sm dark:bg-neutral-900 dark:text-amber-100"
                          : "text-[#6A4A35] hover:bg-white/80 dark:text-neutral-200 dark:hover:bg-neutral-900/80"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// src/components/layout/sidebar.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
  { id: "about", label: "Tentang" },
  { id: "products", label: "Menu" },
  { id: "why-us", label: "Keunggulan" },
  { id: "order", label: "Cara Order" },
  { id: "testimonials", label: "Testimoni" },
];

export function Sidebar() {
  const [open, setOpen] = useState(false);

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      {/* Desktop sidebar (lg+) */}
      <aside className="hidden lg:block fixed left-4 top-28 z-20">
        <nav className="rounded-2xl bg-white/80 backdrop-blur border border-[#E1C09A]/70 px-4 py-3 text-xs shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:bg-neutral-950/80 dark:border-neutral-800 dark:text-neutral-100">
          <p className="font-semibold text-[11px] uppercase tracking-[0.18em] text-[#B47A45] mb-2 dark:text-amber-200">
            Navigasi
          </p>
          <ul className="space-y-1.5">
            {sections.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => handleScroll(s.id)}
                  className="w-full text-left rounded-full px-3 py-1.5 text-[11px] text-[#6A4A35] hover:bg-[#FFF1DD] hover:text-[#3A261A] transition dark:text-neutral-200 dark:hover:bg-neutral-800"
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Mobile floating button + drawer */}
      <div className="lg:hidden fixed bottom-4 right-4 z-30">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#3E2A20] text-[#FDE8D5] shadow-[0_14px_40px_rgba(0,0,0,0.3)] border border-[#E1C09A]/60 dark:bg-neutral-900 dark:text-neutral-100 dark:border-neutral-700"
          aria-label="Buka navigasi halaman"
        >
          ☰
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-14 right-0 w-56 rounded-2xl bg-white/95 backdrop-blur border border-[#E1C09A]/80 shadow-[0_18px_45px_rgba(0,0,0,0.22)] p-3 text-xs dark:bg-neutral-950/95 dark:border-neutral-700"
            >
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#B47A45] dark:text-amber-200">
                  Navigasi
                </p>
                <button
                  className="text-[11px] text-[#6A4A35]/70 dark:text-neutral-400"
                  onClick={() => setOpen(false)}
                >
                  Tutup
                </button>
              </div>
              <ul className="space-y-1">
                {sections.map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => handleScroll(s.id)}
                      className="w-full text-left rounded-full px-3 py-1.5 text-[11px] text-[#6A4A35] hover:bg-[#FFF1DD] hover:text-[#3A261A] transition dark:text-neutral-100 dark:hover:bg-neutral-800"
                    >
                      {s.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

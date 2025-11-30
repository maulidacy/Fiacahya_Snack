'use client';

import { useState } from 'react';

export function ChatbotFloating() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-3xl bg-coffee text-white shadow-soft hover:translate-y-[-1px] hover:shadow-lg"
        aria-label="Buka chatbot produksi"
      >
        {/* Ikon chat simple, tanpa gradient */}
        <span className="text-2xl leading-none">💬</span>
      </button>

      {/* Panel chat sederhana (teaser) */}
      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-[min(100vw-2.5rem,380px)] rounded-3xl border border-gray-200 bg-bg-light p-4 text-sm shadow-soft dark:border-border-soft-dark dark:bg-bg-dark">
          <div className="flex items-center justify-between gap-2">
            <div>
              <div className="text-sm font-semibold">
                Asisten Produksi AI – FiaCahya Snack
              </div>
              <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">
                UI chatbot (dummy). Nanti akan diisi bubble chat & integrasi
                ke endpoint /api/chat.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full border border-gray-300 px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 dark:border-border-soft-dark dark:text-gray-300 dark:hover:bg-neutral-800"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import type React from "react";
import { useState, useRef, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Sparkles } from "lucide-react";

type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

const panelVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 10, scale: 0.98 },
};

type RecommendSeed = {
  occasion?: string;
  time?: "pagi" | "siang" | "sore" | "malam";
  peopleCount?: number;
  itemCount?: 3 | 4;
  wantsDrink?: boolean;
  taste?: "gurih" | "manis" | "campur";
  method?: "kukus" | "panggang" | "goreng" | "campur";
};

function extractSeedUpdate(text: string): Partial<RecommendSeed> {
  const t = text.toLowerCase();

  const time =
    t.includes("pagi") ? "pagi" :
      t.includes("siang") ? "siang" :
        t.includes("sore") ? "sore" :
          t.includes("malam") ? "malam" : undefined;

  const m = t.match(/(\d{1,4})\s*(orang|pax|org)?/);
  const peopleCount = m ? Number(m[1]) : undefined;

  let occasion: string | undefined;
  if (t.includes("pengajian") || t.includes("arisan") || t.includes("tahlil")) occasion = "pengajian";
  else if (t.includes("rapat") || t.includes("meeting") || t.includes("kantor")) occasion = "rapat";
  else if (t.includes("ulang tahun") || t.includes("ultah")) occasion = "ulang-tahun";
  else if (t.includes("hampers") || t.includes("parcel") || t.includes("hadiah")) occasion = "hampers";
  else if (t.includes("nikah") || t.includes("wedding") || t.includes("pernikahan")) occasion = "wedding";

  let itemCount: 3 | 4 | undefined;
  if (t.includes("isi 4") || t.includes("4 item") || t.includes("empat item")) itemCount = 4;
  if (t.includes("isi 3") || t.includes("3 item") || t.includes("tiga item")) itemCount = 3;

  const wantsDrink =
    t.includes("minum") ||
    t.includes("minuman") ||
    t.includes("air mineral") ||
    t.includes("air putih") ||
    t.includes("teh");

  let taste: RecommendSeed["taste"] | undefined;
  if (t.includes("gurih") || t.includes("asin")) taste = "gurih";
  else if (t.includes("manis")) taste = "manis";
  else if (t.includes("campur") || t.includes("mix")) taste = "campur";

  let method: RecommendSeed["method"] | undefined;
  if (t.includes("kukus")) method = "kukus";
  else if (t.includes("panggang") || t.includes("baked")) method = "panggang";
  else if (t.includes("goreng")) method = "goreng";
  else if (t.includes("campur") || t.includes("mix")) method = "campur";

  const out: Partial<RecommendSeed> = {};
  if (occasion) out.occasion = occasion;
  if (time) out.time = time;
  if (peopleCount && Number.isFinite(peopleCount)) out.peopleCount = peopleCount;
  if (itemCount) out.itemCount = itemCount;
  if (wantsDrink) out.wantsDrink = true;
  if (taste) out.taste = taste;
  if (method) out.method = method;

  return out;
}

export function ProductionAssistant() {
  const [mode, setMode] = useState<"default" | "recommend">("default");
  const [recSeed, setRecSeed] = useState<RecommendSeed>({});
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Halo! Saya Fiacahya Assistant. Kamu bisa tanya soal jadwal produksi, estimasi kapasitas, atau ide paket snack untuk acara. 😊",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const listRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const nextId = useRef(2);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, open, loading]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    const maxHeight = 120;
    el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
  }, [input]);

  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userId = nextId.current++;
    setMessages((prev) => [...prev, { id: userId, role: "user", content: trimmed }]);
    setInput("");
    setLoading(true);

    const lower = trimmed.toLowerCase();
    const isRecommendRequest =
      lower.includes("rekomendasi") ||
      lower.includes("saran") ||
      lower.includes("bingung") ||
      lower.includes("snack box") ||
      lower.includes("gurih") ||
      lower.includes("asin") ||
      lower.includes("manis");

    const seedUpdate = extractSeedUpdate(trimmed);
    const nextSeed: RecommendSeed =
      mode === "recommend"
        ? { ...recSeed, ...seedUpdate }
        : isRecommendRequest
          ? { ...seedUpdate }
          : recSeed;

    const nextMode: "default" | "recommend" =
      mode === "recommend" ? "recommend" : isRecommendRequest ? "recommend" : "default";

    setRecSeed(nextSeed);

    try {
      // PERBAIKAN: Mengirim history agar AI tidak lupa konteks sebelumnya
      const chatHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const res = await fetch("/api/fiacahya-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            message: trimmed, 
            mode: nextMode, 
            seed: nextSeed,
            history: chatHistory // Logika Tambahan: History dikirim ke backend
        }),
      });

      if (!res.ok) throw new Error("API error");

      const data: { reply?: string; meta?: { recommendState?: "none" | "ask" | "done" } } =
        await res.json();

      const replyText =
        data.reply ?? "Maaf, saya tidak menerima jawaban dari server. Coba lagi sebentar, ya.";

      const state = data.meta?.recommendState ?? "none";
      if (state === "ask") {
        setMode("recommend");
      } else {
        setMode("default");
        setRecSeed({});
      }

      const botId = nextId.current++;
      setMessages((prev) => [...prev, { id: botId, role: "assistant", content: replyText }]);
    } catch (err) {
      console.error(err);
      setMode("default");
      setRecSeed({});

      const botId = nextId.current++;
      setMessages((prev) => [
        ...prev,
        {
          id: botId,
          role: "assistant",
          content: "Maaf, terjadi gangguan teknis saat menghubungi asisten. Silakan coba lagi beberapa saat.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        aria-label="Buka Asisten Produksi AI"
        onClick={() => { setOpen(true); setMode("default"); setRecSeed({}); }}
        className="fixed bottom-5 right-4 z-40 inline-flex items-center justify-center h-12 w-12 md:h-[52px] md:w-[52px] rounded-full bg-[#3E2A20] text-white shadow-[0_18px_40px_rgba(0,0,0,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-transform md:bottom-6 md:right-6 dark:bg-[#F5E2C8] dark:text-[#3E2A20]"
      >
        <Sparkles className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center sm:items-end sm:justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/20 sm:bg-transparent"
              onClick={() => setOpen(false)}
            />

            <motion.div
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.18 }}
              className="relative z-10 mb-4 w-full max-w-md rounded-3xl border border-[#E1C09A]/80 bg-white shadow-[0_22px_70px_rgba(15,23,42,0.25)] overflow-hidden sm:mr-4 dark:bg-[#050505]/98 dark:border-neutral-800"
            >
              <header
                className="flex items-center justify-between gap-3 px-4 py-3 bg-gradient-to-r from-[#3D2618] to-[#5A3721] text-[#FDE8D5]"
              >
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#F7D3A5]">
                    Fiacahya Assistant
                  </p>
                  <p className="text-xs font-semibold">
                    Bantuan produksi & rekomendasi paket snack
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/10 hover:bg-black/20 text-[#FDE8D5]"
                  aria-label="Tutup asisten produksi"
                >
                  <X className="h-4 w-4" />
                </button>
              </header>

              <div
                ref={listRef}
                className="max-h-[360px] min-h-[220px] overflow-y-auto px-3 py-3 space-y-3 bg-white dark:bg-[#050505]"
              >
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"
                      }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs leading-relaxed whitespace-pre-line ${msg.role === "user"
                          ? "bg-[#3E2A20] text-white border border-[#2A170F] dark:bg-[#F5E2C8] dark:text-[#2A170F] dark:border-[#E3C9A8]"
                          : "bg-[#FFF5EB] text-[#3A261A] border border-[#F2C89C]"
                        }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex justify-start">
                    <div
                      className="mt-1 inline-flex items-center gap-1 rounded-2xl border border-[#F2C89C] bg-[#FFF5EB] px-3 py-2"
                    >
                      <span className="sr-only">
                        Fiacahya Assistant sedang mengetik
                      </span>
                      <span className="h-1.5 w-1.5 rounded-full bg-[#3A261A] opacity-60 animate-bounce" />
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-[#3A261A] opacity-60 animate-bounce"
                        style={{ animationDelay: "0.15s" }}
                      />
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-[#3A261A] opacity-60 animate-bounce"
                        style={{ animationDelay: "0.3s" }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <form
                onSubmit={handleSubmit}
                className="border-t border-[#E3C9A8]/80 bg-white px-3 py-2 flex items-end gap-2 dark:bg-[#050505]/95 dark:border-neutral-800"
              >
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={handleInputChange}
                  rows={1}
                  placeholder='Tulis pertanyaan, misalnya: “Estimasi kapasitas untuk 100 pax besok pagi?”'
                  className="flex-1 rounded-2xl border border-[#E3C9A8]/80 bg-white px-3 py-2 text-xs text-[#3A261A] focus:outline-none focus:ring-2 focus:ring-[#F4C58A]/80 focus:border-[#C48A4A] dark:bg-[#111111] dark:text-neutral-100 dark:border-neutral-700 dark:focus:ring-amber-200/60 dark:focus:border-amber-300 resize-none overflow-hidden"
                  style={{ minHeight: "2.5rem", maxHeight: "7.5rem" }}
                />

                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  aria-label="Kirim"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#3E2A20] text-white shadow-[0_12px_30px_rgba(0,0,0,0.35)] disabled:opacity-40 disabled:shadow-none hover:-translate-y-0.5 active:translate-y-0 transition-transform dark:bg-[#F5E2C8] dark:text-[#2A170F]"
                >
                  {loading ? (
                    <span className="h-3 w-3 animate-spin rounded-full border-[2px] border-white/60 border-t-transparent" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
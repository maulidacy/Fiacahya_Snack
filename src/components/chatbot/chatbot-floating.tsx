"use client";

import { useRef, useState } from "react";
import { MessageCircle, X, Loader2 } from "lucide-react";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export function ChatbotFloating() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "intro",
      role: "assistant",
      content:
        "Halo, saya Asisten Produksi AI FiaCahya Snack. Tanyakan apa saja seputar batch produksi, SOP kue basah, atau status QC (contoh data).",
    },
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const autoResizeTextarea = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto"; // reset
    const maxHeight = 120; // px, kira-kira 4–5 baris
    el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsSending(true);
    autoResizeTextarea(); // reset tinggi setelah dikosongkan

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = (await res.json().catch(() => null)) as
        | { reply?: string }
        | null;

      const replyText =
        data?.reply ??
        "Ini adalah respon dummy dari /api/chat. Nanti endpoint ini bisa diganti dengan model AI generatif sesuai kebutuhan produksi FiaCahya Snack.";

      const assistantMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: replyText,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "assistant",
          content:
            "Maaf, terjadi kendala saat menghubungi server. Silakan coba lagi nanti atau hubungi admin.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 md:bottom-6 md:right-6">
      {/* Panel chat */}
      {isOpen && (
        <div className="pointer-events-auto w-[min(100vw-2rem,22rem)] rounded-3xl border border-gray-200 bg-white/98 shadow-soft backdrop-blur-sm dark:border-border-soft-dark dark:bg-neutral-900/98">
          {/* Header */}
          <div className="flex items-center justify-between gap-2 border-b border-gray-100 px-4 py-3 text-sm dark:border-border-soft-dark">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-50">
                  Asisten Produksi AI
                </span>
                <span className="rounded-full bg-pandan/25 px-2 py-[2px] text-[10px] font-semibold text-coffee">
                  Beta
                </span>
              </div>
              <p className="mt-0.5 text-[11px] text-gray-500 dark:text-gray-400">
                Contoh UI untuk menjawab pertanyaan SOP, batch, dan QC.
              </p>
            </div>
            <button
              type="button"
              onClick={handleToggle}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-border-soft-dark dark:text-gray-300 dark:hover:bg-neutral-800 dark:hover:text-gray-100"
              aria-label="Tutup asisten AI"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Area pesan */}
          <div className="max-h-80 space-y-3 overflow-y-auto px-4 py-3 text-sm">
            {messages.map((m) => (
              <ChatBubble key={m.id} role={m.role} content={m.content} />
            ))}
            {isSending && (
              <div className="flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Asisten sedang menyusun jawaban…</span>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-gray-100 px-3 py-2.5 text-sm dark:border-border-soft-dark"
          >
            <div className="flex items-end gap-2">
              <textarea
                ref={textareaRef}
                rows={1}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  autoResizeTextarea();
                }}
                onInput={autoResizeTextarea}
                placeholder="Tanyakan misalnya: status batch klepon, SOP pengukusan, dll…"
                className="flex-1 resize-none overflow-hidden rounded-2xl border border-gray-200 bg-bg-light px-3 py-2 text-xs text-gray-900 outline-none placeholder:text-gray-400 focus:border-coffee focus:ring-1 focus:ring-coffee/60 dark:border-border-soft-dark dark:bg-neutral-900 dark:text-gray-100 dark:placeholder:text-gray-500"
              />
              <button
                type="submit"
                disabled={!input.trim() || isSending}
                className="inline-flex h-9 items-center justify-center rounded-2xl bg-coffee px-3 text-xs font-semibold text-white shadow-soft transition hover:bg-[#4b3428] disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                {isSending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Kirim"
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Floating button */}
      <button
        type="button"
        onClick={handleToggle}
        className="pointer-events-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-coffee text-white shadow-soft transition hover:bg-[#4b3428] focus:outline-none focus:ring-2 focus:ring-coffee/70 focus:ring-offset-2 focus:ring-offset-bg-light dark:focus:ring-offset-bg-dark"
        aria-label="Buka Asisten Produksi AI"
      >
        <MessageCircle className="h-5 w-5" />
      </button>
    </div>
  );
}

function ChatBubble({
  role,
  content,
}: {
  role: "user" | "assistant";
  content: string;
}) {
  const isUser = role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } text-xs leading-relaxed`}
    >
      <div
        className={[
          "max-w-[80%] rounded-2xl border px-3 py-2",
          isUser
            ? "border-coffee bg-coffee text-white"
            : "border-gray-200 bg-bg-light text-gray-900 dark:border-border-soft-dark dark:bg-neutral-900 dark:text-gray-100",
        ].join(" ")}
      >
        {content}
      </div>
    </div>
  );
}

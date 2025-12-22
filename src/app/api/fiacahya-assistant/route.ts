// src/app/api/fiacahya-assistant/route.ts
import OpenAI from "openai";
import { NextResponse } from "next/server";
import { buildRecommendationReply, type RecommendSeed } from "@/lib/recommendation";

export const runtime = "nodejs";

const FIACAHYA_ASSISTANT_SYSTEM_PROMPT = `
Kamu adalah asisten produksi & pemesanan Fiacahya Snack.

• Brand: Fiacahya Snack
• Lokasi utama: Desa Tungu RT.12/RW.02 Kec. Godong, Kab. Grobogan
• Lini produk: kue basah, kue kering, cake/tart, snack box & paket acara.
• Gaya bahasa: ramah, jelas, singkat, pakai bahasa Indonesia, panggil "kak".

Aturan penting:
1. Jawab maksimal 3-4 kalimat. Untuk pertanyaan sederhana cukup 1–2 kalimat.
2. Jawab spesifik, jangan mengulang informasi yang sudah disebut di chat sebelumnya.
3. Fokus pada: menu, harga, paket snack box, cara pesan, jam produksi, estimasi kapasitas.
4. Jika harga / paket tidak ada di data sistem, jangan mengarang. Jelaskan bahwa harga bisa berubah dan arahkan untuk konfirmasi via WhatsApp Fiacahya Snack.
5. Kalau pertanyaannya di luar konteks snack / bakery, jawab singkat bahwa kamu hanya asisten untuk Fiacahya Snack.
`;

type RequestBody = {
  message?: unknown;
  mode?: unknown;
  seed?: unknown;
};

function toSeed(seedRaw: unknown): RecommendSeed {
  if (!seedRaw || typeof seedRaw !== "object") return {};
  const s = seedRaw as Partial<RecommendSeed>;
  return {
    occasion: typeof s.occasion === "string" ? s.occasion : undefined,
    time:
      s.time === "pagi" || s.time === "siang" || s.time === "sore" || s.time === "malam"
        ? s.time
        : undefined,
    peopleCount: typeof s.peopleCount === "number" ? s.peopleCount : undefined,
  };
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as RequestBody;

    const userMessage =
      typeof body?.message === "string" ? body.message.trim() : "";

    const mode =
      typeof body?.mode === "string" ? body.mode : "default";

    const seed = toSeed(body?.seed);

    if (!userMessage) {
      return NextResponse.json({ error: "Pesan tidak valid." }, { status: 400 });
    }

    // 1) Jalur rekomendasi lokal (hemat token)
    const rec = buildRecommendationReply(userMessage, mode === "recommend", seed);
    if (rec) {
      return NextResponse.json({
        reply: rec.reply,
        meta: { recommendState: rec.done ? "done" : "ask" }, // FIX: pakai done
      });
    }

    // 2) Selain itu → OpenAI
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Konfigurasi server belum lengkap (API key belum di-set)." },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      timeout: 15000,
    });

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        { role: "system", content: FIACAHYA_ASSISTANT_SYSTEM_PROMPT },
        { role: "user", content: userMessage },
      ],
      max_tokens: 220,
      temperature: 0.4,
    });

    const reply = completion.choices[0]?.message?.content?.trim() ?? "";
    if (!reply) {
      return NextResponse.json(
        { error: "Jawaban dari model kosong." },
        { status: 500 }
      );
    }

    return NextResponse.json({ reply, meta: { recommendState: "none" } });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "unknown error";
    return NextResponse.json(
      {
        error: "Maaf kak, asisten lagi ada kendala. Coba lagi sebentar, ya.",
        detail: message,
      },
      { status: 500 }
    );
  }
}

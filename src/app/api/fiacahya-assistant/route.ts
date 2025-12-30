// src/app/api/fiacahya-assistant/route.ts
import OpenAI from "openai";
import { NextResponse } from "next/server";
import { buildRecommendationReply, type RecommendSeed } from "@/lib/recommendation";
import { ORDER_INFO, FAQ_GLOBAL } from "@/data/paket-snack";

export const runtime = "nodejs";

const FIACAHYA_ASSISTANT_SYSTEM_PROMPT = `
Kamu adalah asisten produksi & pemesanan Fiacahya Snack.

Info operasional:
- Jam produksi: ${ORDER_INFO.jamProduksi}
- Jam admin: ${ORDER_INFO.jamAdmin}
- Cut off order besar: ${ORDER_INFO.cutOffOrderBesar}
- Lokasi: ${ORDER_INFO.lokasiSingkat}

FAQ:
${FAQ_GLOBAL.map((x) => `Q: ${x.q}\nA: ${x.a}`).join("\n\n")}

Aturan penting:
1. Gaya bahasa: ramah, jelas, singkat, pakai bahasa Indonesia, panggil "kak".
2. Jawab maksimal 3-4 kalimat. Untuk pertanyaan sederhana cukup 1–2 kalimat.
3. Jawab spesifik, jangan mengulang informasi yang sudah disebut di chat sebelumnya.
4. Fokus pada: menu, harga, paket snack box, cara pesan, jam produksi, estimasi kapasitas.
5. Jika harga/paket tidak ada di data sistem, jangan mengarang. Jelaskan bahwa harga bisa berubah dan arahkan untuk konfirmasi via WhatsApp Fiacahya Snack.
6. Kalau pertanyaannya di luar konteks snack/bakery, jawab singkat bahwa kamu hanya asisten untuk Fiacahya Snack.
`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userMessage = (body?.message ?? "").toString().trim();
    const mode = (body?.mode ?? "default").toString();
    const rawSeed = (body?.seed ?? {}) as Partial<RecommendSeed> & {
      preference?: "gurih" | "manis" | "campur";
    };

    const nonce =
      (body?.nonce ?? "").toString() ||
      `${Date.now()}-${Math.random().toString(16).slice(2)}`;

    const seed: RecommendSeed = {
      ...rawSeed,
      nonce,
      taste: rawSeed?.taste ?? rawSeed?.preference,
    };

    if (!userMessage) {
      return NextResponse.json({ error: "Pesan tidak valid." }, { status: 400 });
    }

    // 1) Jalur rekomendasi lokal
    const rec = buildRecommendationReply(userMessage, mode === "recommend", seed);
    if (rec) {
      return NextResponse.json({
        reply: rec.reply,
        meta: { recommendState: rec.done ? "done" : "ask" },
      });
    }

    // 2) Selain itu → OpenAI
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Konfigurasi server belum lengkap (API key belum di-set)." },
        { status: 500 }
      );
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, timeout: 15000 });

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
    if (!reply) return NextResponse.json({ error: "Jawaban dari model kosong." }, { status: 500 });

    return NextResponse.json({ reply, meta: { recommendState: "none" } });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "unknown error";
    return NextResponse.json(
      { error: "Maaf kak, asisten lagi ada kendala. Coba lagi sebentar, ya.", detail: message },
      { status: 500 }
    );
  }
}

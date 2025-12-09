// src/app/api/fiacahya-assistant/route.ts
import OpenAI from "openai";
import { NextResponse } from "next/server";

// pastikan pakai Node runtime (bukan edge)
export const runtime = "nodejs";

const FIACA_HARDCODED_CONTEXT = `
Kamu adalah asisten produksi & pemesanan Fiacahya Snack.

• Brand: Fiacahya Snack
• Lokasi utama: Gubug, Grobogan
• Lini produk: kue basah, kue kering, cake/tart, snack box & paket acara.
• Gaya bahasa: ramah, jelas, singkat, pakai bahasa Indonesia, panggil "kak".

Aturan penting:
1. Jawab maksimal 3–4 kalimat. Untuk pertanyaan sederhana cukup 1–2 kalimat.
2. Jawab spesifik, jangan mengulang informasi yang sudah disebut di chat sebelumnya.
3. Fokus pada: menu, harga, paket snack box, cara pesan, jam produksi, estimasi kapasitas.
4. Jika harga / paket tidak ada di data sistem, jangan mengarang. Jelaskan bahwa harga bisa berubah dan arahkan untuk konfirmasi via WhatsApp Fiacahya Snack.
5. Kalau pertanyaannya di luar konteks snack / bakery, jawab singkat bahwa kamu hanya asisten untuk Fiacahya Snack.
`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userMessage = (body?.message ?? "").toString().trim();

    if (!userMessage) {
      return NextResponse.json(
        { error: "Pesan tidak valid." },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY belum di-set");
      return NextResponse.json(
        {
          error:
            "Konfigurasi server belum lengkap (API key belum di-set). Hubungi admin Fiacahya.",
        },
        { status: 500 }
      );
    }

    // INISIALISASI CLIENT DI DALAM HANDLER, BUKAN DI TOP-LEVEL
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      // optional: timeout untuk request (bukan untuk build)
      timeout: 15000,
    });

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        { role: "system", content: FIACA_HARDCODED_CONTEXT },
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

    return NextResponse.json({ reply });
  } catch (err: unknown) {
    console.error("Fiacahya assistant error:", err);
    const message =
      err instanceof Error ? err.message : "unknown error";

    return NextResponse.json(
      {
        error:
          "Maaf kak, asisten lagi ada kendala saat menghubungi server AI. Coba lagi sebentar, ya.",
        detail: message,
      },
      { status: 500 }
    );
  }
}

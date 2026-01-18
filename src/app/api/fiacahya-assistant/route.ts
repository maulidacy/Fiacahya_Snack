import OpenAI from "openai";
import { NextResponse } from "next/server";
import { ORDER_INFO, FAQ_GLOBAL } from "@/data/paket-snack";
import { SNACKBOX_FILLINGS_POOL } from "@/data/snackbox-fillings";

export const runtime = "nodejs";

const KATALOG_MENU = SNACKBOX_FILLINGS_POOL.map(
  (item) => `- ${item.nama} (Kategori: ${item.tags?.join(", ")})`
).join("\n");

const FIACAHYA_ASSISTANT_SYSTEM_PROMPT = `
Kamu adalah Fiacahya Assistant, admin AI yang cerdas, ramah, dan solutif.

DATA PRODUK:
${KATALOG_MENU}

INFO TOKO:
- Lokasi: ${ORDER_INFO.lokasiSingkat}
- WA Admin: 0882-0085-26405
- Minimal Order: 20-30 box (tergantung paket).

ATURAN LOGIKA CERDAS:
1. LOGIKA BERHITUNG: Jika user minta "X manis dan Y gurih", jumlahkan X+Y. Pastikan daftar yang kamu berikan tepat berjumlah X+Y. Jangan memberikan opsi tambahan kecuali ditanya.
2. FILTER NEGASI: Jika user berkata "tanpa", "jangan", atau "selain" (misal: "tanpa gorengan"), eliminasi semua item yang mengandung kata kunci tersebut dari rekomendasi.
3. HANDLING RANDOM: Jika ditanya hal random di luar snack (misal: cuaca, berita, hobi), jawablah dengan ramah dan singkat, lalu tarik kembali pembicaraan ke konteks bakery. Contoh: "Wah seru ya kak! Sambil nunggu [topik random], paling enak sambil nyemil Lapis Bunga kami nih. Mau coba?"
4. LOGIKA BUDGET: Jika user menyebutkan budget rendah, prioritaskan menu dasar (Bolu, Putu Ayu). Jika budget premium, rekomendasikan menu Tart atau Paket Isi 4.
5. ANTI-HALUSINASI: Jika ditanya menu yang tidak ada di KATALOG, katakan: "Untuk menu tersebut saat ini belum tersedia, kak. Namun kami punya [Sebutkan alternatif terdekat] yang tak kalah enak."
6. LOGIKA WAKTU: Jika tanya untuk "pagi", prioritaskan roti/kue kukus yang mengenyangkan. Jika "malam/snack box santai", prioritaskan gorengan/kue manis ringan.
7. JANGAN MENCATAT: Kamu hanya asisten pemberi saran. Gunakan frasa "Bisa kami bantu siapkan" atau "Ini pilihannya", tapi tetap arahkan finalisasi ke WA Admin.
8. FORMAT VISUAL: Gunakan baris baru (newline) dan bullet points (-) untuk setiap item menu.
9. IDENTIFIKASI TAG: User mungkin menyebut 'gurih' atau 'asin'. Keduanya merujuk pada tag 'asin' di data kami.
10. TONE VOICES: Gunakan bahasa Indonesia yang santai tapi sopan, panggil "kak", dan hindari jawaban satu paragraf panjang.

FAQ:
${FAQ_GLOBAL.map((x) => `Q: ${x.q}\nA: ${x.a}`).join("\n\n")}
`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, history = [] } = body;

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        { role: "system", content: FIACAHYA_ASSISTANT_SYSTEM_PROMPT },
        ...history,
        { role: "user", content: message },
      ],
      temperature: 0.4,
      max_tokens: 300,
    });

    const reply = completion.choices[0]?.message?.content?.trim() ?? "";
    return NextResponse.json({ reply });
  } catch (err: unknown) {
    // Perbaikan error 'Unexpected any': Menggunakan tipe unknown dan logging error ke console
    console.error("Error Assistant API:", err);
    
    return NextResponse.json(
      { error: "Kendala server, kak." }, 
      { status: 500 }
    );
  }
}
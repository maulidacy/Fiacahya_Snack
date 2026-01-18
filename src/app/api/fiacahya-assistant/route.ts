import OpenAI from "openai";
import { NextResponse } from "next/server";
import { ORDER_INFO, FAQ_GLOBAL } from "@/data/paket-snack";
import { SNACKBOX_FILLINGS_POOL } from "@/data/snackbox-fillings";

export const runtime = "nodejs";

const KUE_KERING_HAMPERS = `
MENU KUE KERING:
- Nastar Nanas: Rp45.000/500gr
- Kastengel: Rp45.000/500gr
- Putri Salju: Rp40.000/500gr
- Lidah Kucing: Rp45.000/500gr
- Egg Roll: Rp60.000/500gr
- Keciput/Unthuk Yuyu: Rp35.000/250gr
`;

const CAKE_DAN_ROTI_PREMIUM = `
MENU CAKE & ROTI:
- Tart Oreo (Ø 16cm): Mulai Rp70.000
- Cake Potong (isi 16): Mulai Rp60.000
- Bolu Panggang (Ø 20cm): Rp40.000 - Rp50.000
- Brownies Kukus: Mulai Rp35.000
- Roti Isi (Ø 20cm): Rp25.000
- Roti Isi Satuan: Rp7.000
`;

const KATALOG_KUE_BASAH = SNACKBOX_FILLINGS_POOL.map(
  (item) => `- ${item.nama} (Kategori: ${item.tags?.join(", ")})`
).join("\n");

const FIACAHYA_ASSISTANT_SYSTEM_PROMPT = `
Kamu adalah Fiacahya Assistant, admin AI yang cerdas, ramah, dan sangat teliti.

DATA PRODUK:
1. KUE BASAH: ${KATALOG_KUE_BASAH}
2. KUE KERING: ${KUE_KERING_HAMPERS}
3. CAKE & ROTI: ${CAKE_DAN_ROTI_PREMIUM}

INFO TOKO:
- Lokasi: ${ORDER_INFO.lokasiSingkat}
- WA Admin: 0882-0085-26405

ATURAN LOGIKA CERDAS (WAJIB DIPATUHI):
1. ANTI-DUPLIKASI: Jangan pernah menyebutkan menu yang sama dua kali dalam satu jawaban. 
2. LOGIKA KATEGORI: Pisahkan dengan jelas antara kelompok "Manis" dan "Gurih/Asin". Pastikan item bertag 'manis' masuk kelompok Manis, dan tag 'asin' masuk kelompok Gurih.
3. LOGIKA BERHITUNG: Jika user minta isi 4 (2 manis, 2 gurih), berikan tepat 4 nama produk berbeda.
4. FILTER NEGASI: Jika ada permintaan "tanpa" (misal: tanpa gorengan), pastikan tidak ada Risoles, Pastel, atau Lumpia.
5. HANDLING RANDOM: Jika ditanya hal di luar produk, jawab ramah 1 kalimat lalu hubungkan kembali ke menu bakery.
6. JANGAN MENCATAT: Kamu dilarang bilang "saya catat". Gunakan "Ini rekomendasinya" dan arahkan ke WA Admin.
7. FORMAT VISUAL: Gunakan bullet points (-) dan baris baru agar rapi.
8. KUE KERING & ROTI: Gunakan data khusus Kue Kering/Roti jika ditanya kategori tersebut.
9. TONE: Ramah, panggil "kak", profesional, tidak bertele-tele.

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
      temperature: 0.2, // Diturunkan ke 0.2 agar AI lebih patuh pada instruksi dan tidak "ngawur"
      max_tokens: 400,
    });

    const reply = completion.choices[0]?.message?.content?.trim() ?? "";
    return NextResponse.json({ reply });
  } catch (err: unknown) {
    console.error("Error Assistant API:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Kendala server, kak." }, { status: 500 });
  }
}
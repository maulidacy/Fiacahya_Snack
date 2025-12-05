import { NextResponse } from "next/server";

type ChatBody = {
  message?: string;
  history?: { role: "user" | "assistant"; content: string }[];
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as ChatBody;
  const lastMessage = body.message?.trim() || "Pertanyaan tidak terbaca.";

  // Di sini nanti bisa diganti panggilan ke model AI sungguhan
  const reply = [
    "Ini contoh respon dummy dari Asisten Produksi AI.",
    "",
    `Anda bertanya: "${lastMessage}"`,
    "",
    "Di implementasi sebenarnya, endpoint ini bisa:",
    "- Membaca data batch / QC dari database.",
    "- Mengambil SOP dari dokumen internal.",
    "- Menjawab dengan model AI generatif.",
  ].join("\n");

  return NextResponse.json({ reply });
}

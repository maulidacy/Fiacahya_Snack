import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  return NextResponse.json({
    reply: `Dummy reply FiaCahya Snack: saya menerima pesan "${message}". Integrasi AI bisa ditambahkan di sini.`,
  });
}

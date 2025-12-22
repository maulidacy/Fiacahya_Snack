// src/config/fiacahya-data.ts
import { PAKET_SNACK, getCategoryBySlug, SnackCategorySlug } from "@/data/paket-snack";

export const FIACAHYA_PROFILE = {
  brandName: "Fiacahya Snack",
  tagline: "Premium Bakery & Snack",
  lokasiSingkat: "Godong, Grobogan",
  alamatLengkap:
    "Produksi rumahan di Godong, Grobogan (detail alamat dibagikan saat konfirmasi order).",
  jamOperasional: {
    produksi: "04.00 - 16.00 WIB",
    cutOffOrderBesar: "H-1 pukul 15.00 WIB",
  },
  kontak: {
    whatsappAdmin: "0882-0085-26405",
    email: "fiacahyasnackk@gmail.com",
    instagram: "@fiacahya.snack",
  },
  catatanUmum:
    "Sebagian harga bisa berubah tergantung bahan baku & volume order. Harga final akan dikonfirmasi oleh admin.",
};

export const METODE_PEMBAYARAN = [
  "Transfer bank (detail dikirim oleh admin saat konfirmasi pesanan).",
  "E-wallet tertentu bila tersedia (info terbaru mengikuti konfirmasi admin).",
];

export {
  PAKET_SNACK,
  getCategoryBySlug,
};
export type { SnackCategorySlug };

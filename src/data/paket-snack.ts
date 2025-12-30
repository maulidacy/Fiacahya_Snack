// src/data/paket-snack.ts
export type SnackCategorySlug =
  | "kue-basah"
  | "kue-kering"
  | "kue-tart-cake"
  | "snack-box-paket";

export type HargaTipe = "per-pcs" | "per-box" | "per-pax" | "paket";

export type Tag =
  | "manis"
  | "asin"
  | "pedas"
  | "favorit"
  | "anak-anak"
  | "rapat"
  | "pengajian"
  | "wedding"
  | "coffee-shop"
  | "hampers";

export interface SnackItem {
  id: string;
  nama: string;
  deskripsi?: string;

  // opsional kalau beda dari default kategori
  labelHarga?: string;
  minimalOrder?: string;

  cocokUntuk?: string;
  catatanTambahan?: string;

  // untuk rekomendasi chatbot (ringkas, hemat token)
  tags?: Tag[];
}

export interface CategoryDefaults {
  labelHargaDefault?: string; // biar gak ngulang di tiap item
  minimalOrderDefault?: string;
  leadTimeDefault?: string; // mis: H-1 15.00
  allowMix?: boolean;
  notes?: string[];
}

export interface SnackCategory {
  slug: SnackCategorySlug;
  namaKategori: string;
  deskripsiSingkat: string;
  tipeHargaUtama: HargaTipe;
  defaults?: CategoryDefaults;
  items: SnackItem[];
}

/** Info global (yang sering ditanya) */
export const ORDER_INFO = {
  lokasiSingkat: "Godong, Grobogan",
  jamProduksi: "16.00 - 05.00 WIB",
  jamAdmin: "08.00 - 20.00 WIB",
  cutOffOrderBesar: "H-1 pukul 15.00 WIB",
  pembayaran: [
    "Transfer bank (detail dikirim saat konfirmasi).",
    "E-wallet tertentu bila tersedia (mengikuti konfirmasi admin).",
  ],
  catatanHarga:
    "Sebagian harga bisa berubah tergantung bahan baku & volume order. Harga final dikonfirmasi admin.",
} as const;

/** FAQ super ringkas untuk chatbot */
export const FAQ_GLOBAL = [
  {
    q: "Bisa mix varian dalam 1 box?",
    a: "Bisa, varian bisa dicampur sesuai stok hari itu. Untuk paket acara, admin bantu susun komposisinya.",
  },
  {
    q: "Minimal order snack box berapa?",
    a: "Umumnya minimal 20-30 box (tergantung paket). Untuk acara besar, disarankan konfirmasi lebih awal.",
  },
  {
    q: "Bisa request tanpa pedas/preferensi tertentu?",
    a: "Bisa. Info pantangan/alergi dan preferensi manis/asin boleh ditulis saat pesan.",
  },
  {
    q: "Cara pesan gimana?",
    a: "Cukup kirim kategori, jumlah, tanggal, dan lokasi. Admin konfirmasi menu, slot produksi, dan total harga.",
  },
] as const;

export const PAKET_SNACK: SnackCategory[] = [
  {
    slug: "snack-box-paket",
    namaKategori: "Snack Box & Paket Acara",
    deskripsiSingkat:
      "Paket snack box untuk rapat kantor, pengajian, dan acara keluarga.",
    tipeHargaUtama: "per-box",
    defaults: {
      minimalOrderDefault: "30 box",
      leadTimeDefault: "H-1 pukul 15.00 WIB (untuk order besar)",
      allowMix: true,
      notes: ["Isi paket bisa disesuaikan budget & preferensi manis/asin."],
    },
    items: [
      {
        id: "sb-isi-3",
        nama: "Snack Box Isi 3 Item",
        deskripsi: "Umumnya 2 kue basah + 1 kudapan kering.",
        labelHarga: "Mulai Rp6.000/box",
        minimalOrder: "50 box",
        cocokUntuk: "Rapat singkat, pengajian, acara keluarga kecil",
        tags: ["rapat", "pengajian", "favorit"],
      },
      {
        id: "sb-isi-4",
        nama: "Snack Box Isi 4 Item",
        deskripsi: "Kombinasi manis & asin, bisa ditambah gorengan pilihan.",
        labelHarga: "Mulai Rp8.000/box",
        minimalOrder: "50 box",
        cocokUntuk: "Meeting kantor & acara komunitas",
        tags: ["rapat", "favorit"],
      },
      {
        id: "sb-pagi",
        nama: "Snack Box Pagi (kue + roti + air mineral)",
        deskripsi: "Cocok untuk acara pagi hari atau pelatihan.",
        labelHarga: "Mulai Rp10.000/box",
        minimalOrder: "50 box",
        cocokUntuk: "Pelatihan, seminar pagi, acara kampus",
        tags: ["rapat"],
      },
      {
        id: "sb-arisan",
        nama: "Paket Arisan/Pengajian",
        deskripsi: "Isi bisa dikustom sesuai kebutuhan dan budget.",
        labelHarga: "Mulai Rp6.000/orang (estimasi)",
        minimalOrder: "50 paket",
        cocokUntuk: "Arisan, pengajian, kumpul keluarga",
        catatanTambahan:
          "Detail isi & harga final disesuaikan dan dikonfirmasi admin.",
        tags: ["pengajian", "favorit"],
      },
      {
        id: "sb-kantor-rutin",
        nama: "Paket Kantor Rutin (mingguan/bulanan)",
        deskripsi: "Snack box berulang untuk kantor atau instansi.",
        labelHarga: "By request (harga khusus kontrak)",
        cocokUntuk: "Kontrak rutin kantor/instansi",
        catatanTambahan:
          "Harga & isi paket disusun khusus sesuai kebutuhan perusahaan.",
        tags: ["rapat"],
      },
    ],
  },

  {
    slug: "kue-basah",
    namaKategori: "Kue Basah",
    deskripsiSingkat: "Kue tradisional dengan tampilan rapi, diproduksi harian.",
    tipeHargaUtama: "per-pcs",
    defaults: {
      labelHargaDefault: "Rp1.500/pcs",
      allowMix: true,
      notes: ["Harga fix untuk kategori kue basah (varian sesuai stok harian)."],
    },
    items: [
      { id: "kb-putu-ayu", nama: "Putu Ayu", deskripsi: "Lembut, wangi pandan, topping kelapa gurih.", tags: ["manis", "favorit"] },
      { id: "kb-lapis", nama: "Lapis Bunga", deskripsi: "Lapis warna-warni, kenyal manis lembut.", tags: ["manis"] },
      { id: "kb-dadar", nama: "Dadar Gulung", deskripsi: "Kulit pandan lembut, isi kelapa gula merah.", tags: ["manis"] },
      { id: "kb-bolu-kukus", nama: "Bolu Kukus Mekar", deskripsi: "Empuk, mekar cantik, cocok snack box.", tags: ["manis", "anak-anak"] },
      { id: "kb-lemper", nama: "Lemper", deskripsi: "Ketan pulen, isi ayam suwir gurih.", tags: ["asin", "favorit"] },
      { id: "kb-arem", nama: "Arem-arem", deskripsi: "Nasi padat berbumbu, isi sayur/lauk gurih.", tags: ["asin"] },
      { id: "kb-risoles", nama: "Risoles", deskripsi: "Kulit tipis, isi ragout gurih, renyah.", tags: ["asin", "favorit"] },
      { id: "kb-pastel", nama: "Pastel", deskripsi: "Kulit renyah, isi sayur & telur.", tags: ["asin"] },
    ],
  },

  {
    slug: "kue-kering",
    namaKategori: "Kue Kering",
    deskripsiSingkat: "Produksi musiman & reguler untuk hampers dan gift.",
    tipeHargaUtama: "paket",
    defaults: {
      labelHargaDefault: "Harga menyesuaikan isi & musim (konfirmasi admin).",
      notes: ["Cocok untuk hampers dan parcel perusahaan."],
    },
    items: [
      { id: "kb-putu-ayu", nama: "Putu Ayu", deskripsi: "Lembut, wangi pandan, topping kelapa gurih.", tags: ["manis", "favorit"] },
      { id: "kb-lapis", nama: "Lapis Bunga", deskripsi: "Lapis warna-warni, kenyal manis lembut.", tags: ["manis"] },
      { id: "kb-dadar", nama: "Dadar Gulung", deskripsi: "Kulit pandan lembut, isi kelapa gula merah.", tags: ["manis"] },
      { id: "kb-bolu-kukus", nama: "Bolu Kukus Mekar", deskripsi: "Empuk, mekar cantik, cocok snack box.", tags: ["manis", "anak-anak"] },

      { id: "kb-lemper", nama: "Lemper", deskripsi: "Ketan pulen, isi ayam suwir gurih.", tags: ["asin", "favorit"] },
      { id: "kb-arem", nama: "Arem-arem", deskripsi: "Nasi padat berbumbu, isi sayur/lauk gurih.", tags: ["asin"] },
      { id: "kb-risoles", nama: "Risoles", deskripsi: "Kulit tipis, isi ragout gurih, renyah.", tags: ["asin", "favorit"] },
      { id: "kb-pastel", nama: "Pastel", deskripsi: "Kulit renyah, isi sayur & telur.", tags: ["asin"] },

      // tambahan
      { id: "kb-lumpia", nama: "Lumpia Sayur/Ayam", deskripsi: "Kulit lumpia renyah, isi gurih.", tags: ["asin", "favorit"] },
      { id: "kb-onde-ketawa", nama: "Onde-onde Ketawa", deskripsi: "Goreng renyah, aroma wijen.", tags: ["manis"] },
      { id: "kb-kue-lumpur", nama: "Kue Lumpur", deskripsi: "Lembut, rasa santan dan kentang.", tags: ["manis"] },
      { id: "kb-donat", nama: "Donat", deskripsi: "Empuk, topping gula/meses.", tags: ["manis", "anak-anak"] },
      { id: "kb-kroket", nama: "Kroket", deskripsi: "Isi kentang gurih, cocok pendamping.", tags: ["asin"] },
      { id: "kb-tahu-bakso", nama: "Tahu Bakso", deskripsi: "Tahu berisi adonan bakso lembut.", tags: ["asin"] },
      { id: "kb-tahu-mercon", nama: "Tahu Mercon", deskripsi: "Isi pedas gurih, untuk yang suka pedas.", tags: ["pedas"] },
      { id: "kb-pisang-crispy", nama: "Pisang Crispy", deskripsi: "Pisang balut tepung, renyah manis.", tags: ["manis", "anak-anak"] },
      { id: "kb-wingko", nama: "Wingko Babat", deskripsi: "Kue kelapa panggang aroma khas.", tags: ["manis"] },
      { id: "kb-serabi", nama: "Serabi", deskripsi: "Kue tradisional khas Jawa Barat.", tags: ["manis"] },
    ],
  },

  {
    slug: "kue-tart-cake",
    namaKategori: "Kue Tart & Bolu Panggang",
    deskripsiSingkat: "Tart dekoratif dan bolu panggang untuk berbagai acara.",
    tipeHargaUtama: "paket",
    defaults: {
      labelHargaDefault: "Harga menyesuaikan ukuran & dekor (konfirmasi admin).",
      notes: ["Bisa custom ucapan & tema warna."],
    },
    items: [
      {
        id: "kt-fresh-cream-16",
        nama: "Tart Fresh Cream Ø 16 cm",
        labelHarga: "Mulai Rp180.000",
        deskripsi: "Manis seimbang, dekor minimalis, topping bisa custom.",
        tags: ["wedding", "favorit"],
      },
      {
        id: "kt-fresh-cream-20",
        nama: "Tart Fresh Cream Ø 20 cm",
        labelHarga: "Mulai Rp120.000",
        deskripsi: "Cocok untuk 15–20 orang, bisa request tulisan.",
        tags: ["wedding", "favorit"],
      },
      {
        id: "kt-butter-cake",
        nama: "Butter Cake Loyang",
        labelHarga: "Mulai Rp40.000/loyang",
        deskripsi: "Tekstur padat lembut, enak untuk potong-potong.",
        tags: ["coffee-shop"],
      },
      {
        id: "kt-brownies",
        nama: "Brownies Panggang",
        labelHarga: "Mulai Rp35.000/loyang",
        deskripsi: "Cokelat intens, cocok untuk slice & coffee pairing.",
        tags: ["coffee-shop", "favorit"],
      },
    ],
  },
];

export function getCategoryBySlug(slug: SnackCategorySlug): SnackCategory | undefined {
  return PAKET_SNACK.find((c) => c.slug === slug);
}

/** Helper hemat token untuk chatbot/UI: harga item fallback ke default */
export function getItemDisplayPrice(cat: SnackCategory, item: SnackItem) {
  return item.labelHarga ?? cat.defaults?.labelHargaDefault ?? "";
}

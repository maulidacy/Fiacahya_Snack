// src/data/snackbox-fillings.ts
import type { SnackItem } from "@/data/paket-snack";

/**
 * Pool khusus isian snack box Fiacahya Snack.
 * Catatan:
 * - Tanpa harga (harga tetap di-handle oleh sistem/admin).
 * - Disusun untuk kebutuhan rekomendasi chatbot agar variasi tidak monoton.
 * - Tag digunakan untuk filter konteks (rapat/pengajian/anak-anak/pedas).
 */
export const SNACKBOX_FILLINGS_POOL: SnackItem[] = [
  // ===== MANIS (KUE BASAH) =====
  {
    id: "sb-putu-ayu",
    nama: "Putu Ayu",
    deskripsi: "Kue kukus lembut dengan parutan kelapa gurih di atasnya.",
    tags: ["manis", "favorit"],
  },
  {
    id: "sb-lapis-bunga",
    nama: "Lapis Bunga",
    deskripsi: "Kue lapis warna-warni dengan tekstur kenyal dan manis lembut.",
    tags: ["manis", "favorit", "pengajian"],
  },
  {
    id: "sb-dadar-gulung-pisang-coklat",
    nama: "Dadar Gulung Pisang Coklat",
    deskripsi: "Dadar gulung dengan isian pisang cokelat lumer di dalam.",
    tags: ["manis", "favorit", "anak-anak"],
  },
  {
    id: "sb-dadar-gulung-kelapa",
    nama: "Dadar Gulung Kelapa",
    deskripsi: "Kulit pandan lembut berisi kelapa manis legit.",
    tags: ["manis", "favorit"],
  },
  {
    id: "sb-onde-ketawa",
    nama: "Onde-onde Ketawa",
    deskripsi: "Kue goreng berlapis wijen dengan tekstur renyah dan berongga.",
    tags: ["manis", "favorit"],
  },
  {
    id: "sb-bolu-kukus-mekar",
    nama: "Bolu Kukus Mekar",
    deskripsi: "Bolu kukus empuk yang mekar cantik, pas untuk snack box.",
    tags: ["manis", "favorit", "anak-anak"],
  },
  {
    id: "sb-wingko-babat",
    nama: "Wingko Babat",
    deskripsi: "Kue tradisional berbahan kelapa dengan aroma panggang khas.",
    tags: ["manis"],
  },
  {
    id: "sb-carabikang",
    nama: "Carabikang",
    deskripsi: "Kue tradisional mekar dengan tekstur agak berserabut dan manis lembut.",
    tags: ["manis"],
  },
  {
    id: "sb-apem",
    nama: "Apem Panggang/Kukus",
    deskripsi: "Kue apem dengan aroma fermentasi ringan, bisa panggang atau kukus.",
    tags: ["manis"],
  },
  {
    id: "sb-lapis-potong",
    nama: "Lapis Potong",
    deskripsi: "Kue lapis potong rapi, manis legit dan tampilan rapi untuk box.",
    tags: ["manis", "favorit"],
  },
  {
    id: "sb-bolu-kukus-gula-merah",
    nama: "Bolu Kukus Gula Merah",
    deskripsi: "Bolu kukus lembut dengan rasa gula merah yang harum.",
    tags: ["manis", "favorit"],
  },
  {
    id: "sb-kue-lumpur",
    nama: "Kue Lumpur",
    deskripsi: "Kue lembut dengan rasa santan dan kentang, topping kismis.",
    tags: ["manis"],
  },
  {
    id: "sb-onde-isi",
    nama: "Onde-onde Isi",
    deskripsi: "Onde-onde wijen dengan isian kacang hijau manis.",
    tags: ["manis", "favorit"],
  },
  {
    id: "sb-rangin",
    nama: "Rangin",
    deskripsi: "Kue tradisional kelapa dengan bagian luar agak garing.",
    tags: ["manis"],
  },
  {
    id: "sb-pukis",
    nama: "Pukis",
    deskripsi: "Kue pukis empuk dengan topping klasik seperti meses atau keju.",
    tags: ["manis", "anak-anak"],
  },
  {
    id: "sb-pisang-crispy",
    nama: "Pisang Crispy",
    deskripsi: "Pisang balut tepung panir, bisa ditambah saus manis bila diperlukan.",
    tags: ["manis", "anak-anak", "favorit"],
  },
  {
    id: "sb-serabi",
    nama: "Serabi",
    deskripsi: "Serabi lembut dengan kuah atau topping manis gurih tradisional.",
    tags: ["manis", "favorit"],
  },

  // ===== GURIH (KUDAPAN) =====
  {
    id: "sb-lumpia",
    nama: "Lumpia Sayur/Ayam",
    deskripsi: "Kulit lumpia renyah dengan isian sayur berbumbu gurih.",
    tags: ["asin", "favorit", "rapat"],
  },
  {
    id: "sb-risoles",
    nama: "Risoles Sayur/Ayam",
    deskripsi:
      "Kulit lumpia renyah dengan balutan tepung panir, isian sayur berbumbu gurih.",
    tags: ["asin", "favorit", "rapat"],
  },
  {
    id: "sb-arem-arem",
    nama: "Arem-arem",
    deskripsi: "Nasi berbumbu berisi isian lauk gurih, dibungkus daun pisang.",
    tags: ["asin", "favorit", "rapat", "pengajian"],
  },
  {
    id: "sb-tahu-bakso",
    nama: "Tahu Bakso",
    deskripsi:
      "Tahu berisi adonan bakso lembut, cocok jadi pendamping kue manis.",
    tags: ["asin", "favorit", "rapat"],
  },
  {
    id: "sb-pastel",
    nama: "Pastel",
    deskripsi: "Kue goreng berisi sayur dengan kulit renyah.",
    tags: ["asin", "rapat"],
  },
  {
    id: "sb-crackers-sayur",
    nama: "Crackers Sayur",
    deskripsi: "Crackers dengan balutan tepung panir berisi sayur berbumbu.",
    tags: ["asin", "rapat"],
  },
  {
    id: "sb-lemper",
    nama: "Lemper Ayam/Daging",
    deskripsi:
      "Ketan pulen berisi ayam suwir gurih/abon daging, dibungkus daun pisang.",
    tags: ["asin", "favorit", "rapat", "pengajian"],
  },
  {
    id: "sb-donat",
    nama: "Donat",
    deskripsi: "Donat lembut dengan taburan gula halus atau meses.",
    tags: ["manis", "anak-anak"],
  },
  {
    id: "sb-kroket",
    nama: "Kroket",
    deskripsi: "Kroket kentang berisi telur puyuh.",
    tags: ["asin", "rapat", "favorit"],
  },
  {
    id: "sb-bolu-panggang-potong",
    nama: "Bolu Panggang Potong",
    deskripsi: "Bolu panggang yang dipotong rapi, cocok untuk porsi snack box.",
    tags: ["manis", "favorit"],
  },

  // ===== PEDAS (OPSIONAL) =====
  {
    id: "sb-tahu-mercon",
    nama: "Tahu Mercon",
    deskripsi: "Tahu isi pedas gurih untuk tamu yang suka sensasi mercon.",
    tags: ["pedas"],
  },
];

/**
 * Ambil pool snackbox (default: tanpa pedas).
 * Pedas hanya muncul kalau user memang minta pedas.
 */
export function getSnackBoxPool(opts?: { allowSpicy?: boolean }) {
  const allowSpicy = opts?.allowSpicy ?? false;
  if (allowSpicy) return SNACKBOX_FILLINGS_POOL;
  return SNACKBOX_FILLINGS_POOL.filter(
    (it) => !(it.tags ?? []).includes("pedas")
  );
}

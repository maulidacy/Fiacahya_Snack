// src/app/produk/[slug]/page.tsx
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Playfair_Display, Montserrat } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
});

type Product = {
  name: string;
  price: string;
  note?: string;
  image?: string;
  includes?: string[]; // khusus paket: contoh isi paket
};

const PRODUCT_DETAIL: Record<
  string,
  {
    title: string;
    intro: string;
    products: Product[];
  }
> = {
  "kue-basah": {
    title: "Kue Basah",
    intro:
      "Pilihan kue basah untuk snack box harian, arisan, dan acara keluarga. Semua diproduksi harian dengan tampilan rapi dan tekstur lembut.",
    products: [
      {
        name: "Putu Ayu",
        price: "Rp1.500/pcs",
        note: "Kue kukus lembut dengan parutan kelapa gurih di atasnya.",
      },
      {
        name: "Lapis Bunga",
        price: "Rp1.500/pcs",
        note: "Kue lapis warna-warni dengan tekstur kenyal dan manis lembut.",
      },
      {
        name: "Dadar Gulung Pisang Coklat",
        price: "Rp1.500/pcs",
        note: "Dadar gulung dengan isian pisang cokelat lumer di dalam.",
      },
      {
        name: "Onde-onde Ketawa",
        price: "Rp1.500/pcs",
        note: "Kue goreng berlapis wijen dengan tekstur renyah dan berongga.",
      },
      {
        name: "Dadar Gulung Kelapa",
        price: "Rp1.500/pcs",
        note: "Kulit pandan lembut berisi kelapa manis legit.",
      },
      {
        name: "Bolu Kukus Mekar",
        price: "Rp1.500/pcs",
        note: "Bolu kukus empuk yang mekar cantik, pas untuk snack box.",
      },
      {
        name: "Wingko Babat",
        price: "Rp1.500/pcs",
        note: "Kue tradisional berbahan kelapa dengan aroma panggang khas.",
      },
      {
        name: "Lumpia Sayur/Ayam",
        price: "Rp1.500/pcs",
        note: "Kulit lumpia renyah dengan isian sayur berbumbu gurih.",
      },
      {
        name: "Risoles Sayur/Ayam",
        price: "Rp1.500/pcs",
        note: "Kulit lumpia renyah dengan balutan tepung panir, isian sayur berbumbu gurih.",
      },
      {
        name: "Arem-arem",
        price: "Rp1.500/pcs",
        note: "Nasi berbumbu berisi isian lauk gurih, dibungkus daun pisang.",
      },
      {
        name: "Tahu Mercon",
        price: "Rp1.500/pcs",
        note: "Tahu isi pedas gurih untuk tamu yang suka sensasi mercon.",
      },
      {
        name: "Tahu Bakso",
        price: "Rp1.500/pcs",
        note: "Tahu berisi adonan bakso lembut, cocok jadi pendamping kue manis.",
      },
      {
        name: "Pastel",
        price: "Rp1.500/pcs",
        note: "Kue goreng berisi sayur dengan kulit renyah.",
      },
      {
        name: "Crackres Sayur",
        price: "Rp1.500/pcs",
        note: "Crackers dengan balutan tepung panir dengan isian sayur berbumbu.",
      },
      {
        name: "Lemper Ayam/Daging",
        price: "Rp1.500/pcs",
        note: "Ketan pulen berisi ayam suwir gurih/Abon daging, dibungkus daun pisang.",
      },
      {
        name: "Carabikang",
        price: "Rp1.500/pcs",
        note: "Kue tradisional mekar dengan tekstur agak berserabut dan manis lembut.",
      },
      {
        name: "Apem Panggang/Kukus",
        price: "Rp1.500/pcs",
        note: "Kue apem dengan aroma fermentasi ringan, bisa panggang atau kukus.",
      },
      {
        name: "Lapis Potong",
        price: "Rp1.500/pcs",
        note: "Kue lapis potong rapi, manis legit dan tampilan rapi untuk box.",
      },
      {
        name: "Bolu Kukus Gula Merah",
        price: "Rp2.000/pcs",
        note: "Bolu kukus lembut dengan rasa gula merah yang harum.",
      },
      {
        name: "Donat",
        price: "Rp2000/pcs",
        note: "Donat lembut dengan taburan gula halus atau meses.",
      },
      {
        name: "Kue Lumpur",
        price: "Rp1.500/pcs",
        note: "Kue lembut dengan rasa santan dan kentang, topping kismis.",
      },
      {
        name: "Onde-onde Isi",
        price: "Rp1.500/pcs",
        note: "Onde-onde wijen dengan isian kacang hijau manis.",
      },
      {
        name: "Kroket",
        price: "Rp2.000/pcs",
        note: "Kroket kentang berisi telur puyuh.",
      },
      {
        name: "Bolu Panggang Potong",
        price: "Rp3.000/pcs",
        note: "Bolu panggang yang dipotong rapi, cocok untuk porsi snack box.",
      },
      {
        name: "Rangin",
        price: "Rp1.500/pcs",
        note: "Kue tradisional kelapa dengan bagian luar agak garing.",
      },
      {
        name: "Pukis",
        price: "Rp1.500/pcs",
        note: "Kue pukis empuk dengan topping klasik seperti meses atau keju.",
      },
      {
        name: "Pisang Crispy",
        price: "Rp1.500/pcs",
        note: "Pisang balut tepung panir, bisa ditambah saus manis bila diperlukan.",
      },
      {
        name: "Serabi",
        price: "Rp1.500/pcs",
        note: "Serabi lembut dengan kuah atau topping manis gurih tradisional.",
      },
    ],
  },

  "kue-kering": {
    title: "Kue Kering",
    intro:
      "Kue kering untuk hampers lebaran, parcel perusahaan, dan penjualan grosir. Harga menyesuaikan ukuran toples dan jumlah varian.",
    products: [
      {
        name: "Nastar Nanas",
        price: "Rp50.000/500gr toples",
        note: "Isian selai nanas homemade, lembut dan manis seimbang.",
      },
      {
        name: "Keciput",
        price: "Rp80.0000/1000gr",
        note: "Kue wijen renyah dengan rasa manis gurih khas tradisional.",
      },
      {
        name: "Unthuk Yuyu",
        price: "Rp80.0000/1000gr",
        note: "Kue tradisional kecil dengan tekstur renyah rasa manis gurih, terbuat dari tepung ketan.",
      },
      {
        name: "Putri Salju",
        price: "Rp50.000/500gr toples",
        note: "Kue lembut lumer dengan taburan gula halus premium.",
      },
      {
        name: "Kastengel",
        price: "Rp50.000/500gr toples",
        note: "Keju melimpah, rasa gurih pekat, cocok untuk hampers premium.",
      },
      {
        name: "Lidah Kucing",
        price: "Rp50.000/500gr toples",
        note: "Kue tipis renyah dengan rasa mentega yang kaya.",
      },
      {
        name: "Egg Roll",
        price: "Rp-",
        note: "Kue gulung tipis dengan tekstur renyah dan rasa manis gurih.",
      },
    ],
  },

  "kue-tart-cake": {
    title: "Tart Fresh Cream, Roti Isi & Aneka Bolu Panggang",
    intro:
    "Rangkaian tart fresh cream dan bolu panggang premium yang dibuat fresh setiap hari. Ideal untuk ulang tahun, syukuran keluarga, acara kantor, hingga display coffee shop. Tersedia pilihan ukuran, dekor minimalis, dan custom tulisan.",
  products: [
    {
      name: "Tart Oreo Fresh Cream Ø 16cm",
      price: "Mulai Rp70.000",
      note: "Dekor minimalis dengan fresh cream dan topping oreo.",
      image:
        "https://res.cloudinary.com/dxdb3dj8f/image/upload/v1765125272/20230101_122120_gl3vcl.jpg",
    },
    {
      name: "Cake Potong Aneka Topping Ø 22cm",
      price: "Mulai Rp60.000",
      note: "Cocok untuk 16 orang, bisa custom topping.",
      image:
        "https://res.cloudinary.com/dxdb3dj8f/image/upload/v1765125285/20230226_093848_w4fqmi.jpg",
    },
    {
      name: "Bolu Panggang Pisang Ø 20cm",
      price: "Rp50.000/loyang",
      note: "Bolu panggang pisang lembut dengan rasa manis.",
      image:
        "https://res.cloudinary.com/dxdb3dj8f/image/upload/v1765124678/20240730_122558_ljvi7j.jpg",
    },
    {
      name: "Brownies Kukus",
      price: "Mulai Rp35.000/loyang",
      note: "Brownies kukus lembut dengan rasa cokelat pekat. Tersedia ukuran berbagai ukuran.",
      image:
        "https://res.cloudinary.com/dxdb3dj8f/image/upload/v1765796243/20200319_122312-1-1_kl6kot.jpg",
    },
    {
      name: "Bolu Panggang Vanila/Pandan Ø 20cm",
      price: "Rp40.000/loyang",
      note: "Bolu panggang vanila lembut dengan rasa manis.",
      image:
        "https://res.cloudinary.com/dxdb3dj8f/image/upload/v1765796397/20240601_120359_GTZkQBpo1q_dcx09m.jpg",
    },
    {
      name: "Roti Isi Selai Ø 9cm",
      price: "Rp7.000/pcs",
      note: "Roti isi selai lembut dengan rasa manis.",
      image:
        "https://res.cloudinary.com/dxdb3dj8f/image/upload/v1765796397/Screenshot_2025-08-06_152752_2_mdco6x.jpg",
    },
    {
      name: "Roti Isi Ø 20cm",
      price: "Rp25.000/loyang",
      note: "Roti isi lembut dengan rasa manis.",
      image:
        "https://res.cloudinary.com/dxdb3dj8f/image/upload/v1765126411/20240801_144346_tcxzku.jpg",
    },
  ],
},

  "snack-box-paket": {
    title: "Snack Box & Paket Acara",
    intro:
      "Contoh paket snack box untuk rapat kantor, pengajian, dan acara keluarga. Isi bisa disesuaikan dengan budget dan preferensi manis/asin.",
    products: [
      {
        name: "Snack Box Isi 3 Item",
        price: "Mulai Rp6.000/box",
        note: "Umumnya 2 kue basah + 1 kudapan kering.",
        includes: ["Klepon pandan", "Lemper ayam", "Brownies mini"],
      },
      {
        name: "Snack Box Isi 4 Item",
        price: "Mulai Rp8.000/box",
        note: "Kombinasi manis & asin, cocok untuk meeting kantor.",
        includes: [
          "Dadar gulung cokelat",
          "Lapis bunga",
          "Lemper ayam",
          "Air mineral 220ml",
        ],
      },
      {
        name: "Snack Box Pagi (kue + roti + air mineral)",
        price: "Mulai Rp10.000/box",
        note: "Cocok untuk acara pagi atau pelatihan.",
        includes: [
          "Roti manis isi cokelat",
          "Kue basah manis",
          "Gorengan ringan",
          "Air mineral",
        ],
      },
      {
        name: "Paket Arisan/Pengajian",
        price: "Mulai Rp6.000/orang",
        note: "Isi bisa dikustom sesuai kebutuhan & tema acara.",
        includes: ["2–3 kue basah", "1 snack kering gorengan", "Minuman cup/gelas"],
      },
      {
        name: "Paket Kantor Rutin (mingguan/bulanan)",
        price: "By request (harga khusus kontrak)",
        note: "Disusun khusus sesuai jadwal dan kebutuhan perusahaan.",
        includes: [
          "Menu rotasi mingguan",
          "Opsi low sugar/tanpa pedas",
          "Penjadwalan kirim rutin",
        ],
      },
    ],
  },
};

// helper supaya aman kalau slug di URL aneh
function getCategoryData(slug: string) {
  const key = slug as keyof typeof PRODUCT_DETAIL;
  if (PRODUCT_DETAIL[key]) {
    return PRODUCT_DETAIL[key];
  }
  // fallback kalau slug tidak dikenal
  return PRODUCT_DETAIL["snack-box-paket"];
}

// Next sekarang kirim params sebagai Promise
export default async function ProdukDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data = getCategoryData(slug);
  const isPaketPage = slug === "snack-box-paket";

  return (
    <main
      className={`${montserrat.variable} ${playfair.variable} font-sans
        min-h-screen bg-bg-light text-text-light
        dark:bg-bg-dark dark:text-text-dark`}
    >
      <Navbar />

      <section className="bg-transparent">
        <div className="max-w-5xl mx-auto px-4 pt-10 pb-10 md:pt-14 md:pb-12">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#B47A45] mb-2 dark:text-amber-200/90">
            {isPaketPage ? "Detail Paket Snack Box" : "Detail Produk"}
          </p>
          <h1 className="font-serif text-2xl md:text-3xl mb-3 text-[#3A261A] dark:text-neutral-50">
            {data.title}
          </h1>
          <p className="text-sm md:text-base text-[#6A4A35] dark:text-neutral-200 leading-relaxed mb-6">
            {data.intro}
          </p>

          {isPaketPage ? <PaketDetailList data={data} /> : <ProdukGrid data={data} />}

          {/* CTA WA */}
          <a
            href={`https://wa.me/62882008526405?text=${encodeURIComponent(
              `Halo Fiacahya Snack, saya tertarik dengan ${data.title} dan ingin tanya ketersediaan & penawaran harga lebih detail.`,
            )}`}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-[#3E2A20] text-white text-xs font-semibold px-5 py-2 shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-transform dark:bg-white dark:text-neutral-900"
          >
            Diskusikan {isPaketPage ? "paket" : "produk"} ini via WhatsApp
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}

/* ====== SUB KOMPONEN ====== */

function ProdukGrid({
  data,
}: {
  data: { title: string; intro: string; products: Product[] };
}) {
  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-3">
      {data.products.map((p) => (
        <article
          key={p.name}
          className="rounded-2xl border overflow-hidden border-[#E3C9A8]/80 bg-white/95 shadow-sm dark:border-neutral-800 dark:bg-gradient-to-br dark:from-neutral-900 dark:to-neutral-950"
        >
          {p.image && (
            <div className="relative h-24 w-full md:h-28">
              <Image
                src={p.image}
                alt={p.name}
                fill
                sizes="(max-width:768px) 50vw, (max-width:1200px) 33vw, 280px"
                className="object-cover"
              />
            </div>
          )}

          <div className="px-3 py-3 md:px-3.5 md:py-3.5">
            <p className="text-[11px] md:text-sm font-semibold text-[#3A261A] dark:text-neutral-50 line-clamp-2">
              {p.name}
            </p>

            {p.note && (
              <p className="mt-1 text-[10px] md:text-[11px] text-[#6A4A35] dark:text-neutral-300 leading-snug line-clamp-3">
                {p.note}
              </p>
            )}

            <p className="mt-2 text-[11px] md:text-xs font-semibold text-[#C48A4A] dark:text-amber-200">
              {p.price}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}

function PaketDetailList({
  data,
}: {
  data: { title: string; intro: string; products: Product[] };
}) {
  return (
    <div className="rounded-2xl border border-[#E3C9A8]/80 bg-white/95 px-4 py-4 md:px-5 md:py-5 shadow-soft dark:border-neutral-800 dark:bg-gradient-to-br dark:from-neutral-900 dark:to-neutral-950">
      <div className="grid gap-4">
        {data.products.map((p) => (
          <div
            key={p.name}
            className="border-b border-[#F0E0C3]/70 pb-3 last:border-b-0 last:pb-0 dark:border-neutral-800/70"
          >
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1">
              <div>
                <p className="text-sm font-semibold text-[#3A261A] dark:text-neutral-50">
                  {p.name}
                </p>
                {p.note && (
                  <p className="text-[11px] text-[#8C6647] dark:text-neutral-400">
                    {p.note}
                  </p>
                )}
              </div>
              <p className="text-xs md:text-sm font-semibold text-[#C48A4A] dark:text-amber-200">
                {p.price}
              </p>
            </div>

            {p.includes && p.includes.length > 0 && (
              <div className="mt-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#B47A45] mb-1 dark:text-amber-200">
                  Contoh Isi Paket
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {p.includes.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center rounded-full border border-[#E3C9A8]/80 bg-white/90 px-2.5 py-1 text-[11px] text-[#3A261A] dark:border-neutral-700 dark:bg-[#181818] dark:text-neutral-100"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// src/app/produk/page.tsx
"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Playfair_Display, Montserrat } from "next/font/google";
import { motion } from "framer-motion";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-sans" });

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const categories = [
  {
    title: "Kue Basah",
    desc: "Produk utama untuk konsumsi harian dan pesanan acara, dengan fokus pada tekstur lembut dan rasa autentik.",
    examples: ["Klepon pandan", "Dadar gulung cokelat", "Nagasi pisang", "Lemper ayam"],
    note: "Cocok untuk snack box harian, arisan, dan acara keluarga.",
  },
  {
    title: "Kue Kering",
    desc: "Produksi musiman dan reguler untuk paket hampers, parcel, dan penjualan grosir.",
    examples: ["Kastengel", "Nastar", "Putri salju", "Sagu keju"],
    note: "Ideal untuk paket lebaran, hampers perusahaan, dan gift premium.",
  },
  {
    title: "Kue Tart & Cake",
    desc: "Cake dekoratif untuk ulang tahun, syukuran, dan kebutuhan display di coffee shop.",
    examples: ["Tart fresh cream", "Butter cake", "Brownies panggang"],
    note: "Bisa custom ukuran, dekor minimalis, dan message khusus.",
  },
  {
    title: "Snack Box & Paket",
    desc: "Paket isi beberapa item kue untuk rapat kantor, pengajian, dan acara keluarga.",
    examples: ["Snack box isi 3–5 item", "Paket arisan", "Paket rapat pagi"],
    note: "Layout box rapi, label jelas, dan dokumentasi batch tersedia.",
  },
  {
    title: "Jajanan Pasar",
    desc: "Ragam jajanan tradisional dengan standar produksi modern dan higienis.",
    examples: ["Lapis beras", "Kue talam", "Getuk", "Serabi"],
    note: "Pas untuk acara bertema tradisional atau kantin karyawan.",
  },
];

export default function ProdukPage() {
  return (
    <main
      className={`${montserrat.variable} ${playfair.variable} font-sans
        bg-gradient-to-b from-[#FFF6EA] via-[#FFF3E2] to-[#FCE6D2] text-[#3A261A]
        dark:bg-gradient-to-b dark:from-[#050403] dark:via-[#090706] dark:to-[#120C08] dark:text-neutral-50`}
    >
      <Navbar />

      {/* HERO TEXT PRODUK */}
      <section className="bg-transparent">
        <div className="max-w-6xl mx-auto px-4 pt-10 pb-6 md:pt-14 md:pb-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#B47A45] mb-2 dark:text-amber-200/90">
              Product Lineup
            </p>
            <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl mb-3 text-[#3A261A] dark:text-neutral-50">
              Pilihan produk Fiacahya Snack untuk berbagai kebutuhan acara.
            </h1>
            <p className="text-sm md:text-base text-[#6A4A35] dark:text-neutral-200 leading-relaxed">
              Fiacahya Snack memproduksi berbagai jenis kue untuk kebutuhan harian, acara
              kantor, coffee shop, hingga pesanan khusus. Berikut kategori utama yang
              dikerjakan oleh tim produksi kami.
            </p>
          </motion.div>
        </div>
      </section>

      {/* GRID KATEGORI PRODUK */}
      <section className="bg-transparent pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid gap-6 lg:grid-cols-2"
          >
            {categories.map((cat) => (
              <motion.article
                key={cat.title}
                variants={fadeUp}
                className="group rounded-3xl border border-[#E3C9A8] bg-white/90 
                  px-5 py-5 md:px-6 md:py-6 shadow-soft 
                  hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-200
                  dark:border-neutral-800 dark:bg-[#111111]/95 dark:hover:bg-[#151515] 
                  dark:shadow-[0_18px_50px_rgba(0,0,0,0.7)]"
              >
                <header className="mb-3 md:mb-4">
                  <h2 className="font-serif text-lg md:text-xl text-[#3A261A] dark:text-neutral-50">
                    {cat.title}
                  </h2>
                  <p className="mt-1 text-xs md:text-sm text-[#6A4A35] dark:text-neutral-300 leading-relaxed">
                    {cat.desc}
                  </p>
                </header>

                <div className="mb-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B47A45] mb-2 dark:text-amber-200">
                    Contoh Produk
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {cat.examples.map((ex) => (
                      <span
                        key={ex}
                        className="inline-flex items-center rounded-full border border-[#E3C9A8] px-3 py-1 text-[11px] text-[#3A261A] bg-white/80 shadow-sm
                          group-hover:border-[#C48A4A] group-hover:text-[#3A261A]
                          dark:border-neutral-700 dark:bg-[#181818] dark:text-neutral-100 dark:group-hover:border-amber-300"
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-2">
                  <p className="text-xs text-[#8C6647] dark:text-neutral-400">
                    {cat.note}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-semibold 
                      bg-gradient-to-r from-[#C48A4A] to-[#F4C58A] text-white shadow-lg shadow-[#C48A4A]/30
                      hover:shadow-soft-lg hover:-translate-y-0.5 active:translate-y-0 transition-all
                      dark:shadow-black/40"
                  >
                    Lihat Detail Paket
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-semibold 
                      border border-[#E3C9A8] bg-white/80 text-[#6A4A35] shadow-sm
                      hover:bg-white dark:border-neutral-700 dark:bg-transparent dark:text-neutral-100 dark:hover:bg-[#181818]"
                  >
                    Tanya Ketersediaan
                  </button>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* CTA RINGKAS DI BAWAH GRID */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-10 rounded-2xl border border-[#E3C9A8]/80 bg-white/80 px-5 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-soft
              dark:border-neutral-800 dark:bg-[#111111]/95"
          >
            <p className="text-xs md:text-sm text-[#6A4A35] dark:text-neutral-200 max-w-xl">
              Butuh kombinasi paket khusus untuk acara besar, meeting rutin kantor, atau
              kerja sama coffee shop? Tim Fiacahya siap membantu menyesuaikan menu dan
              kapasitas produksi.
            </p>
            <a
              href="https://wa.me/6281234567890"
              className="inline-flex items-center justify-center rounded-full bg-[#3E2A20] text-white text-xs font-semibold px-4 py-2 shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-transform dark:bg-neutral-100 dark:text-neutral-900"
            >
              Konsultasi via WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

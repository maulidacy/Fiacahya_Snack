// src/app/produk/page.tsx
"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Playfair_Display, Montserrat } from "next/font/google";
import { motion, type Variants } from "framer-motion";


const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-sans" });

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] },
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
    slug: "kue-basah",
    title: "Kue Basah",
    desc: "Produk utama untuk konsumsi harian dan pesanan acara, dengan fokus pada tekstur lembut dan rasa autentik.",
    examples: ["Klepon pandan", "Dadar gulung cokelat", "Nagasi pisang", "Lemper ayam"],
    note: "Cocok untuk snack box harian, arisan, dan acara keluarga.",
    waMessage:
      "Halo Fiacahya Snack, saya ingin tanya detail paket dan ketersediaan untuk kategori *Kue Basah*.",
  },
  {
    slug: "kue-kering",
    title: "Kue Kering",
    desc: "Produksi musiman dan reguler untuk paket hampers, parcel, dan penjualan grosir.",
    examples: ["Kastengel", "Nastar", "Putri salju", "Sagu keju"],
    note: "Ideal untuk paket lebaran, hampers perusahaan, dan gift premium.",
    waMessage:
      "Halo Fiacahya Snack, saya ingin tanya detail paket dan ketersediaan untuk kategori *Kue Kering*.",
  },
  {
    slug: "kue-tart-cake",
    title: "Kue Tart & Cake",
    desc: "Cake dekoratif untuk ulang tahun, syukuran, dan kebutuhan display di coffee shop.",
    examples: ["Tart fresh cream", "Butter cake", "Brownies panggang"],
    note: "Bisa custom ukuran, dekor minimalis, dan message khusus.",
    waMessage:
      "Halo Fiacahya Snack, saya ingin tanya detail paket dan ketersediaan untuk kategori *Kue Tart & Cake*.",
  },
  {
    slug: "snack-box-paket",
    title: "Snack Box & Paket",
    desc: "Paket isi beberapa item kue untuk rapat kantor, pengajian, dan acara keluarga.",
    examples: ["Snack box isi 3-5 item", "Paket arisan", "Paket rapat pagi"],
    note: "Layout box rapi, label jelas, dan dokumentasi batch tersedia.",
    waMessage:
      "Halo Fiacahya Snack, saya ingin tanya detail paket dan ketersediaan untuk kategori *Snack Box & Paket*.",
  },
];

export default function ProdukPage() {
  return (
    <main
      className={`${montserrat.variable} ${playfair.variable} font-sans
        min-h-screen bg-bg-light text-text-light
        dark:bg-bg-dark dark:text-text-dark`}
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
            {categories.map((cat) => {
              // kalau judul mengandung kata "Paket", pakai "Lihat Detail Paket"
              const isPaket = cat.title.toLowerCase().includes("paket");
              const buttonLabel = isPaket ? "Lihat Detail Paket" : "Lihat Detail Produk";

              return (
                <motion.article
                  key={cat.slug}
                  variants={fadeUp}
                  className="
        group rounded-3xl border px-5 py-5 md:px-6 md:py-6
        bg-white/90 border-[#E3C9A8] shadow-soft
        hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-200

        dark:bg-gradient-to-r dark:from-neutral-900 dark:to-neutral-950
        dark:border-neutral-800
        dark:hover:from-neutral-900 dark:hover:to-[#101010]
        dark:shadow-[0_18px_40px_rgba(0,0,0,0.6)]
      "
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
                          className="
                inline-flex items-center rounded-full border px-3 py-1 text-[11px]
                text-[#3A261A] bg-white/80 border-[#E3C9A8] shadow-sm
                group-hover:border-[#C48A4A]

                dark:bg-[#181818] dark:text-neutral-100 dark:border-neutral-700
                dark:group-hover:border-amber-300
              "
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
                    {/* LIHAT DETAIL → /produk/[slug] */}
                    <Link
                      href={`/produk/${cat.slug}`}
                      className="
            inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-semibold 
            bg-gradient-to-r from-[#C48A4A] to-[#F4C58A] text-white
            shadow-lg shadow-[#C48A4A]/30
            hover:shadow-soft-lg hover:-translate-y-0.5 active:translate-y-0 transition-all
            dark:shadow-black/40
          "
                    >
                      {buttonLabel}
                    </Link>

                    {/* TANYA KETERSEDIAAN → WA */}
                    <a
                      href={`https://wa.me/62882008526405?text=${encodeURIComponent(cat.waMessage)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="
            inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-semibold
            border border-[#E3C9A8] bg-white/80 text-[#6A4A35] shadow-sm
            hover:bg-white

            dark:border-neutral-700 dark:bg-white dark:text-neutral-900
            dark:hover:bg-neutral-100
          "
                    >
                      Tanya Ketersediaan
                    </a>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>

          {/* CTA RINGKAS DI BAWAH GRID */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="
        mt-10 rounded-2xl border px-5 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3
        bg-white/80 border-[#E3C9A8]/80 shadow-soft

        dark:bg-[#111111] dark:border-neutral-800
      "
          >
            <p className="text-xs md:text-sm text-[#6A4A35] dark:text-neutral-200 max-w-xl">
              Butuh kombinasi paket khusus untuk acara besar, meeting rutin kantor, atau
              kerja sama coffee shop? Tim Fiacahya siap membantu menyesuaikan menu dan
              kapasitas produksi.
            </p>
            <a
              href="https://wa.me/62882008526405"
              className="
          inline-flex items-center justify-center
          rounded-full px-4 py-2 text-xs font-semibold
          bg-[#3E2A20] text-white
          shadow-md hover:-translate-y-0.5 active:translate-y-0
          transition-transform

          dark:bg-white dark:text-neutral-900
        "
            >
              Konsultasi pesanan via WhatsApp
            </a>
          </motion.div>
        </div>
      </section>


      <Footer />
    </main>
  );
}

// src/app/%28site%29/produksi/page.tsx
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

export default function ProduksiPage() {
  return (
    <main
      className={`${montserrat.variable} ${playfair.variable} font-sans
        bg-gradient-to-b from-[#FFF6EA] via-[#FFF3E2] to-[#FCE6D2] text-[#3A261A]
        dark:bg-gradient-to-b dark:from-[#050403] dark:via-[#090706] dark:to-[#120C08] dark:text-neutral-50`}
    >
      <Navbar />

      {/* HERO – gambaran singkat produksi */}
      <section className="bg-transparent">
        <div className="max-w-6xl mx-auto px-4 pt-10 pb-6 md:pt-14 md:pb-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#B47A45] mb-2 dark:text-amber-200/90">
              Production Story
            </p>
            <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl mb-3 text-[#3A261A] dark:text-neutral-50">
              Di balik setiap kotak snack, ada alur produksi yang terencana.
            </h1>
            <p className="text-sm md:text-base text-[#6A4A35] dark:text-neutral-200 leading-relaxed">
              Tim produksi Fiacahya Snack bekerja dalam jadwal baking harian yang
              terukur, dengan fokus pada tekstur kue yang stabil, higienitas dapur,
              dan dokumentasi batch yang rapi. Halaman ini merangkum bagaimana
              proses tersebut berjalan setiap hari.
            </p>
          </motion.div>
        </div>
      </section>

      {/* HIGHLIGHT STAT – kapasitas & jadwal */}
      <section className="bg-transparent pb-6 md:pb-10">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            <HighlightCard
              label="Kapasitas rata-rata"
              value="500–800 pcs / hari"
              desc="Tergantung kombinasi produk basah & kering."
            />
            <HighlightCard
              label="Jadwal produksi"
              value="04.00 – 16.00"
              desc="Shift baking pagi & siang, cooling di sore hari."
            />
            <HighlightCard
              label="Cut-off order"
              value="H-1 • 15.00 WIB"
              desc="Order besar disarankan H-2 untuk slot aman."
            />
            <HighlightCard
              label="QC & dokumentasi"
              value="Setiap batch"
              desc="Pencatatan suhu, waktu proses, dan hasil visual."
            />
          </motion.div>
        </div>
      </section>

      {/* ALUR PRODUKSI – langkah ringkas */}
      <section className="bg-transparent pb-8 md:pb-12">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} className="max-w-3xl mb-6">
            <SectionLabel>Alur Produksi Harian</SectionLabel>
            <SectionTitle>Setiap batch melewati langkah yang sama.</SectionTitle>
            <SectionText>
              Mulai dari penimbangan bahan hingga pengecekan akhir sebelum packing,
              setiap tahapan memiliki checklist tersendiri untuk menjaga konsistensi
              rasa dan penampilan produk.
            </SectionText>
          </motion.div>

          <motion.ol
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="space-y-5 md:space-y-6"
          >
            <ProductionStep
              step="01"
              title="Persiapan & Penimbangan"
              icon="⚖️"
              text="Bahan baku disiapkan dan ditimbang sesuai resep & batch plan. Bahan yang sudah dibuka dicatat tanggal dan jamnya."
            />
            <ProductionStep
              step="02"
              title="Mixing & Pengolahan Adonan"
              icon="🥣"
              text="Adonan di-mixing dengan waktu dan speed terukur, menyesuaikan jenis kue (basah, kering, atau cake)."
            />
            <ProductionStep
              step="03"
              title="Proses Panas: Kukus / Panggang"
              icon="🔥"
              text="Tray dimasukkan ke steamer atau oven dengan suhu dan durasi yang sudah distandarkan per produk."
            />
            <ProductionStep
              step="04"
              title="Cooling & QC Visual"
              icon="❄️"
              text="Produk didinginkan di rak khusus. Tekstur, warna, dan bentuk dicek sebelum boleh masuk area packing."
            />
            <ProductionStep
              step="05"
              title="Packing & Label Batch"
              icon="📦"
              text="Produk dikemas, diberi label batch, tanggal produksi, dan informasi untuk kebutuhan traceability."
            />
          </motion.ol>
        </div>
      </section>

      {/* QC & HIGIENITAS */}
      <section className="bg-transparent pb-8 md:pb-12">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="max-w-3xl mb-6"
          >
            <SectionLabel>Quality & Hygiene</SectionLabel>
            <SectionTitle>Standar higienitas dapur dan quality control.</SectionTitle>
            <SectionText>
              Dapur Fiacahya menerapkan standar kebersihan dan pemantauan sederhana
              yang mudah diaudit, baik untuk kebutuhan internal maupun kerja sama
              jangka panjang dengan brand lain.
            </SectionText>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="grid gap-5 md:grid-cols-3"
          >
            <InfoCard
              title="Checklist Harian"
              icon="📋"
              text="Pencatatan suhu chiller, kondisi dapur, dan kebersihan alat dilakukan sebelum dan setelah produksi."
            />
            <InfoCard
              title="Personal Hygiene"
              icon="🧤"
              text="Tim menggunakan apron, hairnet, dan sarung tangan sesuai area kerja. Training berkala untuk SOP dasar."
            />
            <InfoCard
              title="Sampling QC"
              icon="🔍"
              text="Beberapa sample dari tiap batch dicek tekstur, rasa, dan tampilan sebelum dikemas atau dikirim."
            />
          </motion.div>
        </div>
      </section>

      {/* KEMASAN & PENGIRIMAN */}
      <section className="bg-transparent pb-10 md:pb-14">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="rounded-3xl border border-[#E3C9A8]/80 bg-white/80 px-5 py-5 md:px-6 md:py-6 shadow-soft
              dark:border-neutral-800 dark:bg-[#111111]/95"
          >
            <div className="flex flex-col md:flex-row gap-5 md:gap-8 justify-between">
              <div className="max-w-xl">
                <SectionLabel>Kemasan & Pengiriman</SectionLabel>
                <h2 className="font-serif text-lg md:text-xl text-[#3A261A] dark:text-neutral-50 mb-2">
                  Packaging rapi, pengiriman terjadwal.
                </h2>
                <p className="text-xs md:text-sm text-[#6A4A35] dark:text-neutral-200 leading-relaxed">
                  Setiap order dikemas dalam box bersih dengan label batch dan informasi
                  singkat produk. Pengiriman dilakukan sesuai jadwal yang disepakati,
                  termasuk opsi early delivery untuk acara pagi hari.
                </p>
              </div>

              <div className="flex flex-col gap-2 text-xs text-[#6A4A35] dark:text-neutral-200">
                <p>• Pengiriman utama area: Jabodetabek</p>
                <p>• Jarak ideal konsumsi: 4–6 jam setelah produk diterima</p>
                <p>• Untuk kerja sama rutin, jadwal bisa di-lock per minggu</p>
                <a
                  href="https://wa.me/6281234567890"
                  className="mt-2 inline-flex items-center justify-center self-start rounded-full bg-[#3E2A20] text-white text-xs font-semibold px-4 py-2 shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-transform dark:bg-neutral-100 dark:text-neutral-900"
                >
                  Diskusikan kebutuhan produksi
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

/* =========== SMALL COMPONENTS =========== */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] uppercase tracking-[0.2em] text-[#B47A45] mb-1 dark:text-amber-200/90">
      {children}
    </p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-serif text-xl md:text-2xl lg:text-2xl text-[#3A261A] mb-2 dark:text-neutral-50">
      {children}
    </h2>
  );
}

function SectionText({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm md:text-base text-[#6A4A35] leading-relaxed dark:text-neutral-200">
      {children}
    </p>
  );
}

function HighlightCard({
  label,
  value,
  desc,
}: {
  label: string;
  value: string;
  desc: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="rounded-2xl border border-[#E3C9A8] bg-white/90 px-4 py-4 shadow-soft
        dark:border-neutral-800 dark:bg-[#111111]/95"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B47A45] mb-1 dark:text-amber-200/90">
        {label}
      </p>
      <p className="text-lg md:text-xl font-semibold text-[#3A261A] dark:text-neutral-50">
        {value}
      </p>
      <p className="mt-1 text-xs text-[#6A4A35] dark:text-neutral-300">{desc}</p>
    </motion.div>
  );
}

function ProductionStep({
  step,
  title,
  text,
  icon,
}: {
  step: string;
  title: string;
  text: string;
  icon: string;
}) {
  return (
    <motion.li
      variants={fadeUp}
      className="relative rounded-2xl border border-[#E3C9A8] bg-white/90 px-4 py-4 pl-5 shadow-soft
        dark:border-neutral-800 dark:bg-[#111111]/95"
    >
      <div className="absolute -left-3 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-[#C48A4A] to-[#F4C58A] text-[10px] font-semibold text-white shadow-md">
        {step}
      </div>
      <div className="flex items-start gap-3">
        <div className="mt-0.5 text-lg">{icon}</div>
        <div>
          <p className="text-sm font-semibold text-[#3A261A] dark:text-neutral-50">
            {title}
          </p>
          <p className="mt-1 text-xs text-[#6A4A35] dark:text-neutral-200 leading-relaxed">
            {text}
          </p>
        </div>
      </div>
    </motion.li>
  );
}

function InfoCard({
  title,
  text,
  icon,
}: {
  title: string;
  text: string;
  icon: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="rounded-2xl border border-[#E3C9A8] bg-white/90 px-4 py-4 shadow-soft text-xs
        dark:border-neutral-800 dark:bg-[#111111]/95"
    >
      <div className="mb-2 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-[#FFF1DD] text-lg shadow-sm dark:bg-[#272018]">
          {icon}
        </div>
        <p className="font-semibold text-[#3A261A] dark:text-neutral-50">{title}</p>
      </div>
      <p className="text-[#6A4A35] dark:text-neutral-200 leading-relaxed">{text}</p>
    </motion.div>
  );
}

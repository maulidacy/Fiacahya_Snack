// src/app/profil/page.tsx
"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Playfair_Display, Montserrat } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";


const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
});

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

const heroImages = [
  {
    src: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=1400&q=80",
    caption: "Batch kue basah sedang dipersiapkan di dapur.",
  },
  {
    src: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1400&q=80",
    caption: "Display snack box yang siap dikirim ke pelanggan.",
  },
  {
    src: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1400&q=80",
    caption: "Aneka pastry premium untuk kebutuhan acara.",
  },
];

export default function ProfilPage() {
  const [currentHero, setCurrentHero] = useState(0);

  // auto-rotate gambar hero setiap 7 detik
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 7000);
    return () => clearInterval(id);
  }, []);

  return (
    <main
      className={`${montserrat.variable} ${playfair.variable} font-sans
        min-h-screen bg-bg-light text-text-light
        dark:bg-bg-dark dark:text-text-dark`}
    >
      <Navbar />

      {/* HERO PROFIL */}
      <section className="bg-transparent">
        <div className="max-w-6xl mx-auto px-4 pt-10 pb-8 md:pt-14 md:pb-10">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid gap-8 lg:grid-cols-[1.1fr,minmax(0,0.9fr)] items-center"
          >
            <motion.div variants={fadeUp} className="max-w-3xl">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#B47A45] mb-2 dark:text-amber-200/90">
                Profil Usaha
              </p>
              <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl mb-3 text-[#3A261A] dark:text-neutral-50">
                FiaCahya Snack - produksi snack rumahan dengan standar profesional.
              </h1>
              <p className="text-sm md:text-base text-[#6A4A35] dark:text-neutral-200 leading-relaxed">
                FiaCahya Snack adalah unit produksi aneka kue basah tradisional, kue kering,
                dan kue tart untuk berbagai kebutuhan acara. Kami fokus pada rasa yang
                konsisten, higienitas dapur, dan dokumentasi batch harian sehingga
                pelanggan mendapatkan kualitas yang sama di setiap pesanan.
              </p>
            </motion.div>

            {/* Foto dapur / produk – slideshow halus */}
            <motion.div
              variants={fadeUp}
              className="relative h-52 sm:h-60 md:h-64 lg:h-72 rounded-3xl overflow-hidden border border-[#E3C9A8]/80 bg-white/70 shadow-soft-lg
                dark:border-neutral-800 dark:bg-[#111111]/90"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentHero}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={heroImages[currentHero].src}
                    alt={heroImages[currentHero].caption}
                    fill
                    sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 480px"
                    className="object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Caption kecil di bawah kiri */}
              <div className="absolute left-4 bottom-4 rounded-2xl bg-white/90 px-3 py-2 text-xs shadow-soft
                dark:bg-[#111111]/95 dark:text-neutral-100 max-w-[80%]">
                <p className="font-semibold">Dapur & produk FiaCahya</p>
                <p className="text-[11px] text-[#6A4A35] dark:text-neutral-300">
                  {heroImages[currentHero].caption}
                </p>
              </div>

              {/* indikator dot sederhana */}
              <div className="absolute right-4 bottom-4 flex gap-1.5">
                {heroImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentHero(idx)}
                    aria-label={`Lihat gambar ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all ${idx === currentHero
                        ? "w-5 bg-white dark:bg-amber-300"
                        : "w-2 bg-white/50 dark:bg-neutral-500 hover:bg-white/80 dark:hover:bg-neutral-300"
                      }`}
                  />
                ))}
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* VISI & MISI */}
      <section className="bg-transparent pb-8 md:pb-10">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="grid gap-5 lg:grid-cols-2"
          >
            {/* Visi */}
            <motion.div
              variants={fadeUp}
              className="rounded-3xl border border-[#E3C9A8] bg-white/90 px-5 py-5 md:px-6 md:py-6 shadow-soft
                dark:border-neutral-800 dark:bg-[#111111]/95"
            >
              <SectionLabel>Visi</SectionLabel>
              <h2 className="font-serif text-lg md:text-xl text-[#3A261A] dark:text-neutral-50 mb-2">
                Menjadi mitra snack yang konsisten, higienis, dan terpercaya.
              </h2>
              <SectionText>
                Menjadi pilihan utama untuk kebutuhan kue dan snack rumahan berkualitas
                hotel bintang lima, baik untuk keluarga maupun korporasi.
              </SectionText>
            </motion.div>

            {/* Misi */}
            <motion.div
              variants={fadeUp}
              className="rounded-3xl border border-[#E3C9A8] bg-white/90 px-5 py-5 md:px-6 md:py-6 shadow-soft
                dark:border-neutral-800 dark:bg-[#111111]/95"
            >
              <SectionLabel>Misi</SectionLabel>
              <ul className="list-disc pl-5 space-y-1.5 text-xs md:text-sm text-[#6A4A35] dark:text-neutral-200">
                <li>Menjaga cita rasa kue tradisional dengan standar produksi modern.</li>
                <li>Menerapkan sistem batch & QC yang terdokumentasi dengan baik.</li>
                <li>Melayani pesanan dengan tepat waktu dan komunikasi yang jelas.</li>
                <li>Mengembangkan variasi produk sesuai kebutuhan pelanggan & tren acara.</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* NILAI UTAMA USAHA */}
      <section className="bg-transparent pb-8 md:pb-10">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="mb-5"
          >
            <SectionLabel>Nilai yang Kami Jaga</SectionLabel>
            <SectionTitle>
              Kenapa banyak pelanggan memilih FiaCahya Snack.
            </SectionTitle>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="grid gap-4 md:grid-cols-3"
          >
            <ValueCard
              title="Konsistensi Rasa"
              text="Takaran resep dan prosedur produksi terdokumentasi, memastikan rasa stabil dari batch ke batch."
              Icon={Sparkles}
            />
            <ValueCard
              title="Kebersihan & QC"
              text="Setiap batch melewati pengecekan visual dan sampling rasa, dilengkapi catatan QC sederhana."
              Icon={ShieldCheck}
            />
            <ValueCard
              title="Fleksibel untuk Acara"
              text="Melayani snack box, paket acara, hingga kebutuhan custom sesuai tema dan jumlah tamu."
              Icon={Users}
            />
          </motion.div>
        </div>
      </section>

      {/* KONTAK & CATATAN PELANGGAN */}
      <section className="bg-transparent pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="grid gap-5 lg:grid-cols-[1.1fr,minmax(0,0.9fr)]"
          >
            {/* Kontak */}
            <motion.div
              variants={fadeUp}
              className="rounded-3xl border border-[#E3C9A8] bg-white/90 px-5 py-5 md:px-6 md:py-6 shadow-soft
                dark:border-neutral-800 dark:bg-[#111111]/95"
            >
              <SectionLabel>Informasi Kontak</SectionLabel>
              <h2 className="font-serif text-lg md:text-xl text-[#3A261A] dark:text-neutral-50 mb-3">
                Hubungi tim FiaCahya Snack.
              </h2>

              <div className="space-y-3 text-xs md:text-sm text-[#6A4A35] dark:text-neutral-200">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-2xl bg-[#FFF1DD] shadow-sm dark:bg-[#272018]">
                    <MapPin className="h-4 w-4 text-[#3A261A] dark:text-neutral-50" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#3A261A] dark:text-neutral-50">
                      Alamat Produksi
                    </p>
                    <p>Jl. Contoh No. 123, Kawasan Industri, Kota</p>
                    <p>FiaCahya Kitchen Lab</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-2xl bg-[#FFF1DD] shadow-sm dark:bg-[#272018]">
                    <Phone className="h-4 w-4 text-[#3A261A] dark:text-neutral-50" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#3A261A] dark:text-neutral-50">
                      WhatsApp
                    </p>
                    <p>0812-0000-0000 (Admin FiaCahya Snack)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-2xl bg-[#FFF1DD] shadow-sm dark:bg-[#272018]">
                    <Mail className="h-4 w-4 text-[#3A261A] dark:text-neutral-50" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#3A261A] dark:text-neutral-50">
                      Email Produksi
                    </p>
                    <p>produksi@fiacahyasnack.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-1 border-t border-[#F1DEC4] dark:border-neutral-800 mt-3">
                  <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-2xl bg-[#FFF1DD] shadow-sm dark:bg-[#272018]">
                    <Clock className="h-4 w-4 text-[#3A261A] dark:text-neutral-50" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#3A261A] dark:text-neutral-50">
                      Jam Operasional
                    </p>
                    <p>Produksi: 04.00 – 16.00 WIB</p>
                    <p>Admin pesanan: 08.00 – 20.00 WIB</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Catatan untuk pelanggan */}
            <motion.div
              variants={fadeUp}
              className="rounded-3xl border border-[#E3C9A8] bg-white/90 px-5 py-5 md:px-6 md:py-6 shadow-soft
                dark:border-neutral-800 dark:bg-[#111111]/95"
            >
              <SectionLabel>Catatan untuk Pelanggan</SectionLabel>
              <SectionTitle>Kami ingin semua pesanan berjalan lancar.</SectionTitle>
              <ul className="mt-2 list-disc pl-5 space-y-1.5 text-xs md:text-sm text-[#6A4A35] dark:text-neutral-200">
                <li>
                  Pemesanan jumlah besar (di atas 100 box) disarankan konfirmasi
                  minimal H-3 agar slot produksi aman.
                </li>
                <li>
                  Pembatalan & perubahan jumlah mengikuti kebijakan yang disepakati
                  saat konfirmasi pesanan.
                </li>
                <li>
                  Untuk kebutuhan khusus seperti diet, tanpa telur, atau permintaan
                  lain, mohon konsultasi terlebih dahulu dengan tim kami.
                </li>
              </ul>

              <a
                href="https://wa.me/6281200000000"
                className="mt-4 inline-flex items-center justify-center rounded-full bg-[#3E2A20] text-white text-xs font-semibold px-4 py-2 shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-transform dark:bg-neutral-100 dark:text-neutral-900"
              >
                Konsultasi pesanan via WhatsApp
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

/* ====== SMALL COMPONENTS ====== */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] uppercase tracking-[0.2em] text-[#B47A45] mb-1 dark:text-amber-200/90">
      {children}
    </p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-serif text-lg md:text-xl lg:text-xl text-[#3A261A] mb-2 dark:text-neutral-50">
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

function ValueCard({
  title,
  text,
  Icon,
}: {
  title: string;
  text: string;
  Icon: typeof ShieldCheck;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="rounded-2xl border border-[#E3C9A8] bg-white/90 px-4 py-4 shadow-soft text-xs
        dark:border-neutral-800 dark:bg-[#111111]/95"
    >
      <div className="mb-2 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-[#FFF1DD] text-lg shadow-sm dark:bg-[#272018]">
          <Icon className="h-4 w-4 text-[#3A261A] dark:text-neutral-50" />
        </div>
        <p className="font-semibold text-[#3A261A] dark:text-neutral-50">
          {title}
        </p>
      </div>
      <p className="text-[#6A4A35] dark:text-neutral-200 leading-relaxed">{text}</p>
    </motion.div>
  );
}

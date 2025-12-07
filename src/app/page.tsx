"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useState,
  type ReactNode,
  type ElementType,
} from "react";
import { Playfair_Display, Montserrat } from "next/font/google";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

import {
  Flame,
  ShieldCheck,
  Gift,
  ClipboardList,
  FileText,
  Clock3,
  Star,
} from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-sans" });

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const testimonials = [
  {
    name: "Nadia – Corporate Catering",
    text: "Snack box Fiacahya selalu fresh dan rapi. Klien kami berkali-kali minta repeat order.",
  },
  {
    name: "Rama – Event Organizer",
    text: "Rasanya premium, packaging elegan. Sangat membantu untuk acara formal dan wedding.",
  },
  {
    name: "Dina – Coffee Shop Owner",
    text: "Cocok banget jadi pairing kopi. Stock selalu konsisten dan tepat waktu.",
  },
];

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // auto-slide testimonial carousel
  useEffect(() => {
    const id = setInterval(
      () => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length),
      6000
    );
    return () => clearInterval(id);
  }, []);

  // tombol “Buka Chatbot”
  const focusChatbot = useCallback(() => {
    const btn = document.querySelector<HTMLButtonElement>(
      'button[aria-label="Buka Asisten Produksi AI"]'
    );
    btn?.click();
  }, []);

  return (
    <main
      className={`${montserrat.variable} ${playfair.variable} font-sans 
    min-h-screen
    bg-bg-light text-text-light
    dark:bg-bg-dark dark:text-text-dark`}
    >
      <Navbar />

      {/* =========================
          HERO – parallax images, floating crumbs
      ========================== */}
      <section
        className="relative bg-transparent"
        aria-labelledby="hero-heading"
      >
        <div className="max-w-6xl mx-auto px-4 py-14 lg:py-20 grid gap-10 lg:grid-cols-[1.1fr,minmax(0,1fr)] items-center">
          {/* Floating crumbs / particles */}
          <BakeryParticles />

          {/* Kiri – copy utama */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="relative z-10"
          >
            <motion.p
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur border border-white/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#B47A45] shadow-sm dark:bg-neutral-900/80 dark:border-neutral-700 dark:text-amber-200"
            >
              Freshly baked • Handmade daily
            </motion.p>

            <motion.h1
              id="hero-heading"
              variants={fadeUp}
              className="mt-4 font-serif text-3.5xl md:text-5xl lg:text-5xl leading-tight text-[#3A261A] dark:text-neutral-50"
            >
              Homemade Fresh &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C48A4A] via-[#E7B57B] to-[#F4C58A]">
                Premium Quality
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-4 text-sm md:text-base leading-relaxed text-[#6A4A35] max-w-xl dark:text-neutral-200"
            >
              Fiacahya Snack menghadirkan kue dan snack premium untuk acara,
              kantor, coffee shop, hingga hantaran spesial. Diproduksi harian
              dengan bahan pilihan dan standar higienis yang ketat.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-6 flex flex-wrap items-center gap-3"
            >
              <a
                href="#order"
                className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#C48A4A] to-[#F4C58A] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#C48A4A]/30 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <span className="mr-1">Order Sekarang</span>
                <span className="inline-block transition-transform group-hover:translate-x-0.5" />
              </a>

              <a
                href="#products"
                className="group inline-flex items-center justify-center rounded-full border border-[#CFA77A]/60 bg-white/60 px-5 py-2.5 text-xs md:text-sm font-semibold text-[#6A4A35] shadow-sm hover:bg-white/80 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 dark:bg-neutral-900/70 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800"
              >
                Lihat Menu
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-6 flex flex-wrap gap-5 text-[11px] md:text-xs text-[#8C6647] dark:text-neutral-300"
            >
              <HeroStat label="Snack Box Harian" value="500+ pcs" />
              <HeroStat label="Repeat Order Bulanan" value="90%+" />
              <HeroStat label="Kota Terlayani" value="Jabodetabek" />
            </motion.div>
          </motion.div>

          {/* Kanan – parallax gallery */}
          <div className="relative h-[260px] sm:h-[320px] md:h-[380px] lg:h-[420px]">
            <HeroParallax />
          </div>
        </div>
      </section>

      {/* =========================
          ABOUT – animated icons
      ========================== */}
      <SectionWrapper id="about">
        <div className="max-w-6xl mx-auto px-4 py-14 lg:py-16">
          <motion.div variants={fadeUp} className="max-w-2xl mb-8">
            <SectionLabel>About Fiacahya Snack</SectionLabel>
            <SectionTitle>
              Sentuhan rumahan, kualitas hotel bintang lima.
            </SectionTitle>
            <SectionText>
              Berawal dari dapur rumahan, Fiacahya Snack berkembang menjadi
              partner andalan untuk kebutuhan snack dan bakery premium. Setiap
              batch diproduksi dengan resep teruji, kontrol kualitas harian, dan
              dokumentasi produksi yang rapi.
            </SectionText>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="grid gap-6 md:grid-cols-3"
          >
            <AboutItem
              icon={<Flame className="h-5 w-5 text-white" />}
              title="Freshly Baked"
              text="Semua kue dan snack diproduksi harian dengan jadwal baking terukur, bukan stok lama."
            />
            <AboutItem
              icon={<ShieldCheck className="h-5 w-5 text-white" />}
              title="Higienis & Terukur"
              text="Proses produksi mengikuti SOP higienitas, pencatatan batch, dan quality control."
            />
            <AboutItem
              icon={<Gift className="h-5 w-5 text-white" />}
              title="Packaging Premium"
              text="Box elegan, label rapi, siap untuk acara formal, corporate, dan hampers eksklusif."
            />
          </motion.div>
        </div>
      </SectionWrapper>

      {/* =========================
          PRODUCT GRID – animated cards
      ========================== */}
      <SectionWrapper id="products">
        <div className="max-w-6xl mx-auto px-4 py-14 lg:py-16">
          <motion.div
            variants={fadeUp}
            className="flex justify-between items-end gap-4 mb-8"
          >
            <div className="max-w-xl">
              <SectionLabel>Our Signature Collection</SectionLabel>
              <SectionTitle>
                Rangkaian kue & snack favorit pelanggan.
              </SectionTitle>
              <SectionText>
                Pilih varian yang paling cocok untuk coffee shop, meeting
                kantor, hingga acara spesial Anda. Semua bisa dikustom untuk
                kebutuhan paket.
              </SectionText>
            </div>
            <div className="hidden md:block text-xs text-[#946642] dark:text-neutral-300">
              *Foto ilustrasi produk dengan mood serupa.
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <ProductCard
              title="Assorted Pastry Box"
              desc="Croissant mini, danish, dan puff pastry seleksi chef."
              price="Mulai 35K / box"
              tag="Favorit Kantor"
              img="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80"
            />
            <ProductCard
              title="Traditional Snack Platter"
              desc="Kue basah nusantara dengan tampilan modern & bersih."
              price="Mulai 28K / box"
              tag="Acara Keluarga"
              img="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80"
            />
            <ProductCard
              title="Premium Mini Cake"
              desc="Mini cake individual dengan dekor minimalis elegan."
              price="Mulai 42K / pcs"
              tag="Hantaran & Event"
              img="https://images.unsplash.com/photo-1614707267537-455917cd8035?auto=format&fit=crop&w=1200&q=80"
            />
          </motion.div>
        </div>
      </SectionWrapper>

      {/* =========================
          WHY CHOOSE US – zoom-in icons
      ========================== */}
      <SectionWrapper id="why-us">
        <div className="max-w-6xl mx-auto px-4 py-14 lg:py-16">
          <motion.div variants={fadeUp} className="max-w-2xl mb-8">
            <SectionLabel>Why Choose Fiacahya Snack</SectionLabel>
            <SectionTitle>
              Lebih dari sekadar snack, tapi pengalaman.
            </SectionTitle>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="grid gap-6 md:grid-cols-4"
          >
            <FeatureCard
              icon={<ClipboardList className="h-5 w-5" />}
              title="Terencana"
              text="Jadwal produksi jelas, cocok untuk order rutin kantor & kafe."
            />
            <FeatureCard
              icon={<FileText className="h-5 w-5" />}
              title="Transparan"
              text="Detail ingredients dan informasi alergi yang rapi dan terbuka."
            />
            <FeatureCard
              icon={<Clock3 className="h-5 w-5" />}
              title="On-Time"
              text="Tim delivery terlatih memastikan pesanan sampai tepat waktu."
            />
            <FeatureCard
              icon={<Star className="h-5 w-5" />}
              title="Premium Taste"
              text="Rasa konsisten, tekstur seimbang, dan tampilan Instagramable."
            />
          </motion.div>
        </div>
      </SectionWrapper>

      {/* =========================
          ORDER INFO – animated steps timeline
      ========================== */}
      <SectionWrapper id="order">
        <div className="max-w-6xl mx-auto px-4 py-14 lg:py-16">
          <motion.div variants={fadeUp} className="max-w-2xl mb-8">
            <SectionLabel>Simple Ordering Flow</SectionLabel>
            <SectionTitle>
              Pesan Fiacahya Snack dalam beberapa langkah.
            </SectionTitle>
          </motion.div>

          <motion.ol
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="relative border-l border-[#E1C09A]/70 pl-4 md:pl-6 space-y-6 md:space-y-8 dark:border-neutral-700"
          >
            <OrderStep
              step="01"
              title="Konsultasi Kebutuhan"
              text="Sampaikan jumlah tamu, jenis acara, dan preferensi menu. Kami bantu rekomendasikan paket."
            />
            <OrderStep
              step="02"
              title="Pilih Paket & Jadwal"
              text="Pilih kombinasi menu, tentukan tanggal dan jam pengiriman, serta detail lokasi."
            />
            <OrderStep
              step="03"
              title="Produksi"
              text="Tim dapur memproduksi sesuai batch plan, dengan kontrol kualitas dan dokumentasi."
            />
            <OrderStep
              step="04"
              title="Pengiriman & Setup"
              text="Order dikirim tepat waktu. Bisa dibantu penataan di meja snack sesuai kebutuhan."
            />
          </motion.ol>

          <motion.div
            variants={fadeUp}
            className="mt-8 rounded-2xl bg-white/70 backdrop-blur border border-[#E1C09A]/70 px-6 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm dark:bg-neutral-900/80 dark:border-neutral-700"
          >
            <p className="text-xs md:text-sm text-[#3A261A] dark:text-neutral-200">
              Untuk order cepat, hubungi kami via WhatsApp dan dapatkan
              rekomendasi paket dalam hitungan menit.
            </p>

            <a
              href="https://wa.me/6281234567890"
              className="
      inline-flex items-center justify-center
      rounded-full px-6 py-2.5 text-xs font-semibold
      bg-[#3E2A20] text-white
      shadow-[0_12px_30px_rgba(0,0,0,0.20)]
      hover:-translate-y-0.5 active:translate-y-0
      transition-transform
      dark:bg-[#3E2A20] dark:text-white
    "
            >
              Chat via WhatsApp
            </a>
          </motion.div>

        </div>
      </SectionWrapper>

      {/* =========================
          TESTIMONIALS – auto carousel
      ========================== */}
      <SectionWrapper id="testimonials">
        <div className="max-w-6xl mx-auto px-4 py-14 lg:py-16">
          <motion.div variants={fadeUp} className="max-w-2xl mb-8">
            <SectionLabel>Client Stories</SectionLabel>
            <SectionTitle>Dipercaya berbagai brand & acara.</SectionTitle>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="relative rounded-3xl bg-gradient-to-r from-[#3D2618] to-[#5A3721] text-[#FDE8D5] px-6 py-8 md:px-10 md:py-10 overflow-hidden shadow-lg dark:from-neutral-900 dark:to-neutral-950"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent)]" />

            <div className="relative flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <p className="text-xs uppercase tracking-[0.22em] text-[#F7D3A5]/80 mb-2 dark:text-amber-200">
                  Testimonial
                </p>
                <p className="text-base md:text-lg leading-relaxed">
                  “{testimonials[currentTestimonial].text}”
                </p>
                <p className="mt-4 text-xs md:text-sm text-[#F9D8AC] dark:text-neutral-200">
                  {testimonials[currentTestimonial].name}
                </p>
              </div>

              <div className="flex-1 flex justify-end">
                <div className="relative h-32 w-32 md:h-40 md:w-40 rounded-3xl border border-[#F7D3A5]/40 bg-white/10 backdrop-blur shadow-xl overflow-hidden dark:border-neutral-600">
                  <Image
                    src="https://images.unsplash.com/photo-1551024601-bec78bea9cbc?auto=format&fit=crop&w=900&q=80"
                    alt="Snack Fiacahya"
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 relative z-10">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonial(idx)}
                  className={`h-1.5 rounded-full transition-all ${currentTestimonial === idx
                      ? "w-6 bg-[#F7D3A5]"
                      : "w-2 bg-[#F7D3A5]/40 hover:bg-[#F7D3A5]/70"
                    }`}
                  aria-label={`Lihat testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* =========================
          CHATBOT TEASER
      ========================== */}
      <SectionWrapper>
        <div className="max-w-6xl mx-auto px-4 pb-10">
          <div className="rounded-2xl bg-white/70 backdrop-blur border border-[#E1C09A]/70 px-6 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm dark:bg-neutral-900/80 dark:border-neutral-700">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B47A45] mb-1 dark:text-amber-200">
                Fiacahya Assistant (Ops Internal)
              </p>
              <p className="text-xs md:text-sm text-[#6A4A35] dark:text-neutral-200">
                Untuk tim internal, gunakan asisten AI untuk cek batch, jadwal
                baking, dan QC log.
              </p>
            </div>
            <button
              onClick={focusChatbot}
              className="inline-flex items-center justify-center rounded-full bg-[#3E2A20] text-white text-xs font-semibold px-4 py-2 shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-transform dark:bg-neutral-100 dark:text-neutral-900"
            >
              Buka Asisten Produksi
            </button>
          </div>
        </div>
      </SectionWrapper>

      {/* FOOTER BARU */}
      <Footer />
    </main>
  );
}

/* =========================
   Reusable Components
========================= */

function SectionWrapper({
  children,
  id,
  as: As = "section",
}: {
  children: ReactNode;
  id?: string;
  as?: ElementType;
}) {
  return (
    <As id={id} className="bg-transparent">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </As>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] uppercase tracking-[0.2em] text-[#B47A45] mb-1 dark:text-amber-200">
      {children}
    </p>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-serif text-2xl md:text-3xl lg:text-3xl text-[#3A261A] mb-2 dark:text-neutral-50">
      {children}
    </h2>
  );
}

function SectionText({ children }: { children: ReactNode }) {
  return (
    <p className="text-sm md:text-base text-[#6A4A35] leading-relaxed dark:text-neutral-200">
      {children}
    </p>
  );
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-7 w-7 rounded-full bg-white/70 backdrop-blur border border-[#E3C9A8] flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.04)] dark:bg-neutral-900/80 dark:border-neutral-700">
        <Star className="h-3.5 w-3.5 text-[#B47A45] dark:text-amber-200" />
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-xs font-semibold text-[#3A261A] dark:text-neutral-50">
          {value}
        </span>
        <span className="text-[11px] text-[#8C6647] dark:text-neutral-300">
          {label}
        </span>
      </div>
    </div>
  );
}

function AboutItem({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="
        group rounded-3xl
        bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]
        border border-[#E1C09A]/70
        px-5 py-6
        hover:-translate-y-1.5 hover:shadow-[0_26px_80px_rgba(15,23,42,0.16)]
        hover:border-[#C48A4A]
        transition-all duration-200
        dark:bg-[#0C0C0C]
        dark:border-neutral-800
        dark:hover:border-amber-300/80
        dark:shadow-[0_20px_60px_rgba(0,0,0,0.75)]
      "
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="
            h-10 w-10 rounded-2xl
            bg-gradient-to-tr from-[#C48A4A] via-[#E7B57B] to-[#F4C58A]
            flex items-center justify-center
            shadow-[0_12px_30px_rgba(196,138,74,0.55)]
            group-hover:scale-110 group-hover:rotate-1
            transition-transform
          "
        >
          {icon}
        </div>
        <p className="text-sm font-semibold text-[#2D2117] dark:text-neutral-50">
          {title}
        </p>
      </div>
      <p className="text-xs text-[#6A4A35] leading-relaxed dark:text-neutral-300">
        {text}
      </p>
    </motion.div>
  );
}

function ProductCard({
  title,
  desc,
  price,
  tag,
  img,
}: {
  title: string;
  desc: string;
  price: string;
  tag: string;
  img: string;
}) {
  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 230, damping: 20 }}
      className="
        group rounded-3xl overflow-hidden
        bg-white
        border border-[#E1C09A]/80
        shadow-[0_18px_60px_rgba(15,23,42,0.08)]
        hover:shadow-[0_26px_90px_rgba(15,23,42,0.16)]
        hover:border-[#C48A4A]
        hover:ring-1 hover:ring-[#F4C58A]/70
        transition-all duration-200
        dark:bg-[#050505]
        dark:border-neutral-800
        dark:hover:border-amber-300/80
        dark:hover:ring-amber-200/40
        dark:shadow-[0_22px_70px_rgba(0,0,0,0.9)]
      "
    >
      <div className="relative h-40 sm:h-44">
        <Image
          src={img}
          alt={title}
          fill
          sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
        <div className="absolute left-3 bottom-3 inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-[#8C6647] shadow-sm dark:bg-neutral-950/95 dark:text-neutral-100">
          {tag}
        </div>
      </div>
      <div className="px-4 py-4">
        <h3 className="text-sm font-semibold text-[#2D2117] mb-1 dark:text-neutral-50">
          {title}
        </h3>
        <p className="text-xs text-[#6A4A35] leading-relaxed mb-2 dark:text-neutral-300">
          {desc}
        </p>
        <p className="text-xs font-semibold text-[#C48A4A] dark:text-amber-200">
          {price}
        </p>
      </div>
    </motion.article>
  );
}

function FeatureCard({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ scale: 1.05, translateY: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="
        rounded-2xl
        bg-white
        border border-[#E1C09A]/80
        shadow-[0_16px_55px_rgba(15,23,42,0.08)]
        px-4 py-5 text-xs
        hover:border-[#C48A4A] hover:ring-1 hover:ring-[#F4C58A]/70
        hover:shadow-[0_24px_80px_rgba(15,23,42,0.16)]
        transition-all duration-200
        dark:bg-[#050505]
        dark:border-neutral-800
        dark:hover:border-amber-300/80
        dark:hover:ring-amber-200/40
        dark:shadow-[0_22px_70px_rgba(0,0,0,0.85)]
      "
    >
      <div className="mb-3">
        <div className="inline-flex items-center justify-center rounded-2xl bg-[#FFF1DD] px-2 py-1 shadow-[0_10px_30px_rgba(0,0,0,0.06)] dark:bg-neutral-800">
          {icon}
        </div>
      </div>
      <p className="font-semibold text-[#2D2117] mb-1 dark:text-neutral-50">
        {title}
      </p>
      <p className="text-[#6A4A35] leading-relaxed dark:text-neutral-300">
        {text}
      </p>
    </motion.div>
  );
}

function OrderStep({
  step,
  title,
  text,
}: {
  step: string;
  title: string;
  text: string;
}) {
  return (
    <motion.li
      variants={fadeUp}
      className="relative pl-6"
    >
      {/* dot nomor di garis */}
      <div className="absolute -left-3 top-4 h-5 w-5 rounded-full bg-gradient-to-tr from-[#C48A4A] to-[#F4C58A] flex items-center justify-center text-[10px] font-semibold text-white shadow-md">
        {step}
      </div>

      {/* card konten step */}
      <div
        className="
          rounded-2xl bg-white/95
          border border-[#E1C09A]/70
          px-4 py-3
          shadow-[0_14px_45px_rgba(15,23,42,0.06)]
          hover:shadow-[0_20px_70px_rgba(15,23,42,0.12)]
          hover:border-[#C48A4A]
          transition-all duration-200
          dark:bg-[#050505]
          dark:border-neutral-800
          dark:hover:border-amber-300/80
          dark:shadow-[0_20px_60px_rgba(0,0,0,0.85)]
        "
      >
        <h3 className="text-sm font-semibold text-[#2D2117] mb-1 dark:text-neutral-50">
          {title}
        </h3>
        <p className="text-xs text-[#6A4A35] leading-relaxed dark:text-neutral-300">
          {text}
        </p>
      </div>
    </motion.li>
  );
}

function BakeryParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      {/* kiri atas */}
      <motion.span
        className="absolute -top-2 left-6 h-4 w-4 rounded-full bg-[#F9D8AC]/70 blur-[1px]"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* kanan */}
      <motion.span
        className="absolute top-10 right-10 h-3 w-3 rounded-full bg-[#F1C08E]/70"
        animate={{ y: [0, -5, 0], x: [0, 4, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* bawah */}
      <motion.span
        className="absolute bottom-6 left-10 h-5 w-5 rounded-full bg-[#FFE1B8]/60 blur-[1px]"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function HeroParallax() {
  return (
    <div className="relative h-full w-full">
      <motion.div
        className="absolute inset-0 rounded-[2rem] bg-white/70 backdrop-blur shadow-[0_18px_60px_rgba(0,0,0,0.08)] overflow-hidden border border-[#E1C09A]/70 dark:bg-neutral-900/80 dark:border-neutral-700"
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
      >
        <Image
          src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1600&q=80"
          alt="Display kue dan pastry Fiacahya Snack"
          fill
          priority
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 560px"
          className="object-cover"
        />
      </motion.div>

      {/* layer parallax 1 */}
      <motion.div
        className="hidden sm:block absolute -bottom-6 left-2 w-40 h-32 rounded-3xl overflow-hidden border border-[#E1C09A]/70 bg-white/90 shadow-[0_14px_45px_rgba(0,0,0,0.08)] dark:bg-neutral-900/90 dark:border-neutral-700"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 0.61, 0.36, 1] }}
        whileHover={{ y: -6 }}
      >
        <Image
          src="https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80"
          alt="Snack box Fiacahya"
          fill
          sizes="160px"
          className="object-cover"
        />
      </motion.div>

      {/* layer parallax 2 */}
      <motion.div
        className="hidden sm:block absolute -top-6 right-0 w-32 h-32 rounded-3xl overflow-hidden border border-[#E1C09A]/70 bg-white/90 shadow-[0_14px_45px_rgba(0,0,0,0.08)] dark:bg-neutral-900/90 dark:border-neutral-700"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
        whileHover={{ y: -4 }}
      >
        <Image
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
          alt="Pastry Fiacahya"
          fill
          sizes="128px"
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Clock,
  Youtube,
  Facebook,
  Twitter,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] },
  },
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="
        relative mt-10 border-t border-[#4B2D1F]
        bg-gradient-to-r from-[#3D2618] to-[#5A3721]
        text-[#FDE8D5]
        shadow-[0_-18px_60px_rgba(0,0,0,0.4)]
        dark:from-neutral-900 dark:to-neutral-950 dark:border-neutral-800
      "
    >
      {/* highlight radial biar 'bersinar' seperti testimonial */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.14),_transparent)]" />

      {/* isi footer */}
      <div className="relative z-10">
        {/* TOP AREA */}
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-10 grid gap-8 md:grid-cols-[1.4fr,1.1fr,1.1fr]">
          {/* Brand + tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-[#C48A4A] to-[#F4C58A] flex items-center justify-center text-xs font-semibold text-white shadow-[0_14px_40px_rgba(0,0,0,0.55)]">
                FS
              </div>
              <div className="flex flex-col leading-tight">
                <p className="font-serif text-lg tracking-tight">
                  Fiacahya Snack
                </p>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#F7D3A5]">
                  Premium Bakery & Snack
                </p>
              </div>
            </div>

            <p className="text-xs md:text-sm text-[#F9D8AC] max-w-md">
              Premium bakery & snack production untuk kebutuhan harian, coffee
              shop, hingga acara korporasi. Fokus pada rasa konsisten, tampilan
              rapi, dan jadwal pengiriman yang jelas.
            </p>

            <div className="flex flex-wrap gap-2 text-[11px]">
              {["Snack box harian", "Coffee shop & kafe", "Corporate & event"].map(
                (chip) => (
                  <span
                    key={chip}
                    className="inline-flex items-center rounded-full border border-[#F7D3A5]/60 bg-white/5 px-3 py-1 shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
                  >
                    {chip}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Kontak */}
          <div className="space-y-3 text-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F7D3A5]">
              Kontak
            </p>
            <ul className="space-y-2 text-xs md:text-sm">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 text-[#F7D3A5]" />
                <div>
                  <p className="font-semibold text-[#FFE6C7]">WhatsApp</p>
                  <p className="text-[#F9D8AC]">
                    0812-3456-7890 (Admin Fiacahya Snack)
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-[#F7D3A5]" />
                <div>
                  <p className="font-semibold text-[#FFE6C7]">Email</p>
                  <p className="text-[#F9D8AC]">
                    hello@fiacahya-snack.com
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Instagram className="mt-0.5 h-4 w-4 text-[#F7D3A5]" />
                <div>
                  <p className="font-semibold text-[#FFE6C7]">Instagram</p>
                  <p className="text-[#F9D8AC]">@fiacahya.snack</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Produksi & Pengiriman */}
          <div className="space-y-3 text-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F7D3A5]">
              Produksi & Pengiriman
            </p>
            <div className="space-y-2 text-xs md:text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-[#F7D3A5]" />
                <div>
                  <p className="font-semibold text-[#FFE6C7]">
                    Fiacahya Kitchen Lab
                  </p>
                  <p className="text-[#F9D8AC]">
                    Jakarta, Indonesia · Pengiriman utama area Jabodetabek.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 text-[#F7D3A5]" />
                <div>
                  <p className="font-semibold text-[#FFE6C7]">Jam produksi</p>
                  <p className="text-[#F9D8AC]">
                    04.00 – 16.00 WIB · Cut-off order besar H-1 pukul 15.00.
                  </p>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/6281234567890"
              className="inline-flex items-center justify-center rounded-full bg-[#3E2A20] px-5 py-2 text-xs font-semibold text-white shadow-[0_18px_45px_rgba(0,0,0,0.6)] hover:-translate-y-0.5 active:translate-y-0 transition-transform"
            >
              Konsultasi paket via WhatsApp
            </a>
          </div>
        </div>

        {/* IKUTI KAMI + MENU UTAMA */}
        <div className="border-t border-[#5B3623]/80 pt-6 pb-6">
          <div className="max-w-6xl mx-auto px-4 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            {/* Ikuti kami */}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F7D3A5] mb-3">
                Ikuti Kami
              </p>
              <div className="flex items-center gap-3">
                {[
                  { Icon: Instagram, href: "https://instagram.com/fiacahya.snack" },
                  { Icon: Youtube, href: "https://youtube.com" },
                  { Icon: Facebook, href: "https://facebook.com" },
                  { Icon: Twitter, href: "https://twitter.com" },
                ].map(({ Icon, href }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#FDE8D5]/70 text-[#FDE8D5] hover:bg-[#FDE8D5]/10 hover:-translate-y-0.5 transition-all duration-150"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Menu utama */}
            <nav className="md:text-right">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F7D3A5] mb-3">
                Menu Utama
              </p>
              <ul className="space-y-1.5 text-sm md:text-base text-[#FDE8D5]">
                {[
                  { label: "Home", href: "/" },
                  { label: "Produk", href: "/produk" },
                  { label: "Produksi", href: "/produksi" },
                  { label: "Profil & Kontak", href: "/profil" },
                ].map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="inline-block hover:text-white hover:translate-x-0.5 md:hover:-translate-x-0.5 transition-transform"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-[#5B3623]/80 bg-[#2A180F] text-[11px] text-[#F9D8AC]">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
            <p>© {year} Fiacahya Snack. All rights reserved.</p>
            <p>Homemade with care · Delivered with precision.</p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

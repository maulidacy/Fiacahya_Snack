// src/components/layout/footer.tsx
"use client";

import { motion, type Variants } from "framer-motion";
import {
  Phone,
  Mail,
  Instagram,
  Youtube,
  Facebook,
  Twitter,
} from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] },
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
      {/* glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.14),_transparent)]" />

      <div className="relative z-10">
        {/* TOP AREA: Brand kiri | Kontak kanan */}
        <div
          className="
            max-w-6xl mx-auto px-4 py-8 md:py-10
            grid gap-8 items-start
            md:grid-cols-2
          "
        >
          {/* BRAND + TAGLINE (KIRI) */}
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
              Premium bakery & snack production untuk kebutuhan harian,
              coffee shop, hingga acara korporasi. Fokus pada rasa konsisten,
              tampilan rapi, dan jadwal pengiriman yang jelas.
            </p>

            <div className="flex flex-wrap gap-2 text-[11px]">
              {[
                "Snack box harian",
                "Coffee shop & kafe",
                "Corporate & event",
              ].map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center rounded-full border border-[#F7D3A5]/60 bg-white/5 px-3 py-1 shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          {/* KOLOM KANAN: Kontak (tetap di kanan, tapi isi rata kiri) */}
          <div className="space-y-3 text-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F7D3A5]">
              Kontak
            </p>
            <ul className="space-y-2 text-xs md:text-sm">
              {/* WhatsApp */}
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 text-[#F7D3A5]" />
                <div>
                  <p className="font-semibold text-[#FFE6C7]">WhatsApp</p>
                  <p className="text-[#F9D8AC]">
                    0882-0085-26405 (Admin Fiacahya Snack)
                  </p>
                </div>
              </li>

              {/* Email */}
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-[#F7D3A5]" />
                <div>
                  <p className="font-semibold text-[#FFE6C7]">Email</p>
                  <p className="text-[#F9D8AC]">hello@fiacahya-snack.com</p>
                </div>
              </li>

              {/* Instagram */}
              <li className="flex items-start gap-3">
                <Instagram className="mt-0.5 h-4 w-4 text-[#F7D3A5]" />
                <div>
                  <p className="font-semibold text-[#FFE6C7]">Instagram</p>
                  <p className="text-[#F9D8AC]">@fiacahya.snack</p>
                </div>
              </li>
            </ul>
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
                  { label: "Katalog", href: "/produk" },
                  { label: "Syarat & Ketentuan", href: "/syarat-ketentuan" },
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
        <div className="border-t border-[#5B3623]/80 bg-[#3A261A] text-[11px] text-[#F9D8AC]">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
            <p>© {year} Fiacahya Snack. All rights reserved.</p>
            <p>Homemade with care · Delivered with precision.</p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

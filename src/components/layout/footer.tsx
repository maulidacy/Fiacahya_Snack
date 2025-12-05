"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] },
  },
};

export function Footer() {
  return (
    <footer className="bg-transparent">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-6xl mx-auto px-4 pb-10">
          <div
            className="
              rounded-3xl 
              bg-white text-[#3A261A] 
              px-6 py-8 md:px-8 md:py-9 
              shadow-soft-lg border border-border-soft
              dark:bg-[#050505] dark:text-neutral-100 dark:border-neutral-800
            "
          >
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-between">
              <div>
                <h3 className="font-serif text-xl md:text-2xl mb-2">
                  Fiacahya Snack
                </h3>
                <p className="text-xs md:text-sm text-[#6A4A35] max-w-sm dark:text-neutral-300">
                  Premium bakery & snack production untuk kebutuhan harian dan
                  acara spesial Anda.
                </p>
              </div>

              <div className="flex gap-10 text-xs">
                <div className="space-y-1">
                  <p className="font-semibold text-[#3A261A] dark:text-neutral-50">
                    Kontak
                  </p>
                  <p className="text-[#6A4A35] dark:text-neutral-300">
                    WhatsApp: 0812-3456-7890
                  </p>
                  <p className="text-[#6A4A35] dark:text-neutral-300">
                    Email: hello@fiacahya-snack.com
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-[#3A261A] dark:text-neutral-50">
                    Alamat Produksi
                  </p>
                  <p className="text-[#6A4A35] dark:text-neutral-300">
                    Fiacahya Kitchen Lab
                  </p>
                  <p className="text-[#6A4A35] dark:text-neutral-300">
                    Jakarta, Indonesia
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-[#E3C9A8] pt-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-[11px] text-[#8C6647] dark:border-neutral-800 dark:text-neutral-400">
              <p>
                © {new Date().getFullYear()} Fiacahya Snack. All rights
                reserved.
              </p>
              <p>Homemade with care · Delivered with precision.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}

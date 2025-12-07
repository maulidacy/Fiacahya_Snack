"use client";

import Image from "next/image";
import { Playfair_Display, Montserrat } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
});

// Pakai beberapa foto ilustrasi dari Unsplash (bisa diganti ke asset sendiri)
const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80",
    alt: "Display aneka pastry dan roti.",
  },
  {
    src: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=80",
    alt: "Snack box yang siap dikirim.",
  },
  {
    src: "https://images.unsplash.com/photo-1551024601-bec78bea9cbc?auto=format&fit=crop&w=1200&q=80",
    alt: "Cake dan dessert di meja display.",
  },
  {
    src: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
    alt: "Proses plating pastry.",
  },
  {
    src: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
    alt: "Kue basah tradisional.",
  },
  {
    src: "https://images.unsplash.com/photo-1509440510228-5e6155e6f9ac?auto=format&fit=crop&w=1200&q=80",
    alt: "Proses produksi di dapur.",
  },
  {
    src: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=80",
    alt: "Aneka bahan baku baking.",
  },
  {
    src: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80",
    alt: "Suasana dapur dan cooling rack.",
  },
];

export default function GaleriPage() {
  return (
    <main
      className={`${montserrat.variable} ${playfair.variable} font-sans 
        min-h-screen bg-bg-light text-text-light
        dark:bg-bg-dark dark:text-text-dark`}
    >
      <Navbar />

      <section className="bg-transparent">
        <div className="max-w-6xl mx-auto px-4 pt-10 pb-4 md:pt-14 md:pb-6">
          <div className="max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#B47A45] mb-2 dark:text-amber-200/90">
              Galeri Produksi
            </p>
            <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl mb-3 text-[#3A261A] dark:text-neutral-50">
              Galeri produksi & produk Fiacahya Snack.
            </h1>
            <p className="text-sm md:text-base text-[#6A4A35] dark:text-neutral-200 leading-relaxed">
              Kumpulan dokumentasi visual kue basah, pastry, proses produksi, dan
              suasana dapur. Grid ini dirancang ringan dan responsif, sehingga
              beberapa foto langsung terlihat di satu layar tanpa scrolling panjang.
            </p>
          </div>
        </div>

        {/* GRID FOTO – tanpa card berat, hanya container tipis & hover halus */}
        <div className="max-w-6xl mx-auto px-2 pb-12 md:px-4 md:pb-16">
          <div
            className="
              grid gap-2.5
              grid-cols-2
              sm:grid-cols-3
              lg:grid-cols-4
            "
          >
            {galleryImages.map((img) => (
              <figure
                key={img.src}
                className="
                  relative aspect-[4/3] overflow-hidden rounded-2xl
                  bg-neutral-100/70 dark:bg-neutral-900/70
                  shadow-[0_10px_30px_rgba(0,0,0,0.04)]
                  hover:shadow-[0_18px_45px_rgba(0,0,0,0.10)]
                  transition-shadow duration-300
                "
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="
                    (max-width: 640px) 50vw,
                    (max-width: 1024px) 33vw,
                    25vw
                  "
                  className="
                    object-cover
                    transition-transform duration-500
                    hover:scale-[1.04]
                  "
                  loading="lazy"
                />
                {/* caption kecil, hanya muncul saat fokus / screen reader */}
                <figcaption className="sr-only">{img.alt}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

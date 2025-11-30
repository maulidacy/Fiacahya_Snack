"use client";

import { FadeUp, StaggerList } from "@/components/ui/animate";

type Category = {
  name: string;
  description: string;
  examples: string[];
  note?: string;
};

const categories: Category[] = [
  {
    name: "Kue Basah",
    description:
      "Produk utama untuk konsumsi harian dan pesanan acara, dengan fokus pada tekstur lembut dan rasa autentik.",
    examples: ["Klepon pandan", "Dadar gulung cokelat", "Nagasari pisang", "Lemper ayam"],
  },
  {
    name: "Kue Kering",
    description:
      "Produksi musiman dan reguler untuk paket hampers, parcel, dan penjualan grosir.",
    examples: ["Kastengel", "Nastar", "Putri salju", "Sagu keju"],
    note: "Cocok untuk kebutuhan lebaran atau seasonal gift.",
  },
  {
    name: "Kue Tart & Cake",
    description:
      "Kue tart dan cake untuk ulang tahun, syukuran, dan kebutuhan dekoratif ringan.",
    examples: ["Tart fresh cream", "Butter cake", "Brownies panggang"],
  },
  {
    name: "Snack Box & Paket",
    description:
      "Paket isi beberapa jenis kue untuk rapat kantor, pengajian, dan acara keluarga.",
    examples: ["Snack box isi 3–5 item", "Paket arisan", "Paket rapat pagi"],
  },
  {
    name: "Jajanan Pasar",
    description:
      "Ragam jajanan tradisional dengan standar produksi modern dan higienis.",
    examples: ["Lapis beras", "Kue talam", "Getuk", "Serabi"],
  },
];

export default function ProdukPage() {
  return (
    <div className="space-y-10 pb-16">
      <FadeUp>
        <header className="space-y-3">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
            Kategori Produk – FiaCahya Snack
          </h1>
          <p className="max-w-2xl text-sm text-gray-600 dark:text-gray-300">
            FiaCahya Snack memproduksi berbagai jenis kue untuk kebutuhan harian,
            acara kantor, hingga pesanan khusus. Berikut kategori utama yang
            dikerjakan oleh tim produksi kami.
          </p>
        </header>
      </FadeUp>

      <StaggerList className="grid gap-5 md:grid-cols-2">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 text-sm shadow-soft transition hover:-translate-y-[3px] hover:shadow-lg dark:border-border-soft-dark dark:bg-neutral-900"
          >
            <div className="space-y-2">
              <h2 className="text-base font-semibold text-gray-900 dark:text-gray-50">
                {cat.name}
              </h2>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                {cat.description}
              </p>
            </div>

            <div className="mt-3 space-y-1">
              <div className="text-[11px] font-semibold uppercase text-gray-500 dark:text-gray-400">
                Contoh produk
              </div>
              <ul className="flex flex-wrap gap-1.5 text-[11px] text-gray-700 dark:text-gray-200">
                {cat.examples.map((e) => (
                  <li
                    key={e}
                    className="rounded-full border border-gray-200 px-2 py-1 dark:border-border-soft-dark"
                  >
                    {e}
                  </li>
                ))}
              </ul>
            </div>

            {cat.note && (
              <p className="mt-3 text-[11px] text-gray-500 dark:text-gray-400">
                {cat.note}
              </p>
            )}
          </div>
        ))}
      </StaggerList>
    </div>
  );
}

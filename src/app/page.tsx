"use client";

import { FadeUp, StaggerList } from "@/components/ui/animate";
import { ClipboardList, Workflow, ChefHat } from "lucide-react";

const summaryStats = [
  {
    title: "Total batch",
    value: "32",
    desc: "Akumulasi seluruh lini kue basah hari ini.",
  },
  {
    title: "Jenis kue",
    value: "12",
    desc: "Klepon, dadar gulung, risoles, dan lainnya.",
  },
  {
    title: "Status QC",
    value: "Sebagian besar lulus",
    desc: "Berdasarkan sampling QC terakhir.",
  },
  {
    title: "Jam operasional",
    value: "04.00 – 16.00 WIB",
    desc: "Shift pagi & siang termasuk cleaning.",
  },
];

const steps = [
  {
    title: "Persiapan Bahan",
    desc: "Penimbangan tepung, santan, gula, dan bahan lain sesuai SOP.",
    icon: ClipboardList,
  },
  {
    title: "Pengadonan",
    desc: "Pengadukan manual/mesin sampai tekstur adonan konsisten.",
    icon: Workflow,
  },
  {
    title: "Pengukusan / Panggang",
    desc: "Pematangan dengan kontrol suhu dan waktu terukur.",
    icon: ChefHat,
  },
  {
    title: "Pendinginan",
    desc: "Produk didinginkan di rak sebelum packing.",
    icon: ClipboardList,
  },
  {
    title: "Packing & Labeling",
    desc: "Kue dikemas dan diberi label batch & tanggal produksi.",
    icon: Workflow,
  },
];

export default function HomePage() {
  return (
    <div className="space-y-12 pb-16">
      {/* HERO */}
      <FadeUp>
        <section className="grid gap-8 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full border border-pandan/60 bg-pandan/15 px-3 py-1 text-xs font-medium text-coffee">
              FiaCahya Snack · Unit Produksi Kue Basah
            </div>

            <h1 className="text-3xl font-semibold leading-tight text-gray-900 dark:text-gray-50 md:text-4xl">
              Sistem Informasi Produksi & Dokumentasi Kualitas Harian
            </h1>

            <p className="max-w-xl text-sm text-gray-600 dark:text-gray-300">
              Dashboard internal untuk memantau batch kue basah, status QC,
              proses produksi, dan dokumentasi standar FiaCahya Snack.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="/produksi"
                className="rounded-full bg-coffee px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:bg-[#4b3428]"
              >
                Lihat Produksi Hari Ini
              </a>
              <a
                href="/dokumentasi"
                className="rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-100 dark:border-border-soft-dark dark:bg-neutral-900 dark:text-gray-100 dark:hover:bg-neutral-800"
              >
                Dokumentasi Produksi
              </a>
            </div>
          </div>

          {/* Panel visual sederhana */}
          <div className="flex h-60 flex-col justify-between rounded-3xl border border-gray-200 bg-white p-4 shadow-soft dark:border-border-soft-dark dark:bg-neutral-900 md:h-72">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Snapshot dapur produksi
              </div>
              <p className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-50">
                Monitoring batch, status QC, dan lini produksi aktif dalam satu
                tampilan.
              </p>
            </div>
            <div className="grid gap-3 text-xs sm:grid-cols-2">
              <div className="rounded-xl border border-gray-200 bg-bg-light px-3 py-2 dark:border-border-soft-dark dark:bg-neutral-950/40">
                <div className="text-[11px] text-gray-500 dark:text-gray-400">
                  Lini aktif
                </div>
                <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-50">
                  6 lini
                </div>
                <div className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
                  Klepon, dadar gulung, risoles, dll.
                </div>
              </div>
              <div className="rounded-xl border border-eggyolk/70 bg-eggyolk/20 px-3 py-2">
                <div className="text-[11px] font-medium text-gray-800">
                  Shift berjalan
                </div>
                <div className="mt-1 text-lg font-semibold text-gray-900">
                  Pagi · 04.00–10.00
                </div>
                <div className="mt-1 text-[11px] text-gray-700">
                  Durasi proses & cleaning tercatat.
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeUp>

      {/* RINGKASAN PRODUKSI */}
      <section>
        <FadeUp>
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-50">
            Ringkasan Produksi Hari Ini
          </h2>
        </FadeUp>

        <StaggerList className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {summaryStats.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-soft transition hover:-translate-y-[2px] hover:shadow-lg dark:border-border-soft-dark dark:bg-neutral-900"
            >
              <div className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                {item.title}
              </div>
              <div className="mt-1 text-2xl font-semibold text-gray-900 dark:text-gray-50">
                {item.value}
              </div>
              <div className="mt-1 text-xs text-gray-600 dark:text-gray-300">
                {item.desc}
              </div>
            </div>
          ))}
        </StaggerList>
      </section>

      {/* PROSES PRODUKSI */}
      <section>
        <FadeUp>
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-50">
            Alur Proses Produksi Kue Basah
          </h2>
        </FadeUp>

        <StaggerList className="grid gap-4 md:grid-cols-5">
          {steps.map((step) => (
            <div
              key={step.title}
              className="flex flex-col gap-2 rounded-xl border border-gray-200 bg-white p-4 text-sm shadow-soft transition hover:-translate-y-[3px] hover:shadow-lg dark:border-border-soft-dark dark:bg-neutral-900"
            >
              <step.icon className="h-5 w-5 text-coffee" />
              <div className="font-semibold text-gray-900 dark:text-gray-50">
                {step.title}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300">
                {step.desc}
              </div>
            </div>
          ))}
        </StaggerList>
      </section>

      {/* TEASER CHATBOT */}
      <FadeUp delay={0.15}>
        <section className="rounded-2xl border border-pandan bg-pandan/15 p-5 text-sm shadow-soft">
          <h2 className="text-sm font-semibold text-coffee">
            Asisten Produksi AI – FiaCahya Snack
          </h2>
          <p className="mt-1 max-w-2xl text-xs text-gray-700 dark:text-gray-900">
            Tombol mengambang di kanan bawah membuka asisten AI untuk membantu
            menjawab pertanyaan terkait SOP, jadwal produksi, dan ringkasan
            batch. Saat ini masih menggunakan respon dummy dari endpoint{" "}
            <code>/api/chat</code>.
          </p>
        </section>
      </FadeUp>
    </div>
  );
}

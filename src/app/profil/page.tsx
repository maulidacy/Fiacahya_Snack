"use client";

import { FadeUp } from "@/components/ui/animate";

export default function ProfilPage() {
  return (
    <div className="space-y-10 pb-16">
      {/* Sekilas usaha */}
      <FadeUp>
        <section className="space-y-3">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
            Profil Usaha – FiaCahya Snack
          </h1>
          <p className="max-w-2xl text-sm text-gray-600 dark:text-gray-300">
            FiaCahya Snack adalah unit produksi aneka kue yang berfokus pada
            kue basah tradisional, kue kering, dan kue tart untuk berbagai
            kebutuhan acara. Proses produksi dilakukan dengan standar kebersihan
            dan konsistensi rasa, didukung dokumentasi batch dan quality control
            harian.
          </p>
        </section>
      </FadeUp>

      {/* Visi & misi */}
      <FadeUp>
        <section className="grid gap-5 md:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-soft dark:border-border-soft-dark dark:bg-neutral-900">
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-50">
              Visi
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Menjadi mitra pilihan untuk kebutuhan kue dan snack yang
              konsisten, higienis, dan terpercaya bagi acara keluarga maupun
              korporasi.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-soft dark:border-border-soft-dark dark:bg-neutral-900">
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-50">
              Misi
            </h2>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-gray-600 dark:text-gray-300">
              <li>Menjaga cita rasa kue tradisional dengan standar produksi modern.</li>
              <li>Menerapkan sistem batch & QC yang terdokumentasi dengan baik.</li>
              <li>Melayani pesanan dengan tepat waktu dan komunikasi yang jelas.</li>
              <li>Mengembangkan variasi produk sesuai kebutuhan pelanggan.</li>
            </ul>
          </div>
        </section>
      </FadeUp>

      {/* Nilai & keunggulan */}
      <FadeUp>
        <section className="grid gap-4 md:grid-cols-3">
          <HighlightCard
            title="Konsistensi Rasa"
            text="Takaran resep dan prosedur produksi yang terdokumentasi memastikan rasa yang konsisten dari batch ke batch."
          />
          <HighlightCard
            title="Kebersihan & QC"
            text="Setiap batch melewati pengecekan visual dan sampling rasa, dilengkapi catatan QC sederhana."
          />
          <HighlightCard
            title="Fleksibel untuk Acara"
            text="Melayani pemesanan snack box, paket acara, dan kebutuhan custom sesuai tema dan jumlah tamu."
          />
        </section>
      </FadeUp>

      {/* Kontak & lokasi */}
      <FadeUp>
        <section className="grid gap-5 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div className="rounded-xl border border-gray-200 bg-white p-5 text-sm shadow-soft dark:border-border-soft-dark dark:bg-neutral-900">
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-50">
              Informasi Kontak
            </h2>
            <dl className="mt-3 space-y-2 text-sm text-gray-700 dark:text-gray-200">
              <div>
                <dt className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                  Alamat produksi
                </dt>
                <dd>
                  Jl. Contoh No. 123, Kawasan Industri, Kota
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                  WhatsApp
                </dt>
                <dd>0812-0000-0000 (Admin FiaCahya Snack)</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                  Email
                </dt>
                <dd>produksi@fiacahyasnack.com</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                  Jam operasional
                </dt>
                <dd>Produksi: 04.00 – 16.00 WIB · Admin pemesanan: 08.00 – 17.00 WIB</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-xl border border-gray-200 bg-bg-light p-5 text-xs shadow-soft dark:border-border-soft-dark dark:bg-neutral-900">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-50">
              Catatan untuk pelanggan
            </h3>
            <ul className="mt-3 list-disc space-y-1 pl-4 text-gray-700 dark:text-gray-200">
              <li>Pemesanan jumlah besar disarankan konfirmasi H-3.</li>
              <li>Pembatalan & perubahan jumlah mengikuti kebijakan yang disepakati.</li>
              <li>Untuk kebutuhan khusus (diet, tanpa telur, dll) mohon konsultasi terlebih dahulu.</li>
            </ul>
          </div>
        </section>
      </FadeUp>
    </div>
  );
}

function HighlightCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 text-sm shadow-soft dark:border-border-soft-dark dark:bg-neutral-900">
      <div className="text-sm font-semibold text-gray-900 dark:text-gray-50">
        {title}
      </div>
      <p className="mt-2 text-xs text-gray-600 dark:text-gray-300">{text}</p>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { FadeUp, StaggerList } from "@/components/ui/animate";
import { StatusBadge, type BatchStatus } from "@/components/ui/status-badge";
import { Filter, RefreshCw } from "lucide-react";

type BatchRow = {
  id: string;
  namaProduk: string;
  jumlahBatch: number;
  status: BatchStatus;
  mulai: string;
  selesai: string | null;
};

const MOCK_BATCHES: BatchRow[] = [
  {
    id: "B-2401",
    namaProduk: "Klepon Pandan",
    jumlahBatch: 6,
    status: "done",
    mulai: "04:15",
    selesai: "06:10",
  },
  {
    id: "B-2402",
    namaProduk: "Dadar Gulung Cokelat",
    jumlahBatch: 4,
    status: "in-progress",
    mulai: "05:00",
    selesai: null,
  },
  {
    id: "B-2403",
    namaProduk: "Risoles Sayur",
    jumlahBatch: 5,
    status: "attention",
    mulai: "05:30",
    selesai: null,
  },
  {
    id: "B-2404",
    namaProduk: "Nagasari Pisang",
    jumlahBatch: 3,
    status: "done",
    mulai: "03:50",
    selesai: "05:20",
  },
  {
    id: "B-2405",
    namaProduk: "Lemper Ayam",
    jumlahBatch: 4,
    status: "in-progress",
    mulai: "06:00",
    selesai: null,
  },
];

type FilterOption = "all" | BatchStatus;

export default function ProduksiPage() {
  const [statusFilter, setStatusFilter] = useState<FilterOption>("all");

  const filtered = useMemo(() => {
    if (statusFilter === "all") return MOCK_BATCHES;
    return MOCK_BATCHES.filter((b) => b.status === statusFilter);
  }, [statusFilter]);

  const totalBatch = MOCK_BATCHES.reduce(
    (sum, b) => sum + b.jumlahBatch,
    0
  );

  const selesaiCount = MOCK_BATCHES.filter((b) => b.status === "done").length;
  const inProgressCount = MOCK_BATCHES.filter(
    (b) => b.status === "in-progress"
  ).length;
  const attentionCount = MOCK_BATCHES.filter(
    (b) => b.status === "attention"
  ).length;

  return (
    <div className="space-y-8 pb-16">
      <FadeUp>
        <header className="space-y-2">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
            Dashboard Produksi – FiaCahya Snack
          </h1>
          <p className="max-w-2xl text-sm text-gray-600 dark:text-gray-300">
            Pemantauan batch harian untuk kue basah: jumlah batch, status
            proses, dan perkiraan waktu mulai/selesai. Data berikut masih
            contoh (dummy) untuk tampilan UI.
          </p>
        </header>
      </FadeUp>

      {/* Ringkasan kecil */}
      <FadeUp>
        <section className="grid gap-3 sm:grid-cols-4">
          <SmallStat label="Total batch hari ini" value={totalBatch} />
          <SmallStat label="Batch selesai" value={selesaiCount} />
          <SmallStat label="Sedang diproses" value={inProgressCount} />
          <SmallStat label="Perlu perhatian" value={attentionCount} />
        </section>
      </FadeUp>

      {/* Filter bar */}
      <FadeUp>
        <section className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white p-3 text-xs shadow-soft dark:border-border-soft-dark dark:bg-neutral-900">
          <div className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <Filter className="h-4 w-4" />
            <span className="font-medium">Filter status batch</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <FilterChip
              label="Semua"
              active={statusFilter === "all"}
              onClick={() => setStatusFilter("all")}
            />
            <FilterChip
              label="Selesai"
              color="emerald"
              active={statusFilter === "done"}
              onClick={() => setStatusFilter("done")}
            />
            <FilterChip
              label="Sedang diproses"
              color="amber"
              active={statusFilter === "in-progress"}
              onClick={() => setStatusFilter("in-progress")}
            />
            <FilterChip
              label="Butuh perhatian"
              color="red"
              active={statusFilter === "attention"}
              onClick={() => setStatusFilter("attention")}
            />
            <button
              type="button"
              onClick={() => setStatusFilter("all")}
              className="inline-flex items-center gap-1 rounded-full border border-gray-200 px-3 py-1.5 text-[11px] font-medium text-gray-600 hover:bg-gray-50 dark:border-border-soft-dark dark:text-gray-300 dark:hover:bg-neutral-800"
            >
              <RefreshCw className="h-3 w-3" />
              Reset
            </button>
          </div>
        </section>
      </FadeUp>

      {/* Tabel desktop + card mobile */}
      <section className="space-y-4">
        <FadeUp>
          <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-50">
            Batch produksi hari ini
          </h2>
        </FadeUp>

        {/* Desktop table */}
        <FadeUp>
          <div className="hidden overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-soft dark:border-border-soft-dark dark:bg-neutral-900 md:block">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-xs uppercase text-gray-500 dark:border-border-soft-dark dark:text-gray-400">
                  <th className="px-4 py-3 text-left">Batch ID</th>
                  <th className="px-4 py-3 text-left">Produk</th>
                  <th className="px-4 py-3 text-left">Jumlah batch</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Mulai</th>
                  <th className="px-4 py-3 text-left">Selesai</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr
                    key={row.id}
                    className="border-t border-gray-100 text-xs text-gray-700 hover:bg-gray-50/70 dark:border-border-soft-dark dark:text-gray-200 dark:hover:bg-neutral-800"
                  >
                    <td className="px-4 py-3 font-mono text-[11px]">
                      {row.id}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-50">
                      {row.namaProduk}
                    </td>
                    <td className="px-4 py-3">{row.jumlahBatch}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={row.status} />
                    </td>
                    <td className="px-4 py-3">{row.mulai}</td>
                    <td className="px-4 py-3">
                      {row.selesai ?? (
                        <span className="text-[11px] text-gray-400">
                          Proses
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeUp>

        {/* Mobile card view */}
        <StaggerList className="space-y-3 md:hidden">
          {filtered.map((row) => (
            <div
              key={row.id}
              className="rounded-xl border border-gray-200 bg-white p-3 text-xs shadow-soft dark:border-border-soft-dark dark:bg-neutral-900"
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <div className="font-mono text-[11px] text-gray-500 dark:text-gray-400">
                    {row.id}
                  </div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-gray-50">
                    {row.namaProduk}
                  </div>
                </div>
                <StatusBadge status={row.status} />
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <dl className="space-y-1">
                  <dt className="text-[11px] text-gray-500">Jumlah batch</dt>
                  <dd className="text-sm font-medium">{row.jumlahBatch}</dd>
                </dl>
                <dl className="space-y-1">
                  <dt className="text-[11px] text-gray-500">Mulai</dt>
                  <dd className="text-sm font-medium">{row.mulai}</dd>
                </dl>
                <dl className="space-y-1">
                  <dt className="text-[11px] text-gray-500">Selesai</dt>
                  <dd className="text-sm font-medium">
                    {row.selesai ?? (
                      <span className="text-[11px] text-gray-400">
                        Masih proses
                      </span>
                    )}
                  </dd>
                </dl>
              </div>
            </div>
          ))}
        </StaggerList>
      </section>
    </div>
  );
}

function SmallStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3 text-xs shadow-soft dark:border-border-soft-dark dark:bg-neutral-900">
      <div className="text-[11px] text-gray-500">{label}</div>
      <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-gray-50">
        {value}
      </div>
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
  color,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  color?: "emerald" | "amber" | "red";
}) {
  const base =
    "inline-flex items-center rounded-full border px-3 py-1.5 text-[11px] font-medium transition";

  if (!active) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${base} border-gray-200 bg-white text-gray-600 hover:bg-gray-50 dark:border-border-soft-dark dark:bg-neutral-900 dark:text-gray-300 dark:hover:bg-neutral-800`}
      >
        {label}
      </button>
    );
  }

  const activeClass =
    color === "emerald"
      ? "border-emerald-600 bg-emerald-600 text-white"
      : color === "amber"
      ? "border-amber-500 bg-amber-500 text-gray-900"
      : color === "red"
      ? "border-red-600 bg-red-600 text-white"
      : "border-coffee bg-coffee text-white";

  return (
    <button type="button" onClick={onClick} className={`${base} ${activeClass}`}>
      {label}
    </button>
  );
}

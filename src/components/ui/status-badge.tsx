// src/components/ui/status-badge.tsx
type BatchStatus = "done" | "in-progress" | "attention";

const STATUS_CONFIG: Record<
  BatchStatus,
  { label: string; className: string }
> = {
  done: {
    label: "Selesai",
    className:
      "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-200 dark:border-emerald-800",
  },
  "in-progress": {
    label: "Sedang diproses",
    className:
      "bg-eggyolk/20 text-amber-800 border-eggyolk/60 dark:bg-amber-900/30 dark:text-amber-100 dark:border-amber-700",
  },
  attention: {
    label: "Butuh perhatian",
    className:
      "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-200 dark:border-red-800",
  },
};

export function StatusBadge({
  status,
  customLabel,
}: {
  status: BatchStatus;
  customLabel?: string;
}) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold ${cfg.className}`}
    >
      {customLabel ?? cfg.label}
    </span>
  );
}

export type { BatchStatus };

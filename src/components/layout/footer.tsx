export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-gray-200 bg-bg-light dark:border-border-soft-dark dark:bg-bg-dark">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-sm text-gray-600 dark:text-gray-400 md:flex-row md:items-center md:justify-between md:px-6">
        <div>
          <div className="font-semibold text-gray-800 dark:text-gray-200">
            FiaCahya Snack – Unit Produksi Kue Basah
          </div>
          <div>Jl. Contoh No. 123, Kawasan Industri, Jakarta</div>
          <div>Kontak: 021-000000 | produksi@fiacahyasnack.com</div>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-500">
          © {year} FiaCahya Snack. Sistem informasi produksi internal.
        </div>
      </div>
    </footer>
  );
}

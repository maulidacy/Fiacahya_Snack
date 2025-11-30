import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ChatbotFloating } from "@/components/chatbot/chatbot-floating";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FiaCahya Snack – Unit Produksi Kue Basah",
  description:
    "Sistem informasi produksi dan dokumentasi kualitas harian FiaCahya Snack.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-bg-light text-text-light dark:bg-bg-dark dark:text-text-dark`}
      >
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-10 pt-6 md:px-6 md:pt-8">
              {children}
            </main>
            <Footer />
            <ChatbotFloating />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

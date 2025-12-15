// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { AssistantRoot } from "@/components/chatbot/assistant-root";

export const metadata: Metadata = {
  title: "Fiacahya Snack",
  description: "Premium bakery & snack production by Fiacahya Snack",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>
        {/* pakai ThemeProvider, bungkus di sini */}
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          {/* Chatbot muncul di semua halaman, load-nya di client */}
          <AssistantRoot />
        </ThemeProvider>
      </body>
    </html>
  );
}

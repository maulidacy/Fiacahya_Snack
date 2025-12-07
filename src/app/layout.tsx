// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ui/theme-provider";

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"       // <html class="dark" />
          defaultTheme="light"    // mulai dari light
          enableSystem={true}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

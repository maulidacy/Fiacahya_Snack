import type { ReactNode } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ChatbotFloating } from '@/components/chatbot/chatbot-floating';

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-bg-light text-text-light dark:bg-bg-dark dark:text-text-dark">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-10 pt-6 md:px-6 md:pt-8">
        {children}
      </main>
      <Footer />
      <ChatbotFloating />
    </div>
  );
}

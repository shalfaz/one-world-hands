import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-foreground">
      <div className="w-full border-b border-sky-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-2 text-center text-sm font-medium text-[#0084d1] sm:px-6 lg:px-8">
          Where Magic Hands Unite, Wonders Arise.
        </div>
      </div>

      <Header />

      <main id="main" className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}


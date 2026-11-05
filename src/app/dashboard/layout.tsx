"use client";

import { ReactNode, useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { FiMenu } from "react-icons/fi";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-950">
      <DashboardSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="min-w-0 lg:pl-[276px]">
        <header className="sticky top-0 z-30 flex h-[72px] items-center border-b border-slate-200/80 bg-white/95 px-4 backdrop-blur lg:px-8">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="mr-3 grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-700 lg:hidden"
            aria-label="Open navigation"
          >
            <FiMenu className="text-xl" />
          </button>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-600">Administration</p>
            <p className="text-sm font-semibold text-slate-900">One World Hands</p>
          </div>
          <a
            href="/"
            className="ml-auto rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
          >
            View website
          </a>
        </header>
        <main className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

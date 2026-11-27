"use client";

import { ReactNode, useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { FiMenu } from "react-icons/fi";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function DashboardLayoutClient({
  children,
}: {
  children: ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F7FAFC] text-slate-950">
      <DashboardSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="min-w-0 lg:pl-[276px]">
        <header className="sticky top-0 z-30 flex h-[72px] items-center border-b border-[#D9E2EC] bg-white/95 px-4 backdrop-blur lg:px-8">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="mr-3 grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-700 lg:hidden"
            aria-label={t.dashboard.layout.openNavigation}
          >
            <FiMenu className="text-xl" />
          </button>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#174A70]">{t.dashboard.layout.administration}</p>
            <p className="text-sm font-semibold text-slate-900">{t.dashboard.layout.brandName}</p>
          </div>
          <Link
            href="/"
            className="ml-auto whitespace-nowrap rounded-lg border border-[#D9E2EC] px-3 py-2 text-sm font-semibold text-[#174A70] transition-colors hover:border-[#009EDB] hover:bg-[#EAF6FB]"
          >
            {t.dashboard.layout.viewWebsite}
          </Link>
        </header>
        <main className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

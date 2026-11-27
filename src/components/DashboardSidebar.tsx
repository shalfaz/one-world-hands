"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutUser } from "../app/login/actions";
import {
  FiBarChart2, FiDollarSign, FiHeart, FiHome, FiImage, FiMail,
  FiSettings, FiLogOut, FiExternalLink, FiX,
} from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";
import type { TranslationKey } from "@/context/i18n-utils";

const navItems = [
  { labelKey: "dashboard.sidebar.nav.overview" as const satisfies TranslationKey, href: "/dashboard", icon: FiBarChart2 },
  { labelKey: "dashboard.sidebar.nav.donations" as const satisfies TranslationKey, href: "/dashboard/donations", icon: FiDollarSign },
  { labelKey: "dashboard.sidebar.nav.funds" as const satisfies TranslationKey, href: "/dashboard/funds", icon: FiHeart },
  { labelKey: "dashboard.sidebar.nav.programs" as const satisfies TranslationKey, href: "/dashboard/programs", icon: FiHome },
  { labelKey: "dashboard.sidebar.nav.resources" as const satisfies TranslationKey, href: "/dashboard/resources", icon: FiImage },
  { labelKey: "dashboard.sidebar.nav.messages" as const satisfies TranslationKey, href: "/dashboard/messages", icon: FiMail },
  { labelKey: "dashboard.sidebar.nav.users" as const satisfies TranslationKey, href: "/dashboard/users", icon: FiSettings },
];

export default function DashboardSidebar({ open = false, onClose }: { open?: boolean; onClose?: () => void }) {
  const pathname = usePathname();
  const { t, tr } = useLanguage();
  const content = (
    <>
      <div className="flex h-[72px] items-center border-b border-white/10 px-5">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#009EDB] text-sm font-bold text-white">OW</div>
        <div className="ml-3 min-w-0">
          <p className="truncate text-sm font-bold text-white">{t.dashboard.sidebar.brandName}</p>
          <p className="text-xs text-slate-400">{t.dashboard.sidebar.administration}</p>
        </div>
        <button type="button" onClick={onClose} className="ml-auto text-slate-300 lg:hidden" aria-label={t.dashboard.sidebar.closeNavigation}><FiX /></button>
      </div>
      <div className="px-4 pt-5">
        <Link href="/" onClick={onClose} className="flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-white/[0.07] px-4 py-3 text-sm font-semibold text-white ring-1 ring-inset ring-white/10 transition hover:bg-white/[0.12]">
          <FiExternalLink /> {t.dashboard.sidebar.backToWebsite}
        </Link>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-5">
        <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">{t.dashboard.sidebar.workspace}</p>
        {navItems.map((item) => {
          const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} onClick={onClose} className={`group flex items-center gap-3 whitespace-nowrap rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${active ? "bg-[#009EDB] text-white" : "text-slate-300 hover:bg-white/[0.07] hover:text-white"}`}>
              <Icon className={`shrink-0 text-lg ${active ? "text-white" : "text-slate-400 group-hover:text-[#009EDB]"}`} />
              {tr(item.labelKey)}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/10 p-4">
        <form action={logoutUser}>
          <button type="submit" className="flex w-full items-center gap-3 whitespace-nowrap rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-red-500/10 hover:text-red-300">
            <FiLogOut className="shrink-0 text-lg" /> {t.dashboard.sidebar.signOut}
          </button>
        </form>
      </div>
    </>
  );

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-[276px] flex-col bg-[#174A70] lg:flex">{content}</aside>
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button type="button" className="absolute inset-0 bg-slate-950/50" onClick={onClose} aria-label={t.dashboard.sidebar.closeNavigationOverlay} />
          <aside className="absolute inset-y-0 left-0 flex w-[276px] flex-col bg-[#174A70] shadow-2xl">{content}</aside>
        </div>
      )}
    </>
  );
}
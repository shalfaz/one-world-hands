"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutUser } from "../app/login/actions";
import {
  FiBarChart2, FiDollarSign, FiHeart, FiHome, FiImage, FiMail,
  FiSettings, FiLogOut, FiExternalLink, FiX,
} from "react-icons/fi";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: FiBarChart2 },
  { name: "Donations", href: "/dashboard/donations", icon: FiDollarSign },
  { name: "Funds", href: "/dashboard/funds", icon: FiHeart },
  { name: "Programs", href: "/dashboard/programs", icon: FiHome },
  { name: "Resources", href: "/dashboard/resources", icon: FiImage },
  { name: "Messages", href: "/dashboard/messages", icon: FiMail },
  { name: "Users", href: "/dashboard/users", icon: FiSettings },
];

export default function DashboardSidebar({ open = false, onClose }: { open?: boolean; onClose?: () => void }) {
  const pathname = usePathname();
  const content = (
    <>
      <div className="flex h-[72px] items-center border-b border-white/10 px-5">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-sky-500 text-sm font-bold text-white shadow-lg shadow-sky-950/30">OW</div>
        <div className="ml-3 min-w-0">
          <p className="truncate text-sm font-bold text-white">One World Hands</p>
          <p className="text-xs text-slate-400">Administration</p>
        </div>
        <button type="button" onClick={onClose} className="ml-auto text-slate-300 lg:hidden" aria-label="Close navigation"><FiX /></button>
      </div>
      <div className="px-4 pt-5">
        <Link href="/" onClick={onClose} className="flex items-center justify-center gap-2 rounded-xl bg-white/[0.07] px-4 py-3 text-sm font-semibold text-white ring-1 ring-inset ring-white/10 transition hover:bg-white/[0.12]">
          <FiExternalLink /> Back to website
        </Link>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-5">
        <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">Workspace</p>
        {navItems.map((item) => {
          const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link key={item.name} href={item.href} onClick={onClose} className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${active ? "bg-sky-500 text-white shadow-lg shadow-sky-950/20" : "text-slate-300 hover:bg-white/[0.07] hover:text-white"}`}>
              <Icon className={`text-lg ${active ? "text-white" : "text-slate-400 group-hover:text-sky-300"}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/10 p-4">
        <form action={logoutUser}>
          <button type="submit" className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-red-500/10 hover:text-red-300">
            <FiLogOut className="text-lg" /> Sign out
          </button>
        </form>
      </div>
    </>
  );

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-[276px] flex-col bg-[#111827] lg:flex">{content}</aside>
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button type="button" className="absolute inset-0 bg-slate-950/50" onClick={onClose} aria-label="Close navigation overlay" />
          <aside className="absolute inset-y-0 left-0 flex w-[276px] flex-col bg-[#111827] shadow-2xl">{content}</aside>
        </div>
      )}
    </>
  );
}
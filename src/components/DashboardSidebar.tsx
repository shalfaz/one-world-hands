"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutUser } from "../app/login/actions";

const navItems = [
  { name: "Overview", href: "/dashboard" },
  { name: "Donations", href: "/dashboard/donations" },
  { name: "Funds", href: "/dashboard/funds" },
  { name: "Programs", href: "/dashboard/programs" },
  { name: "Resources", href: "/dashboard/resources" },
  { name: "Users", href: "/dashboard/users" },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="flex w-72 shrink-0 flex-col border-r"
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        borderRightColor: "#1e293b",
        color: "#ffffff",
      }}
    >
      <div className="px-6 py-6" style={{ borderBottom: "1px solid #1e293b" }}>
        <p
          className="text-xs font-semibold uppercase tracking-[0.2em]"
          style={{ color: "#38bdf8" }}
        >
          One World Hands
        </p>

        <h2 className="mt-2 text-2xl font-bold text-white">
          Admin Dashboard
        </h2>

        <p className="mt-2 text-sm" style={{ color: "#cbd5e1" }}>
          Manage donations, funds, programs, resources, and users.
        </p>
      </div>

      <nav className="space-y-2 px-4 py-5">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.name}
              href={item.href}
              className="block rounded-2xl px-4 py-3 text-sm font-semibold transition"
              style={
                isActive
                  ? {
                      backgroundColor: "#0284c7",
                      color: "#ffffff",
                      boxShadow: "0 10px 25px rgba(2, 132, 199, 0.25)",
                    }
                  : {
                      color: "#e2e8f0",
                      backgroundColor: "transparent",
                    }
              }
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-3 px-4 pb-6 pt-2">
        <Link
          href="/"
          className="block w-full rounded-2xl border border-slate-700 px-4 py-3 text-center text-sm font-semibold text-slate-200 transition hover:bg-slate-800"
        >
          ← Back to Website
        </Link>

        <form action={logoutUser}>
          <button
            type="submit"
            className="w-full rounded-2xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-800"
          >
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  );
}
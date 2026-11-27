"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { logoutUser } from "@/app/login/actions";
import { FaUser } from "react-icons/fa6";
import { useLanguage } from "@/context/LanguageContext";

const navItems = [
  { key: "home", href: "/" },
  { key: "about", href: "/about-us" },
  { key: "programs", href: "/programs" },
  { key: "donations", href: "/donation-funds" },
  { key: "resources", href: "/resources" },
  { key: "contact", href: "/contact" },
] as const;

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const { lang: language, setLang, t } = useLanguage();
  const pathname = usePathname();
  const userDropdownRef = useRef<HTMLDivElement>(null);

  // Read user data from cookies on mount
  useEffect(() => {
    const readCookie = (name: string) => {
      if (typeof document === "undefined") return "";
      const escapedName = name.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&");
      const match = document.cookie.match(new RegExp(`(?:^|; )${escapedName}=([^;]*)`));
      return match ? decodeURIComponent(match[1]) : "";
    };

    const session = readCookie("owh_session_public");
    const role = readCookie("owh_role_public");
    const name = readCookie("owh_name_public");
    const email = readCookie("owh_email_public");

    if (session === "authenticated" && role) {
      const timer = window.setTimeout(() => {
        setIsAuthenticated(true);
        setUserRole(role);
        setUserName(name || "User");
        setUserEmail(email || "");
      }, 0);
      return () => window.clearTimeout(timer);
    }
  }, [pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const selectLanguage = (nextLanguage: "bn" | "en") => {
    setLang(nextLanguage);
  };

  const languageButton = (value: "bn" | "en", label: string) => (
    <button
      type="button"
      onClick={() => selectLanguage(value)}
      aria-pressed={language === value}
      className={`min-w-9 whitespace-nowrap rounded-md px-2.5 py-1.5 text-xs font-bold transition-colors ${
        language === value
          ? "bg-white text-[#174A70] shadow-sm"
          : "text-white/85 hover:text-white"
      }`}
    >
      {label}
    </button>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-[#009EDB] backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[76px] items-center justify-between gap-5">
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden">
              <Image
                src="/logo1.png"
                alt="One World Hands"
                width={48}
                height={48}
                className="h-full w-full object-contain"
                priority
              />
            </div>
            <div className="block leading-tight">
              <p className="whitespace-nowrap text-base font-bold leading-none tracking-tight text-white">{t.header.brandLine1}</p>
              <p className="mt-1 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.16em] text-white">{t.header.brandLine2}</p>
            </div>
          </Link>

          <nav aria-label={t.header.mainNavigation} className="hidden flex-1 items-center justify-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`whitespace-nowrap rounded-lg px-2.5 py-2.5 text-sm transition-colors xl:px-3.5 ${
                  isActive(item.href)
                    ? "bg-[#EAF6FB] font-semibold text-[#174A70]"
                    : "font-medium text-white hover:bg-white/15 hover:text-white"
                }`}
              >
                {t.nav[item.key]}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-2.5 lg:ml-0">
            <div className="hidden overflow-hidden rounded-lg border border-white/30 bg-white/15 p-0.5 sm:flex" aria-label={t.header.language}>
              {languageButton("bn", "বাং")}
              {languageButton("en", "EN")}
            </div>

            {isAuthenticated ? (
              <div ref={userDropdownRef} className="relative hidden sm:block">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  aria-label={t.header.openUserMenu}
                  title={t.header.profile}
                  aria-expanded={userDropdownOpen}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition-colors hover:border-white/60 hover:bg-white/20 hover:text-white"
                >
                  <FaUser className="h-3.5 w-3.5" />
                </button>
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xl shadow-[#174A70]/10">
                    <div className="border-b border-neutral-100 bg-[#F7FAFC] px-4 py-3">
                      <p className="text-sm font-semibold text-neutral-900">{userName}</p>
                      <p className="mt-0.5 text-xs text-neutral-500">{userEmail}</p>
                      <span className="mt-2 inline-block whitespace-nowrap rounded-full bg-[#EAF6FB] px-2.5 py-1 text-xs font-semibold capitalize text-[#174A70]">
                        {(t.dashboard.users.roles as Record<string, string>)[userRole.toLowerCase()] ?? userRole}
                      </span>
                    </div>
                    <div className="py-2">
                      {userRole === "admin" && (
                        <Link href="/dashboard" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50" onClick={() => setUserDropdownOpen(false)}>{t.header.adminDashboard}</Link>
                      )}
                      {userRole === "employee" && (
                        <Link href="/employee-dashboard" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50" onClick={() => setUserDropdownOpen(false)}>{t.header.employeeDashboard}</Link>
                      )}
                      {userRole === "volunteer" && (
                        <Link href="/volunteer-dashboard" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50" onClick={() => setUserDropdownOpen(false)}>{t.header.volunteerDashboard}</Link>
                      )}
                      <Link href="/profile" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50" onClick={() => setUserDropdownOpen(false)}>{t.header.profile}</Link>
                      <form action={logoutUser}>
                        <button type="submit" className="w-full px-4 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50">{t.header.signOut}</button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                aria-label={t.header.account}
                title={t.header.account}
                className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition-colors hover:border-white/60 hover:bg-white/20 hover:text-white sm:inline-flex"
              >
                <FaUser className="h-3.5 w-3.5" />
              </Link>
            )}

            <Link
              href="/donation-funds"
              className="hidden h-10 items-center whitespace-nowrap rounded-full bg-[#174A70] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#103652] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#174A70] focus-visible:ring-offset-2 sm:inline-flex"
            >
              <span>{t.header.donate}</span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15 lg:hidden"
              aria-label={t.header.toggleMenu}
              aria-expanded={mobileMenuOpen}
            >
              <svg
                className={`h-5 w-5 transition-transform ${
                  mobileMenuOpen ? "rotate-90" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-white/20 py-4 lg:hidden">
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`block whitespace-nowrap rounded-lg px-4 py-3 text-sm transition-colors ${
                    isActive(item.href)
                      ? "bg-[#EAF6FB] font-semibold text-[#174A70]"
                      : "font-medium text-white hover:bg-white/15"
                  }`}
                >
                  {t.nav[item.key]}
                </Link>
              ))}

              <div className="mt-3 space-y-2 border-t border-white/20 pt-4">
                <div className="flex">
                  <div className="flex w-full overflow-hidden rounded-lg border border-white/30 bg-white/15 p-0.5" aria-label={t.header.language}>
                    <div className="flex w-full [&>button]:flex-1">
                      {languageButton("bn", "বাং")}
                      {languageButton("en", "EN")}
                    </div>
                  </div>
                </div>
                <Link
                  href="/donation-funds"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex h-11 w-full items-center justify-center rounded-full bg-[#174A70] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#103652]"
                >
                  {t.header.donate}
                </Link>

                {isAuthenticated ? (
                  <>
                    {userRole === "admin" && (
                      <Link
                        href="/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex h-11 w-full items-center justify-center rounded-full border border-white/30 text-sm font-semibold text-white transition-colors hover:bg-white/15"
                      >
                        {t.header.adminDashboard}
                      </Link>
                    )}
                    {userRole === "employee" && (
                      <Link
                        href="/employee-dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex h-11 w-full items-center justify-center rounded-full border border-white/30 text-sm font-semibold text-white transition-colors hover:bg-white/15"
                      >
                        {t.header.employeeDashboard}
                      </Link>
                    )}
                    {userRole === "volunteer" && (
                      <Link
                        href="/volunteer-dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex h-11 w-full items-center justify-center rounded-full border border-white/30 text-sm font-semibold text-white transition-colors hover:bg-white/15"
                      >
                        {t.header.volunteerDashboard}
                      </Link>
                    )}
                    <Link
                      href="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex h-11 w-full items-center justify-center rounded-full border border-white/30 text-sm font-semibold text-white transition-colors hover:bg-white/15"
                    >
                      {t.header.profile}
                    </Link>
                    <form action={logoutUser}>
                      <button
                        type="submit"
                        className="h-11 w-full rounded-full border border-red-200 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50"
                      >
                        {t.header.signOut}
                      </button>
                    </form>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex h-11 w-full items-center justify-center rounded-full border border-white/30 text-sm font-semibold text-white transition-colors hover:bg-white/15"
                  >
                    {t.header.account}
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { logoutUser } from "@/app/login/actions";
import { FaUser } from "react-icons/fa6";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about-us" },
  { label: "Programs", href: "/programs" },
  { label: "Donations", href: "/donation-funds" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [language, setLanguage] = useState<"bn" | "en">("en");
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

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("owh_language");
    const initialLanguage = savedLanguage === "bn" ? "bn" : "en";
    const timer = window.setTimeout(() => setLanguage(initialLanguage), 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "bn" ? "bn" : "en";
  }, [language]);

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
    setLanguage(nextLanguage);
    window.localStorage.setItem("owh_language", nextLanguage);
  };

  const languageButton = (value: "bn" | "en", label: string) => (
    <button
      type="button"
      onClick={() => selectLanguage(value)}
      aria-pressed={language === value}
      className={`min-w-9 rounded-md px-2 py-1.5 text-xs font-bold transition-colors ${
        language === value
          ? "bg-white text-[#174b37] shadow-sm"
          : "text-neutral-500 hover:text-[#174b37]"
      }`}
    >
      {label}
    </button>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#e1e9e2] bg-[#2698C8] backdrop-blur">
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
              <p className="text-base font-bold leading-none tracking-tight text-white">One World</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">Hands</p>
            </div>
          </Link>

          <nav aria-label="Main navigation" className="hidden flex-1 items-center justify-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`rounded-lg px-3 py-2.5 text-sm transition-colors xl:px-3.5 ${
                  isActive(item.href)
                    ? "bg-[#edf5ef] font-semibold text-[#176345]"
                    : "font-medium text-white hover:bg-neutral-50 hover:text-[#176345]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-2.5 lg:ml-0">
            <div className="hidden overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 p-0.5 sm:flex" aria-label="Language">
              {languageButton("bn", "বাং")}
              {languageButton("en", "EN")}
            </div>

            {isAuthenticated ? (
              <div ref={userDropdownRef} className="relative hidden sm:block">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  aria-label="Open user menu"
                  title="Profile"
                  aria-expanded={userDropdownOpen}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition-colors hover:border-[#b8d2c0] hover:text-[#176345]"
                >
                  <FaUser className="h-3.5 w-3.5" />
                </button>
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xl shadow-[#183b2c]/10">
                    <div className="border-b border-neutral-100 bg-[#f7faf7] px-4 py-3">
                      <p className="text-sm font-semibold text-neutral-900">{userName}</p>
                      <p className="mt-0.5 text-xs text-neutral-500">{userEmail}</p>
                      <span className="mt-2 inline-block rounded-full bg-[#edf5ef] px-2.5 py-1 text-xs font-semibold capitalize text-[#176345]">
                        {userRole}
                      </span>
                    </div>
                    <div className="py-2">
                      {userRole === "admin" && (
                        <Link href="/dashboard" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50" onClick={() => setUserDropdownOpen(false)}>Admin Dashboard</Link>
                      )}
                      {userRole === "employee" && (
                        <Link href="/employee-dashboard" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50" onClick={() => setUserDropdownOpen(false)}>Employee Dashboard</Link>
                      )}
                      {userRole === "volunteer" && (
                        <Link href="/volunteer-dashboard" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50" onClick={() => setUserDropdownOpen(false)}>Volunteer Dashboard</Link>
                      )}
                      <Link href="/profile" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50" onClick={() => setUserDropdownOpen(false)}>Profile</Link>
                      <form action={logoutUser}>
                        <button type="submit" className="w-full px-4 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50">Sign Out</button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                aria-label="Account"
                title="Account"
                className="hidden h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition-colors hover:border-[#b8d2c0] hover:text-[#176345] sm:inline-flex"
              >
                <FaUser className="h-3.5 w-3.5" />
              </Link>
            )}

            <Link
              href="/donation-funds"
              className="hidden h-10 items-center rounded-full bg-[#176345] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#104b34] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176345] focus-visible:ring-offset-2 sm:inline-flex"
            >
              <span>Donate</span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:bg-[#edf5ef] lg:hidden"
              aria-label="Toggle menu"
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
          <div className="border-t border-neutral-100 py-4 lg:hidden">
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`block rounded-lg px-4 py-3 text-sm transition-colors ${
                    isActive(item.href)
                      ? "bg-[#edf5ef] font-semibold text-[#176345]"
                      : "font-medium text-neutral-700 hover:bg-neutral-50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <div className="mt-3 space-y-2 border-t border-neutral-100 pt-4">
                <div className="flex">
                  <div className="flex w-full overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 p-0.5" aria-label="Language">
                    <div className="flex w-full [&>button]:flex-1">
                      {languageButton("bn", "বাং")}
                      {languageButton("en", "EN")}
                    </div>
                  </div>
                </div>
                <Link
                  href="/donation-funds"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex h-11 w-full items-center justify-center rounded-full bg-[#176345] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#104b34]"
                >
                  Donate
                </Link>

                {isAuthenticated ? (
                  <>
                    {userRole === "admin" && (
                      <Link
                        href="/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex h-11 w-full items-center justify-center rounded-full border border-neutral-200 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-50"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    {userRole === "employee" && (
                      <Link
                        href="/employee-dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex h-11 w-full items-center justify-center rounded-full border border-neutral-200 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-50"
                      >
                        Employee Dashboard
                      </Link>
                    )}
                    {userRole === "volunteer" && (
                      <Link
                        href="/volunteer-dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex h-11 w-full items-center justify-center rounded-full border border-neutral-200 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-50"
                      >
                        Volunteer Dashboard
                      </Link>
                    )}
                    <Link
                      href="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex h-11 w-full items-center justify-center rounded-full border border-neutral-200 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-50"
                    >
                      Profile
                    </Link>
                    <form action={logoutUser}>
                      <button
                        type="submit"
                        className="h-11 w-full rounded-full border border-red-200 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50"
                      >
                        Sign Out
                      </button>
                    </form>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex h-11 w-full items-center justify-center rounded-full border border-neutral-200 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-50"
                  >
                    Account
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

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
      className={`min-w-8 px-2 py-1 text-xs font-bold transition-colors ${
        language === value
          ? "bg-white text-slate-800 shadow-sm"
          : "bg-[#edf8f1] text-slate-600 hover:text-[#078b4f]"
      }`}
    >
      {label}
    </button>
  );

  return (
    <header className="sticky top-0 z-50 w-full shadow-sm">
      <div className="border-b border-[#0074b8] bg-[#0084d1]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden">
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
              <p className="text-base font-bold leading-none text-white">One World</p>
              <p className="text-sm font-bold leading-none text-white">Hands</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all xl:px-4 ${
                  isActive(item.href)
                    ? "bg-white text-[#0084d1] font-semibold"
                    : "text-white hover:bg-white/15"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-2 ml-auto">
            <div className="hidden sm:flex overflow-hidden rounded-md border border-slate-200 bg-[#edf8f1] p-0.5" aria-label="Language">
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
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:text-[#078b4f]"
                >
                  <FaUser className="h-3.5 w-3.5" />
                </button>
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
                    <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
                      <p className="text-sm font-semibold text-slate-900">{userName}</p>
                      <p className="text-xs text-slate-600">{userEmail}</p>
                      <span className="mt-2 inline-block rounded bg-sky-100 px-2 py-1 text-xs font-semibold capitalize text-sky-700">
                        {userRole}
                      </span>
                    </div>
                    <div className="py-2">
                      {userRole === "admin" && (
                        <Link href="/dashboard" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100" onClick={() => setUserDropdownOpen(false)}>Admin Dashboard</Link>
                      )}
                      {userRole === "employee" && (
                        <Link href="/employee-dashboard" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100" onClick={() => setUserDropdownOpen(false)}>Employee Dashboard</Link>
                      )}
                      {userRole === "volunteer" && (
                        <Link href="/volunteer-dashboard" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100" onClick={() => setUserDropdownOpen(false)}>Volunteer Dashboard</Link>
                      )}
                      <Link href="/profile" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100" onClick={() => setUserDropdownOpen(false)}>Profile</Link>
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
                className="hidden sm:inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:text-[#078b4f]"
              >
                <FaUser className="h-3.5 w-3.5" />
              </Link>
            )}

            {/* Donate Button */}
            <Link
              href="/donation-funds"
              className="hidden sm:inline-flex h-8 items-center rounded-md bg-[#078b4f] px-3 text-xs font-bold text-white shadow-sm transition-colors hover:bg-[#067744]"
            >
              <span>Donate</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden inline-flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-white/15"
              aria-label="Toggle menu"
            >
              <svg
                  className={`h-6 w-6 text-white transition-transform ${
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

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-white/20 bg-[#0084d1] px-2 py-4 lg:hidden">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive(item.href)
                      ? "bg-sky-600 text-white"
                      : "text-white hover:bg-white/15"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <div className="border-t border-slate-200 pt-3 mt-3 space-y-2">
                <div className="flex justify-center">
                  <div className="flex overflow-hidden rounded-md border border-slate-200 bg-[#edf8f1] p-0.5" aria-label="Language">
                    {languageButton("bn", "বাং")}
                    {languageButton("en", "EN")}
                  </div>
                </div>
                <Link
                  href="/donation-funds"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#078b4f] text-white text-sm font-semibold w-full hover:bg-[#067744] transition-colors"
                >
                  <span>Donate</span>
                </Link>

                {isAuthenticated ? (
                  <>
                    {userRole === "admin" && (
                      <Link
                        href="/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-sky-600 text-white text-sm font-semibold w-full hover:bg-sky-700 transition-colors"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    {userRole === "employee" && (
                      <Link
                        href="/employee-dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-sky-600 text-white text-sm font-semibold w-full hover:bg-sky-700 transition-colors"
                      >
                        Employee Dashboard
                      </Link>
                    )}
                    {userRole === "volunteer" && (
                      <Link
                        href="/volunteer-dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-sky-600 text-white text-sm font-semibold w-full hover:bg-sky-700 transition-colors"
                      >
                        Volunteer Dashboard
                      </Link>
                    )}
                    <Link
                      href="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border-2 border-sky-600 text-sky-600 text-sm font-semibold w-full hover:bg-sky-50 transition-colors"
                    >
                      Profile
                    </Link>
                    <form action={logoutUser}>
                      <button
                        type="submit"
                        className="w-full px-4 py-2 rounded-lg border-2 border-red-200 bg-red-50 text-red-600 text-sm font-semibold hover:bg-red-100 transition-colors"
                      >
                        Sign Out
                      </button>
                    </form>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </header>
  );
}

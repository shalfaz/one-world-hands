"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { logoutUser } from "@/app/login/actions";

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
      setIsAuthenticated(true);
      setUserRole(role);
      setUserName(name || "User");
      setUserEmail(email || "");
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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-sky-600 flex items-center justify-center shrink-0">
              <Image
                src="/logo1.png"
                alt="One World Hands"
                width={40}
                height={40}
                className="h-full w-full object-contain"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <p className="text-base font-bold text-slate-900 leading-none">One World</p>
              <p className="text-xs text-sky-600 font-semibold leading-none">Hands NGO</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(item.href)
                    ? "bg-sky-50 text-sky-700 font-semibold"
                    : "text-slate-700 hover:text-sky-700 hover:bg-sky-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Donate Button */}
            <Link
              href="/donation-funds"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors"
            >
              <span>❤️</span>
              <span>Donate</span>
            </Link>

            {/* User Dropdown or Auth Buttons */}
            {isAuthenticated ? (
              <div ref={userDropdownRef} className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-sky-600 text-sky-600 text-sm font-semibold hover:bg-sky-50 transition-colors"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <span>{userName.split(" ")[0]}</span>
                  <svg className={`h-4 w-4 transition-transform ${userDropdownOpen ? "rotate-180" : ""}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white border border-slate-200 shadow-lg ring-1 ring-slate-100 overflow-hidden">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-slate-200 bg-slate-50">
                      <p className="text-sm font-semibold text-slate-900">{userName}</p>
                      <p className="text-xs text-slate-600">{userEmail}</p>
                      <span className="inline-block mt-2 px-2 py-1 bg-sky-100 text-sky-700 text-xs font-semibold rounded capitalize">
                        {userRole}
                      </span>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      {userRole === "admin" && (
                        <Link
                          href="/dashboard"
                          className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          📊 Admin Dashboard
                        </Link>
                      )}
                      {userRole === "employee" && (
                        <Link
                          href="/employee-dashboard"
                          className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          💼 Employee Dashboard
                        </Link>
                      )}
                      {userRole === "volunteer" && (
                        <Link
                          href="/volunteer-dashboard"
                          className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          🤝 Volunteer Dashboard
                        </Link>
                      )}
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        👤 Profile
                      </Link>
                      <form action={logoutUser} className="block">
                        <button
                          type="submit"
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                        >
                          🚪 Sign Out
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* Login Button */}
                <Link
                  href="/login"
                  className="hidden sm:inline-flex px-4 py-2 rounded-lg border-2 border-sky-600 text-sky-600 text-sm font-semibold hover:bg-sky-50 transition-colors"
                >
                  Login
                </Link>

                {/* Sign Up Button */}
                <Link
                  href="/signup"
                  className="hidden sm:inline-flex px-4 py-2 rounded-lg bg-sky-600 text-white text-sm font-semibold hover:bg-sky-700 transition-colors"
                >
                  Join Us
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className={`h-6 w-6 text-slate-700 transition-transform ${
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
          <div className="border-t border-slate-200 bg-slate-50 px-2 py-4 lg:hidden">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive(item.href)
                      ? "bg-sky-600 text-white"
                      : "text-slate-700 hover:bg-sky-100"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <div className="border-t border-slate-200 pt-3 mt-3 space-y-2">
                <Link
                  href="/donation-funds"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold w-full hover:bg-red-700 transition-colors"
                >
                  <span>❤️</span>
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
                        📊 Admin Dashboard
                      </Link>
                    )}
                    {userRole === "employee" && (
                      <Link
                        href="/employee-dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-sky-600 text-white text-sm font-semibold w-full hover:bg-sky-700 transition-colors"
                      >
                        💼 Employee Dashboard
                      </Link>
                    )}
                    {userRole === "volunteer" && (
                      <Link
                        href="/volunteer-dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-sky-600 text-white text-sm font-semibold w-full hover:bg-sky-700 transition-colors"
                      >
                        🤝 Volunteer Dashboard
                      </Link>
                    )}
                    <Link
                      href="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border-2 border-sky-600 text-sky-600 text-sm font-semibold w-full hover:bg-sky-50 transition-colors"
                    >
                      👤 Profile
                    </Link>
                    <form action={logoutUser}>
                      <button
                        type="submit"
                        className="w-full px-4 py-2 rounded-lg border-2 border-red-200 bg-red-50 text-red-600 text-sm font-semibold hover:bg-red-100 transition-colors"
                      >
                        🚪 Sign Out
                      </button>
                    </form>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center px-4 py-2 rounded-lg border-2 border-sky-600 text-sky-600 text-sm font-semibold w-full hover:bg-sky-50 transition-colors"
                    >
                      Login
                    </Link>

                    <Link
                      href="/signup"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center px-4 py-2 rounded-lg bg-sky-600 text-white text-sm font-semibold w-full hover:bg-sky-700 transition-colors"
                    >
                      Join Us
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

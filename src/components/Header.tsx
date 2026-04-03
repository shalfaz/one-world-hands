"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import AuthModal from "@/components/AuthModal";
import { logoutUser } from "@/app/login/actions";

type NavItem = { label: string; href: string };

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Programs", href: "/programs" },
  { label: "Resources", href: "/resources" },
  { label: "Updates", href: "/updates" },
  { label: "Contact", href: "/contact" },
];

const resourceDropdownItems = [
  { label: "Photos", href: "/resources?type=photo" },
  { label: "Videos", href: "/resources?type=video" },
  { label: "Blogs", href: "/resources?type=blog" },
  { label: "Annual Reports", href: "/resources?type=annual report" },
  { label: "Publications", href: "/resources?type=publication" },
  { label: "Webinars", href: "/resources?type=webinar" },
];

const languageOptions = [
  { code: "BAN", label: "বাংলা" },
  { code: "ENG", label: "English" },
  { code: "FRA", label: "Français" },
  { code: "ESP", label: "Español" },
  { code: "ARB", label: "العربية" },
];

function readCookie(name: string) {
  if (typeof document === "undefined") return "";
  const escapedName = name.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&");
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${escapedName}=([^;]*)`)
  );
  return match ? decodeURIComponent(match[1]) : "";
}

function getDashboardPathByRole(role: string) {
  if (role === "admin") return "/dashboard";
  if (role === "employee") return "/employee-dashboard";
  if (role === "volunteer") return "/volunteer-dashboard";
  return "/dashboard";
}

function getRoleLabel(role: string) {
  if (role === "admin") return "Admin";
  if (role === "employee") return "Employee";
  if (role === "volunteer") return "Volunteer";
  return "User";
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("BAN");
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const pathname = usePathname();
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setLanguageMenuOpen(false);
        setUserMenuOpen(false);
      }
    };

    const onClickOutside = (e: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClickOutside);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  useEffect(() => {
    const syncAuthState = () => {
      const session = readCookie("owh_session_public");
      const role = readCookie("owh_role_public");
      const name = readCookie("owh_name_public");
      const email = readCookie("owh_email_public");

      setIsAuthenticated(session === "authenticated");
      setUserRole(role);
      setUserName(name);
      setUserEmail(email);
    };

    syncAuthState();
    window.addEventListener("focus", syncAuthState);

    return () => window.removeEventListener("focus", syncAuthState);
  }, [pathname]);

  const dashboardHref = useMemo(
    () => getDashboardPathByRole(userRole),
    [userRole]
  );

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-neutral-100 bg-white/80 backdrop-blur">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-md focus:bg-sky-600 focus:px-3 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="group inline-flex items-center gap-3 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
              aria-label="One World Hands home"
            >
              <span className="inline-flex items-center">
                <Image
                  src="/logo1.png"
                  alt="One World Hands logo"
                  width={120}
                  height={120}
                  className="h-12 w-auto object-contain"
                  priority
                />
              </span>
              <div className="flex flex-col leading-tight">
                <span className="text-base font-semibold tracking-wide text-[#1EA7D7] sm:text-lg">
                  One World Hands
                </span>
              </div>
            </Link>
          </div>

          <nav
            className="hidden flex-1 items-center justify-center gap-8 xl:flex"
            aria-label="Primary"
          >
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href ||
                    (item.href === "/resources" && pathname === "/resources");

              if (item.label === "Resources") {
                return (
                  <div key={item.href} className="group relative">
                    <Link
                      href={item.href}
                      className={[
                        "inline-flex items-center gap-1 whitespace-nowrap text-sm font-medium transition-colors hover:text-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2",
                        isActive
                          ? "font-semibold text-sky-700"
                          : "text-neutral-700",
                      ].join(" ")}
                    >
                      Resources
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                      >
                        <path
                          d="M6 9l6 6 6-6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>

                    <div className="invisible absolute left-1/2 top-full z-50 mt-3 w-60 -translate-x-1/2 rounded-2xl border border-neutral-200 bg-white p-2 opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:opacity-100">
                      <div className="grid gap-1">
                        {resourceDropdownItems.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="rounded-xl px-3 py-2 text-sm font-medium text-neutral-800 transition-colors hover:bg-sky-50 hover:text-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "whitespace-nowrap text-sm font-medium transition-colors hover:text-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2",
                    isActive ? "font-semibold text-sky-700" : "text-neutral-700",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <div className="flex items-center overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
                <button
                  type="button"
                  onClick={() => setSelectedLanguage("BAN")}
                  className={[
                    "px-3 py-2 text-sm font-semibold transition-colors",
                    selectedLanguage === "BAN"
                      ? "bg-sky-500 text-white"
                      : "text-neutral-700 hover:bg-neutral-50",
                  ].join(" ")}
                >
                  BAN
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedLanguage("ENG")}
                  className={[
                    "border-l border-neutral-200 px-3 py-2 text-sm font-semibold transition-colors",
                    selectedLanguage === "ENG"
                      ? "bg-sky-500 text-white"
                      : "text-neutral-700 hover:bg-neutral-50",
                  ].join(" ")}
                >
                  ENG
                </button>

                <button
                  type="button"
                  onClick={() => setLanguageMenuOpen((v) => !v)}
                  className="border-l border-neutral-200 px-3 py-2 text-neutral-700 transition-colors hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                  aria-label="More language options"
                  aria-expanded={languageMenuOpen}
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                  >
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              {languageMenuOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-44 rounded-2xl border border-neutral-200 bg-white p-2 shadow-lg">
                  <div className="grid gap-1">
                    {languageOptions.map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => {
                          setSelectedLanguage(lang.code);
                          setLanguageMenuOpen(false);
                        }}
                        className={[
                          "rounded-xl px-3 py-2 text-left text-sm font-medium transition-colors",
                          selectedLanguage === lang.code
                            ? "bg-sky-50 text-sky-700"
                            : "text-neutral-800 hover:bg-neutral-50",
                        ].join(" ")}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative hidden md:block" ref={userMenuRef}>
              {isAuthenticated ? (
                <>
                  <button
                    type="button"
                    onClick={() => setUserMenuOpen((v) => !v)}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-neutral-200 bg-white text-neutral-700 shadow-sm transition-colors hover:bg-neutral-50"
                    aria-label="Open account menu"
                    aria-expanded={userMenuOpen}
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                    >
                      <path
                        d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4 0-7 2-7 4.5 0 .3.2.5.5.5h13a.5.5 0 0 0 .5-.5C19 16 16 14 12 14Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 top-full z-50 mt-2 w-72 rounded-2xl border border-neutral-200 bg-white p-2 shadow-xl">
                      <div className="rounded-xl bg-neutral-50 px-3 py-3">
                        <p className="text-sm font-semibold text-neutral-900">
                          {userName || "Signed In User"}
                        </p>
                        <p className="mt-1 text-xs text-neutral-500">
                          {userEmail || "No email"}
                        </p>
                        <p className="mt-2 inline-flex rounded-full bg-sky-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-sky-700">
                          {getRoleLabel(userRole)}
                        </p>
                      </div>

                      <div className="mt-2 grid gap-1">
                        <Link
                          href="/"
                          onClick={() => setUserMenuOpen(false)}
                          className="rounded-xl px-3 py-2 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-50"
                        >
                          Website Home
                        </Link>

                        <Link
                          href={dashboardHref}
                          onClick={() => setUserMenuOpen(false)}
                          className="rounded-xl px-3 py-2 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-50"
                        >
                          {getRoleLabel(userRole)} Dashboard
                        </Link>

                        <form action={logoutUser}>
                          <button
                            type="submit"
                            className="w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                          >
                            Logout
                          </button>
                        </form>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setAuthModalOpen(true)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-neutral-200 bg-white text-neutral-700 shadow-sm transition-colors hover:bg-neutral-50"
                  aria-label="Open authentication form"
                  title="Login / Sign up"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                  >
                    <path
                      d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4 0-7 2-7 4.5 0 .3.2.5.5.5h13a.5.5 0 0 0 .5-.5C19 16 16 14 12 14Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              )}
            </div>

            <Link
              href="/donation-funds"
              className="inline-flex h-11 items-center justify-center rounded-full bg-sky-600 px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sky-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
            >
              Donate Now
            </Link>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-700 transition-shadow hover:shadow-sm xl:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span className="sr-only">Menu</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
              >
                {mobileOpen ? (
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d="M4 7h16M4 12h16M4 17h16"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div
            className="fixed inset-0 z-50 bg-neutral-900/40 xl:hidden"
            role="presentation"
            onClick={() => setMobileOpen(false)}
          >
            <div
              className="absolute right-3 top-3 w-[calc(100%-1.5rem)] max-w-sm rounded-2xl border border-neutral-200 bg-white p-4 shadow-xl"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center">
                    <Image
                      src="/logo1.png"
                      alt="One World Hands logo"
                      width={100}
                      height={100}
                      className="h-10 w-auto object-contain"
                      priority
                    />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#1EA7D7]">
                      One World Hands
                    </p>
                    <p className="text-xs text-neutral-600">
                      For the world, with care
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-2">
                {navItems.map((item) => (
                  <div key={item.href}>
                    <Link
                      href={item.href}
                      className="rounded-xl px-3 py-2 text-sm font-medium text-neutral-800 transition-colors hover:bg-sky-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>

                    {item.label === "Resources" && (
                      <div className="ml-3 mt-1 grid gap-1 border-l border-neutral-200 pl-3">
                        {resourceDropdownItems.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="rounded-lg px-2 py-1.5 text-sm text-neutral-600 transition-colors hover:bg-sky-50 hover:text-sky-700"
                            onClick={() => setMobileOpen(false)}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-5 space-y-3">
                <div className="flex items-center overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
                  <button
                    type="button"
                    onClick={() => setSelectedLanguage("BAN")}
                    className={[
                      "flex-1 px-3 py-2 text-sm font-semibold transition-colors",
                      selectedLanguage === "BAN"
                        ? "bg-green-500 text-white"
                        : "text-neutral-700 hover:bg-neutral-50",
                    ].join(" ")}
                  >
                    BAN
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedLanguage("ENG")}
                    className={[
                      "flex-1 border-l border-neutral-200 px-3 py-2 text-sm font-semibold transition-colors",
                      selectedLanguage === "ENG"
                        ? "bg-green-500 text-white"
                        : "text-neutral-700 hover:bg-neutral-50",
                    ].join(" ")}
                  >
                    ENG
                  </button>
                </div>

                <div className="grid gap-2">
                  {languageOptions.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => setSelectedLanguage(lang.code)}
                      className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-left text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>

                {isAuthenticated ? (
                  <>
                    <div className="rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-3">
                      <p className="text-sm font-semibold text-neutral-900">
                        {userName || "Signed In User"}
                      </p>
                      <p className="mt-1 text-xs text-neutral-500">
                        {userEmail || "No email"}
                      </p>
                      <p className="mt-2 inline-flex rounded-full bg-sky-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-sky-700">
                        {getRoleLabel(userRole)}
                      </p>
                    </div>

                    <Link
                      href={dashboardHref}
                      className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-neutral-200 bg-white px-4 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-50"
                      onClick={() => setMobileOpen(false)}
                    >
                      {getRoleLabel(userRole)} Dashboard
                    </Link>

                    <Link
                      href="/"
                      className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-neutral-200 bg-white px-4 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-50"
                      onClick={() => setMobileOpen(false)}
                    >
                      Website Home
                    </Link>

                    <form
                      action={logoutUser}
                      onSubmit={() => setMobileOpen(false)}
                    >
                      <button
                        type="submit"
                        className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-red-200 bg-white px-4 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
                      >
                        Logout
                      </button>
                    </form>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      setAuthModalOpen(true);
                    }}
                    className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-700 transition-colors hover:bg-neutral-50"
                    aria-label="Open authentication form"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                    >
                      <path
                        d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4 0-7 2-7 4.5 0 .3.2.5.5.5h13a.5.5 0 0 0 .5-.5C19 16 16 14 12 14Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                )}

                <Link
                  href="/donation-funds"
                  className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-sky-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-sky-700"
                  onClick={() => setMobileOpen(false)}
                >
                  Donate Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
}
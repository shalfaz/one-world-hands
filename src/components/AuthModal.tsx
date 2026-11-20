"use client";

import { useEffect, useState } from "react";
import { loginUser } from "../app/login/actions";

type AuthModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-neutral-900/50 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className="max-h-[90vh] w-full max-w-md overflow-y-auto scrollbar-hide rounded-2xl border border-neutral-200 bg-white p-5 shadow-xl sm:p-6"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="auth-modal-title"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2
                id="auth-modal-title"
                className="text-2xl font-semibold tracking-tight text-[#174A70]"
              >
                {mode === "login" ? "Welcome Back" : "Create an Account"}
              </h2>
              <p className="mt-2 max-w-md text-sm leading-6 text-neutral-600">
                {mode === "login"
                  ? "Sign in with your account to continue to your role dashboard."
                  : "Self-signup is disabled for now. Admin can create accounts from the database."}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#D9E2EC] bg-white text-neutral-700 transition-colors hover:bg-[#EAF6FB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009EDB] focus-visible:ring-offset-2"
              aria-label="Close authentication modal"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
              >
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div className="mt-5 inline-flex rounded-xl border border-[#D9E2EC] bg-[#F7FAFC] p-1">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={[
                "rounded-xl px-4 py-2 text-sm font-semibold transition-colors",
                mode === "login"
                  ? "bg-white text-[#009EDB] shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900",
              ].join(" ")}
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => setMode("signup")}
              className={[
                "rounded-xl px-4 py-2 text-sm font-semibold transition-colors",
                mode === "signup"
                  ? "bg-white text-[#009EDB] shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900",
              ].join(" ")}
            >
              Sign Up
            </button>
          </div>

          {mode === "login" ? (
            <form action={loginUser} className="mt-5 space-y-4">
              <div>
                <label
                  htmlFor="login-email"
                  className="mb-2 block text-sm font-semibold text-neutral-900"
                >
                  Email
                </label>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="h-11 w-full rounded-lg border border-[#D9E2EC] bg-white px-4 text-sm text-neutral-900 outline-none transition focus:border-[#009EDB] focus:ring-2 focus:ring-[#009EDB]/20"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="login-password"
                  className="mb-2 block text-sm font-semibold text-neutral-900"
                >
                  Password
                </label>
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="h-11 w-full rounded-lg border border-[#D9E2EC] bg-white px-4 text-sm text-neutral-900 outline-none transition focus:border-[#009EDB] focus:ring-2 focus:ring-[#009EDB]/20"
                  required
                />
              </div>

              <button
                type="submit"
                className="inline-flex h-11 w-full items-center justify-center rounded-full bg-[#009EDB] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#0088be] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009EDB] focus-visible:ring-offset-2"
              >
                Sign In
              </button>

              <p className="text-center text-xs text-neutral-500">
                Admin, employee, and volunteer users can sign in here.
              </p>
            </form>
          ) : (
            <div className="mt-5 space-y-4">
              <div className="rounded-xl border border-[#D9E2EC] bg-[#F7FAFC] p-4">
                <p className="text-sm leading-6 text-[#475569]">
                  Public sign-up is currently disabled. Account creation should be
                  managed by your organization.
                </p>
              </div>

              <button
                type="button"
                disabled
                className="inline-flex h-11 w-full items-center justify-center rounded-2xl bg-neutral-200 px-4 text-sm font-semibold text-neutral-500"
              >
                Sign Up Coming Soon
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
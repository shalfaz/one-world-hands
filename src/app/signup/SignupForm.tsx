"use client";

import Swal from "sweetalert2";
import { signupUser } from "./actions";
import { FormEvent } from "react";

export function SignupForm() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const terms = (e.currentTarget.querySelector('input[name="terms"]') as HTMLInputElement)?.checked;

    if (!terms) {
      Swal.fire({
        title: "Agreement Required",
        text: "Please agree to the Terms & Conditions",
        icon: "warning",
      });
      return;
    }

    // Show loading
    Swal.fire({
      title: "Creating your account...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      await signupUser(formData);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to create account",
        icon: "error",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-semibold text-slate-900"
        >
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="John Doe"
          className="h-12 w-full rounded-lg border border-[#D9E2EC] bg-white px-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-[#009EDB] focus:ring-2 focus:ring-[#009EDB]/20"
          required
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-semibold text-slate-900"
        >
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          className="h-12 w-full rounded-lg border border-[#D9E2EC] bg-white px-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-[#009EDB] focus:ring-2 focus:ring-[#009EDB]/20"
          required
        />
        <p className="mt-1 text-xs text-slate-500">
          We&apos;ll never share your email with anyone else.
        </p>
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-semibold text-slate-900"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="At least 8 characters"
          className="h-12 w-full rounded-lg border border-[#D9E2EC] bg-white px-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-[#009EDB] focus:ring-2 focus:ring-[#009EDB]/20"
          required
        />
        <p className="mt-1 text-xs text-slate-500">
          Use uppercase, numbers, and special characters for security.
        </p>
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="mb-2 block text-sm font-semibold text-slate-900"
        >
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          className="h-12 w-full rounded-lg border border-[#D9E2EC] bg-white px-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-[#009EDB] focus:ring-2 focus:ring-[#009EDB]/20"
          required
        />
      </div>

      <div className="flex items-start gap-3 rounded-lg bg-[#EAF6FB] p-3">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-slate-300 text-[#009EDB] focus:ring-[#009EDB]"
          required
        />
        <label htmlFor="terms" className="text-xs text-slate-600">
          I agree to the{" "}
          <a href="#" className="font-semibold text-[#174A70] hover:text-[#009EDB]">
            Terms & Conditions
          </a>{" "}
          and{" "}
          <a href="#" className="font-semibold text-[#174A70] hover:text-[#009EDB]">
            Privacy Policy
          </a>
        </label>
      </div>

      <button
        type="submit"
        className="mt-6 h-12 w-full rounded-full bg-[#009EDB] font-semibold text-white transition-colors hover:bg-[#0088be]"
      >
        Create Account
      </button>
    </form>
  );
}

"use client";

import Swal from "sweetalert2";
import { signupUser } from "./actions";
import { FormEvent } from "react";
import { useLanguage } from "@/context/LanguageContext";

export function SignupForm() {
  const { t } = useLanguage();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const terms = (e.currentTarget.querySelector('input[name="terms"]') as HTMLInputElement)?.checked;

    if (!terms) {
      Swal.fire({
        title: t.auth.signup.alerts.agreementTitle,
        text: t.auth.signup.alerts.agreementText,
        icon: "warning",
      });
      return;
    }

    // Show loading
    Swal.fire({
      title: t.auth.signup.alerts.creatingTitle,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      await signupUser(formData);
    } catch (error) {
      Swal.fire({
        title: t.auth.signup.alerts.errorTitle,
        text: t.auth.signup.alerts.errorText,
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
          {t.auth.fields.fullName}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder={t.auth.placeholders.fullName}
          className="h-12 w-full rounded-lg border border-[#D9E2EC] bg-white px-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-[#009EDB] focus:ring-2 focus:ring-[#009EDB]/20"
          required
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-semibold text-slate-900"
        >
          {t.auth.fields.emailAddress}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder={t.auth.placeholders.emailExample}
          className="h-12 w-full rounded-lg border border-[#D9E2EC] bg-white px-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-[#009EDB] focus:ring-2 focus:ring-[#009EDB]/20"
          required
        />
        <p className="mt-1 text-xs text-slate-500">
          {t.auth.signup.emailHelper}
        </p>
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-semibold text-slate-900"
        >
          {t.auth.fields.password}
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder={t.auth.placeholders.passwordMin}
          className="h-12 w-full rounded-lg border border-[#D9E2EC] bg-white px-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-[#009EDB] focus:ring-2 focus:ring-[#009EDB]/20"
          required
        />
        <p className="mt-1 text-xs text-slate-500">
          {t.auth.signup.passwordHelper}
        </p>
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="mb-2 block text-sm font-semibold text-slate-900"
        >
          {t.auth.fields.confirmPassword}
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder={t.auth.placeholders.confirmPassword}
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
          {t.auth.signup.termsPrefix}{" "}
          <a href="#" className="font-semibold text-[#174A70] hover:text-[#009EDB]">
            {t.auth.signup.termsLink}
          </a>{" "}
          {t.auth.signup.termsAnd}{" "}
          <a href="#" className="font-semibold text-[#174A70] hover:text-[#009EDB]">
            {t.auth.signup.privacyLink}
          </a>
          {t.auth.signup.termsSuffix}
        </label>
      </div>

      <button
        type="submit"
        className="mt-6 h-12 w-full whitespace-nowrap rounded-full bg-[#009EDB] font-semibold text-white transition-colors hover:bg-[#0088be]"
      >
        {t.auth.signup.createAccountButton}
      </button>
    </form>
  );
}

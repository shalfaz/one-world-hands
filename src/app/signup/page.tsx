import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signupUser } from "./actions";
import PageShell from "@/components/PageShell";
import T from "@/components/T";
import AuthInput from "@/components/i18n/AuthInput";
import type { TranslationKey } from "@/context/i18n-utils";

type SignupPageProps = {
  searchParams?: Promise<{
    error?: string;
    success?: string;
  }>;
};

const SIGNUP_ERROR_KEYS: Record<string, TranslationKey> = {
  missing: "auth.signup.errors.missing",
  short_password: "auth.signup.errors.shortPassword",
  mismatch: "auth.signup.errors.mismatch",
  exists: "auth.signup.errors.exists",
  server: "auth.signup.errors.server",
};

function getErrorKey(error?: string): TranslationKey {
  return (error && SIGNUP_ERROR_KEYS[error]) || "auth.signup.errors.default";
}

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const cookieStore = await cookies();
  const session = cookieStore.get("owh_session")?.value;
  const role = cookieStore.get("owh_role")?.value;

  if (session === "authenticated" && role) {
    const dashboardPaths: { [key: string]: string } = {
      admin: "/dashboard",
      employee: "/employee-dashboard",
      volunteer: "/volunteer-dashboard",
    };
    redirect(dashboardPaths[role] || "/dashboard");
  }

  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const error = resolvedSearchParams?.error;
  const success = resolvedSearchParams?.success;

  return (
    <PageShell>
    <div className="min-h-[calc(100vh-120px)] bg-[#F7FAFC] px-4 py-12">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-xl bg-[#009EDB] p-3">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-[#174A70]">
            <T k="auth.signup.title" />
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            <T k="auth.signup.subtitle" />
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm">
            <div className="flex items-start gap-3">
              <svg
                className="h-5 w-5 shrink-0 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span><T k={getErrorKey(error)} /></span>
            </div>
          </div>
        )}

        {/* Success Alert */}
        {success === "registered" && (
          <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-[#17634B] shadow-sm">
            <div className="flex items-start gap-3">
              <svg
                className="h-5 w-5 shrink-0 text-[#17634B]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span><T k="auth.signup.successRegistered" /></span>
            </div>
          </div>
        )}

        {/* Signup Form */}
        <div className="rounded-2xl border border-[#D9E2EC] bg-white p-7 sm:p-8">
          <form action={signupUser} className="space-y-4">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-slate-900"
              >
                <T k="auth.fields.fullName" />
              </label>
              <AuthInput
                id="name"
                name="name"
                type="text"
                placeholderKey="auth.placeholders.fullName"
                className="h-12 w-full rounded-lg border border-[#D9E2EC] bg-white px-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-[#009EDB] focus:ring-2 focus:ring-[#009EDB]/20"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-900"
              >
                <T k="auth.fields.emailAddress" />
              </label>
              <AuthInput
                id="email"
                name="email"
                type="email"
                placeholderKey="auth.placeholders.emailExample"
                className="h-12 w-full rounded-lg border border-[#D9E2EC] bg-white px-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-[#009EDB] focus:ring-2 focus:ring-[#009EDB]/20"
                required
              />
              <p className="mt-1 text-xs text-slate-500">
                <T k="auth.signup.emailHelper" />
              </p>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-slate-900"
              >
                <T k="auth.fields.password" />
              </label>
              <AuthInput
                id="password"
                name="password"
                type="password"
                placeholderKey="auth.placeholders.passwordMin"
                className="h-12 w-full rounded-lg border border-[#D9E2EC] bg-white px-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-[#009EDB] focus:ring-2 focus:ring-[#009EDB]/20"
                required
              />
              <p className="mt-1 text-xs text-slate-500">
                <T k="auth.signup.passwordHelper" />
              </p>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-semibold text-slate-900"
              >
                <T k="auth.fields.confirmPassword" />
              </label>
              <AuthInput
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholderKey="auth.placeholders.confirmPassword"
                className="h-12 w-full rounded-lg border border-[#D9E2EC] bg-white px-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-[#009EDB] focus:ring-2 focus:ring-[#009EDB]/20"
                required
              />
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start gap-3 rounded-lg bg-[#EAF6FB] p-3">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-slate-300 text-[#009EDB] focus:ring-[#009EDB]"
                required
              />
              <label htmlFor="terms" className="text-xs text-slate-600">
                <T k="auth.signup.termsPrefix" />{" "}
                <a href="#" className="font-semibold text-[#174A70] hover:text-[#009EDB]">
                  <T k="auth.signup.termsLink" />
                </a>{" "}
                <T k="auth.signup.termsAnd" />{" "}
                <a href="#" className="font-semibold text-[#174A70] hover:text-[#009EDB]">
                  <T k="auth.signup.privacyLink" />
                </a>
                <T k="auth.signup.termsSuffix" />
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-6 h-12 w-full whitespace-nowrap rounded-full bg-[#009EDB] font-semibold text-white transition-colors hover:bg-[#0088be]"
            >
              <T k="auth.signup.createAccountButton" />
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200"></div>
            <span className="text-xs text-slate-500"><T k="auth.signup.alreadyHaveAccount" /></span>
            <div className="h-px flex-1 bg-slate-200"></div>
          </div>

          {/* Login Link */}
          <Link
            href="/login"
            className="block whitespace-nowrap rounded-full border border-[#D9E2EC] py-3 text-center font-semibold text-[#009EDB] transition-colors hover:bg-[#EAF6FB]"
          >
            <T k="auth.signup.signInInstead" />
          </Link>
        </div>

        {/* Footer Links */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-[#009EDB]"
          >
            <T k="auth.common.backToWebsite" />
          </Link>
        </div>

        {/* Security Info */}
        <div className="mt-8 rounded-xl border border-[#D9E2EC] bg-white p-4">
          <div className="flex gap-3">
            <svg
              className="h-5 w-5 shrink-0 text-[#009EDB]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m7 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="text-xs text-slate-600">
              <p className="font-semibold text-slate-900"><T k="auth.signup.securityTitle" /></p>
              <p className="mt-1">
                <T k="auth.signup.securityDesc" />
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </PageShell>
  );
}

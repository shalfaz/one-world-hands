import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { loginUser } from "./actions";
import PageShell from "@/components/PageShell";
import T from "@/components/T";
import AuthInput from "@/components/i18n/AuthInput";
import type { TranslationKey } from "@/context/i18n-utils";
import connectToDatabase from "@/lib/mongoose";
import User from "@/lib/models/User";
import {
  getSessionUserId,
  isValidSessionToken,
} from "@/lib/auth/session";

type LoginPageProps = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

function getDashboardPathByRole(role: string) {
  if (role === "admin") return "/dashboard";
  if (role === "employee") return "/employee-dashboard";
  if (role === "volunteer") return "/volunteer-dashboard";
  return "/dashboard";
}

const LOGIN_ERROR_KEYS: Record<string, TranslationKey> = {
  unauthorized: "auth.login.errors.unauthorized",
  missing: "auth.login.errors.missing",
  user: "auth.login.errors.user",
  password: "auth.login.errors.password",
  db: "auth.login.errors.db",
};

function getErrorKey(error?: string): TranslationKey {
  return (error && LOGIN_ERROR_KEYS[error]) || "auth.login.errors.invalid";
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const cookieStore = await cookies();
  const session = cookieStore.get("owh_session")?.value;

  if (session) {
    const userId = getSessionUserId(session);
    if (userId) {
      let role: string | null = null;
      try {
        await connectToDatabase();
        const user = await User.findById(userId).select("_id password role");
        if (
          user &&
          isValidSessionToken(session, String(user._id), user.password)
        ) {
          role = String(user.role || "user").toLowerCase();
        }
      } catch (error) {
        console.warn("Unable to validate existing login session:", error);
      }

      if (role) {
        redirect(getDashboardPathByRole(role));
      }
    }
  }

  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const error = resolvedSearchParams?.error;
  const showError = Boolean(error);

  return (
    <PageShell>
    <div className="flex min-h-[calc(100vh-120px)] items-center justify-center bg-[#F7FAFC] px-4 py-12">
      <div className="w-full max-w-md">
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
            <T k="auth.login.title" />
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            <T k="auth.login.subtitle" />
          </p>
        </div>

        {/* Error Alert */}
        {showError && (
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

        {/* Login Form */}
        <div className="rounded-2xl border border-[#D9E2EC] bg-white p-7 sm:p-8">
          <form action={loginUser} className="space-y-4">
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
            </div>

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
                placeholderKey="auth.placeholders.enterPassword"
                className="h-12 w-full rounded-lg border border-[#D9E2EC] bg-white px-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-[#009EDB] focus:ring-2 focus:ring-[#009EDB]/20"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-[#009EDB] focus:ring-[#009EDB]"
                />
                <span className="text-sm text-slate-600"><T k="auth.login.rememberMe" /></span>
              </label>
              <a href="/forgot-password" className="text-sm font-semibold text-[#174A70] hover:text-[#009EDB]">
                <T k="auth.login.forgotPassword" />
              </a>
            </div>

            <button
              type="submit"
              className="mt-6 h-12 w-full whitespace-nowrap rounded-full bg-[#009EDB] font-semibold text-white transition-colors hover:bg-[#0088be]"
            >
              <T k="auth.login.signInButton" />
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200"></div>
            <span className="text-xs text-slate-500"><T k="auth.login.newToUs" /></span>
            <div className="h-px flex-1 bg-slate-200"></div>
          </div>

          {/* Signup Link */}
          <Link
            href="/signup"
            className="block whitespace-nowrap rounded-full border border-[#D9E2EC] py-3 text-center font-semibold text-[#009EDB] transition-colors hover:bg-[#EAF6FB]"
          >
            <T k="auth.login.createAccount" />
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
              <p className="font-semibold text-slate-900"><T k="auth.login.securityTitle" /></p>
              <p className="mt-1"><T k="auth.login.securityDesc" /></p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </PageShell>
  );
}
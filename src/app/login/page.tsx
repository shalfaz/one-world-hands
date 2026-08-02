import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { loginUser } from "./actions";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

function getErrorMessage(error?: string) {
  if (error === "missing") return "Please enter your email and password.";
  if (error === "user") return "No account found with this email.";
  if (error === "password") return "Incorrect password.";
  if (error === "db") return "Database error. Please try again.";
  return "Invalid login credentials.";
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const cookieStore = await cookies();
  const session = cookieStore.get("owh_session")?.value;
  const role = cookieStore.get("owh_role")?.value;

  if (session === "authenticated" && role) {
    redirect(getDashboardPathByRole(role));
  }

  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const error = resolvedSearchParams?.error;
  const showError = Boolean(error);

  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-120px)] bg-linear-to-br from-sky-50 to-slate-100 px-4 py-12 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-2xl bg-sky-600 p-3">
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
          <h1 className="text-3xl font-bold tracking-tight text-slate-950">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Sign in to your account to continue
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
              <span>{getErrorMessage(error)}</span>
            </div>
          </div>
        )}

        {/* Login Form */}
        <div className="rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-200">
          <form action={loginUser} className="space-y-4">
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
                className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                required
              />
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
                placeholder="Enter your password"
                className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                />
                <span className="text-sm text-slate-600">Remember me</span>
              </label>
              <a href="/forgot-password" className="text-sm font-semibold text-sky-600 hover:text-sky-700">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="mt-6 h-12 w-full rounded-full bg-linear-to-r from-sky-600 to-sky-500 font-semibold text-white shadow-md transition-all hover:shadow-lg hover:from-sky-700 hover:to-sky-600"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200"></div>
            <span className="text-xs text-slate-500">New to us?</span>
            <div className="h-px flex-1 bg-slate-200"></div>
          </div>

          {/* Signup Link */}
          <Link
            href="/signup"
            className="block rounded-full border-2 border-sky-600 py-3 text-center font-semibold text-sky-600 transition-colors hover:bg-sky-50"
          >
            Create an Account
          </Link>
        </div>

        {/* Footer Links */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors"
          >
            ← Back to Website
          </Link>
        </div>

        {/* Security Info */}
        <div className="mt-8 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <div className="flex gap-3">
            <svg
              className="h-5 w-5 shrink-0 text-green-600"
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
              <p className="font-semibold text-slate-900">Secure login</p>
              <p className="mt-1">Your credentials are encrypted and secure.</p>
            </div>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
}
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signupUser } from "./actions";
import PageShell from "@/components/PageShell";

type SignupPageProps = {
  searchParams?: Promise<{
    error?: string;
    success?: string;
  }>;
};

function getErrorMessage(error?: string) {
  if (error === "missing") return "Please fill in all fields.";
  if (error === "short_password") return "Password must be at least 8 characters long.";
  if (error === "mismatch") return "Passwords do not match.";
  if (error === "exists") return "This email is already registered.";
  if (error === "server") return "Server error. Please try again.";
  return "Signup failed. Please try again.";
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
    <div className="min-h-[calc(100vh-120px)] bg-[#f1f5f0] px-4 py-12">
      <div className="mx-auto max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-xl bg-[#176345] p-3">
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
          <h1 className="text-3xl font-semibold tracking-tight text-[#183b2c]">
            Join Our Community
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Create an account to start making a difference
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
              <span>{getErrorMessage(error)}</span>
            </div>
          </div>
        )}

        {/* Success Alert */}
        {success === "registered" && (
          <div className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 shadow-sm">
            <div className="flex items-start gap-3">
              <svg
                className="h-5 w-5 shrink-0 text-green-500"
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
              <span>Account created successfully! Please log in.</span>
            </div>
          </div>
        )}

        {/* Signup Form */}
        <div className="rounded-2xl border border-[#dce5de] bg-white p-7 sm:p-8">
          <form action={signupUser} className="space-y-4">
            {/* Name Field */}
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
                className="h-12 w-full rounded-lg border border-[#dce5de] bg-white px-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-[#176345] focus:ring-2 focus:ring-[#176345]/20"
                required
              />
            </div>

            {/* Email Field */}
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
                className="h-12 w-full rounded-lg border border-[#dce5de] bg-white px-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-[#176345] focus:ring-2 focus:ring-[#176345]/20"
                required
              />
              <p className="mt-1 text-xs text-slate-500">
                We&apos;ll never share your email with anyone else.
              </p>
            </div>

            {/* Password Field */}
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
                className="h-12 w-full rounded-lg border border-[#dce5de] bg-white px-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-[#176345] focus:ring-2 focus:ring-[#176345]/20"
                required
              />
              <p className="mt-1 text-xs text-slate-500">
                Use uppercase, numbers, and special characters for security.
              </p>
            </div>

            {/* Confirm Password Field */}
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
                className="h-12 w-full rounded-lg border border-[#dce5de] bg-white px-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-[#176345] focus:ring-2 focus:ring-[#176345]/20"
                required
              />
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start gap-3 rounded-lg bg-[#f1f6f1] p-3">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-slate-300 text-[#176345] focus:ring-[#176345]"
                required
              />
              <label htmlFor="terms" className="text-xs text-slate-600">
                I agree to the{" "}
                <a href="#" className="font-semibold text-[#176345] hover:text-[#104b34]">
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a href="#" className="font-semibold text-[#176345] hover:text-[#104b34]">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-6 h-12 w-full rounded-full bg-[#176345] font-semibold text-white transition-colors hover:bg-[#104b34]"
            >
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200"></div>
            <span className="text-xs text-slate-500">Already have an account?</span>
            <div className="h-px flex-1 bg-slate-200"></div>
          </div>

          {/* Login Link */}
          <Link
            href="/login"
            className="block rounded-full border border-[#b8d2c0] py-3 text-center font-semibold text-[#176345] transition-colors hover:bg-[#f1f6f1]"
          >
            Sign In Instead
          </Link>
        </div>

        {/* Footer Links */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm font-medium text-slate-600 transition-colors hover:text-[#176345]"
          >
            ← Back to Website
          </Link>
        </div>

        {/* Security Info */}
        <div className="mt-8 rounded-xl border border-[#dce5de] bg-white p-4">
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
              <p className="font-semibold text-slate-900">Your data is secure</p>
              <p className="mt-1">
                We use industry-standard encryption to protect your information.
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </PageShell>
  );
}

import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { loginUser } from "./actions";

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
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <div className="mb-6 text-center">
          <p className="text-sm font-semibold text-sky-600">
            One World Hands
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            Secure Login
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Admin, employee, and volunteer accounts can sign in here.
          </p>
        </div>

        {showError && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {getErrorMessage(error)}
          </div>
        )}

        <form action={loginUser} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-900"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-900"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
              required
            />
          </div>

          <button
            type="submit"
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-sky-600 px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sky-700"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm font-medium text-slate-600 hover:text-sky-700"
          >
            ← Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}
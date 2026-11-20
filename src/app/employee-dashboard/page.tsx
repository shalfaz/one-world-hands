import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { logoutUser } from "../login/actions";

export default async function EmployeeDashboardPage() {
  const cookieStore = await cookies();
  const role = cookieStore.get("owh_role")?.value;
  const email = cookieStore.get("owh_email")?.value;
  const name = cookieStore.get("owh_name")?.value;

  if (role !== "employee") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#f1f5f0]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-[#dce5de] bg-white p-6 sm:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#52715e]">
                Employee Dashboard
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#183b2c]">
                Welcome, {name || "Employee"}
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Signed in as {email || "employee account"}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex h-11 items-center justify-center rounded-full border border-[#dce5de] bg-white px-5 text-sm font-semibold text-[#365b47] transition-colors hover:bg-[#f1f6f1]"
              >
                Back to Website
              </Link>

              <form action={logoutUser}>
                <button
                  type="submit"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-[#176345] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#104b34]"
                >
                  Logout
                </button>
              </form>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-xl border border-[#dce5de] bg-[#f7faf7] p-5">
              <h2 className="text-base font-semibold text-[#183b2c]">
                Assigned Work
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                This section can later show employee-specific assigned tasks,
                programs, and reports.
              </p>
            </div>

            <div className="rounded-xl border border-[#dce5de] bg-[#f7faf7] p-5">
              <h2 className="text-base font-semibold text-[#183b2c]">
                Program Coordination
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Employee-specific access can be added here for internal program
                management.
              </p>
            </div>

            <div className="rounded-xl border border-[#dce5de] bg-[#f7faf7] p-5">
              <h2 className="text-base font-semibold text-[#183b2c]">
                Reports & Notes
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Add employee report submission, resource access, and team notes
                later.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
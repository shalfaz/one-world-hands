import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { logoutUser } from "../login/actions";
import T from "@/components/T";

export default async function EmployeeDashboardPage() {
  const cookieStore = await cookies();
  const role = cookieStore.get("owh_role")?.value;
  const email = cookieStore.get("owh_email")?.value;
  const name = cookieStore.get("owh_name")?.value;

  if (role !== "employee") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#F7FAFC]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-[#D9E2EC] bg-white p-6 sm:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#174A70]">
                <T k="roleDash.employee.eyebrow" />
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#174A70]">
                {name ? (
                  <T k="roleDash.employee.welcome" vars={{ name }} />
                ) : (
                  <T k="roleDash.employee.welcomeFallback" />
                )}
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                {email ? (
                  <T k="roleDash.employee.signedInAs" vars={{ email }} />
                ) : (
                  <T k="roleDash.employee.signedInAsFallback" />
                )}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full border border-[#D9E2EC] bg-white px-5 text-sm font-semibold text-[#174A70] transition-colors hover:border-[#009EDB] hover:bg-[#EAF6FB]"
              >
                <T k="roleDash.employee.backToWebsite" />
              </Link>

              <form action={logoutUser}>
                <button
                  type="submit"
                  className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full bg-[#009EDB] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#0088be]"
                >
                  <T k="roleDash.employee.logout" />
                </button>
              </form>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-xl border border-[#D9E2EC] bg-[#F7FAFC] p-5">
              <h2 className="text-base font-semibold text-[#174A70]">
                <T k="roleDash.employee.cards.assignedWorkTitle" />
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                <T k="roleDash.employee.cards.assignedWorkDesc" />
              </p>
            </div>

            <div className="rounded-xl border border-[#D9E2EC] bg-[#F7FAFC] p-5">
              <h2 className="text-base font-semibold text-[#174A70]">
                <T k="roleDash.employee.cards.coordinationTitle" />
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                <T k="roleDash.employee.cards.coordinationDesc" />
              </p>
            </div>

            <div className="rounded-xl border border-[#D9E2EC] bg-[#F7FAFC] p-5">
              <h2 className="text-base font-semibold text-[#174A70]">
                <T k="roleDash.employee.cards.reportsTitle" />
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                <T k="roleDash.employee.cards.reportsDesc" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
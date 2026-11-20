import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { logoutUser } from "../login/actions";

export default async function VolunteerDashboardPage() {
  const cookieStore = await cookies();
  const role = cookieStore.get("owh_role")?.value;
  const email = cookieStore.get("owh_email")?.value;
  const name = cookieStore.get("owh_name")?.value;

  if (role !== "volunteer") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#f1f5f0]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-[#dce5de] bg-white p-6 sm:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#52715e]">
                Volunteer Dashboard
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#183b2c]">
                Welcome, {name || "Volunteer"}
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Signed in as {email || "volunteer account"}
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
                Volunteer Tasks
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                This area can later show volunteer assignments, upcoming events,
                and participation details.
              </p>
            </div>

            <div className="rounded-xl border border-[#dce5de] bg-[#f7faf7] p-5">
              <h2 className="text-base font-semibold text-[#183b2c]">
                Event Participation
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Add volunteer schedules, joining status, and activity tracking
                later.
              </p>
            </div>

            <div className="rounded-xl border border-[#dce5de] bg-[#f7faf7] p-5">
              <h2 className="text-base font-semibold text-[#183b2c]">
                Learning & Resources
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Volunteer-specific resources, documents, and community guidance
                can be added here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import DashboardSidebar from "../../../components/DashboardSidebar";
import { supabaseServer } from "../../../lib/supabase-server";
import {
  addProgram,
  removeProgram,
  toggleProgramStatus,
  updateProgram,
} from "../actions";

export default async function ProgramsPage() {
  const { data: programs, error } = await supabaseServer
    .from("programs")
    .select("*")
    .order("created_at", { ascending: false });

  const activeCount =
    programs?.filter((program) => program.status === "active").length || 0;

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#f1f5f9" }}>
      <DashboardSidebar />

      <main className="flex-1 p-6 lg:p-8">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-sm font-semibold text-sky-600">Programs</p>
              <h1 className="mt-1 text-3xl font-bold text-slate-950">
                Programs Management
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Total programs: {programs?.length || 0} | Active: {activeCount}
              </p>
            </div>

            <form action={addProgram} className="grid gap-3 md:grid-cols-4">
              <input
                name="title"
                placeholder="Program title"
                className="h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none"
                required
              />
              <input
                name="category"
                placeholder="Category"
                className="h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none"
                required
              />
              <input
                name="location"
                placeholder="Location"
                className="h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none"
                required
              />
              <select
                name="status"
                defaultValue="active"
                className="h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none"
              >
                <option value="active">active</option>
                <option value="draft">draft</option>
              </select>

              <div className="md:col-span-4">
                <button className="rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-700">
                  + Add New Program
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          {error ? (
            <p className="text-sm text-red-600">Failed to load programs.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-slate-500">
                    <th className="px-3 py-3">Title</th>
                    <th className="px-3 py-3">Category</th>
                    <th className="px-3 py-3">Location</th>
                    <th className="px-3 py-3">Status</th>
                    <th className="px-3 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {programs?.map((program) => (
                    <tr key={program.id} className="border-b border-slate-100 align-top">
                      <td className="px-3 py-4 font-semibold text-slate-900">
                        {program.title}
                      </td>
                      <td className="px-3 py-4 text-slate-700">{program.category}</td>
                      <td className="px-3 py-4 text-slate-700">{program.location}</td>
                      <td className="px-3 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            program.status === "active"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {program.status}
                        </span>
                      </td>
                      <td className="px-3 py-4">
                        <div className="flex flex-wrap gap-2">
                          <form action={toggleProgramStatus}>
                            <input type="hidden" name="id" value={program.id} />
                            <input
                              type="hidden"
                              name="nextStatus"
                              value={program.status === "active" ? "draft" : "active"}
                            />
                            <button className="rounded-full border border-sky-200 px-3 py-1.5 text-xs font-semibold text-sky-700 hover:bg-sky-50">
                              {program.status === "active"
                                ? "Make Draft"
                                : "Make Active"}
                            </button>
                          </form>

                          <details className="group">
                            <summary className="cursor-pointer list-none rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                              Edit
                            </summary>

                            <div className="mt-3 w-[320px] rounded-2xl border border-slate-200 bg-slate-50 p-4">
                              <form action={updateProgram} className="space-y-3">
                                <input type="hidden" name="id" value={program.id} />

                                <input
                                  name="title"
                                  defaultValue={program.title}
                                  className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none"
                                  required
                                />

                                <input
                                  name="category"
                                  defaultValue={program.category}
                                  className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none"
                                  required
                                />

                                <input
                                  name="location"
                                  defaultValue={program.location}
                                  className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none"
                                  required
                                />

                                <select
                                  name="status"
                                  defaultValue={program.status}
                                  className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none"
                                >
                                  <option value="active">active</option>
                                  <option value="draft">draft</option>
                                </select>

                                <button className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800">
                                  Save Changes
                                </button>
                              </form>
                            </div>
                          </details>

                          <form action={removeProgram}>
                            <input type="hidden" name="id" value={program.id} />
                            <button className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50">
                              Remove
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {!programs?.length && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-3 py-6 text-center text-slate-500"
                      >
                        No programs found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
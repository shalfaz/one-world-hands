import DashboardSidebar from "../../../components/DashboardSidebar";
import { supabaseServer } from "../../../lib/supabase-server";
import { addFund, removeFund } from "../actions";

export default async function FundsPage() {
  const { data: funds, error } = await supabaseServer
    .from("funds")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#f1f5f9" }}>
      <DashboardSidebar />

      <main className="flex-1 p-6 lg:p-8">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-sm font-semibold text-sky-600">Funds</p>
              <h1 className="mt-1 text-3xl font-bold text-slate-950">
                Funds Management
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Total funds in database: {funds?.length || 0}
              </p>
            </div>

            <form action={addFund} className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <input
                name="name"
                placeholder="Fund name"
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
                name="description"
                placeholder="Description"
                className="h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none"
                required
              />
              <input
                name="impactSummary"
                placeholder="Impact summary"
                className="h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none"
              />
              <div className="md:col-span-2 xl:col-span-4">
                <button className="rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-700">
                  + Add New Fund
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          {error ? (
            <p className="text-sm text-red-600">Failed to load funds.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-slate-500">
                    <th className="px-3 py-3">ID</th>
                    <th className="px-3 py-3">Fund Name</th>
                    <th className="px-3 py-3">Category</th>
                    <th className="px-3 py-3">Status</th>
                    <th className="px-3 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {funds?.map((fund) => (
                    <tr key={fund.id} className="border-b border-slate-100">
                      <td className="px-3 py-4 font-medium text-slate-900">{fund.id}</td>
                      <td className="px-3 py-4 font-semibold text-slate-900">{fund.name}</td>
                      <td className="px-3 py-4 text-slate-700">{fund.category}</td>
                      <td className="px-3 py-4">
                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                          {fund.status}
                        </span>
                      </td>
                      <td className="px-3 py-4">
                        <form action={removeFund}>
                          <input type="hidden" name="id" value={fund.id} />
                          <button className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50">
                            Remove
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))}

                  {!funds?.length && (
                    <tr>
                      <td colSpan={5} className="px-3 py-6 text-center text-slate-500">
                        No funds found.
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
import DashboardSidebar from "../../../components/DashboardSidebar";
import { supabaseServer } from "../../../lib/supabase-server";

export default async function DonationsPage() {
  const { data: donations, error } = await supabaseServer
    .from("donations")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#f1f5f9" }}>
      <DashboardSidebar />

      <main className="flex-1 p-6 lg:p-8">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-sky-600">Donations</p>
              <h1 className="mt-1 text-3xl font-bold text-slate-950">
                Donations Management
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                View latest donor payments and transaction statuses.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          {error ? (
            <p className="text-sm text-red-600">
              Failed to load donations data.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-slate-500">
                    <th className="px-3 py-3">ID</th>
                    <th className="px-3 py-3">Name</th>
                    <th className="px-3 py-3">Email</th>
                    <th className="px-3 py-3">Fund</th>
                    <th className="px-3 py-3">Amount</th>
                    <th className="px-3 py-3">Status</th>
                    <th className="px-3 py-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {donations?.map((donation) => (
                    <tr key={donation.id} className="border-b border-slate-100">
                      <td className="px-3 py-4 font-medium text-slate-900">
                        {donation.id.slice(0, 8)}...
                      </td>
                      <td className="px-3 py-4 text-slate-700">
                        {donation.name}
                      </td>
                      <td className="px-3 py-4 text-slate-700">
                        {donation.email}
                      </td>
                      <td className="px-3 py-4 text-slate-700">
                        {donation.fund_id}
                      </td>
                      <td className="px-3 py-4 font-semibold text-slate-900">
                        ৳ {donation.amount}
                      </td>
                      <td className="px-3 py-4">
                        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                          {donation.status}
                        </span>
                      </td>
                      <td className="px-3 py-4 text-slate-600">
                        {new Date(donation.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}

                  {!donations?.length && (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-3 py-6 text-center text-slate-500"
                      >
                        No donations found yet.
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
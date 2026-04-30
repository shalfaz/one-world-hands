import DashboardSidebar from "../../../components/DashboardSidebar";

export default async function DonationsPage() {
  // TODO: Connect to MongoDB for donations
  // @ts-ignore
  const donations = [];

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
                {/* Donations will be loaded from MongoDB */}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
import DashboardSidebar from "../../components/DashboardSidebar";

export default async function DashboardPage() {
  // TODO: Connect to MongoDB for dashboard stats
  const donationsCount = 0;
  const donorsCount = 0;
  const fundsCount = 0;
  const activeFundsCount = 0;
  const programsCount = 0;
  const activeProgramsCount = 0;
  const resourcesCount = 0;
  const latestDonations: Array<{ id: string; name: string; email: string; fund_id: string; amount: number; status: string }> = [];
  const topFunds: Array<{ id: string; name: string; amount: number; category: string; status: string }> = [];
  const totalDonationsAmount = 0;

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#f1f5f9" }}>
      <DashboardSidebar />

      <main className="flex-1 p-6 lg:p-8">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-sky-600">Overview</p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
                NGO Admin Dashboard
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                Real-time overview from your database.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-6">
          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Total Amount</p>
            <h3 className="mt-3 text-3xl font-bold text-slate-950">
              ৳ {totalDonationsAmount.toLocaleString()}
            </h3>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Total Donations</p>
            <h3 className="mt-3 text-3xl font-bold text-slate-950">
              {donationsCount || 0}
            </h3>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Total Donors</p>
            <h3 className="mt-3 text-3xl font-bold text-slate-950">
              {donorsCount || 0}
            </h3>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Funds</p>
            <h3 className="mt-3 text-3xl font-bold text-slate-950">
              {fundsCount || 0}
            </h3>
            <p className="mt-2 text-xs text-slate-500">
              Active: {activeFundsCount || 0}
            </p>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Programs</p>
            <h3 className="mt-3 text-3xl font-bold text-slate-950">
              {programsCount || 0}
            </h3>
            <p className="mt-2 text-xs text-slate-500">
              Active: {activeProgramsCount || 0}
            </p>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Resources</p>
            <h3 className="mt-3 text-3xl font-bold text-slate-950">
              {resourcesCount || 0}
            </h3>
          </div>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.3fr_1fr]">
          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-xl font-bold text-slate-950">Recent Donations</h2>
            <p className="mt-1 text-sm text-slate-500">
              Latest donation records from database.
            </p>

            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-slate-500">
                    <th className="px-3 py-3">Name</th>
                    <th className="px-3 py-3">Email</th>
                    <th className="px-3 py-3">Fund</th>
                    <th className="px-3 py-3">Amount</th>
                    <th className="px-3 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {latestDonations?.map((donation) => (
                    <tr key={donation.id} className="border-b border-slate-100">
                      <td className="px-3 py-3 text-slate-900">{donation.name}</td>
                      <td className="px-3 py-3 text-slate-700">{donation.email}</td>
                      <td className="px-3 py-3 text-slate-700">{donation.fund_id}</td>
                      <td className="px-3 py-3 font-semibold text-slate-900">
                        ৳ {Number(donation.amount || 0).toLocaleString()}
                      </td>
                      <td className="px-3 py-3">
                        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                          {donation.status}
                        </span>
                      </td>
                    </tr>
                  ))}

                  {!latestDonations?.length && (
                    <tr>
                      <td colSpan={5} className="px-3 py-6 text-center text-slate-500">
                        No donations found yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-xl font-bold text-slate-950">Latest Funds</h2>
            <p className="mt-1 text-sm text-slate-500">
              Real funds from database.
            </p>

            <div className="mt-5 space-y-4">
              {topFunds?.map((fund) => (
                <div
                  key={fund.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-slate-900">{fund.name}</h3>
                      <p className="mt-1 text-sm text-slate-500">{fund.category}</p>
                    </div>
                    <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
                      {fund.status}
                    </span>
                  </div>
                </div>
              ))}

              {!topFunds?.length && (
                <p className="text-sm text-slate-500">No funds available yet.</p>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
import connectToDatabase from "@/lib/mongoose";
import Fund from "@/lib/models/Fund";
import Program from "@/lib/models/Program";
import Resource from "@/lib/models/Resource";
import Donation from "@/lib/models/Donation";
import { requireAdminUser } from "@/lib/auth/admin";
import T from "@/components/T";
import type { TranslationKey } from "@/context/i18n-utils";

const statusTranslationKeys: Record<string, TranslationKey> = {
  pending: "dashboard.status.pending",
  completed: "dashboard.status.completed",
  failed: "dashboard.status.failed",
  refunded: "dashboard.status.refunded",
  active: "dashboard.status.active",
  inactive: "dashboard.status.inactive",
  paused: "dashboard.status.paused",
  closed: "dashboard.status.closed",
  draft: "dashboard.status.draft",
};

export default async function DashboardPage() {
  await requireAdminUser();
  await connectToDatabase();
  const [donationsCount, fundsCount, activeFundsCount, programsCount, activeProgramsCount, resourcesCount, totalResult, donations, funds, donorEmails] =
    await Promise.all([
      Donation.countDocuments(),
      Fund.countDocuments(),
      Fund.countDocuments({ status: "active" }),
      Program.countDocuments(),
      Program.countDocuments({ status: "active" }),
      Resource.countDocuments(),
      Donation.aggregate([{ $match: { status: "completed" } }, { $group: { _id: null, total: { $sum: "$amount" } } }]),
      Donation.find().sort({ createdAt: -1 }).limit(6).populate("fund", "name").lean(),
      Fund.find().sort({ raisedAmount: -1 }).limit(5).lean(),
      Donation.distinct("email"),
    ]);
  const donorsCount = donorEmails.filter(Boolean).length;
  const totalDonationsAmount = totalResult[0]?.total || 0;
  const latestDonations = donations.map((donation: Record<string, unknown>) => ({
    id: String(donation._id),
    name: donation.donorName ? String(donation.donorName) : null,
    email: String(donation.email || donation.contact || ""),
    fund_id: (donation.fund as Record<string, unknown>)?.name ? String((donation.fund as Record<string, unknown>).name) : null,
    amount: Number(donation.amount || 0),
    status: String(donation.status || "pending"),
  }));
  const topFunds = funds.map((fund: Record<string, unknown>) => ({
    id: String(fund._id), name: String(fund.name), amount: Number(fund.raisedAmount || 0), category: String(fund.category), status: String(fund.status),
  }));

  return (
    <div>
        <div className="rounded-2xl border border-[#D9E2EC] bg-white p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#174A70]"><T k="dashboard.overview.eyebrow" /></p>
              <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[#174A70]">
                <T k="dashboard.overview.title" />
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                <T k="dashboard.overview.subtitle" />
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-6">
          <div className="rounded-xl border border-[#D9E2EC] bg-white p-5">
            <p className="text-sm text-slate-500"><T k="dashboard.overview.stats.totalAmount" /></p>
            <h3 className="mt-3 text-3xl font-bold text-slate-950">
              ৳ {totalDonationsAmount.toLocaleString()}
            </h3>
          </div>

          <div className="rounded-xl border border-[#D9E2EC] bg-white p-5">
            <p className="text-sm text-slate-500"><T k="dashboard.overview.stats.totalDonations" /></p>
            <h3 className="mt-3 text-3xl font-bold text-slate-950">
              {donationsCount || 0}
            </h3>
          </div>

          <div className="rounded-xl border border-[#D9E2EC] bg-white p-5">
            <p className="text-sm text-slate-500"><T k="dashboard.overview.stats.totalDonors" /></p>
            <h3 className="mt-3 text-3xl font-bold text-slate-950">
              {donorsCount || 0}
            </h3>
          </div>

          <div className="rounded-xl border border-[#D9E2EC] bg-white p-5">
            <p className="text-sm text-slate-500"><T k="dashboard.overview.stats.funds" /></p>
            <h3 className="mt-3 text-3xl font-bold text-slate-950">
              {fundsCount || 0}
            </h3>
            <p className="mt-2 text-xs text-slate-500">
              <T k="dashboard.overview.stats.activeCount" vars={{ count: activeFundsCount || 0 }} />
            </p>
          </div>

          <div className="rounded-xl border border-[#D9E2EC] bg-white p-5">
            <p className="text-sm text-slate-500"><T k="dashboard.overview.stats.programs" /></p>
            <h3 className="mt-3 text-3xl font-bold text-slate-950">
              {programsCount || 0}
            </h3>
            <p className="mt-2 text-xs text-slate-500">
              <T k="dashboard.overview.stats.activeCount" vars={{ count: activeProgramsCount || 0 }} />
            </p>
          </div>

          <div className="rounded-xl border border-[#D9E2EC] bg-white p-5">
            <p className="text-sm text-slate-500"><T k="dashboard.overview.stats.resources" /></p>
            <h3 className="mt-3 text-3xl font-bold text-slate-950">
              {resourcesCount || 0}
            </h3>
          </div>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.3fr_1fr]">
          <section className="rounded-2xl border border-[#D9E2EC] bg-white p-6">
            <h2 className="text-lg font-semibold text-[#174A70]"><T k="dashboard.overview.recentDonations.title" /></h2>
            <p className="mt-1 text-sm text-slate-500">
              <T k="dashboard.overview.recentDonations.subtitle" />
            </p>

            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-slate-500">
                    <th className="px-3 py-3"><T k="dashboard.overview.recentDonations.columns.name" /></th>
                    <th className="px-3 py-3"><T k="dashboard.overview.recentDonations.columns.email" /></th>
                    <th className="px-3 py-3"><T k="dashboard.overview.recentDonations.columns.fund" /></th>
                    <th className="px-3 py-3"><T k="dashboard.overview.recentDonations.columns.amount" /></th>
                    <th className="px-3 py-3"><T k="dashboard.overview.recentDonations.columns.status" /></th>
                  </tr>
                </thead>
                <tbody>
                  {latestDonations?.map((donation) => {
                    const statusKey = statusTranslationKeys[donation.status.toLowerCase()];
                    return (
                      <tr key={donation.id} className="border-b border-slate-100">
                        <td className="px-3 py-3 text-slate-900">{donation.name ?? <T k="dashboard.overview.anonymous" />}</td>
                        <td className="px-3 py-3 text-slate-700">{donation.email}</td>
                        <td className="px-3 py-3 text-slate-700">{donation.fund_id ?? <T k="dashboard.overview.generalDonation" />}</td>
                        <td className="px-3 py-3 font-semibold text-slate-900">
                          ৳ {Number(donation.amount || 0).toLocaleString()}
                        </td>
                        <td className="px-3 py-3">
                          <span className="whitespace-nowrap rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                            {statusKey ? <T k={statusKey} /> : donation.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}

                  {!latestDonations?.length && (
                    <tr>
                      <td colSpan={5} className="px-3 py-6 text-center text-slate-500">
                        <T k="dashboard.overview.recentDonations.empty" />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-2xl border border-[#D9E2EC] bg-white p-6">
            <h2 className="text-lg font-semibold text-[#174A70]"><T k="dashboard.overview.latestFunds.title" /></h2>
            <p className="mt-1 text-sm text-slate-500">
              <T k="dashboard.overview.latestFunds.subtitle" />
            </p>

            <div className="mt-5 space-y-4">
              {topFunds?.map((fund) => {
                const statusKey = statusTranslationKeys[fund.status.toLowerCase()];
                return (
                  <div
                    key={fund.id}
                    className="rounded-xl border border-[#D9E2EC] bg-[#F7FAFC] p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-slate-900">{fund.name}</h3>
                        <p className="mt-1 text-sm text-slate-500">{fund.category}</p>
                      </div>
                      <span className="whitespace-nowrap rounded-full bg-[#EAF6FB] px-3 py-1 text-xs font-semibold text-[#174A70]">
                        {statusKey ? <T k={statusKey} /> : fund.status}
                      </span>
                    </div>
                  </div>
                );
              })}

              {!topFunds?.length && (
                <p className="text-sm text-slate-500"><T k="dashboard.overview.latestFunds.empty" /></p>
              )}
            </div>
          </section>
        </div>
    </div>
  );
}
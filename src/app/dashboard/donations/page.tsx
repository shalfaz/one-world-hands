import connectToDatabase from "@/lib/mongoose";
import Donation from "@/lib/models/Donation";

export default async function DonationsPage() {
  await connectToDatabase();
  const donations = await Donation.find().sort({ createdAt: -1 }).populate("fund", "name").lean();

  return (
    <div>
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
                {donations.map((donation: Record<string, unknown>) => (
                  <tr key={String(donation._id)} className="border-b border-slate-100">
                    <td className="px-3 py-3 font-mono text-xs text-slate-500">{String(donation._id).slice(-8)}</td>
                    <td className="px-3 py-3 font-medium text-slate-900">{String(donation.donorName)}</td>
                    <td className="px-3 py-3 text-slate-600">{String(donation.email || donation.contact || "-")}</td>
                    <td className="px-3 py-3 text-slate-600">{String((donation.fund as Record<string, unknown>)?.name || "General")}</td>
                    <td className="px-3 py-3 font-semibold text-slate-900">৳ {Number(donation.amount).toLocaleString()}</td>
                    <td className="px-3 py-3"><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold capitalize text-emerald-700">{String(donation.status)}</span></td>
                    <td className="px-3 py-3 text-slate-500">{new Date(String(donation.createdAt)).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    </div>
  );
}
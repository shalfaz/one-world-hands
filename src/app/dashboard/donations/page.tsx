import connectToDatabase from "@/lib/mongoose";
import Donation from "@/lib/models/Donation";
import DonationList from "./DonationList";
import { requireAdminUser } from "@/lib/auth/admin";

export default async function DonationsPage() {
  await requireAdminUser();
  await connectToDatabase();
  const donations = await Donation.find().sort({ createdAt: -1 }).populate("fund", "name").lean();
  const serializedDonations = donations.map((donation) => {
    const fund = donation.fund as { name?: string } | null;
    return {
      _id: String(donation._id),
      donorName: donation.donorName,
      email: donation.email || "",
      contact: donation.contact || "",
      fundName: fund?.name || "General",
      amount: Number(donation.amount),
      paymentMethod: donation.paymentMethod,
      status: donation.status,
      createdAt: new Date(donation.createdAt).toISOString(),
    };
  });

  return (
    <div>
        <div className="rounded-2xl border border-[#dce5de] bg-white p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#52715e]">Donations</p>
              <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[#183b2c]">
                Donations Management
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                View latest donor payments and transaction statuses.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-[#dce5de] bg-white p-6">
          <DonationList donations={serializedDonations} />
        </div>
    </div>
  );
}
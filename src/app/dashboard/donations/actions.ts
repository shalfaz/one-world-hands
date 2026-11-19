"use server";

import { revalidatePath } from "next/cache";
import connectToDatabase from "@/lib/mongoose";
import Donation from "@/lib/models/Donation";
import Fund from "@/lib/models/Fund";
import { requireAdminUser } from "@/lib/auth/admin";
import {
  DashboardActionError,
  getDashboardActionError,
} from "@/lib/dashboard/errors";

type DonationStatus = "pending" | "completed" | "failed" | "refunded";
type ActionResult = { success: true } | { success: false; error: string };

export async function updateDonationStatus(
  donationId: string,
  status: DonationStatus
): Promise<ActionResult> {
  try {
    await requireAdminUser();
    if (!/^[a-f\d]{24}$/i.test(donationId)) {
      throw new DashboardActionError("Select a valid donation.");
    }

    if (!["pending", "completed", "failed", "refunded"].includes(status)) {
      throw new DashboardActionError("Select a valid donation status.");
    }

    await connectToDatabase();
    const donation = await Donation.findByIdAndUpdate(
      donationId,
      { status },
      { new: true, runValidators: true }
    ).select("fund");

    if (!donation) {
      throw new DashboardActionError("Donation not found. Refresh and try again.");
    }

    if (donation.fund) {
      const totals = await Donation.aggregate([
        { $match: { fund: donation.fund, status: "completed" } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]);
      await Fund.updateOne(
        { _id: donation.fund },
        { $set: { raisedAmount: totals[0]?.total || 0 } }
      );
    }

    revalidatePath("/dashboard/donations");
    revalidatePath("/donation-funds");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Update donation status error:", error);
    return {
      success: false,
      error: getDashboardActionError(
        error,
        "Could not update the donation. Please try again."
      ),
    };
  }
}

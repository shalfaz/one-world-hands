"use server";

import connectToDatabase from "@/lib/mongoose";
import Fund from "@/lib/models/Fund";
import User from "@/lib/models/User";
import { DONATION_FUNDS } from "@/lib/data/donationFunds";
import { revalidatePath } from "next/cache";
import { requireAdminUser } from "@/lib/auth/admin";
import {
  DashboardActionError,
  getDashboardActionError,
} from "@/lib/dashboard/errors";

type ActionResult = { success: true } | { success: false; error: string };

export async function createFund(formData: FormData): Promise<ActionResult> {
  try {
    const name = String(formData.get("name") || "").trim();
    const category = String(formData.get("category") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const impactSummary = String(formData.get("impactSummary") || "").trim();
    const targetAmount = Number(formData.get("targetAmount") || 0);
    const status = String(formData.get("status") || "draft").trim();
    const imageUrl = String(formData.get("imageUrl") || "").trim();
    const published = String(formData.get("published") || "false") === "true";

    if (!name || !category) {
      throw new DashboardActionError("Fund name and category are required.");
    }

    const user = await requireAdminUser();

    await connectToDatabase();
    const newFund = await Fund.create({
      name,
      category,
      description,
      impactSummary,
      targetAmount,
      status,
      imageUrl,
      published,
      createdBy: user._id,
    });

    revalidateFundPaths(String(newFund.slug || newFund._id));
    return { success: true };
  } catch (error) {
    console.error("Create fund error:", error);
    return {
      success: false,
      error: getDashboardActionError(error, "Could not create the fund. Please try again."),
    };
  }
}

export async function updateFund(formData: FormData): Promise<ActionResult> {
  try {
    const fundId = String(formData.get("fundId") || "").trim();
    const name = String(formData.get("name") || "").trim();
    const category = String(formData.get("category") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const impactSummary = String(formData.get("impactSummary") || "").trim();
    const targetAmount = Number(formData.get("targetAmount") || 0);
    const status = String(formData.get("status") || "draft").trim();
    const imageUrl = String(formData.get("imageUrl") || "").trim();
    const published = String(formData.get("published") || "false") === "true";

    if (!fundId || !name || !category) {
      throw new DashboardActionError("Fund ID, name, and category are required.");
    }

    await requireAdminUser();
    await connectToDatabase();
    const updated = await Fund.findByIdAndUpdate(
      fundId,
      { name, category, description, impactSummary, targetAmount, status, imageUrl, published },
      { new: true, runValidators: true }
    );

    if (!updated) {
      throw new DashboardActionError("Fund not found.");
    }

    revalidateFundPaths(String(updated.slug || updated._id));
    return { success: true };
  } catch (error) {
    console.error("Update fund error:", error);
    return {
      success: false,
      error: getDashboardActionError(error, "Could not save the fund. Please try again."),
    };
  }
}

export async function deleteFund(fundId: string): Promise<ActionResult> {
  try {
    if (!fundId) {
      throw new DashboardActionError("Fund ID is required.");
    }

    await requireAdminUser();
    await connectToDatabase();
    const deleted = await Fund.findByIdAndDelete(fundId);

    if (!deleted) {
      throw new DashboardActionError("Fund not found.");
    }

    revalidateFundPaths(String(deleted.slug || deleted._id));
    return { success: true };
  } catch (error) {
    console.error("Delete fund error:", error);
    return {
      success: false,
      error: getDashboardActionError(error, "Could not delete the fund. Please try again."),
    };
  }
}

export async function updateFundStatus(fundId: string, status: string, published?: boolean) {
  await requireAdminUser();
  await connectToDatabase();
  const allowedStatuses = ["active", "inactive", "draft", "completed", "paused", "archived"];
  if (!allowedStatuses.includes(status)) throw new Error("Invalid fund status");
  const update: Record<string, unknown> = { status };
  if (typeof published === "boolean") update.published = published;
  const fund = await Fund.findByIdAndUpdate(fundId, update, { new: true, runValidators: true });
  if (!fund) throw new Error("Fund not found");
  revalidatePath("/dashboard/funds");
  revalidatePath("/donation-funds");
  revalidatePath("/");
  return { success: true };
}

export async function getFunds() {
  await requireAdminUser();
  await connectToDatabase();
  const funds = await Fund.find().lean().sort({ createdAt: -1 });

  return Promise.all(
    funds.map(async (fund: Record<string, unknown>) => {
      const user = await User.findById(fund.createdBy).select("name email").lean();
      return {
        _id: String(fund._id),
        slug: fund.slug || "",
        name: fund.name,
        description: fund.description || "",
        category: fund.category,
        impactSummary: fund.impactSummary || "",
        targetAmount: fund.targetAmount || 0,
        raisedAmount: fund.raisedAmount || 0,
        status: fund.status,
        imageUrl: fund.imageUrl || "",
        published: Boolean(fund.published ?? fund.status === "active"),
        createdBy: {
          _id: user ? String(user._id) : "",
          name: user?.name || "Unknown",
          email: user?.email || "unknown@example.com",
        },
        createdAt: String(fund.createdAt),
        updatedAt: String(fund.updatedAt),
      };
    })
  );
}

export async function seedDefaultFunds() {
  try {
    const user = await requireAdminUser();
    await connectToDatabase();

    let created = 0;
    let updated = 0;

    for (const fund of DONATION_FUNDS) {
      const payload = {
        name: fund.name,
        slug: fund.slug,
        description: fund.description,
        category: fund.category,
        impactSummary: fund.impactSummary,
        targetAmount: 0,
        raisedAmount: 0,
        status: "active",
        published: true,
      };

      const existing = await Fund.findOne({ slug: fund.slug });

      if (existing) {
        await Fund.findByIdAndUpdate(existing._id, payload, {
          runValidators: true,
        });
        updated += 1;
      } else {
        await Fund.create({
          ...payload,
          createdBy: user._id,
        });
        created += 1;
      }
    }

    revalidateFundPaths("");
    return {
      success: true,
      created,
      updated,
      total: DONATION_FUNDS.length,
    };
  } catch (error) {
    console.error("Seed default funds error:", error);
    throw error;
  }
}

export async function getFundById(fundId: string) {
  try {
    await requireAdminUser();
    if (!fundId) {
      throw new DashboardActionError("Fund ID is required.");
    }

    await connectToDatabase();
    const fund = await Fund.findById(fundId).lean();

    if (!fund) {
      return null;
    }

    const user = await User.findById(fund.createdBy).select("name email").lean();
    return {
      _id: String(fund._id),
      name: fund.name,
      description: fund.description || "",
      category: fund.category,
      impactSummary: fund.impactSummary || "",
      targetAmount: fund.targetAmount || 0,
      raisedAmount: fund.raisedAmount || 0,
      status: fund.status,
      createdBy: {
        _id: user ? String(user._id) : "",
        name: user?.name || "Unknown",
        email: user?.email || "unknown@example.com",
      },
      createdAt: String(fund.createdAt),
      updatedAt: String(fund.updatedAt),
    };
  } catch (error) {
    console.error("Get fund error:", error);
    return null;
  }
}

function revalidateFundPaths(identifier: string) {
  revalidatePath("/dashboard/funds");
  revalidatePath("/donation-funds");
  revalidatePath("/");
  if (identifier) {
    revalidatePath(`/donation-funds/${identifier}`);
  }
}

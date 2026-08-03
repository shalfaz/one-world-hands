"use server";

import { cookies } from "next/headers";
import connectToDatabase from "@/lib/mongoose";
import Fund from "@/lib/models/Fund";
import User from "@/lib/models/User";
import { DONATION_FUNDS } from "@/lib/data/donationFunds";
import { redirect } from "next/navigation";

async function getUserFromCookie() {
  const cookieStore = await cookies();
  const email = cookieStore.get("owh_email")?.value;

  if (!email) {
    throw new Error("User not authenticated");
  }

  await connectToDatabase();
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

export async function createFund(formData: FormData) {
  try {
    const name = String(formData.get("name") || "").trim();
    const category = String(formData.get("category") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const impactSummary = String(formData.get("impactSummary") || "").trim();
    const targetAmount = Number(formData.get("targetAmount") || 0);
    const status = String(formData.get("status") || "draft").trim();

    if (!name || !category) {
      throw new Error("Name and category are required");
    }

    const user = await getUserFromCookie();

    await connectToDatabase();
    const newFund = await Fund.create({
      name,
      category,
      description,
      impactSummary,
      targetAmount,
      status,
      createdBy: user._id,
    });

    console.log("Fund created:", newFund);
    redirect("/dashboard/funds?success=created");
  } catch (error) {
    console.error("Create fund error:", error);
    redirect("/dashboard/funds?error=failed");
  }
}

export async function updateFund(formData: FormData) {
  try {
    const fundId = String(formData.get("fundId") || "").trim();
    const name = String(formData.get("name") || "").trim();
    const category = String(formData.get("category") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const impactSummary = String(formData.get("impactSummary") || "").trim();
    const targetAmount = Number(formData.get("targetAmount") || 0);
    const status = String(formData.get("status") || "draft").trim();

    if (!fundId || !name || !category) {
      throw new Error("Fund ID, name and category are required");
    }

    await connectToDatabase();
    const updated = await Fund.findByIdAndUpdate(
      fundId,
      { name, category, description, impactSummary, targetAmount, status },
      { new: true, runValidators: true }
    );

    if (!updated) {
      throw new Error("Fund not found");
    }

    console.log("Fund updated:", updated);
    redirect("/dashboard/funds?success=updated");
  } catch (error) {
    console.error("Update fund error:", error);
    redirect("/dashboard/funds?error=failed");
  }
}

export async function deleteFund(fundId: string) {
  try {
    if (!fundId) {
      throw new Error("Fund ID is required");
    }

    await connectToDatabase();
    const deleted = await Fund.findByIdAndDelete(fundId);

    if (!deleted) {
      throw new Error("Fund not found");
    }

    console.log("Fund deleted:", deleted);
    return { success: true, message: "Fund deleted successfully" };
  } catch (error) {
    console.error("Delete fund error:", error);
    throw error;
  }
}

export async function getFunds() {
  try {
    await connectToDatabase();
    const funds = await Fund.find()
      .lean()
      .sort({ createdAt: -1 });

    // Manually fetch user data and convert to plain objects
    const fundsWithUsers = await Promise.all(
      funds.map(async (fund: Record<string, unknown>) => {
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
      })
    );

    return fundsWithUsers;
  } catch (error) {
    console.error("Get funds error:", error);
    return [];
  }
}

export async function seedDefaultFunds() {
  try {
    const user = await getUserFromCookie();
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
    if (!fundId) {
      throw new Error("Fund ID is required");
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

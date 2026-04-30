import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import Fund from "@/lib/models/Fund";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await connectToDatabase();

    const fund = await Fund.findById(id).lean();

    if (!fund) {
      return NextResponse.json(
        { error: "Fund not found" },
        { status: 404 }
      );
    }

    // Return serialized fund data
    return NextResponse.json({
      _id: String(fund._id),
      name: fund.name,
      description: fund.description,
      category: fund.category,
      impactSummary: fund.impactSummary,
      targetAmount: fund.targetAmount,
      raisedAmount: fund.raisedAmount,
      status: fund.status,
      createdAt: fund.createdAt,
      updatedAt: fund.updatedAt,
    });
  } catch (error) {
    console.error("Error fetching fund:", error);
    return NextResponse.json(
      { error: "Failed to fetch fund" },
      { status: 500 }
    );
  }
}

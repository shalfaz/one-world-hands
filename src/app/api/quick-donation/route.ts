import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import Donation from "@/lib/models/Donation";
import Fund from "@/lib/models/Fund";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const fundId = String(body?.fundId || "").trim();
    const contact = String(body?.contact || "").trim();
    const donorName = String(body?.donorName || "").trim();
    const email = String(body?.email || "").trim().toLowerCase();
    const phone = String(body?.phone || "").trim();
    const amount = Number(body?.amount || 0);
    const paymentMethod = String(body?.paymentMethod || "").trim();

    if (
      !/^[a-f\d]{24}$/i.test(fundId) ||
      !(contact || email || phone) ||
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      return NextResponse.json(
        { error: "Invalid donation data." },
        { status: 400 }
      );
    }

    if (paymentMethod && !["bkash", "nagad", "card"].includes(paymentMethod)) {
      return NextResponse.json(
        { error: "Invalid payment method." },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const fund = await Fund.findOne({
      _id: fundId,
      status: "active",
      $or: [{ published: true }, { published: { $exists: false } }],
    });
    if (!fund) {
      return NextResponse.json(
        { error: "This donation fund is not currently available." },
        { status: 404 }
      );
    }

    const donation = await Donation.create({
      donorName: donorName || (contact.includes("@") ? "Website donor" : contact),
      contact: contact || phone || email,
      email: email || (contact.includes("@") ? contact.toLowerCase() : ""),
      fund: fund._id,
      amount,
      paymentMethod: paymentMethod || "cash",
      status: "pending",
    });
    const raised = await Donation.aggregate([
      { $match: { fund: fund._id, status: "completed" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    fund.raisedAmount = raised[0]?.total || 0;
    await fund.save();

    return NextResponse.json({ success: true, id: String(donation._id) });
  } catch (error) {
    console.error("QUICK DONATION ERROR:", error);
    return NextResponse.json(
      { error: "Failed to process donation." },
      { status: 500 }
    );
  }
}
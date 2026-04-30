import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const fundId = String(body?.fundId || "").trim();
    const contact = String(body?.contact || "").trim();
    const amount = Number(body?.amount || 0);

    if (!fundId || !contact || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid donation data." },
        { status: 400 }
      );
    }

    // TODO: Save donation to MongoDB
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("QUICK DONATION ERROR:", error);
    return NextResponse.json(
      { error: "Failed to process donation." },
      { status: 500 }
    );
  }
}
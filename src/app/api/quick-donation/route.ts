import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

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

    const { error } = await supabaseServer.from("donations").insert({
      name: "Quick Donor",
      email: contact,
      amount,
      fund_id: fundId,
      status: "pending",
    });

    if (error) {
      console.error("QUICK DONATION ERROR:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("QUICK DONATION API ERROR:", error);

    return NextResponse.json(
      { error: "Something went wrong while saving the donation." },
      { status: 500 }
    );
  }
}
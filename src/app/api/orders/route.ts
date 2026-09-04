import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { PACKAGE_PRICES_INR } from "@/lib/razorpay";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { occasion, pkg, names, story, contact } = body as {
      occasion: string;
      pkg: "song" | "song_video";
      names: string;
      story: string;
      contact: string;
    };

    if (!occasion || !pkg || !names || !story || !contact) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }
    if (!PACKAGE_PRICES_INR[pkg]) {
      return NextResponse.json({ error: "Invalid package." }, { status: 400 });
    }

    const db = supabaseAdmin();
    const { data, error } = await db
      .from("orders")
      .insert({
        occasion,
        package: pkg,
        price_inr: PACKAGE_PRICES_INR[pkg],
        names,
        story,
        contact,
      })
      .select("id, price_inr")
      .single();

    if (error) throw error;

    return NextResponse.json({ orderId: data.id, priceInr: data.price_inr });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Could not save your order. Please try again." },
      { status: 500 }
    );
  }
}

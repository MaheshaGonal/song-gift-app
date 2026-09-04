import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { isAuthorized } from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { orderId, deliveryUrl, status } = await req.json();
  if (!orderId || !deliveryUrl) {
    return NextResponse.json(
      { error: "orderId and deliveryUrl are required" },
      { status: 400 }
    );
  }

  const db = supabaseAdmin();
  const { error } = await db
    .from("orders")
    .update({
      delivery_url: deliveryUrl,
      delivery_status: status || "delivered",
    })
    .eq("id", orderId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

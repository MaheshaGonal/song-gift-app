import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabase";

// Configure this exact URL as a webhook in Razorpay Dashboard →
// Settings → Webhooks, subscribed to the "payment.captured" event.
// Set the same secret there and in RAZORPAY_WEBHOOK_SECRET below.
export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-razorpay-signature") || "";

  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(rawBody)
    .digest("hex");

  if (expected !== signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const payload = JSON.parse(rawBody);

  if (payload.event === "payment.captured") {
    const payment = payload.payload.payment.entity;
    const razorpayOrderId = payment.order_id;
    const razorpayPaymentId = payment.id;

    const db = supabaseAdmin();
    await db
      .from("orders")
      .update({
        payment_status: "paid",
        razorpay_payment_id: razorpayPaymentId,
      })
      .eq("razorpay_order_id", razorpayOrderId);

    // Optional: trigger your n8n webhook here to notify yourself on
    // Telegram/WhatsApp that a new paid order has come in. Example:
    // await fetch(process.env.N8N_NEW_ORDER_WEBHOOK_URL!, {
    //   method: "POST",
    //   body: JSON.stringify({ razorpayOrderId }),
    // });
  }

  return NextResponse.json({ received: true });
}

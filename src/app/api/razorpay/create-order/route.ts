import { NextRequest, NextResponse } from "next/server";
import { razorpayClient } from "@/lib/razorpay";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { orderId } = await req.json();
    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
    }

    const db = supabaseAdmin();
    const { data: order, error } = await db
      .from("orders")
      .select("id, price_inr, payment_status")
      .eq("id", orderId)
      .single();

    if (error || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    if (order.payment_status === "paid") {
      return NextResponse.json({ error: "Already paid" }, { status: 400 });
    }

    const razorpay = razorpayClient();
    const rpOrder = await razorpay.orders.create({
      amount: order.price_inr * 100, // paise
      currency: "INR",
      receipt: order.id,
      notes: { internal_order_id: order.id },
    });

    await db
      .from("orders")
      .update({ razorpay_order_id: rpOrder.id })
      .eq("id", order.id);

    return NextResponse.json({
      razorpayOrderId: rpOrder.id,
      amount: rpOrder.amount,
      currency: rpOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Could not start payment." },
      { status: 500 }
    );
  }
}

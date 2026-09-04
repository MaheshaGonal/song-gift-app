import Razorpay from "razorpay";

// Server-only. Never import into a "use client" file.
export function razorpayClient() {
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });
}

export const PACKAGE_PRICES_INR: Record<"song" | "song_video", number> = {
  song: 399,
  song_video: 1999,
};

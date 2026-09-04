import { createClient } from "@supabase/supabase-js";

// Public client — safe to use in the browser. Can only do what your
// Row Level Security policies in Supabase allow (see supabase/schema.sql).
export const supabasePublic = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Server-only client — uses the service role key, bypasses Row Level
// Security. NEVER import this file into a "use client" component or
// expose SUPABASE_SERVICE_ROLE_KEY to the browser. Only use inside
// files under src/app/api/**/route.ts (server code).
export function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export type Order = {
  id: string;
  created_at: string;
  occasion: string;
  package: "song" | "song_video";
  price_inr: number;
  names: string;
  story: string;
  contact: string;
  payment_status: "pending" | "paid" | "failed";
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  delivery_status: "not_started" | "in_progress" | "delivered";
  delivery_url: string | null;
};

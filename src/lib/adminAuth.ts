import { NextRequest } from "next/server";

// Deliberately simple: one shared password stored in ADMIN_PASSWORD.
// Good enough for a one-person shop. If you ever bring on staff,
// replace this with Supabase Auth (email/password login) instead.
export function isAuthorized(req: NextRequest): boolean {
  const header = req.headers.get("x-admin-password");
  return !!header && header === process.env.ADMIN_PASSWORD;
}

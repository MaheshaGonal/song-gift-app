import Link from "next/link";
import type { ReactNode } from "react";

// Shared layout for Contact / Privacy / Terms / Refund / Delivery pages.
// Edit the details below in ONE place if your email, phone or city changes.
export const BUSINESS = {
  name: "A Song For Them",
  email: "gonalhanumanta@gmail.com",
  phone: "+91 93251 61395",
  location: "Vasco da Gama, South Goa, Goa, India",
  lastUpdated: "27 September 2026",
};

export default function PolicyPage({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <main
      style={{
        maxWidth: 760,
        margin: "0 auto",
        padding: "48px 20px 72px",
        lineHeight: 1.7,
        color: "#2b2320",
      }}
    >
      <Link href="/" style={{ color: "#AF3A34", textDecoration: "none" }}>
        ← Back to {BUSINESS.name}
      </Link>
      <h1
        style={{
          fontFamily: "Fraunces, serif",
          fontSize: "2.2rem",
          margin: "24px 0 4px",
        }}
      >
        {title}
      </h1>
      <p style={{ color: "#6b5c4c", marginTop: 0 }}>
        Last updated: {BUSINESS.lastUpdated}
      </p>
      <div className="policy-body">{children}</div>
    </main>
  );
}

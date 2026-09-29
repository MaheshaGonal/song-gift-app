import Link from "next/link";
import { BUSINESS } from "./PolicyPage";

const LINKS = [
  { href: "/contact", label: "Contact Us" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/refund-policy", label: "Refund & Cancellation" },
  { href: "/delivery-policy", label: "Delivery Policy" },
];

export default function SiteFooter() {
  return (
    <footer
      style={{
        borderTop: "1px solid #e6dccb",
        padding: "28px 20px",
        textAlign: "center",
        fontSize: "0.9rem",
        color: "#6b5c4c",
      }}
    >
      <nav
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "8px 20px",
          marginBottom: 12,
        }}
      >
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} style={{ color: "#6b5c4c" }}>
            {l.label}
          </Link>
        ))}
      </nav>
      <p style={{ margin: 0 }}>
        © {new Date().getFullYear()} {BUSINESS.name} · {BUSINESS.location}
      </p>
    </footer>
  );
}

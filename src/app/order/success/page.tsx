import Link from "next/link";

export default function SuccessPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 16,
        padding: 24,
        textAlign: "center",
      }}
    >
      <h1 style={{ fontFamily: "Fraunces, serif", fontSize: "2rem" }}>
        Got it — your story is in good hands.
      </h1>
      <p style={{ color: "#6b5c4c", maxWidth: 440 }}>
        Payment received. We'll reach out on the WhatsApp number or email you
        gave us with a preview before anything is final. Usually within
        3–5 days.
      </p>
      <Link href="/" className="btn btn-outline">
        Back to home
      </Link>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void;
    };
  }
}

export default function OrderForm() {
  const router = useRouter();
  const [occasion, setOccasion] = useState("Wedding");
  const [pkg, setPkg] = useState<"song" | "song_video">("song");
  const [names, setNames] = useState("");
  const [story, setStory] = useState("");
  const [contact, setContact] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!names || !story || !contact) {
      setError("Please fill in every field.");
      return;
    }

    setSubmitting(true);
    try {
      // 1. Save the order
      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ occasion, pkg, names, story, contact }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.error || "Could not place order");

      // 2. Create a Razorpay order
      const rpRes = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: orderData.orderId }),
      });
      const rpData = await rpRes.json();
      if (!rpRes.ok) throw new Error(rpData.error || "Could not start payment");

      // 3. Load Razorpay checkout script if not already loaded
      if (!window.Razorpay) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("Could not load payment gateway"));
          document.body.appendChild(script);
        });
      }

      // 4. Open Razorpay checkout
      const rzp = new window.Razorpay({
        key: rpData.keyId,
        amount: rpData.amount,
        currency: rpData.currency,
        name: "A Song For Them",
        description: occasion + " — " + (pkg === "song" ? "Song" : "Song + video"),
        order_id: rpData.razorpayOrderId,
        handler: function () {
          router.push(`/order/success?orderId=${orderData.orderId}`);
        },
        prefill: { contact: contact },
        theme: { color: "#AF3A34" },
      });
      rzp.open();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="occasion">Occasion</label>
        <select
          id="occasion"
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
        >
          <option>Wedding</option>
          <option>Birthday</option>
          <option>Anniversary</option>
          <option>Something else</option>
        </select>
      </div>
      <div>
        <label htmlFor="pkg">Package</label>
        <select
          id="pkg"
          value={pkg}
          onChange={(e) => setPkg(e.target.value as "song" | "song_video")}
        >
          <option value="song">Just the song — ₹99</option>
          <option value="song_video">Song + video — ₹499</option>
        </select>
      </div>
      <div>
        <label htmlFor="names">Names of the people this is for</label>
        <input
          id="names"
          type="text"
          placeholder="e.g. Ritika and Arjun"
          value={names}
          onChange={(e) => setNames(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="story">The story</label>
        <textarea
          id="story"
          placeholder="A moment, a memory, an inside joke — the more specific, the better the song."
          value={story}
          onChange={(e) => setStory(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="contact">WhatsApp number or email</label>
        <input
          id="contact"
          type="text"
          placeholder="We'll send your preview here"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
      </div>
      {error && <p className="form-error">{error}</p>}
      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? "Starting payment…" : "Continue to payment"}
      </button>
    </form>
  );
}

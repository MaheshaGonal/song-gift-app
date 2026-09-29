import type { Metadata } from "next";
import PolicyPage, { BUSINESS } from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: `Refund & Cancellation Policy — ${BUSINESS.name}`,
};

export default function RefundPolicyPage() {
  return (
    <PolicyPage title="Refund & Cancellation Policy">
      <p>
        Every song we make is created from scratch for one person, so our
        refund policy reflects the stage your order is at.
      </p>

      <h2>1. Cancellation before work starts: full refund</h2>
      <p>
        If you cancel before we&apos;ve started working on your song, you&apos;ll get a{" "}
        <strong>full refund</strong>. To cancel, email{" "}
        <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> or message us
        on WhatsApp at {BUSINESS.phone} with the name and contact details used
        for the order.
      </p>

      <h2>2. After work has started: one free revision</h2>
      <p>
        Once we&apos;ve started, the order can no longer be cancelled for a refund.
        Instead, you&apos;ll receive a preview, and every order includes{" "}
        <strong>one free revision</strong> so we can adjust the song until
        you&apos;re happy with it.
      </p>

      <h2>3. After final delivery: no refund</h2>
      <p>
        Because each song and video is a custom-made digital product created
        only for you, we <strong>cannot offer refunds after final delivery</strong>.
      </p>

      <h2>4. If we can&apos;t deliver</h2>
      <p>
        If we&apos;re unable to complete your order, or we decline an order (for
        example, because of content we can&apos;t work with), you&apos;ll get a full
        refund.
      </p>

      <h2>5. How refunds are paid</h2>
      <ul>
        <li>
          Approved refunds are made to the original payment method through
          Razorpay.
        </li>
        <li>
          We start the refund within 2 working days of approving it. It usually
          reaches your account within 5–7 working days, depending on your bank.
        </li>
        <li>
          If money was deducted but your payment failed, it is normally
          reversed automatically by your bank or Razorpay. If it isn&apos;t,
          contact us and we&apos;ll help.
        </li>
      </ul>

      <h2>6. Contact</h2>
      <p>
        Email: <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> ·
        Phone/WhatsApp: {BUSINESS.phone}
      </p>
    </PolicyPage>
  );
}

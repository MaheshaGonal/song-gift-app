import type { Metadata } from "next";
import PolicyPage, { BUSINESS } from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: `Delivery Policy — ${BUSINESS.name}`,
};

export default function DeliveryPolicyPage() {
  return (
    <PolicyPage title="Delivery Policy">
      <p>
        All our products are digital. Nothing is shipped physically, and there
        are no shipping charges.
      </p>

      <h2>1. Delivery times</h2>
      <p>Timelines start once your payment is confirmed:</p>
      <ul>
        <li>
          <strong>Song:</strong> 2–3 days
        </li>
        <li>
          <strong>Song + Video:</strong> 5–7 days
        </li>
      </ul>
      <p>
        If you need your song for a specific date, tell us in your story or
        message us after ordering and we&apos;ll do our best to meet it.
      </p>

      <h2>2. How you receive your order</h2>
      <ol>
        <li>
          We send you a <strong>preview</strong> on the WhatsApp number or
          email you gave when ordering.
        </li>
        <li>
          If you&apos;d like changes, you can ask for your{" "}
          <strong>one free revision</strong>.
        </li>
        <li>
          Once you&apos;re happy, we send the <strong>final file</strong> as a
          download link (MP3 for songs, MP4 for videos).
        </li>
      </ol>
      <p>
        Time spent on a revision may add 1–2 days to the delivery times above.
      </p>

      <h2>3. Delays</h2>
      <p>
        If anything will delay your order, we&apos;ll let you know as soon as
        possible. Please make sure the phone number or email you give is
        correct, so our messages reach you.
      </p>

      <h2>4. Didn&apos;t receive your order?</h2>
      <p>
        Check your spam folder first. Then email{" "}
        <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> or message us
        on WhatsApp at {BUSINESS.phone} and we&apos;ll resend it.
      </p>
    </PolicyPage>
  );
}

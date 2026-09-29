import type { Metadata } from "next";
import Link from "next/link";
import PolicyPage, { BUSINESS } from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: `Terms & Conditions — ${BUSINESS.name}`,
};

export default function TermsPage() {
  return (
    <PolicyPage title="Terms & Conditions">
      <p>
        These terms apply to your use of this website and to any order you
        place with {BUSINESS.name}. By placing an order, you agree to them.
      </p>

      <h2>1. Our service</h2>
      <p>
        We create original, personalised songs (and, if chosen, a matching
        video) based on the story and details you share. Songs and videos are
        produced with the help of AI-assisted music, writing and video tools,
        and are written and put together specifically for your order.
      </p>

      <h2>2. Packages, prices and payment</h2>
      <ul>
        <li>
          We offer two packages: <strong>Song</strong> and{" "}
          <strong>Song + Video</strong>. Prices are shown on our website and
          are charged in Indian Rupees (₹).
        </li>
        <li>
          The price that applies is the one shown when you place your order.
        </li>
        <li>
          Payment is taken in full at the time of ordering through Razorpay.
          Work on your order begins after payment is confirmed.
        </li>
      </ul>

      <h2>3. What you share with us</h2>
      <ul>
        <li>
          Please make sure the story, names and details you share are accurate
          and that you&apos;re comfortable with them being used to create your song.
        </li>
        <li>
          Don&apos;t send content that is offensive, hateful, defamatory, or that
          infringes someone else&apos;s rights, and don&apos;t ask us to copy an
          existing song. We may decline such orders and refund you in full.
        </li>
      </ul>

      <h2>4. Previews and revisions</h2>
      <p>
        We share a preview with you before final delivery. Each order includes{" "}
        <strong>one free revision</strong> after the preview. Revisions cover
        changes such as lyrics, names or details, and the general mood or
        style. A complete re-make with a new story counts as a new order.
      </p>

      <h2>5. Delivery</h2>
      <p>
        Delivery times and methods are described in our{" "}
        <Link href="/delivery-policy">Delivery Policy</Link>.
      </p>

      <h2>6. Cancellations and refunds</h2>
      <p>
        Please see our{" "}
        <Link href="/refund-policy">Refund &amp; Cancellation Policy</Link>.
      </p>

      <h2>7. How you may use your song</h2>
      <p>
        Your song and video are for personal, non-commercial use. You&apos;re
        welcome to play them at your event, share them with family and friends,
        and post them on your personal social media. For commercial use (for
        example in advertising or for a business), please contact us first.
      </p>

      <h2>8. Our use of your song</h2>
      <p>
        We will only use your song, video or story as a sample or in our
        marketing if you give us permission.
      </p>

      <h2>9. Limitation of liability</h2>
      <p>
        We work hard to deliver on time and to a high standard. To the extent
        permitted by law, our total liability for any order is limited to the
        amount you paid for that order.
      </p>

      <h2>10. Governing law</h2>
      <p>
        These terms are governed by the laws of India. Any disputes will be
        subject to the jurisdiction of the courts in South Goa, Goa.
      </p>

      <h2>11. Changes to these terms</h2>
      <p>
        We may update these terms from time to time. The version shown when you
        place your order applies to that order.
      </p>

      <h2>12. Contact</h2>
      <p>
        Email: <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> ·
        Phone/WhatsApp: {BUSINESS.phone}
        <br />
        {BUSINESS.location}
      </p>
    </PolicyPage>
  );
}

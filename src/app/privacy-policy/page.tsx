import type { Metadata } from "next";
import PolicyPage, { BUSINESS } from "@/components/PolicyPage";

export const metadata: Metadata = { title: `Privacy Policy — ${BUSINESS.name}` };

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage title="Privacy Policy">
      <p>
        {BUSINESS.name} (&quot;we&quot;, &quot;us&quot;) respects your privacy. This policy
        explains what information we collect when you use our website and place
        an order, how we use it, and the choices you have.
      </p>

      <h2>1. Information we collect</h2>
      <ul>
        <li>
          <strong>Order details you give us:</strong> the occasion, the names of
          the people the song is for, the story and memories you share, and
          your phone/WhatsApp number or email address.
        </li>
        <li>
          <strong>Payment information:</strong> payments are processed by
          Razorpay. We do not see or store your card, UPI or bank details. We
          only receive confirmation of whether a payment succeeded and the
          amount paid.
        </li>
        <li>
          <strong>Website usage data:</strong> we use Google Analytics and
          Google Tag Manager, which use cookies to collect information such as
          pages visited, device type, approximate location and how you arrived
          at our site. This helps us understand and improve our website and
          advertising.
        </li>
      </ul>

      <h2>2. How we use your information</h2>
      <ul>
        <li>To create your custom song or video from the story you share.</li>
        <li>To contact you about your order, share previews and deliver the final file.</li>
        <li>To process payments, refunds and respond to your questions.</li>
        <li>To measure and improve our website and marketing.</li>
      </ul>
      <p>We do not sell your personal information to anyone.</p>

      <h2>3. Creative tools and service providers</h2>
      <p>
        Our songs and videos are produced with the help of AI-assisted music,
        writing and video tools. To create your order, relevant parts of your
        story (such as names and memories) may be entered into these tools. We
        also rely on trusted providers to run our business, including Razorpay
        (payments), Supabase (secure order storage), Vercel (website hosting)
        and Google (analytics). These providers only process your information
        as needed to provide their services.
      </p>

      <h2>4. Sharing your song</h2>
      <p>
        We will not publish your song, video or story publicly (for example as
        a sample on our website or social media) without your permission.
      </p>

      <h2>5. How long we keep your information</h2>
      <p>
        We keep order details for as long as needed to complete your order,
        handle revisions or support requests, and meet legal and accounting
        requirements. You can ask us to delete your story and contact details
        at any time after your order is complete.
      </p>

      <h2>6. Cookies</h2>
      <p>
        You can block or delete cookies in your browser settings. The website
        will still work, but we won&apos;t be able to measure your visit.
      </p>

      <h2>7. Your rights</h2>
      <p>
        You can ask us to access, correct or delete your personal information,
        in line with applicable Indian law, including the Digital Personal Data
        Protection Act, 2023. Email us at{" "}
        <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> and we&apos;ll
        respond within a reasonable time.
      </p>

      <h2>8. Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The &quot;Last updated&quot; date
        at the top shows when it was last changed.
      </p>

      <h2>9. Contact</h2>
      <p>
        {BUSINESS.name}, {BUSINESS.location}
        <br />
        Email: <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> ·
        Phone: {BUSINESS.phone}
      </p>
    </PolicyPage>
  );
}

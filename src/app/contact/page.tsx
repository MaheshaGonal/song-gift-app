import type { Metadata } from "next";
import PolicyPage, { BUSINESS } from "@/components/PolicyPage";

export const metadata: Metadata = { title: `Contact Us — ${BUSINESS.name}` };

export default function ContactPage() {
  return (
    <PolicyPage title="Contact Us">
      <p>
        Have a question about an order, a song in progress, or something you&apos;d
        like us to make? We&apos;d love to hear from you.
      </p>

      <h2>Get in touch</h2>
      <ul>
        <li>
          <strong>Email:</strong>{" "}
          <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
        </li>
        <li>
          <strong>Phone / WhatsApp:</strong>{" "}
          <a href="tel:+919325161395">{BUSINESS.phone}</a>
        </li>
        <li>
          <strong>Location:</strong> {BUSINESS.location}
        </li>
      </ul>

      <h2>Response time</h2>
      <p>
        We usually reply within 24 hours (Monday to Saturday). For questions
        about an existing order, please mention the name and phone number or
        email you used when ordering.
      </p>

      <h2>Business details</h2>
      <p>
        {BUSINESS.name} is an online service that creates custom songs and
        videos for personal occasions. All orders are placed and delivered
        online.
      </p>
    </PolicyPage>
  );
}

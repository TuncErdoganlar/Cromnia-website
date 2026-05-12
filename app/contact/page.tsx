/**
 * app/contact/page.tsx
 *
 * The CONTACT PAGE — rendered at /contact
 *
 * Layout: Two-column side-by-side:
 * - Left column: ContactInfo (address, phone, fax, map placeholder)
 * - Right column: ContactForm (the interactive form)
 *
 * Note: This page itself is a Server Component.
 * The ContactForm component inside it is a Client Component ("use client").
 * This is correct — you CAN nest Client Components inside Server Components.
 * Only the ContactForm "island" runs in the browser; the rest stays server-rendered.
 */

import type { Metadata } from "next";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact CROMNIA's clinical research team. Address: Alsancak, Izmir, Turkey. " +
    "Phone: +90 232 4890068.",
};

/**
 * ContactPage Component
 */
export default function ContactPage() {
  return (
    <>
      {/* Page banner */}
      <div className="bg-navy-900 py-16 md:py-24">
        <div className="section-container">
          <p className="text-sky-400 text-sm font-semibold uppercase tracking-wider mb-3">
            Reach Out
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Ready to discuss your clinical research project? Our team is here to help
            you design the right solution.
          </p>
        </div>
      </div>

      {/* ── MAIN CONTACT SECTION ─────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="section-container">
          {/*
           * Two-column layout:
           * - grid-cols-1: stacked on mobile
           * - lg:grid-cols-2: side by side on desktop
           * - gap-12: 48px horizontal gap between columns
           * - items-start: columns align to their top edges
           *   (prevents the short ContactInfo from stretching to match the form)
           */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}

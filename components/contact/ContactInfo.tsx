/**
 * components/contact/ContactInfo.tsx
 *
 * Displays CROMNIA's contact information — address, phone, and business hours.
 * Also includes an embedded Google Map showing the office location.
 *
 * This is a SERVER COMPONENT — static data, no interactivity needed.
 *
 * CONTENT SOURCE:
 * -----------------------------------------------------------------------
 * All contact details extracted from CROMNIA Website document:
 * - Address: 2013 sok. no:12, Bostanlı - Izmir / TURKEY
 * - Phone:   +90 232 4890068
 */

import { MapPin, Phone, Clock } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * ContactInfo Component
 *
 * Renders office address, phone, business hours, and an embedded Google Map.
 */
export default function ContactInfo() {
  return (
    <div>
      <SectionHeading
        title="Get In Touch"
        subtitle="Our team is ready to discuss your clinical research requirements."
      />

      {/* ── CONTACT DETAILS LIST ─────────────────────────────────────────────
          Each item has an icon, a label, and a value.
          Using a <ul><li> structure for semantic correctness.
      ──────────────────────────────────────────────────────────────────────── */}
      <ul className="space-y-6 mb-10">

        {/* Address */}
        <li className="flex items-start gap-4">
          <div className="w-11 h-11 bg-navy-900 rounded-xl flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5 text-sky-400" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Office Address
            </p>
            <p className="text-gray-700 font-medium leading-relaxed">
              2013 sok. no:12<br />
              Bostanlı — Izmir / TURKEY
            </p>
          </div>
        </li>

        {/* Phone */}
        <li className="flex items-start gap-4">
          <div className="w-11 h-11 bg-navy-900 rounded-xl flex items-center justify-center flex-shrink-0">
            <Phone className="w-5 h-5 text-sky-400" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Phone
            </p>
            {/* tel: link allows mobile users to tap-to-call directly */}
            <a
              href="tel:+902324890068"
              className="text-gray-700 font-medium hover:text-sky-600 transition-colors"
            >
              +90 232 489 0068
            </a>
          </div>
        </li>

        {/* Business Hours */}
        <li className="flex items-start gap-4">
          <div className="w-11 h-11 bg-navy-900 rounded-xl flex items-center justify-center flex-shrink-0">
            <Clock className="w-5 h-5 text-sky-400" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Business Hours
            </p>
            <p className="text-gray-700 font-medium">
              Monday – Friday, 09:00 – 18:00 (GMT+3)
            </p>
          </div>
        </li>

      </ul>

      {/* ── OFFICE LOCATION (embedded Google Map) ────────────────────────────
          A live Google Maps embed centered on the office address. The
          `output=embed` query form needs no API key. To re-point it, change
          the address in the `q=` parameter of the iframe `src` below.
      ──────────────────────────────────────────────────────────────────────── */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Office Location
        </p>
        <div className="w-full rounded-2xl border border-navy-700 overflow-hidden shadow-sm">
          <iframe
            title="CROMNIA office location — 2013 sok. no:12, Bostanlı, Izmir"
            src="https://www.google.com/maps?q=2013%20Sokak%20No%3A12%20Bostanl%C4%B1%20Kar%C5%9F%C4%B1yaka%20%C4%B0zmir&z=15&output=embed"
            className="w-full h-64 border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>

    </div>
  );
}

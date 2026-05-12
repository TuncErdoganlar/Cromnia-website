/**
 * components/contact/ContactInfo.tsx
 *
 * Displays CROMNIA's contact information — address, phone, and fax.
 * Also includes a map placeholder where a Google Maps embed can be added.
 *
 * This is a SERVER COMPONENT — static data, no interactivity needed.
 *
 * CONTENT SOURCE:
 * -----------------------------------------------------------------------
 * All contact details extracted from CROMNIA Website document:
 * - Address: 1374 sok. no:10 / 601, Alsancak - Izmir / TURKEY
 * - Phone:   +90 232 4890068
 * - Fax:     +90 232 4890069
 */

import { MapPin, Phone, Printer, Clock } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * ContactInfo Component
 *
 * Renders office address, phone, fax, and a map placeholder.
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
              1374 sok. no:10 / 601<br />
              Alsancak — Izmir / TURKEY
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

        {/* Fax */}
        <li className="flex items-start gap-4">
          <div className="w-11 h-11 bg-navy-900 rounded-xl flex items-center justify-center flex-shrink-0">
            {/* Printer icon is the standard representation of fax */}
            <Printer className="w-5 h-5 text-sky-400" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Fax
            </p>
            <p className="text-gray-700 font-medium">
              +90 232 489 0069
            </p>
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

      {/* ── MAP PLACEHOLDER ──────────────────────────────────────────────────
          This is a placeholder for a real Google Maps embed.
          To add a real map:
          1. Go to Google Maps → search "Alsancak, Izmir"
          2. Click Share → Embed a map
          3. Copy the <iframe> code
          4. Replace this <div> with the <iframe>
          5. Add maps.google.com to next.config.js image domains if needed
      ──────────────────────────────────────────────────────────────────────── */}
      <div className="w-full h-48 bg-navy-900 rounded-2xl flex items-center justify-center border border-navy-700 overflow-hidden">
        <div className="text-center text-gray-500">
          <MapPin className="w-8 h-8 text-sky-600 mx-auto mb-2 opacity-50" />
          <p className="text-sm font-medium text-gray-400">Alsancak, Izmir</p>
          <p className="text-xs text-gray-600 mt-1">
            Replace with Google Maps embed
          </p>
        </div>
      </div>

    </div>
  );
}

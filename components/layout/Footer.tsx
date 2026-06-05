/**
 * components/layout/Footer.tsx
 *
 * The site-wide footer displayed at the bottom of every page.
 *
 * This is a SERVER COMPONENT (no "use client" needed) because:
 * - It displays only static content (no user interaction, no hooks)
 * - Server Components are faster — they render once on the server and
 *   the browser receives ready-made HTML, with no JavaScript to execute
 *
 * STRUCTURE:
 * -----------------------------------------------------------------------
 * The footer has three visual layers:
 * 1. Main content row (3 columns on desktop, stacked on mobile):
 *    - Column 1: Brand description + founded year
 *    - Column 2: Quick navigation links
 *    - Column 3: Contact details with icons
 * 2. A thin dividing line
 * 3. Copyright bar at the bottom
 */

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";

/**
 * Footer Component
 *
 * Renders the full-width site footer with company info, navigation,
 * contact details, and copyright notice.
 */
export default function Footer() {
  // new Date().getFullYear() dynamically returns the current year (e.g., 2025).
  // This way, you never have to manually update the copyright year.
  const currentYear = new Date().getFullYear();

  return (
    // bg-surface-inverted-soft → dark navy footer background (semantic token)
    // text-gray-300            → default light text color for the entire footer
    // role="contentinfo" is the implicit role of <footer> at the root level —
    // we keep it explicit for clarity in assistive tech tooling.
    <footer role="contentinfo" className="bg-surface-inverted-soft text-gray-300">

      {/* ── MAIN FOOTER CONTENT ─────────────────────────────────────────────
          py-16 → 64px vertical padding (breathing room)
          grid   → CSS Grid layout for the 3 columns
          grid-cols-1 → single column on mobile (stacked vertically)
          md:grid-cols-3 → 3 equal columns on desktop (≥768px)
          gap-12 → 48px gap between columns
      ─────────────────────────────────────────────────────────────────── */}
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* ── COLUMN 1: BRAND ─────────────────────────────────────────────
              Brand identity with logo, company name, and short description.
          ─────────────────────────────────────────────────────────────────── */}
          <div className="flex flex-col gap-4">
            {/* Logo row — official white CROMNIA lockup (footer is dark navy). */}
            <Link href="/" aria-label="CROMNIA — Clinical Research, Home" className="inline-flex">
              <Image
                src="/cromnia-logo-white.png"
                alt="CROMNIA Clinical Research"
                width={839}
                height={401}
                className="h-10 w-auto"
              />
            </Link>

            {/* Short description */}
            <p className="text-sm leading-relaxed text-gray-400">
              A Contract Research Organization providing reliable, flexible, and
              cost-effective clinical research services across all therapeutic areas.
            </p>

            {/* Founded badge */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin className="w-4 h-4 text-sky-400 flex-shrink-0" />
              <span>Izmir, Turkey — Est. 2009</span>
            </div>
          </div>

          {/* ── COLUMN 2: QUICK LINKS ──────────────────────────────────────── */}
          {/* nav landmark with aria-label distinguishes this from the primary nav */}
          <nav aria-label="Footer navigation">
            {/* Section label */}
            <h3 className="text-white font-semibold text-caption uppercase tracking-wider mb-6">
              Quick Links
            </h3>

            {/* Navigation links list */}
            <ul className="flex flex-col gap-3">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/services", label: "Services" },
                { href: "/career", label: "Career" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                /*
                 * `group` on the <li> enables `group-hover:` utilities on the
                 * dot span below. (Previously the class lived on no element,
                 * so the dot's opacity-0 → opacity-100 transition never fired.)
                 */
                <li key={link.href} className="group">
                  <Link
                    href={link.href}
                    className="text-body-sm text-gray-400 hover:text-brand-accent hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-2
                               focus-visible:outline-none focus-visible:text-brand-accent focus-visible:translate-x-1"
                  >
                    <span
                      aria-hidden="true"
                      className="w-1 h-1 bg-brand-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── COLUMN 3: CONTACT DETAILS ──────────────────────────────────── */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">
              Contact Us
            </h3>

            <ul className="flex flex-col gap-4">
              {/* Address */}
              <li className="flex items-start gap-3">
                {/* flex-shrink-0 prevents the icon from squishing when the text wraps */}
                <MapPin className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-400 leading-relaxed">
                  2013 sok. no:12<br />
                  Bostanlı - Izmir / TURKEY
                </span>
              </li>

              {/* Phone */}
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <a
                  href="tel:+902324890068"
                  className="text-sm text-gray-400 hover:text-sky-400 transition-colors"
                >
                  +90 232 4890068
                </a>
              </li>

              {/* Email placeholder */}
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <Link
                  href="/contact"
                  className="text-sm text-gray-400 hover:text-sky-400 transition-colors"
                >
                  Send us a message →
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* ── DIVIDER ─────────────────────────────────────────────────────────── */}
      <div className="border-t border-white/10" />

      {/* ── COPYRIGHT BAR ──────────────────────────────────────────────────── */}
      <div className="section-container py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            © {currentYear} CROMNIA. All rights reserved.
          </p>
          <p>
            Contract Research Organization — Izmir, Turkey
          </p>
        </div>
      </div>

    </footer>
  );
}

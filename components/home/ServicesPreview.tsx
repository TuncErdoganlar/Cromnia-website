/**
 * components/home/ServicesPreview.tsx
 *
 * A grid of 7 service cards on the home page. Each card pairs a small
 * Tabler outline icon with a service title and a short description.
 *
 * REDESIGN (STEP 3):
 * -----------------------------------------------------------------------
 * - The old white-card grid is replaced with translucent "glass" cards
 *   that match the new dark navy hero — bg-white/[0.03] over a thin
 *   border-white/[0.07]. On hover each card lifts 2px and its border
 *   takes on the blue brand color.
 * - Each card carries a 32x32 icon badge (`bg-blue-500/15`) with a
 *   Tabler outline icon picked specifically for the service:
 *     Site Selection      → ti-map-search
 *     Trial Management    → ti-clipboard-list
 *     Regulatory Affairs  → ti-file-certificate
 *     Medical Writing     → ti-pencil
 *     Site Coordinator    → ti-user-check
 *     Medical Translation → ti-language
 *     Investigator Mtg.   → ti-presentation
 * - Cards stagger in via framer-motion's `whileInView` with `once: true`
 *   so the animation runs exactly once when each card enters the viewport.
 *
 * This is a CLIENT COMPONENT now (framer-motion).
 */
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { services } from "@/data/services";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

// ── ICON MAP ──────────────────────────────────────────────────────────────────
// Maps the icon name stored in data/services.ts to a Tabler icon CSS class.
// Tabler icons are loaded as a web font in app/layout.tsx, so `ti ti-...`
// renders the right glyph anywhere on the site.
const tablerIconMap: Record<string, string> = {
  MapPin: "ti ti-map-search",
  ClipboardList: "ti ti-clipboard-list",
  FileCheck: "ti ti-file-certificate",
  PenLine: "ti ti-pencil",
  Users: "ti ti-user-check",
  Languages: "ti ti-language",
  CalendarDays: "ti ti-presentation",
};

/**
 * ServicesPreview Component
 *
 * Renders a responsive 1/2/3-column icon-card grid of all services.
 */
export default function ServicesPreview() {
  return (
    // Section stays on the brand navy so it blends with the new hero.
    // The top border + the section background change ('STEP 5') give a
    // subtle horizontal rhythm down the page.
    <section className="py-20 bg-[#0A1628] border-t border-white/[0.05]">
      <div className="section-container">

        {/* Section header — `light` keeps the heading legible on dark bg. */}
        <SectionHeading
          title="Our Services"
          subtitle="Comprehensive clinical research solutions from site selection through final reporting."
          centered
          light
        />

        {/* ── SERVICES GRID ──────────────────────────────────────────────────
            grid-cols-1 → mobile (single column)
            md:grid-cols-2 → tablet
            lg:grid-cols-3 → desktop
            gap-5 → tight, modern 20px gutters
        ──────────────────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">

          {services.map((service, idx) => {
            const iconClass = tablerIconMap[service.icon] ?? "ti ti-circle";

            return (
              // Each card is a Link so the whole tile is clickable.
              // motion.div wraps the visual container so we can stagger it
              // into view as the user scrolls down.
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  delay: idx * 0.08,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                }}
              >
                <Link
                  href="/services"
                  className="group block bg-white/[0.03] border border-white/[0.07] rounded-xl p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-500/40"
                >
                  {/* ── ICON BADGE ────────────────────────────────────────────
                      32×32 (w-8 h-8) rounded blue tile holding the Tabler icon.
                  ──────────────────────────────────────────────────────────── */}
                  <div className="w-8 h-8 bg-blue-500/15 rounded-lg flex items-center justify-center">
                    <i className={`${iconClass} text-blue-400 text-lg`} aria-hidden="true" />
                  </div>

                  {/* ── TITLE ──────────────────────────────────────────────── */}
                  <h3 className="text-white font-medium text-sm mt-3 mb-1 leading-snug">
                    {service.title}
                  </h3>

                  {/* ── DESCRIPTION ──────────────────────────────────────────
                      Uses the short `summary` field from data/services.ts.
                  ──────────────────────────────────────────────────────────── */}
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {service.summary}
                  </p>
                </Link>
              </motion.div>
            );
          })}

        </div>

        {/* ── VIEW ALL BUTTON ─────────────────────────────────────────────── */}
        <div className="text-center">
          <Button href="/services" variant="primary">
            View All Services
          </Button>
        </div>

      </div>
    </section>
  );
}

/**
 * components/home/ServicesPreview.tsx
 *
 * A teaser grid showing all 7 CROMNIA services on the home page.
 * Each card is a compact summary — visitors click "View All Services"
 * to go to the full /services page with complete details.
 *
 * DATA FLOW:
 * -----------------------------------------------------------------------
 * This component imports the `services` array from `data/services.ts`.
 * It does NOT hardcode any service content. This is the "separation of
 * concerns" principle: UI components handle display, data files handle content.
 *
 * This is a SERVER COMPONENT — it only reads data and renders HTML.
 */

import Link from "next/link";
import {
  MapPin, ClipboardList, FileCheck, PenLine,
  Users, Languages, CalendarDays, ArrowRight
} from "lucide-react";
import { services } from "@/data/services";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

// ── ICON MAP ──────────────────────────────────────────────────────────────────
// Maps the string icon names stored in services.ts to actual Lucide components.
// This pattern avoids dynamic imports and keeps TypeScript happy.
// We define this outside the component so it's not re-created on every render.
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MapPin,
  ClipboardList,
  FileCheck,
  PenLine,
  Users,
  Languages,
  CalendarDays,
};

/**
 * ServicesPreview Component
 *
 * Renders a compact 3-column preview grid of all services,
 * with a link to the full services page.
 */
export default function ServicesPreview() {
  return (
    // Alternating background: gray-50 (off-white) contrasts with the white MissionSection above
    <section className="py-20 bg-gray-50">
      <div className="section-container">

        {/* Section header */}
        <SectionHeading
          title="Our Services"
          subtitle="Comprehensive clinical research solutions from site selection through final reporting."
          centered
        />

        {/* ── SERVICES GRID ────────────────────────────────────────────────────
            Responsive grid:
            - Mobile (default): 1 column
            - sm (640px+): 2 columns
            - lg (1024px+): 3 columns (the "desktop" layout)
            gap-6 → 24px space between all cards
        ──────────────────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">

          {/*
           * .map() renders one card per service in the array.
           * `key={service.id}` is required — React uses it to track list items.
           * We destructure `{ id, title, summary, icon }` from each service object.
           */}
          {services.map((service) => {
            // Look up the Lucide component for this service's icon name string
            const Icon = iconMap[service.icon];

            return (
              // The entire card is a Link — clicking anywhere on it goes to /services
              <Link
                key={service.id}
                href="/services"
                // group → enables group-hover: utilities on child elements
                // When you hover the card, children with `group-hover:` classes react
                className="group bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-lg hover:border-sky-200 transition-all duration-300"
              >
                {/* ── CARD HEADER ──────────────────────────────────────────── */}
                <div className="flex items-start justify-between mb-4">
                  {/* Icon in colored container */}
                  <div className="w-11 h-11 bg-navy-50 rounded-lg flex items-center justify-center group-hover:bg-sky-50 transition-colors">
                    {Icon && <Icon className="w-5 h-5 text-navy-500 group-hover:text-sky-500 transition-colors" />}
                  </div>

                  {/* Service number — small decorative label */}
                  <span className="font-mono text-xs font-bold text-gray-300 group-hover:text-sky-300 transition-colors">
                    {/* String padding: 01, 02, 03 etc. — padStart(2, "0") adds a leading zero */}
                    {String(service.id).padStart(2, "0")}
                  </span>
                </div>

                {/* ── SERVICE TITLE ─────────────────────────────────────────── */}
                <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-navy-600 transition-colors leading-snug">
                  {service.title}
                </h3>

                {/* ── SERVICE SUMMARY ───────────────────────────────────────── */}
                <p className="text-sm text-gray-500 leading-relaxed">
                  {service.summary}
                </p>

                {/* ── HOVER CTA ARROW ───────────────────────────────────────── */}
                {/* This arrow only becomes visible when hovering (opacity-0 → opacity-100) */}
                <div className="mt-4 flex items-center gap-1 text-sky-500 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Learn more <ArrowRight className="w-3 h-3" />
                </div>

              </Link>
            );
          })}

        </div>

        {/* ── VIEW ALL BUTTON ───────────────────────────────────────────────── */}
        <div className="text-center">
          <Button href="/services" variant="primary">
            View All Services
          </Button>
        </div>

      </div>
    </section>
  );
}

/**
 * components/home/ServicesPreview.tsx
 *
 * The home-page services grid: all 7 CROMNIA services as interactive cards.
 *
 * REDESIGN (STEP 6 — interactivity pass):
 * -----------------------------------------------------------------------
 * - Each card is now a <ServiceTiltCard> that tilts toward the cursor in 3D
 *   and lifts on hover, replacing the old flat translate-y card. Entrance is
 *   still a staggered fade-up as the grid scrolls into view (once).
 * - Content is unchanged and still data-driven from data/services.ts — adding
 *   or editing a service touches only that file.
 *
 * CLIENT COMPONENT (framer-motion via the tilt cards).
 */
"use client";

import { services } from "@/data/services";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import ServiceTiltCard from "@/components/home/ServiceTiltCard";

// ── ICON MAP ──────────────────────────────────────────────────────────────────
// Maps the icon name stored in data/services.ts to a Tabler icon CSS class.
// Tabler is loaded as a web font in app/layout.tsx, so `ti ti-...` renders
// the right glyph anywhere on the site.
const tablerIconMap: Record<string, string> = {
  MapPin: "ti ti-map-search",
  ClipboardList: "ti ti-clipboard-list",
  FileCheck: "ti ti-file-certificate",
  PenLine: "ti ti-pencil",
  Users: "ti ti-user-check",
  Languages: "ti ti-language",
  CalendarDays: "ti ti-presentation",
};

export default function ServicesPreview() {
  return (
    // Stays on the brand navy so it blends with the hero; hairline top border
    // keeps the vertical rhythm down the page.
    <section className="py-20 bg-[#0A1628] border-t border-white/[0.05]">
      <div className="section-container">

        <SectionHeading
          title="Our Services"
          subtitle="Comprehensive clinical research solutions from site selection through final reporting."
          centered
          light
        />

        {/* ── SERVICES GRID ──────────────────────────────────────────────────
            1 / 2 / 3 columns at mobile / tablet / desktop. items-stretch +
            h-full on the cards keep every tile the same height per row. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {services.map((service, idx) => (
            <ServiceTiltCard
              key={service.id}
              index={idx}
              title={service.title}
              summary={service.summary}
              iconClass={tablerIconMap[service.icon] ?? "ti ti-circle"}
            />
          ))}
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

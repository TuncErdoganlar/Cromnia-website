/**
 * components/services/ServicesList.tsx
 *
 * Renders all 7 CROMNIA services in a responsive two-column grid.
 * Each item uses the ServiceCard component for full detail display.
 *
 * SEPARATION OF CONCERNS:
 * -----------------------------------------------------------------------
 * - ServicesList → handles the LAYOUT (grid, spacing, heading)
 * - ServiceCard  → handles the DISPLAY of individual service data
 * - data/services.ts → holds the CONTENT (text, icon names)
 *
 * This separation means each piece has exactly one responsibility.
 */

import { services } from "@/data/services";
import ServiceCard from "@/components/services/ServiceCard";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { MessageSquare } from "lucide-react";

/**
 * ServicesList Component
 *
 * Maps over all services and renders them in a 2-column responsive grid.
 */
export default function ServicesList() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="section-container">

        <SectionHeading
          title="What We Offer"
          subtitle={`${services.length} specialized services covering the full spectrum of clinical research needs.`}
          centered
        />

        {/* ── SERVICES GRID ─────────────────────────────────────────────────
            1 column on mobile, 2 columns on large desktop.
            items-start → prevents cards from stretching to fill the row height
                          (cards have their own h-full styling to match within pairs)
        ──────────────────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* ── BOTTOM CTA ─────────────────────────────────────────────────────
            After seeing all services, direct the visitor to get in touch.
        ──────────────────────────────────────────────────────────────────────── */}
        <div className="bg-navy-900 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-white text-2xl font-bold mb-3">
            Need a custom service package?
          </h3>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Our team can design flexible, cost-effective solutions tailored to the
            specific requirements of your clinical research project.
          </p>
          <Button href="/contact" variant="primary" className="inline-flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Discuss Your Project
          </Button>
        </div>

      </div>
    </section>
  );
}

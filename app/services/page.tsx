/**
 * app/services/page.tsx
 *
 * The SERVICES PAGE — rendered at /services
 *
 * This page presents the complete catalog of all 7 CROMNIA services.
 * It is the most content-rich page on the site — visitors arriving here
 * are typically in "evaluation mode" comparing CRO capabilities.
 *
 * PAGE STRUCTURE:
 * -----------------------------------------------------------------------
 * 1. Page Banner — dark header with "Services" title
 * 2. ServicesList — all 7 service cards in a 2-column grid
 */

import type { Metadata } from "next";
import ServicesList from "@/components/services/ServicesList";

export const metadata: Metadata = {
  title: "Services",
  description:
    "CROMNIA offers 7 specialized CRO services: site selection, clinical trial management, " +
    "regulatory affairs, medical writing, site coordinator services, medical translation, " +
    "and investigator meeting organization.",
};

/**
 * ServicesPage Component
 */
export default function ServicesPage() {
  return (
    <>
      {/* Page banner */}
      <div className="bg-navy-900 py-16 md:py-24">
        <div className="section-container">
          <p className="text-sky-400 text-sm font-semibold uppercase tracking-wider mb-3">
            What We Do
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Services
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Comprehensive clinical research solutions covering every phase of your
            trial — from initial site selection through final reporting.
          </p>
        </div>
      </div>

      <ServicesList />
    </>
  );
}

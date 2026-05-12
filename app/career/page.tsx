/**
 * app/career/page.tsx
 *
 * The CAREER PAGE — rendered at /career
 *
 * This page invites potential candidates to join the CROMNIA team.
 * Content is drawn from the CROMNIA Website document's Career section.
 */

import type { Metadata } from "next";
import CareerSection from "@/components/career/CareerSection";

export const metadata: Metadata = {
  title: "Career",
  description:
    "Join the CROMNIA team. We are seeking experienced clinical research professionals — " +
    "CRAs, regulatory specialists, medical writers, and site coordinators.",
};

/**
 * CareerPage Component
 */
export default function CareerPage() {
  return (
    <>
      {/* Page banner */}
      <div className="bg-navy-900 py-16 md:py-24">
        <div className="section-container">
          <p className="text-sky-400 text-sm font-semibold uppercase tracking-wider mb-3">
            Opportunities
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Career
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Become part of a well-established professional team at the forefront
            of clinical research in Turkey.
          </p>
        </div>
      </div>

      <CareerSection />
    </>
  );
}

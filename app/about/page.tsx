/**
 * app/about/page.tsx
 *
 * The ABOUT US PAGE — rendered at /about
 *
 * This page gives visitors a deeper understanding of CROMNIA:
 * who they are, when they were founded, their mission and vision,
 * and the values that drive their work.
 *
 * PAGE STRUCTURE:
 * -----------------------------------------------------------------------
 * 1. Page Banner — dark header with "About Us" title
 * 2. CompanyOverview — founding story + company facts card
 * 3. MissionVision — full mission and vision statements
 * 4. CoreValues — all 14 core values as badges
 */

import type { Metadata } from "next";
import CompanyOverview from "@/components/about/CompanyOverview";
import MissionVision from "@/components/about/MissionVision";
import CoreValues from "@/components/about/CoreValues";

// This `metadata` export overrides the root layout's default title.
// With the template "%s | CROMNIA" from layout.tsx, this becomes "About Us | CROMNIA"
export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about CROMNIA — a Contract Research Organization established in 2009 " +
    "in Izmir, Turkey. Discover our mission, vision, and core values.",
};

/**
 * AboutPage Component
 *
 * Assembles the About page sections in visual order.
 */
export default function AboutPage() {
  return (
    <>
      {/* ── PAGE BANNER ───────────────────────────────────────────────────────
          A simple dark header below the Navbar that announces the page.
          This pattern is consistent across all inner pages (About, Services,
          Career, Contact) — it visually separates them from the home page
          and reinforces navigation context ("you are on the About page").
      ──────────────────────────────────────────────────────────────────────── */}
      <div className="bg-navy-900 py-16 md:py-24">
        <div className="section-container">
          {/* Breadcrumb-style pre-label */}
          <p className="text-sky-400 text-sm font-semibold uppercase tracking-wider mb-3">
            Company
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About Us
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            A Contract Research Organization committed to reliable data,
            ICH/GCP compliance, and flexible service delivery — since 2009.
          </p>
        </div>
      </div>

      {/* Page content sections */}
      <CompanyOverview />
      <MissionVision />
      <CoreValues />
    </>
  );
}

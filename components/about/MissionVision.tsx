/**
 * components/about/MissionVision.tsx
 *
 * Full-width section displaying the complete Mission and Vision statements.
 * Used on the About page for the full-length versions (the home page shows
 * shortened card versions in MissionSection.tsx).
 *
 * DESIGN: Dark navy background with large decorative quotation marks.
 * The oversized quotation mark is a classic typographic design element that
 * signals "this is a formal statement" and adds visual interest to a
 * text-heavy section.
 */

import SectionHeading from "@/components/ui/SectionHeading";
import { Target, Eye } from "lucide-react";

/**
 * MissionVision Component
 *
 * Full Mission and Vision statement section with decorative typography.
 */
export default function MissionVision() {
  return (
    <section className="py-20 bg-navy-900">
      <div className="section-container">

        <SectionHeading
          title="Mission &amp; Vision"
          subtitle="The principles and aspirations that guide every decision at CROMNIA."
          centered
          light
        />

        {/* ── TWO-COLUMN STATEMENT LAYOUT ──────────────────────────────────────
            Side by side on desktop, stacked on mobile.
            Each column features:
            - A large decorative quotation mark (purely visual)
            - An icon + label identifying mission vs. vision
            - The full statement text
        ──────────────────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">

          {/* ── MISSION COLUMN ────────────────────────────────────────────── */}
          <div className="relative bg-white/5 rounded-2xl p-8 border border-white/10">
            {/* Decorative giant quotation mark — purely visual */}
            {/* aria-hidden removes it from accessibility tree (it's not content) */}
            <div
              aria-hidden="true"
              className="absolute top-4 right-6 text-8xl font-serif text-white/5 leading-none select-none pointer-events-none"
            >
              &ldquo;
            </div>

            {/* Icon + label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-sky-400/20 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-sky-400" />
              </div>
              <span className="text-sky-400 font-semibold uppercase tracking-wider text-sm">
                Our Mission
              </span>
            </div>

            {/* Full mission statement — direct quote from company documents */}
            <p className="text-gray-200 leading-relaxed text-lg relative z-10">
              To provide reliable data with the highest quality of our flexible and
              more cost-effective services on time, in accordance with requirements
              of Regulatory Authorities and with provisions of ICH/GCP.
            </p>

            {/* Bottom accent bar */}
            <div className="mt-8 h-0.5 w-24 bg-sky-400 rounded-full" />
          </div>

          {/* ── VISION COLUMN ─────────────────────────────────────────────── */}
          <div className="relative bg-white/5 rounded-2xl p-8 border border-white/10">
            <div
              aria-hidden="true"
              className="absolute top-4 right-6 text-8xl font-serif text-white/5 leading-none select-none pointer-events-none"
            >
              &ldquo;
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-sky-400/20 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-sky-400" />
              </div>
              <span className="text-sky-400 font-semibold uppercase tracking-wider text-sm">
                Our Vision
              </span>
            </div>

            {/* Full vision statement — direct quote from company documents */}
            <p className="text-gray-200 leading-relaxed text-lg relative z-10">
              To develop and provide a wide range of clinical research services —
              from study design through site monitoring and administration to data
              analysis and medical writing — in compliance with clinical research
              requirements and working to the highest international professional
              and ethical standards.
            </p>

            <div className="mt-8 h-0.5 w-24 bg-sky-400 rounded-full" />
          </div>

        </div>
      </div>
    </section>
  );
}

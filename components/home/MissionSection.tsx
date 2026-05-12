/**
 * components/home/MissionSection.tsx
 *
 * Displays CROMNIA's Mission and Vision statements as two side-by-side cards.
 *
 * WHY ON THE HOME PAGE?
 * -----------------------------------------------------------------------
 * Mission and Vision are key trust signals for a professional organization.
 * Placing a condensed version on the home page reinforces credibility
 * immediately, while the full About page provides deeper context.
 *
 * LAYOUT PATTERN:
 * -----------------------------------------------------------------------
 * Two equal-width cards in a responsive grid:
 * - Mobile: stacked vertically (grid-cols-1)
 * - Desktop: side by side (md:grid-cols-2)
 * Each card has a colored top border (brand accent) to visually differentiate them.
 */

import { Target, Eye } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * MissionSection Component
 *
 * Renders two cards showing the Mission and Vision statements.
 */
export default function MissionSection() {
  return (
    // py-20 → 80px top/bottom padding for comfortable breathing room
    // bg-white → clean white background, contrasting with the dark hero above
    <section className="py-20 bg-white">
      <div className="section-container">

        {/* Section header — centered for symmetry with the two equal cards below */}
        <SectionHeading
          title="Who We Are"
          subtitle="Guiding principles behind every clinical research project we manage."
          centered
        />

        {/* ── TWO-COLUMN CARD GRID ────────────────────────────────────────────
            grid-cols-1 → single column on mobile
            md:grid-cols-2 → two columns on desktop (≥768px)
            gap-8 → 32px space between cards
        ────────────────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* ── MISSION CARD ───────────────────────────────────────────────── */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
            {/* Card header row: icon + title */}
            <div className="flex items-center gap-3 mb-6">
              {/* Icon container — small colored square background */}
              <div className="w-12 h-12 bg-navy-50 rounded-xl flex items-center justify-center flex-shrink-0">
                {/* Target icon represents precision and goal-orientation — ideal for "Mission" */}
                <Target className="w-6 h-6 text-navy-500" />
              </div>
              <div>
                {/* Small uppercase label above the heading — visual hierarchy */}
                <p className="text-xs font-semibold text-sky-500 uppercase tracking-wider mb-0.5">
                  Our Mission
                </p>
                <h3 className="text-xl font-bold text-gray-900">
                  What We Do
                </h3>
              </div>
            </div>

            {/* Decorative top accent bar */}
            <div className="w-full h-0.5 bg-gradient-to-r from-sky-400 to-transparent rounded-full mb-6" />

            {/* Mission statement — direct quote from company documents */}
            <p className="text-gray-600 leading-relaxed">
              To provide reliable data with the highest quality of our flexible and
              more cost-effective services on time, in accordance with requirements of
              Regulatory Authorities and with provisions of ICH/GCP.
            </p>
          </div>

          {/* ── VISION CARD ────────────────────────────────────────────────── */}
          <div className="bg-navy-900 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            {/* Card header row */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                {/* Eye icon represents looking forward — perfect for "Vision" */}
                <Eye className="w-6 h-6 text-sky-400" />
              </div>
              <div>
                <p className="text-xs font-semibold text-sky-400 uppercase tracking-wider mb-0.5">
                  Our Vision
                </p>
                <h3 className="text-xl font-bold text-white">
                  Where We&apos;re Going
                </h3>
              </div>
            </div>

            {/* Decorative top accent bar */}
            <div className="w-full h-0.5 bg-gradient-to-r from-sky-400 to-transparent rounded-full mb-6" />

            {/* Vision statement — direct quote from company documents */}
            <p className="text-gray-300 leading-relaxed">
              To develop and provide a wide range of clinical research services —
              from study design through site monitoring and administration to data
              analysis and medical writing — in compliance with clinical research
              requirements and working to the highest international professional
              and ethical standards.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

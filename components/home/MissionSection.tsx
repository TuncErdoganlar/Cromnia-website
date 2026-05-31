/**
 * components/home/MissionSection.tsx
 *
 * Displays CROMNIA's Mission and Vision statements as two side-by-side cards.
 *
 * REDESIGN (STEP 5):
 * -----------------------------------------------------------------------
 * The page used to alternate light/dark sections. Now the whole home page
 * stays in dark navy, with a subtle two-shade rhythm:
 *   - Hero + Services      → #0A1628 (base navy)
 *   - Who We Are + Why Us  → #0D1B2E (a touch lighter)
 * Every section also gets a `border-t border-white/[0.05]` to define
 * itself as a stack. The result is a quiet, modern breathing pattern
 * down the page without breaking the dark theme.
 *
 * The two cards inside switch to translucent-on-navy styling so they
 * read consistently with Services and Why Choose.
 *
 * SERVER COMPONENT — no client state required.
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
    // STEP 5 rhythm: slightly lighter navy panel + hairline top border.
    <section id="explore" className="scroll-mt-16 py-20 bg-[#0D1B2E] border-t border-white/[0.05]">
      <div className="section-container">

        {/* Section header — light variant for the dark panel. */}
        <SectionHeading
          title="Who We Are"
          subtitle="Guiding principles behind every clinical research project we manage."
          centered
          light
        />

        {/* ── TWO-COLUMN CARD GRID ────────────────────────────────────────────
            grid-cols-1 → single column on mobile
            md:grid-cols-2 → two columns on desktop (≥768px)
        ────────────────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* ── MISSION CARD ───────────────────────────────────────────────── */}
          <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8 hover:border-blue-500/40 transition-colors duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-500/15 rounded-xl flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-xs font-semibold text-blue-300 uppercase tracking-wider mb-0.5">
                  Our Mission
                </p>
                <h3 className="text-xl font-bold text-white">
                  What We Do
                </h3>
              </div>
            </div>

            <div className="w-full h-0.5 bg-gradient-to-r from-blue-400 to-transparent rounded-full mb-6" />

            <p className="text-slate-400 leading-relaxed">
              To provide reliable data with the highest quality of our flexible and
              more cost-effective services on time, in accordance with requirements of
              Regulatory Authorities and with provisions of ICH/GCP.
            </p>
          </div>

          {/* ── VISION CARD ────────────────────────────────────────────────── */}
          <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8 hover:border-blue-500/40 transition-colors duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-500/15 rounded-xl flex items-center justify-center flex-shrink-0">
                <Eye className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-xs font-semibold text-blue-300 uppercase tracking-wider mb-0.5">
                  Our Vision
                </p>
                <h3 className="text-xl font-bold text-white">
                  Where We&apos;re Going
                </h3>
              </div>
            </div>

            <div className="w-full h-0.5 bg-gradient-to-r from-blue-400 to-transparent rounded-full mb-6" />

            <p className="text-slate-400 leading-relaxed">
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

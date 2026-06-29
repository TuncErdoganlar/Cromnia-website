/**
 * components/about/CoreValues.tsx
 *
 * Displays CROMNIA's 14 core values as a collection of pill-shaped badges.
 *
 * CONTENT SOURCE:
 * -----------------------------------------------------------------------
 * All 14 values are extracted directly from the CROMNIA Brochure:
 * Knowledge, Experience, Creativity, Collaboration, Support, Efficiency,
 * Precision, Innovation, Time, Cost-effectiveness, Solution, Quality,
 * Customer Satisfaction, Consistency
 *
 * WHY BADGES?
 * -----------------------------------------------------------------------
 * Core values are individual concepts — not a hierarchy, not a numbered list.
 * A flex-wrapped badge layout treats each value as an equal peer, visually
 * communicating that they're all part of the same holistic culture.
 */

import Badge from "@/components/ui/Badge";
import SectionHeading from "@/components/ui/SectionHeading";
import { Sparkles } from "lucide-react";

// The 14 core values extracted from CROMNIA's brochure documents
const coreValues: string[] = [
  "Knowledge",
  "Experience",
  "Creativity",
  "Collaboration",
  "Support",
  "Efficiency",
  "Precision",
  "Innovation",
  "Time",
  "Cost effectiveness",
  "Solution",
  "Quality",
  "Customer Satisfaction",
  "Consistency",
];

/**
 * CoreValues Component
 *
 * Renders all 14 core values as a flex-wrapped collection of Badge chips.
 */
export default function CoreValues() {
  return (
    // bg-gray-50 → light off-white background alternating with the dark navy above
    <section className="py-20 bg-gray-50">
      <div className="section-container">

        {/* Section header */}
        <SectionHeading
          title="Our Core Values"
          subtitle="The principles that guide everything we do at CROMNIA."
          centered
        />

        {/* ── INTRO CALLOUT ─────────────────────────────────────────────────
            A brief framing statement to give context to the values list.
        ──────────────────────────────────────────────────────────────────── */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 text-sky-600 text-sm font-medium bg-sky-50 border border-sky-200 rounded-full px-4 py-2">
            <Sparkles className="w-4 h-4" />
            14 values that define who we are
          </div>
        </div>

        {/* ── BADGES CONTAINER ─────────────────────────────────────────────
            flex flex-wrap → badges flow like text, wrapping to the next line
                              when they run out of horizontal space
            gap-3           → 12px between each badge (both horizontal and vertical)
            justify-center  → centers the entire group horizontally on the page
        ──────────────────────────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-3 justify-center max-w-3xl mx-auto">
          {/*
           * .map() iterates over the coreValues array and renders one Badge per value.
           *
           * `index` is the array index (0, 1, 2, ...) — we use it as the `key` prop.
           * Normally we'd prefer a unique ID, but since these are simple strings
           * that will never be reordered, the index is safe to use here.
           */}
          {coreValues.map((value, index) => (
            <Badge key={index} label={value} />
          ))}
        </div>

        {/* ── BOTTOM QUOTE ─────────────────────────────────────────────────
            A short inspirational quote reinforcing the values.
        ──────────────────────────────────────────────────────────────────── */}
        <div className="mt-16 text-center">
          <blockquote className="text-gray-500 text-sm italic max-w-xl mx-auto">
            &ldquo;Clinical research: objectivity and morality are necessary
            for integrity and accuracy.&rdquo;
          </blockquote>
          <cite className="block mt-2 text-gray-400 text-xs not-italic">— CROMNIA Philosophy</cite>
        </div>

      </div>
    </section>
  );
}

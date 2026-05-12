/**
 * components/home/WhyChooseUs.tsx
 *
 * A dark navy section with 4 key differentiators — the "Why CROMNIA?" section.
 * This is a high-emphasis visual block that reinforces trust and credibility.
 *
 * DESIGN PATTERN: "Feature/Value Highlights"
 * -----------------------------------------------------------------------
 * Using icons + headlines + descriptions in a grid is a common pattern on
 * corporate landing pages. It quickly communicates key selling points
 * in a scannable format — visitors rarely read everything, they scan.
 *
 * The dark navy background creates a strong visual break between the
 * ServicesPreview section (gray-50) and the Footer (navy-800),
 * guiding the user's eye down the page.
 */

import { Award, Clock, TrendingUp, Shield } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

// ── DIFFERENTIATORS DATA ──────────────────────────────────────────────────────
// Defining the data inline in this file (not in data/services.ts) because
// this content is specific to this one component and won't be reused elsewhere.
// If it were needed on multiple pages, we'd extract it to the /data folder.
const differentiators = [
  {
    id: 1,
    icon: Award,  // Storing the component directly (not a string) — no mapping needed
    title: "ICH/GCP Compliant",
    description:
      "Every project we manage adheres to International Council for Harmonisation (ICH) and Good Clinical Practice (GCP) standards — the global benchmark for clinical trial quality.",
  },
  {
    id: 2,
    icon: Clock,
    title: "Established Since 2009",
    description:
      "Over 15 years of deep experience in the Turkish and international CRO market, with a proven track record managing Phase II–IV clinical and observational trials.",
  },
  {
    id: 3,
    icon: TrendingUp,
    title: "Cost-Effective Solutions",
    description:
      "Flexible service models designed to maximize sponsor budget efficiency without compromising data quality, regulatory compliance, or timelines.",
  },
  {
    id: 4,
    icon: Shield,
    title: "Regulatory Expertise",
    description:
      "Direct submission experience with Turkish regulatory authorities (MoH), Local Ethics Committees (LECs), and European regulatory frameworks.",
  },
];

/**
 * WhyChooseUs Component
 *
 * Renders a 4-column grid of key differentiators on a dark navy background.
 */
export default function WhyChooseUs() {
  return (
    // Dark navy background creates high contrast — white text pops strongly
    <section className="py-20 bg-navy-900">
      <div className="section-container">

        {/* Section header — `light` prop switches text to white for dark backgrounds */}
        <SectionHeading
          title="Why Choose CROMNIA"
          subtitle="What sets us apart in the competitive CRO landscape."
          centered
          light  // This passes light={true} — shorthand for boolean props in JSX
        />

        {/* ── 4-COLUMN DIFFERENTIATORS GRID ────────────────────────────────────
            Responsive layout:
            - Mobile: 1 column (stacked)
            - sm (640px+): 2 columns
            - lg (1024px+): 4 columns (full row on desktop)
        ──────────────────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {differentiators.map((item) => {
            // Store the icon component in a local variable with an uppercase name.
            // React requires component names to start with an uppercase letter —
            // otherwise JSX treats them as HTML tag strings (e.g., <div>).
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                // group → enables group-hover for children
                // text-center → centers all content within each cell
                // p-6 → 24px padding inside each cell
                className="group text-center p-6 rounded-xl hover:bg-white/5 transition-colors duration-300"
              >
                {/* ── ICON CIRCLE ───────────────────────────────────────────── */}
                {/* mx-auto → centers the icon container horizontally */}
                <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-5 group-hover:bg-sky-400/20 transition-colors duration-300">
                  <Icon className="w-7 h-7 text-sky-400" />
                </div>

                {/* ── TITLE ─────────────────────────────────────────────────── */}
                <h3 className="text-white font-bold text-lg mb-3">
                  {item.title}
                </h3>

                {/* ── DESCRIPTION ───────────────────────────────────────────── */}
                {/* text-gray-400 → slightly muted for visual hierarchy (title is stronger) */}
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>

              </div>
            );
          })}

        </div>

        {/* ── BOTTOM CTA STRIP ─────────────────────────────────────────────── */}
        {/* A subtle call-to-action nudging users toward the Contact page */}
        <div className="mt-16 pt-12 border-t border-white/10 text-center">
          <p className="text-gray-400 text-sm mb-4">
            Ready to discuss your next clinical research project?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-sky-400 font-semibold hover:text-sky-300 transition-colors group"
          >
            Contact our team
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </a>
        </div>

      </div>
    </section>
  );
}

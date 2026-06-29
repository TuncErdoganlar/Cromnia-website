/**
 * components/home/WhyChooseUs.tsx
 *
 * The "Why Choose CROMNIA" section — 4 trust signals on a dark navy panel.
 *
 * REDESIGN (STEP 4):
 * -----------------------------------------------------------------------
 * - Each card now carries a 2px blue top accent line, a hairline white
 *   border at 7% alpha, and a soft blurred blue glow tucked into the
 *   top-right corner. Together they read as a confident, modern "spec
 *   sheet" tile — different from the lighter Services cards above.
 * - Above each title sits a 32×32 Tabler icon badge, color-matched to the
 *   service:
 *     ICH/GCP        → ti-shield-check
 *     Est. 2009      → ti-calendar-stats
 *     Cost-Effective → ti-coin
 *     Regulatory     → ti-gavel
 * - The 4 cards slide in horizontally from the left (x: -20 → 0) when
 *   they enter the viewport, staggered by ~0.1s each. `once: true` makes
 *   the animation fire only the first time, never on re-scroll.
 *
 * This is a CLIENT COMPONENT (framer-motion + whileInView).
 */
"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

// ── DIFFERENTIATORS DATA ──────────────────────────────────────────────────────
// Each entry pairs a Tabler icon class with a title + supporting copy.
const differentiators = [
  {
    id: 1,
    icon: "ti ti-shield-check",
    title: "ICH/GCP Compliant",
    description:
      "Every project we manage adheres to International Council for Harmonisation (ICH) and Good Clinical Practice (GCP) standards, the global benchmark for clinical trial quality.",
  },
  {
    id: 2,
    icon: "ti ti-calendar-stats",
    title: "Established Since 2009",
    description:
      "Over 15 years of deep experience in the Turkish and international CRO market, with a proven track record managing Phase II–IV clinical and observational trials.",
  },
  {
    id: 3,
    icon: "ti ti-coin",
    title: "Cost Effective Solutions",
    description:
      "Flexible service models designed to maximize sponsor budget efficiency without compromising data quality, regulatory compliance, or timelines.",
  },
  {
    id: 4,
    icon: "ti ti-gavel",
    title: "Regulatory Expertise",
    description:
      "Direct submission experience with Turkish regulatory authorities (MoH), Local Ethics Committees (LECs), and European regulatory frameworks.",
  },
];

/**
 * WhyChooseUs Component
 *
 * Renders a 4-column grid of key differentiators on a slightly elevated
 * navy panel that distinguishes it from the surrounding sections.
 */
export default function WhyChooseUs() {
  return (
    // Using a slightly lighter navy (#0D1B2E) here so the section reads as
    // a separate "layer" from the hero/services blocks. The top border is
    // the subtle 5%-alpha hairline introduced in STEP 5.
    <section className="py-20 bg-[#0D1B2E] border-t border-white/[0.05]">
      <div className="section-container">

        {/* Section header — light variant for the dark panel. */}
        <SectionHeading
          title="Why Choose CROMNIA"
          subtitle="What sets us apart in the competitive CRO landscape."
          centered
          light
        />

        {/* ── 4-COLUMN DIFFERENTIATORS GRID ──────────────────────────────────
            1 / 2 / 4 columns at mobile / tablet / desktop.
        ──────────────────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {differentiators.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                delay: idx * 0.1,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
              }}
              className="relative overflow-hidden border border-white/[0.07] rounded-xl p-6 border-t-2 border-t-blue-600 bg-white/[0.02]"
            >
              {/* ── TOP-RIGHT CORNER GLOW ─────────────────────────────────
                  Absolute-positioned soft blue circle, partially offset
                  off the card so only a slice "leaks" inside — gives a
                  premium specular-light feel without imagery.
              ───────────────────────────────────────────────────────────── */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-6 -right-6 w-24 h-24 rounded-full bg-blue-500/5 blur-2xl"
              />

              {/* ── ICON BADGE ─────────────────────────────────────────────
                  32×32 blue-tinted tile holding the Tabler outline icon.
              ─────────────────────────────────────────────────────────── */}
              <div className="relative w-8 h-8 bg-blue-500/15 rounded-lg flex items-center justify-center mb-4">
                <i className={`${item.icon} text-blue-400 text-lg`} aria-hidden="true" />
              </div>

              {/* ── TITLE ─────────────────────────────────────────────────── */}
              <h3 className="relative text-white font-semibold text-base mb-2">
                {item.title}
              </h3>

              {/* ── DESCRIPTION ───────────────────────────────────────────── */}
              <p className="relative text-slate-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}

        </div>

        {/* ── BOTTOM CTA STRIP ─────────────────────────────────────────────── */}
        <div className="mt-16 pt-12 border-t border-white/10 text-center">
          <p className="text-slate-400 text-sm mb-4">
            Ready to discuss your next clinical research project?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-blue-400 font-semibold hover:text-blue-300 transition-colors group"
          >
            Contact our team
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </a>
        </div>

      </div>
    </section>
  );
}

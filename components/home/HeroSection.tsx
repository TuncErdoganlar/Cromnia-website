/**
 * components/home/HeroSection.tsx
 *
 * The full-viewport hero section — the very first thing visitors see.
 *
 * REDESIGN (STEP 2):
 * -----------------------------------------------------------------------
 * - Subtle CSS grid texture overlay on the navy background (two thin
 *   linear-gradient lines repeating every 24px) for an engineered,
 *   "command-center" feel without distracting from the copy.
 * - A large soft blue orb (radial-gradient) sits in the top-right area,
 *   blurred with blur-3xl. Adds depth without using imagery.
 * - The layout is now left-aligned and capped at max-w-2xl so the eye
 *   tracks naturally from headline → paragraph → CTAs.
 * - A small animated pill badge ("Est. 2009 · ICH/GCP Compliant") sits
 *   above the headline as an authority signal.
 * - Hero elements animate in on mount via framer-motion: badge → heading
 *   → paragraph → buttons, each staggered by 0.15s, sliding up 20px from
 *   below as they fade in.
 *
 * This is now a CLIENT COMPONENT because framer-motion runs in the browser.
 */
"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

// ── ANIMATION VARIANTS ───────────────────────────────────────────────────────
// A single reusable variants object keeps the four animations consistent.
// Each child sets its own `custom` index (0,1,2,3) — that index multiplied
// by 0.15s becomes its delay, giving a clean staggered cascade.
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

/**
 * HeroSection Component
 *
 * Renders the full-screen introductory section of the home page.
 */
export default function HeroSection() {
  return (
    // ── HERO WRAPPER ─────────────────────────────────────────────────────────
    // The background grid texture is applied via an inline `style` so we can
    // express the precise rgba color and 24px tile size required by the spec.
    // The bg color stays the brand navy (#0A1628) to match the design system.
    <section
      className="relative min-h-screen bg-[#0A1628] flex items-center overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(rgba(99,179,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,237,0.04) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >

      {/* ── DECORATIVE BLUE ORB ─────────────────────────────────────────────
          A radial-gradient circle in the top-right corner, blurred heavily,
          gives the hero a soft "spotlight" of brand color without imagery.
          pointer-events-none + aria-hidden keep it purely decorative.
      ──────────────────────────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 w-96 h-96 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(37,99,235,0.20) 0%, transparent 70%)",
        }}
      />

      {/* ── HERO CONTENT ─────────────────────────────────────────────────────
          Left-aligned, capped at max-w-2xl so the line lengths stay
          readable. Sits above the orb via z-10.
      ──────────────────────────────────────────────────────────────────────── */}
      <div className="relative z-10 section-container py-24">
        <div className="max-w-2xl text-left">

          {/* ── ANIMATED PILL BADGE ──────────────────────────────────────────
              Authority badge: founding year + compliance certification.
              Fades in first (i=0).
          ──────────────────────────────────────────────────────────────────── */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="inline-flex items-center border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs rounded-full px-3 py-1 mb-6"
          >
            Est. 2009 · ICH/GCP Compliant
          </motion.div>

          {/* ── MAIN HEADLINE ───────────────────────────────────────────────
              text-display ships a clamp() so the size is fluid across
              breakpoints with no jumpy steps. (i=1)
          ──────────────────────────────────────────────────────────────────── */}
          <motion.h1
            custom={1}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="text-display text-white mb-4"
          >
            CROMNIA
          </motion.h1>

          {/* ── SUB-HEADLINE (tagline) ─────────────────────────────────────── */}
          <motion.p
            custom={1}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="text-lg md:text-xl text-blue-300 font-medium mb-6"
          >
            Reliable Data&nbsp;&nbsp;•&nbsp;&nbsp;Flexible Services&nbsp;&nbsp;•&nbsp;&nbsp;Regulatory Excellence
          </motion.p>

          {/* ── DESCRIPTION PARAGRAPH ────────────────────────────────────────
              The factual mission summary. (i=2)
          ──────────────────────────────────────────────────────────────────── */}
          <motion.p
            custom={2}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="text-slate-400 text-base md:text-lg leading-relaxed mb-10"
          >
            Providing reliable clinical research services for Phase II–IV trials across
            all therapeutic areas in Turkey, in full compliance with ICH/GCP standards
            and the requirements of regulatory authorities.
          </motion.p>

          {/* ── CTA BUTTONS ──────────────────────────────────────────────────
              Two CTAs side-by-side (stacked on small screens). (i=3)
          ──────────────────────────────────────────────────────────────────── */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <Button href="/services" variant="primary" className="min-w-[180px]">
              Our Services
            </Button>
            <Button
              href="/contact"
              variant="secondary"
              className="min-w-[180px] border-white/30 text-white hover:bg-white/10 hover:border-white/50"
            >
              Get in Touch
            </Button>
          </motion.div>

        </div>
      </div>

    </section>
  );
}

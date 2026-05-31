/**
 * components/home/HeroSection.tsx
 *
 * The full-viewport hero — the first thing visitors see.
 *
 * REDESIGN (STEP 6 — "visual impact" pass):
 * -----------------------------------------------------------------------
 * - A <ParticleField> canvas drifts a faint node-network behind the copy
 *   (clinical-data / molecular motif), layered over the existing navy grid
 *   texture + soft blue orb. All three are decorative and aria-hidden.
 * - "CROMNIA" is now an animated gradient wordmark (.text-gradient-brand)
 *   whose highlight sweeps slowly across the brand navy→sky range.
 * - A scroll-cue at the bottom (animated chevron in a mouse outline) invites
 *   the user into the content and links to the first section (#explore).
 * - The mount cascade (badge → heading → tagline → paragraph → CTAs) is kept,
 *   driven by framer-motion's staggered `fadeUp` variants.
 *
 * CLIENT COMPONENT — framer-motion + the canvas child run in the browser.
 */
"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import ParticleField from "@/components/home/ParticleField";

// ── ANIMATION VARIANTS ───────────────────────────────────────────────────────
// One reusable variants object. Each child passes a `custom` index whose value
// × 0.15s becomes its delay, producing a clean staggered cascade on mount.
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

export default function HeroSection() {
  return (
    // ── HERO WRAPPER ─────────────────────────────────────────────────────────
    // Background grid texture is inline so we can express the exact rgba + 24px
    // tile. The base color is the brand navy (#0A1628) to match the system.
    <section
      className="relative min-h-screen bg-[#0A1628] flex items-center overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(rgba(99,179,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,237,0.04) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* ── PARTICLE NODE-NETWORK ────────────────────────────────────────────
          Sits directly on the navy, beneath the orb and copy (z-0). */}
      <ParticleField />

      {/* ── DECORATIVE BLUE ORB ──────────────────────────────────────────────
          Soft radial spotlight of brand color, top-right, heavily blurred. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 w-96 h-96 blur-3xl z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(37,99,235,0.20) 0%, transparent 70%)",
        }}
      />

      {/* ── HERO CONTENT ─────────────────────────────────────────────────────
          Left-aligned, capped at max-w-2xl for readable line lengths. z-10
          lifts it above the orb + particles. */}
      <div className="relative z-10 section-container py-24">
        <div className="max-w-2xl text-left">

          {/* ── ANIMATED PILL BADGE (i=0) ────────────────────────────────── */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="inline-flex items-center border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs rounded-full px-3 py-1 mb-6"
          >
            Est. 2009 · ICH/GCP Compliant
          </motion.div>

          {/* ── MAIN HEADLINE (i=1) ──────────────────────────────────────────
              text-display ships its own fluid clamp(). The gradient wordmark
              gets `pb-2` so descenders/over-tight clipping never crop the glyphs. */}
          <motion.h1
            custom={1}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="text-display mb-4"
          >
            <span className="text-gradient-brand pb-2 inline-block">CROMNIA</span>
          </motion.h1>

          {/* ── SUB-HEADLINE / TAGLINE (i=1) ─────────────────────────────── */}
          <motion.p
            custom={1}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="text-lg md:text-xl text-blue-300 font-medium mb-6"
          >
            Reliable Data&nbsp;&nbsp;•&nbsp;&nbsp;Flexible Services&nbsp;&nbsp;•&nbsp;&nbsp;Regulatory Excellence
          </motion.p>

          {/* ── DESCRIPTION (i=2) ────────────────────────────────────────── */}
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

          {/* ── CTA BUTTONS (i=3) ────────────────────────────────────────── */}
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

      {/* ── SCROLL CUE ───────────────────────────────────────────────────────
          Centered at the bottom: a mouse outline with a chevron that bounces
          (scroll-cue keyframe, frozen under reduced-motion). It's a real anchor
          to the first content section so keyboard users can activate it too.
          Fades in last so it doesn't compete with the headline cascade. */}
      <motion.a
        href="#explore"
        aria-label="Scroll to content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-blue-300/70 hover:text-blue-300 transition-colors
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1628] rounded-full p-1"
      >
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-current pt-1.5">
          <ChevronDown className="h-3 w-3 animate-[scroll-cue_1.8s_ease-in-out_infinite]" />
        </span>
      </motion.a>

    </section>
  );
}

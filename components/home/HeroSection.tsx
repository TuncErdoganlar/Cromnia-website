/**
 * components/home/HeroSection.tsx
 *
 * The full-viewport hero section — the very first thing visitors see.
 * A strong hero section is critical for professional credibility and
 * communicating the company's core value proposition within 3 seconds.
 *
 * DESIGN DECISIONS:
 * -----------------------------------------------------------------------
 * - Full-height (min-h-screen) with a dark gradient background for visual impact
 * - Centered content for maximum focus on the headline
 * - Two CTAs: primary ("Our Services") and secondary ("Get in Touch")
 * - Subtle animated gradient blob for modern visual depth
 * - Location + founding year badge for instant context
 *
 * This is a SERVER COMPONENT — no interactivity needed.
 */

import Button from "@/components/ui/Button";
import { MapPin, ChevronDown, Shield, Award, Clock } from "lucide-react";

/**
 * HeroSection Component
 *
 * Renders the full-screen introductory section of the home page.
 */
export default function HeroSection() {
  return (
    // ── HERO WRAPPER ─────────────────────────────────────────────────────────
    // relative → needed so absolutely-positioned decorative elements work correctly
    // min-h-screen → section is at least 100% of the viewport height
    // bg-gradient → rich dark gradient from deepest navy to a slightly lighter shade
    // overflow-hidden → clips the decorative blob that extends beyond the section
    <section className="relative min-h-screen bg-gradient-to-br from-navy-900 via-navy-900 to-navy-800 flex items-center overflow-hidden">

      {/* ── DECORATIVE BACKGROUND BLOBS ─────────────────────────────────────
          These are purely visual elements — soft, blurred colored circles
          that give the hero a modern, professional feel without being distracting.
          `pointer-events-none` makes them completely click-through.
          `aria-hidden="true"` hides them from screen readers (decorative only).
      ──────────────────────────────────────────────────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top-right glow blob */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl" />
        {/* Bottom-left glow blob */}
        <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-navy-500/20 rounded-full blur-3xl" />
        {/* Center subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-navy-700/20 rounded-full blur-3xl" />
      </div>

      {/* ── HERO CONTENT ─────────────────────────────────────────────────────
          relative z-10 → places content above the decorative blobs
          section-container → our custom class: max-w-7xl centered with responsive padding
          py-24 → 96px vertical padding top and bottom
          text-center → centers all text
      ──────────────────────────────────────────────────────────────────────── */}
      <div className="relative z-10 section-container py-24 text-center">

        {/* ── PRE-HEADING BADGE ─────────────────────────────────────────────
            A small label above the main heading helps orient the visitor
            immediately: "This company is a CRO."
        ──────────────────────────────────────────────────────────────────────── */}
        <div className="inline-flex items-center gap-2 bg-sky-400/10 border border-sky-400/30 text-sky-400 text-sm font-medium px-4 py-2 rounded-full mb-8">
          <Shield className="w-4 h-4" />
          Contract Research Organization
        </div>

        {/* ── MAIN HEADLINE ─────────────────────────────────────────────────
            The company name in the largest possible size — immediately recognizable.
            text-7xl on desktop creates a dominant visual anchor.
        ──────────────────────────────────────────────────────────────────────── */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight mb-6">
          CROMNIA
        </h1>

        {/* ── SUB-HEADLINE ─────────────────────────────────────────────────
            A punchy tagline that communicates the three core brand promises.
            The `•` characters separate ideas without taking up too much space.
        ──────────────────────────────────────────────────────────────────────── */}
        <p className="text-xl md:text-2xl text-sky-400 font-medium mb-6">
          Reliable Data&nbsp;&nbsp;•&nbsp;&nbsp;Flexible Services&nbsp;&nbsp;•&nbsp;&nbsp;Regulatory Excellence
        </p>

        {/* ── DESCRIPTION PARAGRAPH ────────────────────────────────────────
            A brief, factual paragraph drawn directly from CROMNIA's mission.
            max-w-2xl mx-auto limits the line length for readability — very long
            lines are harder to read. mx-auto centers it within the section.
        ──────────────────────────────────────────────────────────────────────── */}
        <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
          Providing reliable clinical research services for Phase II–IV trials across
          all therapeutic areas in Turkey, in full compliance with ICH/GCP standards
          and the requirements of regulatory authorities.
        </p>

        {/* ── CTA BUTTONS ──────────────────────────────────────────────────
            Two buttons in a row (wrapping to column on very small screens):
            1. Primary CTA → takes visitor to the Services page
            2. Secondary CTA → takes visitor to Contact page
            gap-4 → 16px space between buttons
        ──────────────────────────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button href="/services" variant="primary" className="min-w-[180px]">
            Our Services
          </Button>
          <Button href="/contact" variant="secondary" className="min-w-[180px] border-white/30 text-white hover:bg-white/10 hover:border-white/50">
            Get in Touch
          </Button>
        </div>

        {/* ── STATS/TRUST ROW ──────────────────────────────────────────────
            Three quick trust signals in a horizontal row.
            divide-x divides items with a vertical border on desktop.
        ──────────────────────────────────────────────────────────────────────── */}
        <div className="inline-flex flex-col sm:flex-row items-center gap-6 sm:gap-0 sm:divide-x sm:divide-white/20 bg-white/5 border border-white/10 rounded-2xl px-8 py-5 mb-12">
          <div className="flex items-center gap-2 sm:px-6 first:pl-0 last:pr-0">
            <Award className="w-5 h-5 text-sky-400 flex-shrink-0" />
            <span className="text-white text-sm font-medium">ICH/GCP Compliant</span>
          </div>
          <div className="flex items-center gap-2 sm:px-6">
            <Clock className="w-5 h-5 text-sky-400 flex-shrink-0" />
            <span className="text-white text-sm font-medium">Est. 2009</span>
          </div>
          <div className="flex items-center gap-2 sm:px-6">
            <MapPin className="w-5 h-5 text-sky-400 flex-shrink-0" />
            <span className="text-white text-sm font-medium">Izmir, Turkey</span>
          </div>
        </div>

      </div>

      {/* ── SCROLL INDICATOR ─────────────────────────────────────────────────
          A subtle animated chevron at the bottom hints to the user to scroll down.
          absolute bottom-8 centers it horizontally at the bottom of the section.
          animate-bounce → Tailwind's built-in CSS bounce animation
      ──────────────────────────────────────────────────────────────────────── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500" aria-hidden="true">
        <ChevronDown className="w-6 h-6 animate-bounce" />
      </div>

    </section>
  );
}

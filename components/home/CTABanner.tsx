/**
 * components/home/CTABanner.tsx
 *
 * Framer-style bold closing banner. A gradient panel with a confident headline,
 * supporting line, and dual CTAs (primary + secondary). Sits at the bottom of
 * the home page as the final conversion moment.
 */
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-[#0A1628] border-t border-white/[0.05] py-24">
      {/* Background gradient orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/4 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.25), transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 right-1/4 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(167,139,250,0.18), transparent 70%)" }}
      />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-4xl rounded-3xl border border-white/10 bg-gradient-to-br from-[#15243d] via-[#0d1b2e] to-[#0a1628] p-10 md:p-14 text-center shadow-[0_30px_80px_-20px_rgba(37,99,235,0.35)]"
        >
          {/* Hairline accent at top */}
          <div aria-hidden="true" className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />

          <p className="text-eyebrow uppercase text-blue-300/80">Ready when you are</p>
          <h2 className="mt-3 text-h1 text-white">
            Launch your trial with{" "}
            <span className="text-gradient-brand pb-1 inline-block">confidence</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base md:text-lg max-w-2xl mx-auto">
            From feasibility to final report — let&apos;s discuss how CROMNIA can support
            your next clinical research program in Turkey.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-control bg-brand-accent px-6 py-3 text-white font-semibold shadow-[0_10px_30px_-10px_rgba(37,99,235,0.7)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1628] min-w-[200px]"
            >
              Start a project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="mailto:info@cromnia.com"
              className="inline-flex items-center justify-center gap-2 rounded-control border border-white/30 px-6 py-3 text-white font-semibold transition-colors hover:bg-white/10 hover:border-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1628] min-w-[200px]"
            >
              <Mail className="h-4 w-4" />
              Email our team
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

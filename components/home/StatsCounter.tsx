/**
 * components/home/StatsCounter.tsx
 *
 * Framer-style animated metric counters. When the section scrolls into view,
 * each numeric stat counts up from 0 to its target, in sync with a stagger.
 * Sits on the slightly-lighter navy panel (#0D1B2E) so it reads as its own
 * layer between Mission and Services.
 */
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface Stat {
  value: number;          // numeric counter target (animated)
  suffix?: string;        // text after the number
  prefix?: string;        // text before the number
  staticText?: string;    // when set, replaces the animated number entirely
  label: string;
  description: string;
}

const STATS: Stat[] = [
  { value: 15, suffix: "+", label: "Years Experience", description: "Operating in the Turkish CRO market since 2009." },
  { value: 100, suffix: "%", label: "ICH/GCP Compliance", description: "Every trial follows international quality standards." },
  { value: 0, staticText: "II–IV", prefix: "Phase ", label: "Trial Coverage", description: "From early efficacy through post-marketing." },
  { value: 7, suffix: "+", label: "Core Services", description: "Project management to medical writing under one roof." },
];

function AnimatedNumber({ target, duration = 1.6 }: { target: number; duration?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduce) { setVal(target); return; }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / (duration * 1000));
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration, reduce]);

  return <span ref={ref}>{val}</span>;
}

export default function StatsCounter() {
  return (
    <section className="py-20 bg-[#0D1B2E] border-t border-white/[0.05]">
      <div className="section-container">
        <div className="mb-10 text-center">
          <p className="text-eyebrow uppercase text-blue-300/80">By the numbers</p>
          <h2 className="text-h2 text-white mt-1">Proven scale, measurable trust</h2>
          <div aria-hidden="true" className="mx-auto mt-3 h-1 w-16 rounded-pill bg-brand-accent" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 md:p-8 text-center group hover:border-blue-500/40 transition-colors"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-blue-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              <p className="relative text-4xl md:text-5xl font-bold text-gradient-brand pb-1 leading-none">
                {s.prefix}
                {s.staticText ? s.staticText : <AnimatedNumber target={s.value} />}
                {s.suffix}
              </p>
              <p className="relative mt-3 text-white font-semibold text-sm">{s.label}</p>
              <p className="relative mt-1 text-slate-400 text-xs leading-relaxed">{s.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

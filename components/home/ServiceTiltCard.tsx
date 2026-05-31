/**
 * components/home/ServiceTiltCard.tsx
 *
 * A single service card with a pointer-tracking 3D tilt + lift on hover, used
 * by ServicesPreview. The card faces the cursor: moving the mouse across it
 * rotates it a few degrees on X/Y, and a spring smooths the motion so it never
 * feels jittery. On hover it also lifts and its border + icon take the brand blue.
 *
 * HOW THE TILT WORKS:
 * -----------------------------------------------------------------------
 * - `px`/`py` are MotionValues holding the cursor position WITHIN the card,
 *   normalized to a -0.5…0.5 range (0,0 = dead center).
 * - useTransform maps that range to a small rotation (±ROTATE degrees), with
 *   Y mapped to rotateX and X mapped to rotateY (inverted) so the card tips
 *   toward the cursor like a physical panel.
 * - useSpring wraps each rotation so it eases rather than snaps.
 * - `transformPerspective` gives the rotation real depth; the inner content
 *   is pushed forward with translateZ for a subtle parallax.
 *
 * ACCESSIBILITY:
 * -----------------------------------------------------------------------
 * - The whole tile is a single <Link>, so it's one keyboard tab stop with a
 *   visible focus ring; tilt is mouse-only and never required to use the card.
 * - Under prefers-reduced-motion we skip the pointer handlers entirely and
 *   render a flat card (no rotation, no entrance translate).
 *
 * CLIENT COMPONENT — pointer events + framer-motion motion values.
 */
"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import type { MouseEvent } from "react";

const ROTATE = 7; // max degrees of tilt in any direction — subtle, professional
const SPRING = { stiffness: 220, damping: 18, mass: 0.4 };

interface ServiceTiltCardProps {
  title: string;
  summary: string;
  iconClass: string; // Tabler icon class, e.g. "ti ti-map-search"
  index: number;     // position in the grid — drives the staggered entrance
  href?: string;
}

export default function ServiceTiltCard({
  title,
  summary,
  iconClass,
  index,
  href = "/services",
}: ServiceTiltCardProps) {
  const reduceMotion = useReducedMotion();

  // Normalized cursor position within the card (-0.5 … 0.5).
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  // Map cursor position → rotation, then smooth with a spring.
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [ROTATE, -ROTATE]), SPRING);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-ROTATE, ROTATE]), SPRING);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      // ── ENTRANCE: stagger in as the grid scrolls into view ──────────────
      initial={reduceMotion ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        delay: index * 0.08,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }}
      // ── TILT: rotate toward the cursor (mouse only) ─────────────────────
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={
        reduceMotion
          ? undefined
          : { rotateX, rotateY, transformPerspective: 800, transformStyle: "preserve-3d" }
      }
      className="group relative h-full"
    >
      <Link
        href={href}
        className="relative flex h-full flex-col rounded-xl border border-white/[0.07] bg-white/[0.03] p-5 transition-[transform,border-color,box-shadow] duration-200 will-change-transform group-hover:-translate-y-1 group-hover:border-blue-500/40 group-hover:shadow-[0_18px_40px_-18px_rgba(37,99,235,0.55)]"
      >
        {/* Soft brand glow that fades in on hover — adds depth without imagery. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-px right-6 h-16 w-16 rounded-full bg-blue-500/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
        />

        {/* Icon badge — pushed forward in 3D for a subtle parallax on tilt. */}
        <div
          style={reduceMotion ? undefined : { transform: "translateZ(28px)" }}
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/15 transition-colors duration-200 group-hover:bg-blue-500/25"
        >
          <i className={`${iconClass} text-lg text-blue-400`} aria-hidden="true" />
        </div>

        <h3
          style={reduceMotion ? undefined : { transform: "translateZ(18px)" }}
          className="mt-3 mb-1 text-sm font-semibold leading-snug text-white"
        >
          {title}
        </h3>

        <p
          style={reduceMotion ? undefined : { transform: "translateZ(12px)" }}
          className="text-xs leading-relaxed text-slate-400"
        >
          {summary}
        </p>
      </Link>
    </motion.div>
  );
}

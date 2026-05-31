/**
 * components/home/ParticleField.tsx
 *
 * A subtle, performance-conscious "node network" canvas that sits behind the
 * hero copy. Slowly drifting points connect with hairline links whenever two
 * points are near each other — reading as a clinical-data / molecular-graph
 * motif rather than generic confetti particles.
 *
 * WHY A <canvas> AND NOT DOM NODES?
 * -----------------------------------------------------------------------
 * Animating ~60 connected points as DOM elements would thrash layout/paint.
 * A single canvas redrawn with requestAnimationFrame keeps the whole effect
 * on one GPU-compositable layer, so the hero stays at 60fps on a laptop.
 *
 * ACCESSIBILITY & PERFORMANCE GUARDS:
 * -----------------------------------------------------------------------
 * - prefers-reduced-motion: we paint ONE static frame and never start the
 *   animation loop, so motion-sensitive users still get the texture, no movement.
 * - devicePixelRatio aware: crisp on retina without over-drawing on 1x screens.
 * - Particle count scales with viewport area (capped) so phones do less work.
 * - The loop is torn down on unmount and the canvas is purely decorative
 *   (aria-hidden + pointer-events-none).
 *
 * CLIENT COMPONENT — it touches <canvas>, window size, and rAF.
 */
"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

// ── TUNING CONSTANTS ──────────────────────────────────────────────────────────
// Pulled to the top so the look can be adjusted in one place.
const LINK_DISTANCE = 130;   // px: draw a line when two points are closer than this
const MAX_PARTICLES = 70;    // hard cap so large monitors don't overdraw
const PARTICLE_AREA = 16000; // one particle per ~16,000 css px² of hero area
const SPEED = 0.15;          // px per frame drift — deliberately slow/calm

// Brand colors as raw RGB so we can vary the alpha per draw call.
const DOT_RGB = "56, 189, 248";   // sky-400  — the CROMNIA accent
const LINE_RGB = "96, 165, 250";  // blue-400 — links between nodes

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let rafId = 0;

    // (Re)build the canvas backing store + particle set for the current size.
    const setup = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2); // cap at 2x — diminishing returns past that

      // Backing store is sized in device pixels; CSS size stays in layout px.
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // draw in CSS-pixel coordinates

      // Particle count scales with area, capped, never below a sane minimum.
      const count = Math.min(
        MAX_PARTICLES,
        Math.max(20, Math.round((width * height) / PARTICLE_AREA))
      );
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * SPEED * 2,
        vy: (Math.random() - 0.5) * SPEED * 2,
      }));
    };

    // Paint a single frame: links first (behind), then dots on top.
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Links between nearby particles — fade with distance.
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DISTANCE) {
            const alpha = (1 - dist / LINK_DISTANCE) * 0.14; // very faint
            ctx.strokeStyle = `rgba(${LINE_RGB}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // The nodes themselves.
      for (const p of particles) {
        ctx.fillStyle = `rgba(${DOT_RGB}, 0.55)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // Advance positions, bounce gently off the edges, redraw.
    const tick = () => {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x <= 0 || p.x >= width) p.vx *= -1;
        if (p.y <= 0 || p.y >= height) p.vy *= -1;
      }
      draw();
      rafId = requestAnimationFrame(tick);
    };

    setup();

    if (reduceMotion) {
      // Motion-sensitive users: one static frame, no loop.
      draw();
    } else {
      rafId = requestAnimationFrame(tick);
    }

    // Keep the field sized to the hero across resizes / orientation changes.
    const onResize = () => {
      setup();
      if (reduceMotion) draw();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, [reduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

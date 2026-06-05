/**
 * components/home/ServicesScroller.tsx
 *
 * "Our Services" shown as a SIDE-ON view of a laboratory machine: a sample
 * rack of test tubes in a metal housing. Each tube is a service. Nothing
 * spins and there are no buttons — you drag/swipe the rack sideways and it
 * loops forever (reach the end and the first tubes come back around).
 *
 * SIDE VIEW (not top-down):
 * -----------------------------------------------------------------------
 * Every tube is a tall side-profile: colored cap, glass body with a gloss
 * streak, colored liquid in the rounded bottom. The tubes stand in a
 * continuous metal rack inside a labelled machine frame.
 *
 * INFINITE LOOP (the new bit):
 * -----------------------------------------------------------------------
 * The service list is rendered THREE times in a row. We start the scroll in
 * the middle copy, and on every scroll we check the position:
 *   - past the end of the middle copy  → jump back one copy-width
 *   - before the start of the middle copy → jump forward one copy-width
 * Because all three copies are identical, the jump is invisible — so you can
 * drag/swipe endlessly in either direction. (If a mouse drag is in progress
 * we shift its anchor by the same amount so the drag stays smooth.)
 *
 * SCROLLING:
 * -----------------------------------------------------------------------
 * Native horizontal scroll (touch swipe + trackpad) + mouse click-and-drag
 * (only for `pointerType === "mouse"`, so it never fights touch). The region
 * is focusable for keyboard scrolling. Tubes are display-only; the single
 * "View all services" link below is the only clickable element.
 *
 * CLIENT COMPONENT — pointer handlers + scroll repositioning.
 */
"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";

/** Clamp a number into the 0–1 range. */
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

// Map the icon name in data/services.ts → a Tabler webfont class.
const tablerIconMap: Record<string, string> = {
  MapPin: "ti ti-map-search",
  ClipboardList: "ti ti-clipboard-list",
  FileCheck: "ti ti-file-certificate",
  PenLine: "ti ti-pencil",
  Users: "ti ti-user-check",
  Languages: "ti ti-language",
  CalendarDays: "ti ti-presentation",
};

// Per-tube accent (cap + liquid) so the rack reads as color-coded services.
const ACCENTS = ["#38BDF8", "#F59E0B", "#A78BFA", "#34D399", "#FB7185", "#2DD4BF", "#818CF8"];

const COPIES = 3; // render the list 3× for the seamless loop

// The glass body occupies this slice of the 0–262 viewBox. The interactive
// slider maps the cursor's vertical position within this band → liquid level.
const BODY_TOP = 28;
const BODY_BOTTOM = 246;
const BODY_H = BODY_BOTTOM - BODY_TOP;
const VIEWBOX_H = 262;
const KEY_STEP = 0.05; // how much arrow keys nudge the level

/**
 * A single side-profile test tube that doubles as a vertical slider.
 *
 * Press and drag up/down anywhere on the tube to set its liquid level; the
 * level follows the cursor (0 at the rounded bottom, 1 at the top of the
 * glass body). Keyboard: ↑/↓ (or →/←) nudge, Home/End empty/fill.
 *
 * `onAdjust` reports the new 0–1 level to the parent, which owns the state so
 * all three loop copies of the same tube stay in sync. Pointer events stop
 * propagating so adjusting a tube never starts the rack's horizontal drag.
 */
function SampleTube({
  accent,
  fill,
  onAdjust,
  interactive,
  label,
}: {
  accent: string;
  fill: number;
  onAdjust: (fill: number) => void;
  interactive: boolean;
  label: string;
}) {
  const uid = useId().replace(/:/g, "");
  const liquidTop = BODY_BOTTOM - BODY_H * fill;
  const dragging = useRef(false);

  // Cursor Y (screen px) → liquid level (0–1) within the glass body.
  const levelFromEvent = (e: ReactPointerEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const yView = ((e.clientY - r.top) / r.height) * VIEWBOX_H;
    return clamp01((BODY_BOTTOM - yView) / BODY_H);
  };

  const onPointerDown = (e: ReactPointerEvent<SVGSVGElement>) => {
    e.stopPropagation(); // don't let the rack begin a horizontal drag-scroll
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    onAdjust(levelFromEvent(e));
  };
  const onPointerMove = (e: ReactPointerEvent<SVGSVGElement>) => {
    if (!dragging.current) return;
    onAdjust(levelFromEvent(e));
  };
  const endDrag = (e: ReactPointerEvent<SVGSVGElement>) => {
    if (!dragging.current) return;
    dragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };
  const onKeyDown = (e: ReactKeyboardEvent<SVGSVGElement>) => {
    let next: number | null = null;
    if (e.key === "ArrowUp" || e.key === "ArrowRight") next = fill + KEY_STEP;
    else if (e.key === "ArrowDown" || e.key === "ArrowLeft") next = fill - KEY_STEP;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = 1;
    if (next === null) return;
    e.preventDefault();
    e.stopPropagation(); // keep arrow keys from scrolling the rack
    onAdjust(clamp01(next));
  };

  return (
    <svg
      viewBox="0 0 96 262"
      className="h-[230px] w-auto drop-shadow-[0_14px_18px_rgba(0,0,0,0.5)] touch-none cursor-ns-resize
                 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
      role={interactive ? "slider" : undefined}
      aria-hidden={interactive ? undefined : true}
      aria-label={interactive ? `${label} — drag to set liquid level` : undefined}
      aria-orientation={interactive ? "vertical" : undefined}
      aria-valuemin={interactive ? 0 : undefined}
      aria-valuemax={interactive ? 100 : undefined}
      aria-valuenow={interactive ? Math.round(fill * 100) : undefined}
      aria-valuetext={interactive ? `${Math.round(fill * 100)}% full` : undefined}
      tabIndex={interactive ? 0 : undefined}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onKeyDown={interactive ? onKeyDown : undefined}
    >
      <defs>
        <clipPath id={`tube-${uid}`}>
          <rect x={26} y={BODY_TOP} width={44} height={BODY_H} rx={22} />
        </clipPath>
        <linearGradient id={`liq-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity={0.95} />
          <stop offset="100%" stopColor={accent} stopOpacity={0.7} />
        </linearGradient>
        <linearGradient id={`cap-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} />
          <stop offset="100%" stopColor={accent} stopOpacity={0.75} />
        </linearGradient>
      </defs>

      {/* Glass body */}
      <rect x={26} y={BODY_TOP} width={44} height={BODY_H} rx={22} fill="#cfe8ff" fillOpacity={0.07} />

      {/* Liquid (clipped to body → keeps the rounded bottom) */}
      <g clipPath={`url(#tube-${uid})`}>
        <rect x={26} y={liquidTop} width={44} height={BODY_BOTTOM - liquidTop} fill={`url(#liq-${uid})`} />
        <ellipse cx={48} cy={liquidTop} rx={22} ry={4} fill="#ffffff" fillOpacity={0.25} />
      </g>

      {/* Glass outline + gloss streak */}
      <rect x={26} y={BODY_TOP} width={44} height={BODY_H} rx={22} fill="none" stroke="#ffffff" strokeOpacity={0.22} strokeWidth={1.5} />
      <rect x={34} y={44} width={6} height={150} rx={3} fill="#ffffff" fillOpacity={0.22} />

      {/* Cap */}
      <rect x={22} y={8} width={52} height={26} rx={7} fill={`url(#cap-${uid})`} />
      <rect x={22} y={8} width={52} height={7} rx={3.5} fill="#ffffff" fillOpacity={0.35} />
      <rect x={24} y={31} width={48} height={6} rx={3} fill="#000000" fillOpacity={0.18} />
    </svg>
  );
}

// 3D tilt for the info plate (carried over from the old "Coverage" cards).
const PLATE_ROTATE = 8;
const PLATE_SPRING = { stiffness: 200, damping: 20, mass: 0.5 };

/**
 * The label plate below each tube — icon, title, summary.
 *
 * Reuses the multi-layer parallax tilt the old Therapeutic-Areas ("Coverage")
 * cards had: the plate tips toward the cursor and the icon/text float forward
 * on their own layers. Tilt is disabled for reduced-motion users and never
 * fights the rack's horizontal drag (it just reads pointer position; it does
 * not capture the pointer).
 */
function InfoPlate({
  accent,
  iconClass,
  title,
  summary,
}: {
  accent: string;
  iconClass: string;
  title: string;
  summary: string;
}) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [PLATE_ROTATE, -PLATE_ROTATE]), PLATE_SPRING);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-PLATE_ROTATE, PLATE_ROTATE]), PLATE_SPRING);

  // Icon floats forward more than the text (deeper translateZ).
  const iconX = useSpring(useTransform(px, [-0.5, 0.5], [-12, 12]), PLATE_SPRING);
  const iconY = useSpring(useTransform(py, [-0.5, 0.5], [-12, 12]), PLATE_SPRING);
  const textX = useSpring(useTransform(px, [-0.5, 0.5], [-6, 6]), PLATE_SPRING);
  const textY = useSpring(useTransform(py, [-0.5, 0.5], [-6, 6]), PLATE_SPRING);

  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { px.set(0); py.set(0); };

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 700, transformStyle: "preserve-3d" }}
      className="group/plate relative flex w-full flex-1 flex-col items-center overflow-hidden
                 bg-gradient-to-b from-[#141d2c] to-[#0b1320] px-4 pb-8 pt-5 text-center
                 transition-shadow duration-300 hover:shadow-[0_18px_45px_-20px_rgba(37,99,235,0.5)]"
    >
      {/* Accent glow that brightens on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover/plate:opacity-70"
        style={{ background: `radial-gradient(circle, ${accent}66, transparent 70%)` }}
      />

      <motion.span
        style={reduce ? undefined : { x: iconX, y: iconY, translateZ: 50 }}
        className="relative flex h-11 w-11 items-center justify-center rounded-xl ring-1 ring-white/10"
      >
        <span className="absolute inset-0 rounded-xl" style={{ backgroundColor: `${accent}1f` }} />
        <i className={`${iconClass} relative text-xl`} style={{ color: accent }} aria-hidden="true" />
      </motion.span>

      <motion.div style={reduce ? undefined : { x: textX, y: textY, translateZ: 24 }} className="relative">
        <h3 className="mt-3 text-base font-semibold leading-snug text-white">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">{summary}</p>
      </motion.div>
    </motion.div>
  );
}

export default function ServicesScroller() {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startLeft: 0 });

  // Per-service liquid levels (0–1), seeded from data/services.ts and then
  // owned here so the user can drag each tube to a new level. Indexed by the
  // service's position in `services`; all three loop copies share one value.
  const [fills, setFills] = useState<number[]>(() => services.map((s) => s.fill));
  const setFillAt = useCallback((index: number, value: number) => {
    setFills((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }, []);

  // Start the scroll in the middle copy so the loop works both directions.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollLeft = el.scrollWidth / COPIES;
  }, []);

  // Seamless loop: keep the scroll position inside the middle copy band.
  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const w = el.scrollWidth / COPIES;
    if (el.scrollLeft >= 2 * w) {
      el.scrollLeft -= w;
      if (drag.current.active) drag.current.startLeft -= w;
    } else if (el.scrollLeft < w) {
      el.scrollLeft += w;
      if (drag.current.active) drag.current.startLeft += w;
    }
  };

  // Mouse click-and-drag (touch/trackpad use native scrolling).
  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = trackRef.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, startLeft: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    const el = trackRef.current;
    if (!el) return;
    el.scrollLeft = drag.current.startLeft - (e.clientX - drag.current.startX);
  };
  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    drag.current.active = false;
    trackRef.current?.releasePointerCapture(e.pointerId);
  };

  // The service list repeated COPIES times for the infinite loop.
  const loop = Array.from({ length: COPIES }).flatMap((_, c) =>
    services.map((s) => ({ s, copy: c }))
  );

  return (
    <section className="py-20 bg-[#0A1628] border-t border-white/[0.05]">
      <div className="section-container">
        {/* Heading */}
        <div className="mb-10">
          <p className="text-eyebrow uppercase text-blue-300/80">What we do</p>
          <h2 className="text-h2 text-white mt-1">Our Services</h2>
          <div aria-hidden="true" className="mt-3 h-1 w-16 rounded-pill bg-brand-accent" />
          <p className="mt-4 text-sm text-slate-400">
            Drag any tube up or down to set its liquid level — swipe the rack sideways to browse.
          </p>
        </div>

        {/* ── MACHINE HOUSING ──────────────────────────────────────────────── */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#1b2535] to-[#0e1726] shadow-elev-4">
          {/* Header bar — decorative machine chrome (status LEDs only) */}
          <div className="flex items-center justify-end border-b border-white/10 bg-white/[0.03] px-5 py-3">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="h-2 w-2 rounded-full bg-rose-400/70" />
              <span className="h-2 w-2 rounded-full bg-amber-400/70" />
              <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
            </div>
          </div>

          {/* Recessed viewing window */}
          <div className="relative bg-[#070d18] shadow-[inset_0_2px_24px_rgba(0,0,0,0.7)]">
            {/* Edge fade masks */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 sm:w-20 bg-gradient-to-r from-[#070d18] to-transparent" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 sm:w-20 bg-gradient-to-l from-[#070d18] to-transparent" />

            {/* Draggable, infinitely-looping rack */}
            <div
              ref={trackRef}
              role="region"
              aria-label="Services sample rack — scroll horizontally to browse; drag a tube up or down to set its level"
              tabIndex={0}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerLeave={endDrag}
              onScroll={onScroll}
              className="flex overflow-x-auto pt-10
                         cursor-grab active:cursor-grabbing select-none
                         [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-accent"
            >
              {loop.map(({ s, copy }, i) => {
                const serviceIndex = i % services.length;
                const accent = ACCENTS[serviceIndex % ACCENTS.length];
                const iconClass = tablerIconMap[s.icon] ?? "ti ti-circle";
                // Live, user-adjustable liquid level (drag the tube to change it).
                const fill = fills[serviceIndex];
                return (
                  <div
                    key={`${copy}-${s.id}`}
                    aria-hidden={copy > 0} // only the first copy is read by screen readers
                    className="relative flex w-[300px] flex-shrink-0 flex-col items-center px-4 sm:w-[340px]"
                  >
                    {/* Tube — drag up/down to set its liquid level */}
                    <div className="relative z-10">
                      <SampleTube
                        accent={accent}
                        fill={fill}
                        onAdjust={(f) => setFillAt(serviceIndex, f)}
                        interactive={copy === 0}
                        label={s.title}
                      />
                    </div>

                    {/* Continuous rack shelf the tube stands in */}
                    <div className="relative -mt-8 h-8 w-full bg-gradient-to-b from-[#3a4760] to-[#1d2740]">
                      <div className="absolute inset-x-0 top-0 h-px bg-white/15" />
                      <div className="absolute left-1/2 top-2 h-3.5 w-16 -translate-x-1/2 rounded-full bg-black/45 shadow-[inset_0_2px_3px_rgba(0,0,0,0.6)]" />
                    </div>

                    {/* Label plate below the shelf — parallax-tilt info card */}
                    <InfoPlate accent={accent} iconClass={iconClass} title={s.title} summary={s.summary} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* View-all link */}
        <div className="mt-6 flex justify-end">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 transition-colors hover:text-blue-300
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1628] rounded-control"
          >
            View all services
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

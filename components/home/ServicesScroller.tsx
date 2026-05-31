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

import { useEffect, useId, useRef, type PointerEvent as ReactPointerEvent } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";

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

/** A single side-profile test tube. `fill` = liquid level (0–1) of the body. */
function SampleTube({ accent, fill }: { accent: string; fill: number }) {
  const uid = useId().replace(/:/g, "");
  const bodyTop = 28;
  const bodyBottom = 246;
  const bodyH = bodyBottom - bodyTop;
  const liquidTop = bodyBottom - bodyH * fill;

  return (
    <svg
      viewBox="0 0 96 262"
      className="h-[230px] w-auto drop-shadow-[0_14px_18px_rgba(0,0,0,0.5)]"
      aria-hidden="true"
    >
      <defs>
        <clipPath id={`tube-${uid}`}>
          <rect x={26} y={bodyTop} width={44} height={bodyH} rx={22} />
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
      <rect x={26} y={bodyTop} width={44} height={bodyH} rx={22} fill="#cfe8ff" fillOpacity={0.07} />

      {/* Liquid (clipped to body → keeps the rounded bottom) */}
      <g clipPath={`url(#tube-${uid})`}>
        <rect x={26} y={liquidTop} width={44} height={bodyBottom - liquidTop} fill={`url(#liq-${uid})`} />
        <ellipse cx={48} cy={liquidTop} rx={22} ry={4} fill="#ffffff" fillOpacity={0.25} />
      </g>

      {/* Glass outline + gloss streak */}
      <rect x={26} y={bodyTop} width={44} height={bodyH} rx={22} fill="none" stroke="#ffffff" strokeOpacity={0.22} strokeWidth={1.5} />
      <rect x={34} y={44} width={6} height={150} rx={3} fill="#ffffff" fillOpacity={0.22} />

      {/* Cap */}
      <rect x={22} y={8} width={52} height={26} rx={7} fill={`url(#cap-${uid})`} />
      <rect x={22} y={8} width={52} height={7} rx={3.5} fill="#ffffff" fillOpacity={0.35} />
      <rect x={24} y={31} width={48} height={6} rx={3} fill="#000000" fillOpacity={0.18} />
    </svg>
  );
}

export default function ServicesScroller() {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startLeft: 0 });

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
              aria-label="Services sample rack — scroll horizontally, loops infinitely"
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
                const accent = ACCENTS[(i % services.length) % ACCENTS.length];
                const iconClass = tablerIconMap[s.icon] ?? "ti ti-circle";
                const fill = 0.42 + (((i % services.length) * 7) % 5) * 0.06;
                return (
                  <div
                    key={`${copy}-${s.id}`}
                    aria-hidden={copy > 0} // only the first copy is read by screen readers
                    className="relative flex w-[300px] flex-shrink-0 flex-col items-center px-4 sm:w-[340px]"
                  >
                    {/* Tube */}
                    <div className="relative z-10">
                      <SampleTube accent={accent} fill={fill} />
                    </div>

                    {/* Continuous rack shelf the tube stands in */}
                    <div className="relative -mt-8 h-8 w-full bg-gradient-to-b from-[#3a4760] to-[#1d2740]">
                      <div className="absolute inset-x-0 top-0 h-px bg-white/15" />
                      <div className="absolute left-1/2 top-2 h-3.5 w-16 -translate-x-1/2 rounded-full bg-black/45 shadow-[inset_0_2px_3px_rgba(0,0,0,0.6)]" />
                    </div>

                    {/* Label plate below the shelf */}
                    <div className="flex w-full flex-1 flex-col items-center bg-gradient-to-b from-[#141d2c] to-[#0b1320] px-4 pb-8 pt-5 text-center">
                      <span
                        className="flex h-11 w-11 items-center justify-center rounded-xl"
                        style={{ backgroundColor: `${accent}1f` }}
                      >
                        <i className={`${iconClass} text-xl`} style={{ color: accent }} aria-hidden="true" />
                      </span>
                      <h3 className="mt-3 text-base font-semibold leading-snug text-white">{s.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.summary}</p>
                    </div>
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

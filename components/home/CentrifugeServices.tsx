/**
 * components/home/CentrifugeServices.tsx
 *
 * An interactive "Our Services" section drawn as a TOP-DOWN view into a
 * laboratory centrifuge. The user spins the rotor; it accelerates, blurs at
 * max RPM (the colored fluids smear into a glowing ring), decelerates, and
 * lands with the chosen service aligned under the reader at 12 o'clock. The
 * actual service copy is read out in a separate "control panel" so text is
 * never spinning.
 *
 * HOW THE PHYSICS WORK (the interesting part):
 * -----------------------------------------------------------------------
 * The whole motion is ONE `animate(rotation, target, …)` on a MotionValue
 * with an accelerate→decelerate easing curve. Everything else is *derived*
 * from that single value, which keeps it physically consistent:
 *   - `useVelocity(rotation)` → live angular velocity (deg/s).
 *   - blur(px) is a function of |velocity| → sharp at rest, blurred at speed.
 *   - the conic "fluid" glow-ring opacity is a function of |velocity| too.
 *   - the RPM readout in the control panel reads |velocity|.
 * Because blur/glow/RPM all come from velocity, they rise and fall on their
 * own — no separate timelines to keep in sync.
 *
 * LANDING ALIGNMENT:
 * -----------------------------------------------------------------------
 * Arms sit at angle `i * 360/N` clockwise from the top. To park arm `i` under
 * the top reader we animate to `(next multiple of 360) + whole spins +
 * ((360 - armAngle) % 360)`, so it always overshoots with full turns then
 * settles exactly on target.
 *
 * ACCESSIBILITY:
 * -----------------------------------------------------------------------
 * - Each tube is a real, focusable control (role="button", Enter/Space) with
 *   an aria-label; the control panel is the accessible source of truth and is
 *   announced via aria-live when the selection changes.
 * - prefers-reduced-motion: no spin, no blur — selecting a service snaps the
 *   rotor to its parked angle instantly. The colored chips + tubes still work.
 *
 * CLIENT COMPONENT — pointer events + framer-motion motion values.
 */
"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  animate,
  useMotionValue,
  useVelocity,
  useTransform,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  AnimatePresence,
  type MotionValue,
  type AnimationPlaybackControls,
} from "framer-motion";
import Link from "next/link";
import {
  ClipboardList,
  FileCheck2,
  BarChart3,
  PenLine,
  MapPin,
  Languages,
  Play,
  ArrowRight,
  Check,
  type LucideIcon,
} from "lucide-react";

// ── SERVICE DATA ────────────────────────────────────────────────────────────
// Six color-coded "samples" (4–6 arms keeps the rotor legible). Each color is
// the tube cap + fluid; the set also feeds the blended glow-ring. Swap/extend
// this array freely — the geometry recomputes from SERVICES.length.
type Service = {
  title: string;
  tag: string;        // short label for the colored chip
  blurb: string;
  points: string[];
  color: string;      // cap + fluid color (hex)
  Icon: LucideIcon;
};

const SERVICES: Service[] = [
  {
    title: "Clinical Trial Management",
    tag: "Trials",
    blurb:
      "End-to-end management of Phase II–IV clinical and observational studies across every therapeutic area.",
    points: ["SQV · SIV · SMV · SCOV site visits", "TMF setup & maintenance", "Vendor & IP logistics"],
    color: "#38BDF8",
    Icon: ClipboardList,
  },
  {
    title: "Regulatory Affairs",
    tag: "Regulatory",
    blurb:
      "Submissions and lifecycle compliance with the Ministry of Health and Local Ethics Committees.",
    points: ["MoH & LEC applications", "IP import/export licenses", "SUSAR & safety reporting"],
    color: "#F59E0B",
    Icon: FileCheck2,
  },
  {
    title: "Biostatistics & Data",
    tag: "Data",
    blurb:
      "Statistical design and data management that turn raw trial data into defensible conclusions.",
    points: ["Statistical analysis plans", "CRF design & EDC build", "Query management"],
    color: "#A78BFA",
    Icon: BarChart3,
  },
  {
    title: "Medical Writing",
    tag: "Writing",
    blurb:
      "Clinical documentation produced with investigators and scientists, from protocol to publication.",
    points: ["Protocols & FSRs", "Informed Consent Forms", "Congress abstracts"],
    color: "#34D399",
    Icon: PenLine,
  },
  {
    title: "Site Selection & Feasibility",
    tag: "Feasibility",
    blurb:
      "Data-driven evaluation of investigator sites to find the fastest path to recruitment.",
    points: ["Eligible-patient mapping", "GCP-training review", "Infrastructure assessment"],
    color: "#FB7185",
    Icon: MapPin,
  },
  {
    title: "Medical Translation",
    tag: "Translation",
    blurb:
      "Physician-led translation of regulated documents with clinical precision and on-time delivery.",
    points: ["SmPC · PIL · labelling", "ICF back-translation", "Protocol & IB translation"],
    color: "#2DD4BF",
    Icon: Languages,
  },
];

// ── GEOMETRY ────────────────────────────────────────────────────────────────
// Everything is drawn in a 400×400 viewBox, centered on (200, 200).
const VIEW = 400;
const C = VIEW / 2;          // center (200)
const R_BUCKET = 120;        // distance from center to each tube
const N = SERVICES.length;
const armAngle = (i: number) => (i * 360) / N; // degrees clockwise from top

// Conic gradient (the blended "fluids") built from the sample colors.
const conicStops =
  SERVICES.map((s, i) => `${s.color} ${Math.round((i * 360) / N)}deg`).join(", ") +
  `, ${SERVICES[0].color} 360deg`;

// Small live RPM readout — isolated so only it re-renders during a spin.
function RpmReadout({ velocity }: { velocity: MotionValue<number> }) {
  const [rpm, setRpm] = useState(0);
  // |deg/s| → rpm is /6; we scale ×8 so peak reads like a real lab centrifuge.
  useMotionValueEvent(velocity, "change", (v) => {
    setRpm(Math.round((Math.abs(v) / 6) * 8));
  });
  return <>{rpm.toLocaleString()}</>;
}

export default function CentrifugeServices() {
  const reduce = useReducedMotion();

  // The single source of truth for the whole machine.
  const rotation = useMotionValue(0);
  const velocity = useVelocity(rotation);

  // Derived visuals (all functions of velocity → physically consistent).
  const blurPx = useTransform(velocity, (v) => Math.min(4, Math.abs(v) / 350));
  const rotorFilter = useMotionTemplate`blur(${blurPx}px)`;
  const glowOpacity = useTransform(velocity, (v) => Math.min(0.85, Math.abs(v) / 1400));

  const [active, setActive] = useState(0);          // service shown in the panel
  const [hovered, setHovered] = useState<number | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [landed, setLanded] = useState(0);          // rotation mod 360 at rest (for tooltip placement)
  const controls = useRef<AnimationPlaybackControls | null>(null);

  // Stop any in-flight animation if the component unmounts mid-spin.
  useEffect(() => () => controls.current?.stop(), []);

  // Spin the rotor so service `i` parks under the top reader, then read it out.
  const spinTo = (i: number) => {
    if (spinning) return;

    if (reduce) {
      // Reduced motion: snap, no spin/blur.
      const parked = (360 - armAngle(i)) % 360;
      rotation.set(parked);
      setLanded(parked);
      setActive(i);
      return;
    }

    setSpinning(true);
    const current = rotation.get();
    const base = Math.ceil(current / 360) * 360;          // next whole turn ≥ current
    const fullSpins = 360 * (4 + Math.floor(Math.random() * 2)); // 4–5 turns of drama
    const offset = (360 - armAngle(i)) % 360;             // park arm i at top
    const target = base + fullSpins + offset;

    controls.current = animate(rotation, target, {
      duration: 4.2,
      ease: [0.33, 0.0, 0.12, 1], // quick spin-up, long graceful wind-down
      onComplete: () => {
        setActive(i);
        setSpinning(false);
        setLanded(target % 360);
        // Keep the underlying value small; .jump() sets it WITHOUT spiking velocity
        // (so no phantom blur flash). rotate(target) ≡ rotate(target % 360) visually.
        rotation.jump(target % 360);
      },
    });
  };

  // "START CENTRIFUGE" → spin to a random *different* service.
  const runSequence = () => {
    if (spinning || N < 2) return;
    let next = active;
    while (next === active) next = Math.floor(Math.random() * N);
    spinTo(next);
  };

  // Tooltip placement: angle of the hovered arm at the current resting orientation.
  // Container is a square, so positioning in % maps to a perfect circle.
  const showTip = hovered !== null && !spinning;
  const tipRad = (((hovered ?? 0) * 360) / N + landed) * (Math.PI / 180);
  const tipLeft = 50 + 46 * Math.sin(tipRad);
  const tipTop = 50 - 46 * Math.cos(tipRad);

  const activeService = SERVICES[active];

  return (
    <section className="py-20 bg-[#0A1628] border-t border-white/[0.05]">
      <div className="section-container">
        {/* Heading (kept inline to pair an eyebrow with the title) */}
        <div className="mb-12 text-center">
          <p className="text-eyebrow uppercase text-blue-300/80">Interactive</p>
          <h2 className="text-h2 text-white mt-1">Our Services</h2>
          <div aria-hidden="true" className="mt-3 h-1 w-16 rounded-pill bg-brand-accent mx-auto" />
          <p className="mt-4 text-body-lg text-content-on-inverted max-w-2xl mx-auto">
            Load the rotor and run the centrifuge — each sample is a service. It spins up,
            then settles on a service and reports out on the control panel.
          </p>
        </div>

        {/* Machine (left) + Control panel (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* ── CENTRIFUGE ──────────────────────────────────────────────────── */}
          <div className="relative mx-auto w-full max-w-[460px] aspect-square select-none">
            <svg viewBox={`0 0 ${VIEW} ${VIEW}`} className="absolute inset-0 h-full w-full" role="presentation">
              <defs>
                {/* Metal/plastic casing */}
                <radialGradient id="cf-casing" cx="34%" cy="28%" r="85%">
                  <stop offset="0%" stopColor="#46566f" />
                  <stop offset="45%" stopColor="#283449" />
                  <stop offset="100%" stopColor="#0c1422" />
                </radialGradient>
                {/* Dark inset chamber bowl */}
                <radialGradient id="cf-bowl" cx="50%" cy="42%" r="68%">
                  <stop offset="0%" stopColor="#1a2438" />
                  <stop offset="100%" stopColor="#060b15" />
                </radialGradient>
                {/* Brushed-metal spoke */}
                <linearGradient id="cf-spoke" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#67768f" />
                  <stop offset="50%" stopColor="#3a4760" />
                  <stop offset="100%" stopColor="#212b3f" />
                </linearGradient>
                {/* Central rotor hub */}
                <radialGradient id="cf-hub" cx="40%" cy="34%" r="72%">
                  <stop offset="0%" stopColor="#8395ad" />
                  <stop offset="55%" stopColor="#3c4860" />
                  <stop offset="100%" stopColor="#1a2235" />
                </radialGradient>
                {/* Metal bucket socket */}
                <radialGradient id="cf-bucket" cx="38%" cy="32%" r="75%">
                  <stop offset="0%" stopColor="#6b7b95" />
                  <stop offset="60%" stopColor="#313c52" />
                  <stop offset="100%" stopColor="#161d2c" />
                </radialGradient>
                {/* Inner shadow → makes the bowl look deep/recessed */}
                <filter id="cf-inset" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="9" result="blur" />
                  <feComposite operator="out" in="SourceGraphic" in2="blur" result="inverse" />
                  <feFlood floodColor="#000000" floodOpacity="0.75" />
                  <feComposite operator="in" in2="inverse" result="shadow" />
                  <feComposite operator="over" in="shadow" in2="SourceGraphic" />
                </filter>
              </defs>

              {/* Outer casing + lid rim bevel */}
              <circle cx={C} cy={C} r={196} fill="url(#cf-casing)" />
              <circle cx={C} cy={C} r={188} fill="none" stroke="#0a1220" strokeWidth={6} />
              <circle cx={C} cy={C} r={183} fill="none" stroke="#ffffff" strokeOpacity={0.06} strokeWidth={2} />

              {/* Chamber bowl (recessed) */}
              <circle cx={C} cy={C} r={158} fill="url(#cf-bowl)" filter="url(#cf-inset)" />
              <circle cx={C} cy={C} r={158} fill="none" stroke="#000000" strokeOpacity={0.5} strokeWidth={2} />
              <circle cx={C} cy={C} r={148} fill="none" stroke="#ffffff" strokeOpacity={0.04} strokeWidth={1} />

              {/* ── SPINNING ROTOR ──────────────────────────────────────────
                  Rotated by the live `rotation` value (CSS transform about the
                  bbox center) and CSS-blurred from velocity. Arms are drawn in a
                  canonical "up" orientation then rotated into place by armAngle. */}
              <motion.g
                style={{
                  rotate: rotation,
                  filter: rotorFilter,
                  transformBox: "fill-box",
                  transformOrigin: "center",
                }}
              >
                {/* Arms + tubes */}
                {SERVICES.map((s, i) => {
                  const isLit = hovered === i || active === i;
                  return (
                    <g key={i} transform={`rotate(${armAngle(i)} ${C} ${C})`}>
                      {/* Arm spoke (hub → bucket) */}
                      <rect
                        x={C - 6}
                        y={C - R_BUCKET + 14}
                        width={12}
                        height={R_BUCKET - 14 - 30}
                        rx={6}
                        fill="url(#cf-spoke)"
                      />

                      {/* Interactive tube/bucket */}
                      <g
                        role="button"
                        tabIndex={0}
                        aria-label={`${s.title}. Run the centrifuge to this service.`}
                        onMouseEnter={() => !spinning && setHovered(i)}
                        onMouseLeave={() => setHovered(null)}
                        onFocus={() => !spinning && setHovered(i)}
                        onBlur={() => setHovered(null)}
                        onClick={() => spinTo(i)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            spinTo(i);
                          }
                        }}
                        className="cursor-pointer outline-none"
                        style={{ pointerEvents: spinning ? "none" : "auto" }}
                      >
                        {/* highlight halo (hover / active / focus) */}
                        <circle
                          cx={C}
                          cy={C - R_BUCKET}
                          r={28}
                          fill="none"
                          stroke={s.color}
                          strokeWidth={2.5}
                          style={{
                            opacity: isLit ? 0.9 : 0,
                            transition: "opacity 200ms ease",
                          }}
                        />
                        {/* metal socket */}
                        <circle cx={C} cy={C - R_BUCKET} r={24} fill="url(#cf-bucket)" stroke="#0b1220" strokeWidth={1.5} />
                        {/* glass tube body */}
                        <circle cx={C} cy={C - R_BUCKET} r={19} fill="#cfe8ff" fillOpacity={0.08} stroke="#ffffff" strokeOpacity={0.18} />
                        {/* fluid */}
                        <circle cx={C} cy={C - R_BUCKET} r={15} fill={s.color} fillOpacity={0.5} />
                        {/* colored cap ring */}
                        <circle cx={C} cy={C - R_BUCKET} r={20} fill="none" stroke={s.color} strokeWidth={5} />
                        {/* glossy specular dot on the cap */}
                        <ellipse cx={C - 6} cy={C - R_BUCKET - 6} rx={5} ry={3} fill="#ffffff" fillOpacity={0.6} />
                      </g>
                    </g>
                  );
                })}

                {/* Hub + spindle nut */}
                <circle cx={C} cy={C} r={34} fill="url(#cf-hub)" stroke="#0b1220" strokeWidth={2} />
                {Array.from({ length: 6 }).map((_, k) => {
                  const a = (k * 60 * Math.PI) / 180;
                  return (
                    <circle
                      key={k}
                      cx={C + 23 * Math.sin(a)}
                      cy={C - 23 * Math.cos(a)}
                      r={2.4}
                      fill="#0b1220"
                      fillOpacity={0.7}
                    />
                  );
                })}
                <circle cx={C} cy={C} r={13} fill="#2a3346" stroke="#0b1220" strokeWidth={1.5} />
                <circle cx={C - 3} cy={C - 3} r={4} fill="#8aa0bd" fillOpacity={0.7} />
              </motion.g>

              {/* ── TOP READER MARKER (static — does not spin) ──────────────── */}
              <g aria-hidden="true">
                <path d={`M ${C - 9} 16 L ${C + 9} 16 L ${C} 32 Z`} fill="#38BDF8" />
                <line x1={C} y1={34} x2={C} y2={48} stroke="#38BDF8" strokeOpacity={0.5} strokeWidth={2} />
              </g>
            </svg>

            {/* ── BLENDED FLUID GLOW-RING (HTML overlay) ─────────────────────
                A blurred conic ring of the sample colors. Its opacity tracks
                velocity, so it only blooms at high RPM. Purely decorative. */}
            <motion.div
              aria-hidden="true"
              style={{ opacity: glowOpacity }}
              className="pointer-events-none absolute inset-0"
            >
              <div
                className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background: `conic-gradient(from 0deg, ${conicStops})`,
                  WebkitMaskImage:
                    "radial-gradient(circle, transparent 52%, #000 54%, #000 66%, transparent 69%)",
                  maskImage:
                    "radial-gradient(circle, transparent 52%, #000 54%, #000 66%, transparent 69%)",
                  filter: "blur(9px)",
                  mixBlendMode: "screen",
                }}
              />
            </motion.div>

            {/* ── HOVER TOOLTIP (HTML overlay) ───────────────────────────────
                Floats next to the hovered tube at its current resting angle. */}
            <AnimatePresence>
              {showTip && hovered !== null && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                  className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-[#0b1626]/95 px-3 py-1.5 text-xs font-medium text-white shadow-elev-3 backdrop-blur"
                  style={{ left: `${tipLeft}%`, top: `${tipTop}%` }}
                >
                  <span
                    className="mr-2 inline-block h-2 w-2 rounded-full align-middle"
                    style={{ backgroundColor: SERVICES[hovered].color }}
                  />
                  {SERVICES[hovered].title}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── CONTROL PANEL DASHBOARD ─────────────────────────────────────── */}
          <div className="rounded-panel border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8 shadow-elev-3">
            {/* Status bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    spinning ? "bg-amber-400 animate-pulse" : "bg-emerald-400"
                  }`}
                />
                <span className="text-slate-300">{spinning ? "Spinning" : "Ready"}</span>
              </div>
              <div className="font-mono text-xs text-slate-400">
                <span className="text-blue-300">
                  <RpmReadout velocity={velocity} />
                </span>{" "}
                RPM
              </div>
            </div>

            {/* Active service readout (announced to screen readers) */}
            <div aria-live="polite" className="min-h-[260px] pt-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${activeService.color}22` }}
                    >
                      <activeService.Icon className="h-5 w-5" style={{ color: activeService.color }} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-mono text-xs text-slate-500">
                        SAMPLE {String(active + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
                      </p>
                      <h3 className="text-lg font-semibold text-white">{activeService.title}</h3>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-slate-400">{activeService.blurb}</p>

                  <ul className="mt-4 space-y-2">
                    {activeService.points.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-slate-300">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: activeService.color }} aria-hidden="true" />
                        {p}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href="/services"
                      className="inline-flex items-center gap-2 rounded-control bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-500
                                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1628]"
                    >
                      Service details
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 rounded-control border border-white/20 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10
                                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1628]"
                    >
                      Request a proposal
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Sample selector chips */}
            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="mb-3 font-mono text-xs uppercase tracking-wider text-slate-500">Load sample</p>
              <div className="flex flex-wrap gap-2">
                {SERVICES.map((s, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => spinTo(i)}
                    disabled={spinning}
                    aria-pressed={active === i}
                    aria-label={`Run centrifuge to ${s.title}`}
                    className="group inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1628]"
                    style={{
                      borderColor: active === i ? s.color : "rgba(255,255,255,0.12)",
                      color: active === i ? s.color : "#cbd5e1",
                      backgroundColor: active === i ? `${s.color}1a` : "transparent",
                    }}
                  >
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
                    {s.tag}
                  </button>
                ))}
              </div>
            </div>

            {/* START button */}
            <button
              type="button"
              onClick={runSequence}
              disabled={spinning}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-control bg-gradient-to-r from-blue-600 to-sky-500 px-5 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-elev-2 transition-all hover:shadow-elev-3 disabled:cursor-not-allowed disabled:opacity-70
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1628]"
            >
              <Play className="h-4 w-4 fill-current" aria-hidden="true" />
              {spinning ? "Spinning…" : "Start centrifuge"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

# feat(home): glassmorphism navbar, motion-driven hero, dark icon-card sections

## Summary

End-to-end UI overhaul of the CROMNIA home page. The hero, services preview,
and "why choose us" sections are redesigned around a unified dark navy theme
with subtle two-tone section rhythm, Tabler outline iconography, and
`framer-motion` entrance animations. The navbar gains a glassmorphism effect
on scroll and a dedicated "Get in Touch" CTA, replacing the standalone
Contact link.

No behavioral changes outside the home page — About / Services / Career /
Contact routes are untouched.

## Why

The previous home page alternated white and gray sections with simple lucide
icons and no motion. The result was static, slightly dated, and didn't match
the rigor we want to signal as a contract research organization. This pass
brings the landing experience in line with modern B2B/biotech sites:
calm dark canvas, fluid typography, restrained motion, and clear visual
hierarchy from hero → services → trust signals.

## What changed (by file)

### `app/layout.tsx`
- Loads the **Tabler Icons webfont** from jsDelivr in `<head>` so the
  `<i className="ti ti-..." />` syntax works site-wide.

### `package.json`
- Adds `framer-motion ^11.3.0` as a runtime dependency. **Run `npm install`
  after pulling this branch.**

### `components/layout/Navbar.tsx`
- New `useEffect` scroll listener flips `isScrolled` past 8px.
- When scrolled: `bg-[#0A1628]/70 backdrop-blur-[12px] border-b
  border-white/[0.08]`; at top: stays fully opaque.
- Replaced the `FlaskConical` logo block with a 6px `bg-blue-500
  rounded-full` brand dot to the left of the wordmark.
- Removed `Contact` from `navLinks`. Added a pill-shaped CTA on the right:
  `rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm px-4 py-1.5
  transition-colors`.
- Mobile menu still surfaces a full-width "Get in Touch" pill at the bottom
  of the dropdown so the route stays reachable below `md`.

### `components/home/HeroSection.tsx`
- Now a client component (uses `framer-motion`).
- Background: brand navy `#0A1628` with an inline two-axis grid via
  `linear-gradient(rgba(99,179,237,0.04) 1px, transparent 1px)` repeated at
  24px.
- Top-right radial-gradient blue orb (`w-96 h-96 blur-3xl`,
  `rgba(37,99,235,0.20) → transparent 70%`).
- Layout swapped from centered to left-aligned, capped at `max-w-2xl`.
- New authority pill above the headline: "Est. 2009 · ICH/GCP Compliant"
  styled `border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs
  rounded-full px-3 py-1`.
- Single shared `fadeUp` variant staggers badge → heading → paragraph →
  buttons at 0.15s intervals (`y: 20 → 0`, `opacity: 0 → 1`). Animation
  runs once on mount.

### `components/home/ServicesPreview.tsx`
- Now a client component.
- Replaced the white-card numbered grid with translucent dark cards in a
  `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5` layout.
- Each card: `bg-white/[0.03] border border-white/[0.07] rounded-xl p-5
  transition-all duration-200 hover:-translate-y-0.5
  hover:border-blue-500/40`.
- 32×32 Tabler icon badge per card (`bg-blue-500/15 rounded-lg`). Mapping:
  - Site Selection → `ti-map-search`
  - Trial Management → `ti-clipboard-list`
  - Regulatory Affairs → `ti-file-certificate`
  - Medical Writing → `ti-pencil`
  - Site Coordinator → `ti-user-check`
  - Medical Translation → `ti-language`
  - Investigator Meeting → `ti-presentation`
- Title/description recoloured for dark theme: `text-white font-medium
  text-sm` / `text-slate-400 text-xs leading-relaxed`.
- `whileInView` with `viewport={{ once: true, amount: 0.2 }}` and
  `idx * 0.08` stagger — slides up from `y: 30`.

### `components/home/WhyChooseUs.tsx`
- Now a client component.
- Cards: `border border-white/[0.07] rounded-xl p-6 relative overflow-hidden`
  with a `border-t-2 border-t-blue-600` accent line.
- Soft corner glow div: `pointer-events-none absolute -top-6 -right-6 w-24
  h-24 rounded-full bg-blue-500/5 blur-2xl`.
- Tabler badges above each title: `ti-shield-check`, `ti-calendar-stats`,
  `ti-coin`, `ti-gavel`.
- Slide-in from the left (`x: -20 → 0`), `viewport={{ once: true }}`,
  `idx * 0.1` stagger.

### `components/home/MissionSection.tsx`
- Background swapped to `bg-[#0D1B2E]` with `border-t border-white/[0.05]`
  to participate in the new section rhythm.
- Mission + Vision cards retuned to the dark palette
  (`bg-white/[0.03] border border-white/[0.07]`, blue icon badges,
  `text-slate-400` body).

## Section rhythm

| Section          | Background |
|------------------|-----------|
| Hero             | `#0A1628` |
| Who We Are       | `#0D1B2E` |
| Services         | `#0A1628` |
| Why Choose       | `#0D1B2E` |

Every section starts with `border-t border-white/[0.05]` — a hairline that
keeps the dark canvas from reading as one continuous slab.

## Accessibility / motion

- All entrance animations are gated by `viewport={{ once: true }}` (or
  mount-only `initial`/`animate` on the hero) — nothing replays on
  re-scroll.
- The existing `prefers-reduced-motion` block in `styles/globals.css`
  already overrides transitions and animation durations, so motion-reduced
  users see the layout snap directly into its end state.
- All decorative blobs/glows are `aria-hidden` / `pointer-events-none`.
- Navbar links keep `aria-current="page"` for the active route; the new
  pill CTA has its own focus ring.

## Responsive behaviour

- Navbar collapses to the existing hamburger below `md`; mobile dropdown
  now also exposes the "Get in Touch" pill.
- Services grid: 1 / 2 / 3 columns at mobile / tablet / desktop.
- Why Choose grid: 1 / 2 / 4 columns at mobile / tablet / desktop.
- Mission grid: 1 / 2 at mobile / desktop.
- Hero content stays in a `max-w-2xl` column so line lengths remain
  readable on wide screens.

## Local setup

```bash
npm install         # pulls framer-motion (new dependency)
npm run dev
```

## Out of scope (intentional)

- About / Services / Career / Contact pages — their light backgrounds and
  shared `Footer` are unchanged.
- The `data/services.ts` shape is untouched; the new icon mapping lives
  in `ServicesPreview.tsx` and reads the existing `service.icon` strings.
- No changes to `tailwind.config.ts` — the redesign uses only existing
  utilities plus arbitrary-value syntax (`bg-[#0A1628]`,
  `border-white/[0.07]`, `backdrop-blur-[12px]`, etc.).

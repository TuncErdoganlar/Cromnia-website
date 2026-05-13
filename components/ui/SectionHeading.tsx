/**
 * components/ui/SectionHeading.tsx
 *
 * A reusable section header component used at the top of every content section.
 *
 * WHY MAKE THIS A COMPONENT?
 * -----------------------------------------------------------------------
 * Every section on the site (About, Services, Career, etc.) has the same
 * visual pattern: a heading, a colored underline bar, and an optional subtitle.
 * Instead of repeating that HTML + Tailwind classes ~10 times across the site,
 * we build it once here and reuse it everywhere.
 * If the design ever changes (e.g., different bar color), we update only this file.
 *
 * PROPS (component inputs):
 * -----------------------------------------------------------------------
 * @prop title     - The main heading text (required)
 * @prop subtitle  - Optional paragraph text displayed below the heading
 * @prop centered  - If true, all text is centered (used on dark hero sections)
 * @prop light     - If true, uses white/light text (for dark navy backgrounds)
 *
 * TYPESCRIPT INTERFACE:
 * -----------------------------------------------------------------------
 * Defining an interface for props gives you:
 * - Auto-complete when using the component: <SectionHeading title="|" />
 * - Type errors if you pass a number where a string is expected
 * - The `?` after a prop name makes it optional (won't cause errors if not provided)
 */

interface SectionHeadingProps {
  title: string;
  subtitle?: string;  // The `?` means this prop is optional
  centered?: boolean; // Optional, defaults to false (left-aligned)
  light?: boolean;    // Optional, defaults to false (dark text)
}

/**
 * SectionHeading Component
 *
 * Renders a styled section heading with an accent underline bar.
 * Supports light/dark variants and centered/left alignment.
 */
export default function SectionHeading({
  title,
  subtitle,
  centered = false,  // Default value: false (left-aligned)
  light = false,     // Default value: false (dark text)
}: SectionHeadingProps) {
  return (
    // The wrapper <div> controls the bottom spacing below the heading.
    // mb-12 adds 48px of margin below — separates the heading from the content.
    // If `centered` is true, we add "text-center" to center all text inside.
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>

      {/* ── MAIN HEADING ──────────────────────────────────────────────────
          text-h2  → semantic typography token from tailwind.config.ts.
                     Ships its own line-height, letter-spacing, and bold weight,
                     and uses a clamp() that scales fluidly across breakpoints
                     so we no longer need text-3xl + md:text-4xl pairs.
          The color switches based on the `light` prop:
          - light=true  → text-content-inverted (for dark navy backgrounds)
          - light=false → text-content-primary  (for white/light backgrounds)
      ─────────────────────────────────────────────────────────────────── */}
      <h2
        className={`text-h2 ${
          light ? "text-content-inverted" : "text-content-primary"
        }`}
      >
        {title}
      </h2>

      {/* ── DECORATIVE UNDERLINE BAR ──────────────────────────────────────
          This short colored bar beneath the heading is a common design pattern
          for corporate/professional websites. It adds visual interest and helps
          the eye anchor to the section heading.

          h-1     → 4px tall bar
          w-16    → 64px wide (short, accent-style)
          bg-sky-400 → bright cyan-blue (#38BDF8) — the CROMNIA accent color
          mt-3    → 12px space above the bar (below the heading text)
          rounded-full → fully rounded ends (pill shape)

          If `centered`, we add `mx-auto` to horizontally center the bar.
          If `light`, we use a slightly lighter sky variant for better visibility on dark.
      ─────────────────────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className={`mt-3 h-1 w-16 rounded-pill bg-brand-accent ${
          centered ? "mx-auto" : ""
        }`}
      />

      {/* ── OPTIONAL SUBTITLE ─────────────────────────────────────────────
          We use a conditional render: `{subtitle && <p>...}` means the <p>
          element only appears in the DOM if `subtitle` was passed as a prop.
          If no subtitle is provided, nothing renders here — no empty space.

          mt-4    → 16px space above subtitle (gap between bar and text)
          text-lg → slightly larger than body text for readable subtitles
          The color switches: gray-300 on dark backgrounds, gray-600 on light.
      ─────────────────────────────────────────────────────────────────── */}
      {subtitle && (
        <p
          className={`mt-4 text-body-lg ${
            light ? "text-content-on-inverted" : "text-content-secondary"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

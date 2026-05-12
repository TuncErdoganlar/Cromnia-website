/**
 * components/ui/Button.tsx
 *
 * A reusable, polymorphic Button component with two visual variants.
 * "Polymorphic" means it can render either as a <button> element OR as
 * a Next.js <Link> (anchor tag), depending on whether an `href` is provided.
 *
 * WHY BUILD A CUSTOM BUTTON COMPONENT?
 * -----------------------------------------------------------------------
 * Instead of copy-pasting the same Tailwind classes for buttons across the
 * site, this component centralizes the button logic. Benefits:
 * - Change the primary color site-wide by editing one file
 * - Consistent focus states for accessibility
 * - No accidental styling mismatches between pages
 *
 * VARIANTS:
 * -----------------------------------------------------------------------
 * - "primary"   → Solid filled button (navy-500 background, white text)
 *                 Used for main calls-to-action (CTAs)
 * - "secondary" → Outlined button (navy-500 border, navy-500 text)
 *                 Used for secondary actions alongside a primary button
 *
 * PROPS:
 * -----------------------------------------------------------------------
 * @prop children  - The button label/content (text or JSX)
 * @prop variant   - "primary" | "secondary" (default: "primary")
 * @prop href      - If provided, renders as a <Link> (navigation button)
 * @prop onClick   - Click handler for regular <button> elements
 * @prop type      - HTML button type: "button" | "submit" | "reset"
 * @prop disabled  - Disables the button and applies muted styling
 * @prop className - Extra Tailwind classes passed from the parent component
 */

import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;  // ReactNode covers text, elements, or a mix
  variant?: "primary" | "secondary";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

// ── BASE STYLES ──────────────────────────────────────────────────────────────
// These classes are always applied regardless of variant.
// - inline-flex + items-center + justify-center → centers content inside the button
// - gap-2         → 8px space between icon and text (when an icon is passed)
// - font-semibold → semi-bold weight for readable button labels
// - py-3 px-6     → vertical and horizontal padding
// - rounded-lg    → slightly rounded corners (professional look)
// - transition-all → smooth color transitions on hover (0.15s by default)
// - duration-200  → 200ms transition speed — fast enough to feel snappy
// - focus:outline-none + focus:ring-2 → accessibility: visible keyboard focus ring
const baseStyles =
  "inline-flex items-center justify-center gap-2 font-semibold py-3 px-6 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-500 disabled:opacity-50 disabled:cursor-not-allowed";

// ── VARIANT STYLES ───────────────────────────────────────────────────────────
const variantStyles = {
  // Primary: solid filled button
  // bg-navy-500   → navy blue background
  // hover:bg-navy-600 → slightly darker on hover
  // text-white    → white text for contrast on dark background
  // shadow-md     → subtle shadow to lift the button visually
  // hover:shadow-lg → grows on hover for a pressed-button feel
  primary:
    "bg-navy-500 hover:bg-navy-600 text-white shadow-md hover:shadow-lg",

  // Secondary: outlined ghost button
  // border-2 border-navy-500 → 2px navy border
  // text-navy-500             → matching navy text
  // hover:bg-navy-500 hover:text-white → fills on hover (inverts colors)
  secondary:
    "border-2 border-navy-500 text-navy-500 hover:bg-navy-500 hover:text-white bg-transparent",
};

/**
 * Button Component
 *
 * Renders a styled button or navigation link depending on whether `href` is provided.
 * Uses the cn() utility to safely merge base, variant, and custom classes.
 */
export default function Button({
  children,
  variant = "primary",  // Default to primary if no variant is specified
  href,
  onClick,
  type = "button",
  disabled = false,
  className,
}: ButtonProps) {

  // Merge base styles + variant styles + any extra className from the parent
  const combinedClasses = cn(baseStyles, variantStyles[variant], className);

  // ── LINK MODE ─────────────────────────────────────────────────────────────
  // If an `href` prop is passed, render as a Next.js <Link>.
  // <Link> creates a client-side navigation link — clicking it navigates to
  // the new page WITHOUT a full browser reload, making the app feel faster.
  // We apply the same visual classes so it looks identical to a <button>.
  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  // ── BUTTON MODE ───────────────────────────────────────────────────────────
  // If no `href`, render a standard HTML <button> element.
  // This is used for form submit buttons and click-handler actions.
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
    >
      {children}
    </button>
  );
}

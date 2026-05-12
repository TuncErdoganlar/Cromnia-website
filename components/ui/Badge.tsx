/**
 * components/ui/Badge.tsx
 *
 * A small pill-shaped label component used to display Core Values
 * on the About page.
 *
 * WHY A SEPARATE COMPONENT FOR SOMETHING SO SMALL?
 * -----------------------------------------------------------------------
 * The CoreValues section maps over 14 values and renders a badge for each.
 * Even though a badge is just a <span> with a few classes, extracting it:
 * - Makes the map() call in CoreValues.tsx cleaner to read
 * - Gives a named abstraction: "<Badge label="Innovation" />" is more
 *   readable than a raw <span> with 6 class names
 * - Makes it trivial to update all badges at once (e.g., change color)
 *
 * PROPS:
 * -----------------------------------------------------------------------
 * @prop label - The text string displayed inside the badge
 */

interface BadgeProps {
  label: string;
}

/**
 * Badge Component
 *
 * Renders a styled pill-shaped chip for displaying short labels.
 */
export default function Badge({ label }: BadgeProps) {
  return (
    /*
     * <span> is an inline element — multiple badges will flow naturally
     * side by side (wrapping to a new line when they run out of space),
     * just like words in a paragraph. This works great with `flex flex-wrap`
     * on the parent container in CoreValues.tsx.
     *
     * Tailwind classes explained:
     * - inline-block      → allows the span to have padding and sit inline
     * - bg-navy-700       → dark navy background (#1B3A6B)
     * - text-sky-300      → light cyan text for contrast on the dark background
     * - text-sm           → 14px font size (smaller than body text, fitting for labels)
     * - font-medium       → medium weight (between regular and bold — readable but not heavy)
     * - px-4 py-1.5       → horizontal: 16px, vertical: 6px padding
     * - rounded-full      → fully rounded pill shape (border-radius: 9999px)
     * - border border-navy-600 → subtle border to give the badge a defined edge
     * - transition-colors → smooth color change if we ever add hover states
     */
    <span className="inline-block bg-navy-700 text-sky-300 text-sm font-medium px-4 py-1.5 rounded-full border border-navy-600 transition-colors">
      {label}
    </span>
  );
}

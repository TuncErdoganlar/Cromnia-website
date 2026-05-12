/**
 * components/services/ServiceCard.tsx
 *
 * A single service card displaying the full detail view of one CROMNIA service.
 * Used on the /services page by the ServicesList component.
 *
 * PROPS:
 * -----------------------------------------------------------------------
 * @prop service — A ServiceItem object from data/services.ts
 *
 * ICON SYSTEM:
 * -----------------------------------------------------------------------
 * The `service.icon` field is a string like "MapPin" or "ClipboardList".
 * We can't render a string as a React component, so we need an `iconMap`
 * that maps each string to its actual Lucide component.
 *
 * PATTERN: `const Icon = iconMap[service.icon]; return <Icon />`
 * This is called the "component lookup" pattern — very common in React.
 */

import { CheckCircle2, MapPin, ClipboardList, FileCheck, PenLine, Users, Languages, CalendarDays } from "lucide-react";
import type { ServiceItem } from "@/data/services";

// ── ICON MAP ──────────────────────────────────────────────────────────────────
// Each key is the string name stored in services.ts
// Each value is the actual imported Lucide React component
// Record<string, React.ComponentType<...>> = a TypeScript object type where
// keys are strings and values are React components that accept className
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MapPin,
  ClipboardList,
  FileCheck,
  PenLine,
  Users,
  Languages,
  CalendarDays,
};

interface ServiceCardProps {
  service: ServiceItem;
}

/**
 * ServiceCard Component
 *
 * Renders a full-detail card for a single service, including:
 * - Service number badge
 * - Service icon
 * - Title and summary
 * - Full details bullet list
 */
export default function ServiceCard({ service }: ServiceCardProps) {
  // Look up the Lucide component for this service's icon name
  const Icon = iconMap[service.icon];

  return (
    // The card container:
    // bg-white          → white card on the gray section background
    // rounded-2xl       → generously rounded corners (modern look)
    // shadow-md         → moderate shadow to lift the card off the page
    // hover:shadow-xl   → larger shadow on hover for interactive feel
    // transition-shadow → smooth shadow transition
    // border border-gray-100 → subtle border to define card edges
    // flex flex-col     → lets the card content stack vertically
    // h-full            → ensures all cards in a row are equal height
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 p-8 flex flex-col h-full group">

      {/* ── CARD HEADER ────────────────────────────────────────────────────
          Icon and service number sit in a row at the top of the card.
          justify-between pushes the number to the far right.
      ──────────────────────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between mb-5">
        {/* Icon container — rounded square background */}
        <div className="w-14 h-14 bg-navy-50 rounded-xl flex items-center justify-center group-hover:bg-sky-50 transition-colors">
          {/*
           * Conditional rendering: `Icon && <Icon ... />`
           * If the icon name in services.ts doesn't match a key in iconMap,
           * `Icon` would be undefined. The `&&` prevents a crash by only
           * rendering if Icon is truthy (i.e., found in the map).
           */}
          {Icon && (
            <Icon className="w-7 h-7 text-navy-500 group-hover:text-sky-500 transition-colors" />
          )}
        </div>

        {/* Service number — decorative monospace label */}
        {/* String.padStart(2, "0") converts 1 → "01", 7 → "07" */}
        <span className="font-mono text-2xl font-bold text-gray-100 group-hover:text-sky-100 transition-colors">
          {String(service.id).padStart(2, "0")}
        </span>
      </div>

      {/* ── SERVICE TITLE ──────────────────────────────────────────────── */}
      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-navy-700 transition-colors">
        {service.title}
      </h3>

      {/* ── SERVICE SUMMARY ────────────────────────────────────────────── */}
      <p className="text-gray-500 leading-relaxed text-sm mb-5">
        {service.summary}
      </p>

      {/* ── HORIZONTAL DIVIDER ─────────────────────────────────────────── */}
      <hr className="border-gray-100 mb-5" />

      {/* ── DETAILS LIST ─────────────────────────────────────────────────
          mt-auto pushes this section to the bottom of the card if there's
          extra space, keeping all cards visually aligned in a grid row.
      ──────────────────────────────────────────────────────────────────── */}
      <ul className="space-y-2.5 mt-auto">
        {/*
         * .map() renders one list item per detail string.
         * `index` as key is safe here — the list is static and never reordered.
         */}
        {service.details.map((detail, index) => (
          <li key={index} className="flex items-start gap-2.5">
            {/* CheckCircle2 is a filled circle with a check mark — more solid than CheckCircle */}
            <CheckCircle2 className="w-4 h-4 text-sky-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-600 text-sm leading-relaxed">{detail}</span>
          </li>
        ))}
      </ul>

    </div>
  );
}

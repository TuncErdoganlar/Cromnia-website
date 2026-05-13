/**
 * components/layout/Navbar.tsx
 *
 * The sticky top navigation bar for the entire CROMNIA website.
 * This is one of only two "client components" in the project (the other
 * is ContactForm.tsx), because it needs:
 * 1. useState — to track whether the mobile menu is open or closed
 * 2. usePathname — to highlight the currently active navigation link
 *
 * "use client" DIRECTIVE:
 * -----------------------------------------------------------------------
 * By default, all components in Next.js 14 are Server Components — they
 * render on the server and send static HTML to the browser. Server Components
 * CANNOT use React hooks (useState, useEffect, etc.) or browser APIs.
 *
 * Adding "use client" at the very top of a file marks it as a Client Component.
 * Client Components ARE rendered on the server initially (for SEO), but also
 * "hydrate" in the browser — meaning React takes over and makes them interactive.
 *
 * RULE: Only add "use client" when you genuinely need interactivity.
 * Keep as many components as Server Components as possible for performance.
 */
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, FlaskConical } from "lucide-react";

// ── NAVIGATION LINKS DATA ────────────────────────────────────────────────────
// Defining the nav links as a constant array (outside the component) means
// this object is created once and shared — it doesn't re-create on every render.
// Each entry has `href` (the URL path) and `label` (the visible text).
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/career", label: "Career" },
  { href: "/contact", label: "Contact" },
];

/**
 * Navbar Component
 *
 * Renders a sticky navigation bar with:
 * - CROMNIA logo/wordmark on the left
 * - Desktop nav links on the right (hidden on mobile)
 * - Hamburger menu button on mobile (hidden on desktop)
 * - Mobile dropdown menu (shown/hidden via state)
 * - Active link highlighting based on current URL path
 */
export default function Navbar() {
  // ── STATE ──────────────────────────────────────────────────────────────────
  // useState(false) creates a state variable `isMenuOpen` starting as false.
  // `setIsMenuOpen` is the function that updates it.
  // When `isMenuOpen` is true, the mobile menu is visible.
  // When false, it's hidden.
  //
  // Every time you call setIsMenuOpen(), React re-renders this component
  // with the new value — that's what makes the menu appear/disappear.
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ── PATHNAME ───────────────────────────────────────────────────────────────
  // usePathname() returns the current URL path as a string.
  // e.g., if you're on the About page: pathname === "/about"
  // We use this to visually highlight the active nav link.
  const pathname = usePathname();

  // ── HELPER: isActive ───────────────────────────────────────────────────────
  // A small helper function that returns true if a link's href matches the
  // current page. Used to apply different styling to the active link.
  //
  // Special case for Home "/": we use exact match (pathname === href)
  // to avoid "/" matching every route (since all routes start with /).
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    // ── OUTER NAV ELEMENT ───────────────────────────────────────────────────
    // sticky top-0 → the navbar stays at the top of the viewport as you scroll
    // z-50         → high z-index ensures navbar stays above all other content
    // bg-surface-inverted → dark brand surface (semantic token = navy-900)
    // shadow-elev-3 → semantic elevation token (was shadow-lg)
    // aria-label tells AT this is the "primary" site nav, distinct from
    // the footer nav landmark below.
    <nav
      aria-label="Primary"
      className="sticky top-0 z-50 bg-surface-inverted shadow-elev-3"
    >
      <div className="section-container">
        {/* ── NAVBAR INNER ROW ──────────────────────────────────────────────
            flex            → makes this a flexbox row
            items-center    → vertically centers all children
            justify-between → pushes logo to left, links to right
            h-16            → fixed height of 64px for the navbar
        ─────────────────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between h-16">

          {/* ── LOGO / WORDMARK ─────────────────────────────────────────────
              Clicking the logo always navigates back to the Home page.
              We use the FlaskConical icon to represent clinical/laboratory work.
              flex items-center gap-2 → icon and text sit side by side with 8px gap
          ─────────────────────────────────────────────────────────────────── */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="CROMNIA Home"
          >
            {/* Icon container with hover effect */}
            <div className="w-9 h-9 bg-sky-400 rounded-lg flex items-center justify-center group-hover:bg-sky-300 transition-colors">
              <FlaskConical className="w-5 h-5 text-navy-900" strokeWidth={2.5} />
            </div>
            {/* Company name — the text wordmark */}
            <span className="text-xl font-bold text-white tracking-wide">
              CROMNIA
            </span>
          </Link>

          {/* ── DESKTOP NAVIGATION ──────────────────────────────────────────
              hidden md:flex → hidden on mobile (<768px), flex on desktop (≥768px)
              items-center gap-1 → links sit in a row with 4px between them
          ─────────────────────────────────────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-1">
            {/*
             * .map() iterates over the navLinks array and renders one <Link>
             * per item. This is much cleaner than writing 5 separate <Link> tags.
             *
             * The `key` prop is required by React when rendering lists.
             * React uses it internally to track which items changed when
             * the component re-renders. Use a unique value — the href is perfect here.
             */}
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  // aria-current="page" is the WCAG-recommended way to expose
                  // the active nav link to screen readers (NVDA, JAWS, VoiceOver).
                  aria-current={active ? "page" : undefined}
                  className={`
                    px-4 py-2 rounded-control text-body-sm font-medium transition-all duration-200
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-inverted
                    ${
                      active
                        // Active link: bright accent + subtle highlight
                        ? "text-brand-accent bg-white/10"
                        // Inactive: muted, brightens on hover
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    }
                  `}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* ── MOBILE MENU TOGGLE BUTTON ────────────────────────────────────
              md:hidden → visible only on mobile (<768px), hidden on desktop
              This button toggles the mobile dropdown menu open and closed.

              aria-expanded → important for accessibility: tells screen readers
              whether the menu is currently expanded or collapsed.
              aria-label    → describes the button for screen readers.
          ─────────────────────────────────────────────────────────────────── */}
          <button
            className="md:hidden p-2 rounded-control text-gray-300 hover:text-white hover:bg-white/10 transition-colors
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-inverted"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {/*
             * Conditional rendering: if menu is open, show X (close) icon.
             * If menu is closed, show Menu (hamburger) icon.
             * The `? :` is JavaScript's ternary operator — a compact if/else.
             */}
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* ── MOBILE DROPDOWN MENU ──────────────────────────────────────────────
          This entire block only renders when `isMenuOpen` is true.
          `{isMenuOpen && <div>...}` is React's pattern for conditional rendering.
          When isMenuOpen is false, nothing is added to the DOM here.

          md:hidden → this menu is completely hidden on desktop regardless of state
          bg-navy-800 → slightly lighter background than the navbar itself
          border-t border-white/10 → subtle dividing line between navbar and menu
      ─────────────────────────────────────────────────────────────────── */}
      {isMenuOpen && (
        <div id="mobile-nav-menu" className="md:hidden bg-surface-inverted-soft border-t border-white/10">
          <div className="section-container py-3 flex flex-col gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  // When a mobile link is clicked, close the menu
                  onClick={() => setIsMenuOpen(false)}
                  className={`
                    px-4 py-3 rounded-control text-body-sm font-medium transition-colors
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-inverted-soft
                    ${
                      active
                        ? "text-brand-accent bg-white/10"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    }
                  `}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}

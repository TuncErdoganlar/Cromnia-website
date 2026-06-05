/**
 * components/layout/Navbar.tsx
 *
 * The sticky top navigation bar for the entire CROMNIA website.
 *
 * RECENT REDESIGN (STEP 1):
 * -----------------------------------------------------------------------
 * - Tracks scroll position with useEffect + window.scrollY; once the page
 *   has been scrolled even a few pixels the navbar gets a glassmorphism
 *   effect: a translucent background, backdrop-blur, and a 1px hairline
 *   border at the bottom. At the top of the page it stays fully opaque
 *   so it reads as a confident dark header.
 * - A small blue dot sits immediately to the left of the "CROMNIA" wordmark
 *   as a brand accent, replacing the older FlaskConical icon square.
 * - The "Contact" link is removed from the nav list — its job is taken
 *   over by a pill-shaped "Get in Touch" CTA pinned to the far right.
 *
 * STILL A CLIENT COMPONENT — needs useState (mobile menu), usePathname
 * (active link highlight), and useEffect (scroll listener).
 */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Home,
  Users,
  LayoutGrid,
  Briefcase,
  Mail,
  type LucideIcon,
} from "lucide-react";

// ── NAVIGATION LINKS DATA ────────────────────────────────────────────────────
// Contact is intentionally NOT in this list anymore — it has been promoted to
// a dedicated CTA button on the right side of the navbar.
// Each link also carries a lucide-react icon component (SVG, scales crisply at
// any size, inherits the link's text color via `currentColor`).
const navLinks: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About Us", icon: Users },
  { href: "/services", label: "Services", icon: LayoutGrid },
  { href: "/career", label: "Career", icon: Briefcase },
];

/**
 * Navbar Component
 *
 * Renders a sticky navigation bar with:
 * - Blue-dot + CROMNIA wordmark on the left
 * - Desktop nav links centered/right
 * - "Get in Touch" pill CTA on the far right (desktop only)
 * - Hamburger menu button on mobile, which reveals Contact too
 */
export default function Navbar() {
  // ── STATE ──────────────────────────────────────────────────────────────────
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // `isScrolled` flips to true once the user has scrolled past a small
  // threshold. Driving Tailwind classes from this single boolean keeps the
  // styling simple and avoids re-renders mid-scroll for every pixel.
  const [isScrolled, setIsScrolled] = useState(false);

  // ── PATHNAME ───────────────────────────────────────────────────────────────
  const pathname = usePathname();

  // ── SCROLL LISTENER ────────────────────────────────────────────────────────
  // Attach a single passive scroll listener on mount; tear it down on unmount.
  // We use 8px as the threshold so the glassmorphism kicks in immediately
  // after any deliberate scroll, but doesn't twitch when the page bounces.
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    // Run once on mount so a page-load mid-scroll (e.g. anchor link) is correct.
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── HELPER: isActive ───────────────────────────────────────────────────────
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    // ── OUTER NAV ELEMENT ───────────────────────────────────────────────────
    // The glassmorphism is driven by `isScrolled`:
    //   - Top of page: fully opaque navy (looks like a normal dark header)
    //   - Scrolled:    semi-transparent navy + backdrop-blur(12px) + hairline border
    // We use Tailwind's arbitrary value syntax for the exact blur(12px).
    <nav
      aria-label="Primary"
      className={`
        sticky top-0 z-50 transition-all duration-300
        ${
          isScrolled
            ? "bg-[#0A1628]/70 backdrop-blur-[12px] border-b border-white/[0.08] shadow-elev-2"
            : "bg-surface-inverted border-b border-transparent shadow-elev-3"
        }
      `}
    >
      <div className="section-container">
        {/* ── NAVBAR INNER ROW ────────────────────────────────────────────── */}
        <div className="flex items-center justify-between h-16">

          {/* ── LOGO / WORDMARK ─────────────────────────────────────────────
              The official CROMNIA "cromnia · CLINICAL RESEARCH" lockup,
              extracted from the company brochure and recolored white so it
              reads cleanly on the dark navy / glass navbar. The intrinsic
              839×401 ratio is preserved; h-10 + w-auto sizes it for the bar.
              `priority` loads it eagerly since it's above the fold on every page.
          ─────────────────────────────────────────────────────────────────── */}
          <Link
            href="/"
            className="flex items-center group"
            aria-label="CROMNIA — Clinical Research, Home"
          >
            <Image
              src="/cromnia-logo-white.png"
              alt="CROMNIA Clinical Research"
              width={839}
              height={401}
              priority
              className="h-10 w-auto transition-opacity duration-200 group-hover:opacity-90"
            />
          </Link>

          {/* ── DESKTOP NAVIGATION ────────────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`
                    inline-flex items-center gap-2 px-4 py-2 rounded-control text-base font-medium transition-all duration-200
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-inverted
                    ${
                      active
                        ? "text-brand-accent bg-white/10"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    }
                  `}
                >
                  {/* Icon is decorative — the visible label already names the link. */}
                  <Icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" strokeWidth={2} />
                  {link.label}
                </Link>
              );
            })}

            {/* ── GET IN TOUCH CTA (desktop) ─────────────────────────────────
                Pill-shaped blue button replaces the old Contact nav link.
                Visually distinct from the nav links — communicates "action".
            ─────────────────────────────────────────────────────────────── */}
            <Link
              href="/contact"
              className="ml-3 inline-flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-base font-medium px-4 py-1.5 transition-colors
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-inverted"
            >
              <Mail className="w-5 h-5 flex-shrink-0" aria-hidden="true" strokeWidth={2} />
              Get in Touch
            </Link>
          </div>

          {/* ── MOBILE MENU TOGGLE BUTTON ─────────────────────────────────── */}
          <button
            className="md:hidden p-2 rounded-control text-gray-300 hover:text-white hover:bg-white/10 transition-colors
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-inverted"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* ── MOBILE DROPDOWN MENU ──────────────────────────────────────────────
          On mobile we add Contact back as a regular link AND keep the pill
          CTA as a full-width row so the page is still reachable when the
          desktop button is hidden.
      ─────────────────────────────────────────────────────────────────── */}
      {isMenuOpen && (
        <div id="mobile-nav-menu" className="md:hidden bg-surface-inverted-soft border-t border-white/10">
          <div className="section-container py-3 flex flex-col gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setIsMenuOpen(false)}
                  className={`
                    inline-flex items-center gap-3 px-4 py-3 rounded-control text-base font-medium transition-colors
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-inverted-soft
                    ${
                      active
                        ? "text-brand-accent bg-white/10"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    }
                  `}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" strokeWidth={2} />
                  {link.label}
                </Link>
              );
            })}

            {/* Mobile "Get in Touch" — same pill, but expanded for finger reach. */}
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 inline-flex justify-center items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-base font-medium px-4 py-2.5 transition-colors"
            >
              <Mail className="w-5 h-5 flex-shrink-0" aria-hidden="true" strokeWidth={2} />
              Get in Touch
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

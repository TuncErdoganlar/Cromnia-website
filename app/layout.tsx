/**
 * app/layout.tsx
 *
 * THE ROOT LAYOUT — This is the most important file in the Next.js App Router.
 * It wraps EVERY page on the site. Think of it as the outer HTML shell.
 *
 * WHAT IS A ROOT LAYOUT?
 * -----------------------------------------------------------------------
 * Every website needs <html> and <body> tags — these live here.
 * The `{children}` prop represents the current page's content.
 * When a user visits /about, Next.js renders:
 *
 *   <html>
 *     <body>
 *       <Navbar />       ← from this file
 *       <main>
 *         [About page content]  ← {children}
 *       </main>
 *       <Footer />       ← from this file
 *     </body>
 *   </html>
 *
 * WHY EXPORT `metadata`?
 * -----------------------------------------------------------------------
 * The `metadata` export tells Next.js what to put in <head> tags:
 * - <title> → browser tab title, Google search result title
 * - <meta name="description"> → Google search result description (SEO)
 * Exporting it as a constant from a Server Component is the Next.js way.
 * Individual pages can override these with their own `metadata` export.
 *
 * WHY USE next/font?
 * -----------------------------------------------------------------------
 * next/font/google loads Google Fonts at BUILD TIME — not in the browser.
 * This means:
 * - Zero layout shift (font loads before the page renders)
 * - No external network request from the browser (better privacy, faster load)
 * - The font CSS is automatically injected via a CSS variable
 */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// ── FONT SETUP ────────────────────────────────────────────────────────────────
// Inter is a clean, modern sans-serif font widely used in professional web UIs.
// `subsets: ["latin"]` loads only the Latin character set — smaller file size.
// `variable: "--font-inter"` creates a CSS custom property that Tailwind reads.
// We configured tailwind.config.ts to use `var(--font-inter)` as the default font.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap", // "swap" shows a fallback font immediately, swaps to Inter when loaded
});

// ── SEO METADATA ─────────────────────────────────────────────────────────────
// These values appear in the browser tab and in Google search results.
// Individual pages can extend or override these by exporting their own `metadata`.
export const metadata: Metadata = {
  title: {
    // `template` automatically applies to all child pages.
    // e.g., the About page (title: "About Us") becomes "About Us | CROMNIA"
    template: "%s | CROMNIA",
    // `default` is used when a page doesn't define its own title
    default: "CROMNIA | Contract Research Organization",
  },
  description:
    "CROMNIA is a Contract Research Organization (CRO) based in Izmir, Turkey. " +
    "We provide reliable, flexible, and cost-effective clinical research services " +
    "for Phase II–IV trials across all therapeutic areas, in compliance with ICH/GCP standards.",
  keywords: [
    "CRO",
    "contract research organization",
    "clinical trials",
    "Turkey",
    "Izmir",
    "ICH GCP",
    "Phase II",
    "Phase III",
    "regulatory affairs",
    "medical writing",
  ],
  // openGraph data powers social media previews (LinkedIn, Twitter, etc.)
  openGraph: {
    title: "CROMNIA | Contract Research Organization",
    description:
      "Reliable clinical research services in Turkey. Site selection, trial management, regulatory affairs, and more.",
    type: "website",
    locale: "en_US",
  },
};

// ── ROOT LAYOUT COMPONENT ─────────────────────────────────────────────────────
// This is a React Server Component (no "use client" needed).
// `children` receives the currently active page component.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode; // ReactNode = anything React can render (elements, text, null, etc.)
}) {
  return (
    // `lang="en"` tells browsers and screen readers the page language
    // `inter.variable` applies the CSS variable --font-inter to the HTML element
    // so Tailwind's font-sans class (configured in tailwind.config.ts) picks it up
    <html lang="en" className={inter.variable}>
      {/*
       * antialiased → enables font smoothing for crisper text rendering on most displays
       * min-h-screen → ensures the body is at least as tall as the viewport,
       *                preventing the footer from floating up on short pages
       * flex flex-col → makes the body a vertical flex container
       *                 so we can push the footer to the bottom on short pages
       */}
      <body className="antialiased min-h-screen flex flex-col bg-gray-50">

        {/* Navbar renders at the top of EVERY page */}
        <Navbar />

        {/*
         * <main> is the semantic HTML element for the primary content of a page.
         * flex-1 → this is a flexbox shorthand for flex-grow: 1
         * It tells <main> to expand and fill all available vertical space.
         * This pushes the Footer to the very bottom of the page — even on pages
         * with very little content.
         */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer renders at the bottom of EVERY page */}
        <Footer />

      </body>
    </html>
  );
}

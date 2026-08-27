/**
 * app/layout.tsx
 *
 * THE ROOT LAYOUT — wraps EVERY page on the site. This is the outer HTML shell.
 *
 * RESPONSIBILITIES
 * -----------------------------------------------------------------------
 * 1. Loads the global stylesheet (Tailwind + design tokens)
 * 2. Configures the `Inter` font through next/font (zero-CLS web fonts)
 * 3. Exports SEO metadata, Open Graph defaults, and the viewport config
 * 4. Renders the persistent shell: Navbar — <main> — Footer
 * 5. Renders the keyboard-only "Skip to main content" link, which is the
 *    very first focusable element so screen-reader + keyboard users can
 *    bypass the navigation on every page.
 *
 * SERVER COMPONENT — no client state lives here.
 */

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// ── FONT ─────────────────────────────────────────────────────────────────────
// next/font/google fetches Inter at BUILD time, self-hosts it, and exposes a
// CSS variable. Result: no FOIT/FOUT, no external network request, no CLS.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// ── SEO METADATA ─────────────────────────────────────────────────────────────
// `metadataBase` resolves relative URLs in openGraph.images, etc.
// Replace the placeholder when the production domain is final.
export const metadata: Metadata = {
  metadataBase: new URL("https://cromnia.com"),
  title: {
    template: "%s | CROMNIA",
    default: "CROMNIA | Contract Research Organization",
  },
  description:
    "CROMNIA is a Contract Research Organization (CRO) based in Izmir, Turkey. " +
    "We provide reliable, flexible, and cost effective clinical research services " +
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
  openGraph: {
    title: "CROMNIA | Contract Research Organization",
    description:
      "Reliable clinical research services in Turkey. Site selection, trial management, regulatory affairs, and more.",
    type: "website",
    locale: "en_US",
    siteName: "CROMNIA",
  },
  // Tells crawlers and assistive tech the canonical language
  alternates: {
    canonical: "/",
  },
  authors: [{ name: "CROMNIA" }],
  // Generator hint can leak Next.js version — turn off in production
  generator: undefined,
  verification: {
    google: "6r6ONjMToR3OmvkbrBScHgv08_lag7YfhnPKZ-roiI4",
  },
};

// ── VIEWPORT ─────────────────────────────────────────────────────────────────
// Split out from `metadata` per Next.js 14 conventions. Controls how the
// browser sizes the layout and which theme color the OS uses for the
// browser chrome (mobile address bar, etc.).
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // The brand navy — matches the navbar so the OS chrome blends in.
  themeColor: "#0A1628",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Tabler Icons web font — used across the redesigned UI (Hero/Services/WhyChooseUs).
            Loaded via CDN so we can use `<i className="ti ti-..." />` anywhere on the site. */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.7.0/dist/tabler-icons.min.css"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-surface-subtle">

        {/* ── SKIP LINK ────────────────────────────────────────────────────
            Hidden until focused. Lets keyboard + screen-reader users jump
            past the navbar straight to the page content on every route.
        ─────────────────────────────────────────────────────────────────── */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>

        <Navbar />

        {/*
         * `id="main-content"` is the anchor for the skip link above.
         * `tabIndex={-1}` lets us programmatically focus <main> after the
         *   jump without making it a regular tab stop.
         * `role="main"` is implicit on <main>, but explicit doesn't hurt.
         */}
        <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}

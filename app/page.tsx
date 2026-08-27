/**
 * app/page.tsx
 *
 * The HOME PAGE — rendered when a user visits the root URL: /
 *
 * WHAT IS A PAGE FILE IN NEXT.JS APP ROUTER?
 * -----------------------------------------------------------------------
 * In Next.js 14 with the App Router, every `page.tsx` file inside the `app/`
 * directory creates a route. The file structure maps to URL paths:
 *
 *   app/page.tsx          → https://yoursite.com/
 *   app/about/page.tsx    → https://yoursite.com/about
 *   app/services/page.tsx → https://yoursite.com/services
 *
 * PAGE FILES ARE SERVER COMPONENTS BY DEFAULT:
 * -----------------------------------------------------------------------
 * No "use client" directive means this runs entirely on the server.
 * The server renders this to HTML and sends it to the browser.
 * Benefits: faster initial load, better SEO (search engines see real content),
 * smaller JavaScript bundle sent to the browser.
 *
 * COMPOSITION PATTERN:
 * -----------------------------------------------------------------------
 * Page files should be "thin" — they just arrange components in order.
 * All the actual content and logic lives inside the component files.
 * This makes pages easy to read and restructure.
 *
 * METADATA:
 * -----------------------------------------------------------------------
 * The root layout (app/layout.tsx) defines the default title template "%s | CROMNIA".
 * Since this is the home page, we set the title to just "CROMNIA" directly.
 */

import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import MissionSection from "@/components/home/MissionSection";
import StatsCounter from "@/components/home/StatsCounter";
import ServicesScroller from "@/components/home/ServicesScroller";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CTABanner from "@/components/home/CTABanner";

// SEO metadata for the home page
// The root layout's title template won't apply here because we set `title` directly.
export const metadata: Metadata = {
  title: "CROMNIA | Contract Research Organization",
  description:
    "CROMNIA is a CRO based in Izmir, Turkey, offering clinical trial management, " +
    "regulatory affairs, medical writing, and more since 2009.",
};

/**
 * Home Page Component
 *
 * Composes the four sections of the landing page in visual order:
 * 1. Hero    → First impression, company name, tagline, CTAs
 * 2. Mission → Who we are, mission + vision statements
 * 3. Services → All 7 services in a preview grid
 * 4. Why Us  → Key differentiators (dark section)
 */
// Organization structured data (JSON-LD) — tells Google what "CROMNIA" is
// as an entity, which helps the brand name resolve to this site in search.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CROMNIA",
  url: "https://www.cromnia.com.tr",
  logo: "https://www.cromnia.com.tr/cromnia-logo-color.png",
  description:
    "CROMNIA is a Contract Research Organization (CRO) based in Izmir, Turkey, " +
    "providing clinical trial management, regulatory affairs, and medical writing services.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Izmir",
    addressCountry: "TR",
  },
};

export default function HomePage() {
  return (
    <>
      {/*
       * React Fragment (<>) allows returning multiple elements without
       * wrapping them in an extra <div>. This keeps the DOM clean —
       * no unnecessary wrapper elements in the HTML output.
       */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <HeroSection />
      <MissionSection />
      <StatsCounter />
      <ServicesScroller />
      <WhyChooseUs />
      <CTABanner />
    </>
  );
}

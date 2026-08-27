# CROMNIA — Contract Research Organization Website

Corporate marketing site for **CROMNIA**, a Contract Research Organization (CRO)
founded in 2009 in İzmir, Turkey, providing full-service clinical research
support (Phase II–IV trials) to sponsors across all therapeutic areas, in
compliance with ICH/GCP standards.

Live: **[www.cromnia.com.tr](https://www.cromnia.com.tr)**

---

## Project Goals

The site is built to:

- Present CROMNIA's 7 core services clearly to sponsors and partners
- Communicate the company's mission, vision, and 14 core values
- Support recruitment through a dedicated Careers page
- Rank well for CRO / clinical research search terms in Turkey (SEO-first)
- Meet accessibility basics (skip-to-content link, semantic landmarks, `next/font` for zero-CLS text)

---

## Repository Structure

    cromnia-website/
    │
    ├── app/
    │   ├── page.tsx              Home
    │   ├── about/page.tsx        Company overview, mission/vision, core values
    │   ├── services/page.tsx     Full list of the 7 CRO services
    │   ├── career/page.tsx       Careers / open positions
    │   ├── contact/page.tsx      Contact form + company info
    │   ├── layout.tsx            Root layout, SEO metadata, Navbar/Footer shell
    │   ├── sitemap.ts            /sitemap.xml
    │   └── robots.ts             /robots.txt
    │
    ├── components/
    │   ├── home/                 Hero, mission banner, services preview/scroller, stats, CTA
    │   ├── about/                CompanyOverview, MissionVision, CoreValues
    │   ├── services/             ServiceCard, ServicesList
    │   ├── career/                CareerSection
    │   ├── contact/               ContactForm, ContactInfo
    │   ├── layout/                Navbar, Footer
    │   └── ui/                    Badge, Button, SectionHeading (shared primitives)
    │
    ├── data/
    │   └── services.ts           Single source of truth for all 7 services (title, summary, details, icon, fill level)
    │
    ├── lib/
    │   └── utils.ts               Shared helpers (e.g. `cn` for class merging)
    │
    └── styles/
        └── globals.css            Tailwind + design tokens

---

## Features

- **7 services, one source of truth** — every service card, preview, and detail
  list on the site reads from `data/services.ts`. Adding or editing a service
  means editing this one file only.
- **"Tube rack" services visual** — the home page's `ServicesScroller` renders
  each service as a test tube whose liquid `fill` level (0–1, set per service
  in `data/services.ts`) gives an at-a-glance visual read of the service catalog.
- **SEO-first metadata** — title templates, Open Graph tags, canonical URLs,
  keyword targeting, and Google Search Console verification are all wired
  through `app/layout.tsx` and per-page `metadata` exports.
- **Accessible by default** — a keyboard-focusable skip-to-content link is the
  first element on every page, landmarks are explicit, and fonts are
  self-hosted via `next/font` to avoid layout shift.
- **Animated, motion-respectful UI** — Framer Motion powers scroll reveals and
  interactive cards (`ServiceTiltCard`, `ParticleField`) across the home page.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + `tailwind-merge` / `clsx` |
| Icons | Lucide React + Tabler Icons (web font) |
| Animation | Framer Motion |
| Hosting | Vercel |

---

## Running the Project

```bash
npm install
npm run dev
# open http://localhost:3000
```

Other scripts:

```bash
npm run build       # production build
npm run start        # serve the production build
npm run lint          # ESLint
npm run lint:a11y     # ESLint restricted to app/ and components/ (accessibility-focused pass)
```

---

## Editing Content

- **Services**: edit `data/services.ts` — every service-related component
  reads from this array, so there's nowhere else to update.
- **About page content**: `components/about/CompanyOverview.tsx`,
  `MissionVision.tsx`, and `CoreValues.tsx`.
- **Contact details**: `components/contact/ContactInfo.tsx`.
- **SEO defaults**: `app/layout.tsx` (`metadata` export) — the domain,
  Google verification token, and Open Graph defaults live here.

---

## Deployment

The site deploys to Vercel from this repository. Pushes to the default
branch trigger an automatic production deploy at `www.cromnia.com.tr`
(also reachable via `cromnia.com.tr` and `cromnia.vercel.app`).

---

## License

© CROMNIA. All rights reserved.

This repository contains the source code for CROMNIA's corporate website.
The code, design, and all content are proprietary to CROMNIA and are not
licensed for reuse, redistribution, or modification by third parties.

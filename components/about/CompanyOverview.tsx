/**
 * components/about/CompanyOverview.tsx
 *
 * The introductory section of the About Us page.
 * Tells the company's story: when it was founded, where it's based,
 * what it does, and what differentiates it.
 *
 * LAYOUT: Two-column split on desktop
 * -----------------------------------------------------------------------
 * Left column → narrative body text (the "story")
 * Right column → a structured facts card (quick-reference information)
 *
 * This two-column approach is effective because:
 * - Scanners (users who skip reading) see the key facts in the card
 * - Readers get the full narrative in the text
 */

import { Building2, Globe, Users, CheckCircle } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

// Quick-fact items for the right-column info card
const companyFacts = [
  { label: "Founded", value: "2009" },
  { label: "Headquarters", value: "Izmir, Turkey" },
  { label: "Industry", value: "Contract Research Organization (CRO)" },
  { label: "Specialization", value: "Phase II–IV Clinical & Observational Trials" },
  { label: "Coverage", value: "All Therapeutic Areas" },
  { label: "Standards", value: "ICH/GCP Compliant" },
];

// Key strengths displayed as a checklist
const strengths = [
  "Qualified and specialized clinical research teams",
  "Cost-effective, flexible, and timely service delivery",
  "Well-established nationwide investigator network",
  "Comprehensive feasibility analysis across all medical areas",
  "Absolute security and confidentiality of medical records",
  "Phase I support through Medical Faculty collaborations",
];

/**
 * CompanyOverview Component
 *
 * Renders the company background, founding story, and key strengths.
 */
export default function CompanyOverview() {
  return (
    <section className="py-20 bg-white">
      <div className="section-container">

        <SectionHeading
          title="About CROMNIA"
          subtitle="A trusted partner in clinical research, operating from Izmir, Turkey since 2009."
        />

        {/* ── TWO-COLUMN LAYOUT ─────────────────────────────────────────────
            On mobile: stacked (grid-cols-1)
            On desktop: left takes 3/5 width, right takes 2/5 (via col-span)
        ──────────────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

          {/* ── LEFT COLUMN: NARRATIVE TEXT ────────────────────────────────
              lg:col-span-3 → takes up 3 of the 5 grid columns on large screens
          ─────────────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-3 space-y-6">
            <p className="text-gray-700 leading-relaxed text-lg">
              CROMNIA was established in 2009 as a Contract Research Organization (CRO)
              in Izmir, Turkey. Built on a foundation of scientific integrity and
              clinical expertise, our organization has grown into a trusted partner
              for sponsors managing clinical and observational research projects
              across the country.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Our clinical team includes qualified medical doctors, and we maintain a
              wide investigator database throughout Turkey. This network allows us to
              identify the right sites quickly and efficiently — reducing timelines and
              improving patient recruitment outcomes.
            </p>

            <p className="text-gray-600 leading-relaxed">
              Leveraging experienced personnel and proactive project management,
              CROMNIA provides coordination with all stakeholders to manage
              Phase II–IV clinical and observational research projects across all
              therapeutic areas. Phase I studies are supported through collaboration
              with Phase I Units of Medical Faculties.
            </p>

            {/* ── KEY STRENGTHS CHECKLIST ──────────────────────────────────
                A visual list of CROMNIA's core offerings — using CheckCircle
                icons for a professional, trust-building appearance.
            ──────────────────────────────────────────────────────────────── */}
            <div className="pt-4">
              <h3 className="text-gray-900 font-semibold text-base mb-4">
                Core Strengths
              </h3>
              <ul className="space-y-3">
                {strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-3">
                    {/* flex-shrink-0 prevents icon from being squeezed by long text */}
                    <CheckCircle className="w-5 h-5 text-sky-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 text-sm leading-relaxed">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── RIGHT COLUMN: FACTS CARD ────────────────────────────────────
              lg:col-span-2 → takes up 2 of the 5 grid columns
              sticky top-24 → card stays visible as user scrolls through the left column
              (top-24 offsets below the sticky navbar height)
          ─────────────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-2 lg:sticky lg:top-24">
            <div className="bg-navy-900 rounded-2xl p-8 text-white">
              {/* Card header */}
              <div className="flex items-center gap-3 mb-6">
                <Building2 className="w-6 h-6 text-sky-400" />
                <h3 className="font-bold text-lg">Company Profile</h3>
              </div>

              {/* Facts list */}
              <dl className="space-y-4">
                {companyFacts.map((fact) => (
                  <div key={fact.label} className="flex flex-col gap-0.5 pb-4 border-b border-white/10 last:border-0 last:pb-0">
                    {/* dt = definition term (the label) */}
                    <dt className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                      {fact.label}
                    </dt>
                    {/* dd = definition description (the value) */}
                    <dd className="text-white font-medium text-sm">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* Icons row at the bottom of the card */}
              <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-4 text-gray-400">
                <div className="flex items-center gap-1.5 text-xs">
                  <Globe className="w-4 h-4 text-sky-400" />
                  <span>Turkey-wide coverage</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs">
                  <Users className="w-4 h-4 text-sky-400" />
                  <span>Expert team</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

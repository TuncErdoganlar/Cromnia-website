/**
 * components/career/CareerSection.tsx
 *
 * Main content section of the Career page.
 *
 * CONTENT SOURCE:
 * -----------------------------------------------------------------------
 * Text extracted from the CROMNIA Website document:
 * "We are always seeking professionals interested in sharing experience,
 * developing personal knowledge and skills, and becoming part of a
 * well-established professional team in clinical research."
 *
 * LAYOUT:
 * -----------------------------------------------------------------------
 * - Left/right two-column on desktop
 * - Left: career message, CTA
 * - Right: 3 benefit highlights with icons
 */

import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { GraduationCap, Users, Globe, Send } from "lucide-react";

// The three key benefits of working at CROMNIA
const benefits = [
  {
    icon: GraduationCap,
    title: "Professional Development",
    description:
      "Work on diverse Phase II–IV trials across therapeutic areas. " +
      "Build your expertise in ICH/GCP compliant research operations.",
  },
  {
    icon: Users,
    title: "Collaborative Environment",
    description:
      "Join a dedicated team of medical doctors, clinical monitors, " +
      "regulatory specialists, and project managers.",
  },
  {
    icon: Globe,
    title: "International Standards",
    description:
      "Operate at the intersection of Turkish regulatory requirements " +
      "and international clinical research best practices.",
  },
];

/**
 * CareerSection Component
 *
 * Renders the career message, benefit highlights, and CV submission CTA.
 */
export default function CareerSection() {
  return (
    <section className="py-20 bg-white">
      <div className="section-container">

        {/* ── TWO-COLUMN LAYOUT ─────────────────────────────────────────────
            Left: narrative + CTA
            Right: benefit highlights
        ──────────────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* ── LEFT COLUMN ─────────────────────────────────────────────── */}
          <div>
            <SectionHeading
              title="Join the CROMNIA Team"
              subtitle="Shape the future of clinical research in Turkey with us."
            />

            {/* Career narrative — direct from company documents */}
            <div className="space-y-5 text-gray-600 leading-relaxed mb-8">
              <p>
                CROMNIA is always seeking talented professionals who are passionate
                about clinical research and committed to the highest standards of
                scientific integrity.
              </p>
              <p>
                We welcome individuals interested in sharing their experience,
                developing their personal knowledge and skills, and becoming part
                of a well established, dynamic professional team.
              </p>
              <p>
                Whether you are an experienced clinical research associate, a
                regulatory affairs specialist, a medical writer, or a site
                coordinator, we want to hear from you.
              </p>
            </div>

            {/* ── CTA BUTTON ────────────────────────────────────────────── */}
            {/* href="/contact" → links to the Contact page where they can submit */}
            <Button href="/contact" variant="primary" className="inline-flex items-center gap-2">
              <Send className="w-4 h-4" />
              Send Us Your CV
            </Button>

            {/* ── NOTE BELOW CTA ────────────────────────────────────────── */}
            <p className="mt-4 text-sm text-gray-400">
              Use the contact form on our Contact page to attach your CV (PDF, Word, or plain text).
            </p>
          </div>

          {/* ── RIGHT COLUMN: BENEFITS ──────────────────────────────────── */}
          <div className="space-y-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="flex gap-5 p-6 bg-gray-50 rounded-xl border border-gray-100 hover:border-sky-200 hover:bg-sky-50/30 transition-colors"
                >
                  {/* Icon in a rounded container */}
                  <div className="w-12 h-12 bg-navy-900 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-sky-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1.5">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* ── POSITIONS NOTE ────────────────────────────────────────── */}
            <div className="p-6 bg-navy-900 rounded-xl text-center">
              <p className="text-white font-semibold mb-1">Open Positions</p>
              <p className="text-gray-400 text-sm">
                We accept applications on a rolling basis. Even if no specific
                role is advertised, we review all CVs and keep them on file for
                future opportunities.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

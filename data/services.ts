/**
 * data/services.ts
 *
 * This file is the SINGLE SOURCE OF TRUTH for all service content on the site.
 * All service-related components (ServiceCard, ServicesList, ServicesPreview)
 * import their data from HERE — they never hardcode content themselves.
 *
 * WHY SEPARATE DATA FROM UI?
 * -----------------------------------------------------------------------
 * Keeping content in a dedicated data file means:
 * - To add, edit, or remove a service: change ONLY this file.
 * - No hunting through multiple component files for text.
 * - In the future, this array could be replaced with an API call or CMS query
 *   without touching any component files.
 *
 * TYPESCRIPT INTERFACE:
 * -----------------------------------------------------------------------
 * We define a TypeScript interface (ServiceItem) to describe the shape of
 * each object in the services array. This gives us:
 * - Auto-complete in your editor when accessing service properties
 * - Compile-time errors if you forget a required field
 * - Self-documenting code — anyone reading this knows exactly what a service object contains
 */

// ServiceItem describes the exact shape of each service entry.
// Every object in the services[] array must match this shape.
export interface ServiceItem {
  id: number;        // Unique number 1–7, used as a visual label on cards
  title: string;     // The service name displayed as the card heading
  summary: string;   // One-sentence description used in preview/teaser cards
  details: string[]; // Full bullet-point list of specific activities for the Services page
  icon: string;      // The name of the Lucide React icon to display (e.g., "MapPin")
                     // This is a string here, then mapped to an actual component in ServiceCard.tsx
  fill: number;      // Liquid level of this service's test tube on the home page (0–1).
                     // 0 = empty tube, 1 = completely full. Tweak per service to taste —
                     // the ServicesScroller "tube rack" reads this value directly.
}

// The complete services array — all 7 CROMNIA services extracted from company documents.
export const services: ServiceItem[] = [
  {
    id: 1,
    title: "Site Selection and Feasibility",
    summary:
      "Comprehensive evaluation of investigator sites to identify the optimal locations for successful clinical trial execution.",
    details: [
      "Evaluation of eligible patient numbers per site",
      "Assessment of site staff experience and ICH-GCP training compliance",
      "Review of trial facilities, equipment, and infrastructure",
      "Assessment of investigator interest and commitment",
      "Analysis of previous site experience and recruitment history",
      "Evaluation against additional sponsor-specific requirements",
    ],
    icon: "MapPin",
    fill: 0.6,
  },
  {
    id: 2,
    title: "Clinical and Observational Trial Management",
    summary:
      "End-to-end management of Phase II–IV clinical and observational research projects across all therapeutic areas.",
    details: [
      "Site Qualification Visit (SQV) — evaluating site suitability before trial start",
      "Site Initiation Visit (SIV) — training and setting up the site for trial conduct",
      "Site Monitoring Visit (SMV) — ongoing oversight during the trial",
      "Site Close-Out Visit (SCOV) — formal trial closure and reconciliation",
      "Study drug and investigational materials management",
      "Investigator contract negotiation and management",
      "Trial Master File (TMF) preparation and maintenance",
      "Project management and vendor coordination",
    ],
    icon: "ClipboardList",
    fill: 0.78,
  },
  {
    id: 3,
    title: "Regulatory Affairs",
    summary:
      "Expert handling of all regulatory submissions and compliance requirements from Ministry of Health to Local Ethics Committees.",
    details: [
      "Preparation and submission of applications to regulatory authorities (MoH) and Local Ethics Committees (LECs)",
      "Investigational product (IP) import and export license management",
      "Amendment submissions and regulatory notifications",
      "Safety reporting (IND safety reports, SUSAR notifications)",
      "Annual reporting and final report notifications",
      "Contract negotiation with regulatory bodies",
      "Investigational product destruction permission management",
    ],
    icon: "FileCheck",
    fill: 0.5,
  },
  {
    id: 4,
    title: "Medical Writing",
    summary:
      "Professional clinical documentation produced in collaboration with investigators and scientists across all therapeutic areas.",
    details: [
      "Protocol writing and scientific development",
      "Final Study Report (FSR) preparation",
      "Case Report Form (CRF) design and development",
      "Informed Consent Form (ICF) design",
      "Statistical analysis planning and activities",
      "Documentation and abstracts for congress exhibits and publications",
    ],
    icon: "PenLine",
    fill: 0.66,
  },
  {
    id: 5,
    title: "Site Coordinator Services",
    summary:
      "Dedicated on-site coordinators supporting investigator sites with day-to-day trial operations and patient management.",
    details: [
      "Patient recruitment support and screening coordination",
      "Informed consent procedure assistance",
      "Trial Master File (TMF) tracking and maintenance",
      "Source documentation and data entry accuracy checks",
      "Case Report Form (CRF) completion and query follow-up",
      "Laboratory sample management and logistics",
      "Investigational product accountability and temperature monitoring",
      "Preparation for monitoring visits and regulatory audits",
    ],
    icon: "Users",
    fill: 0.55,
  },
  {
    id: 6,
    title: "Medical Translation",
    summary:
      "Precise, on-time medical translation services delivered by a physician-led team with deep clinical expertise.",
    details: [
      "Summary of Product Characteristics (SmPC) translation",
      "Patient Information Leaflets (PIL) translation",
      "Product labelling and packaging text translation",
      "Informed Consent Form (ICF) translation and back-translation",
      "Clinical trial protocol translation",
      "Case Report Form (CRF) translation",
      "Investigator Brochure (IB) translation",
      "Scientific articles and technical documents",
    ],
    icon: "Languages",
    fill: 0.72,
  },
  {
    id: 7,
    title: "Investigator Meeting Organization",
    summary:
      "Full-service planning and execution of investigator kick-off meetings, including logistics, travel, and presentations.",
    details: [
      "Participant invitation management and confirmation tracking",
      "Study material preparation and distribution",
      "Travel arrangement assistance for investigators and staff",
      "Venue selection and on-site service coordination",
      "Team training sessions and presentation support",
      "Translation and interpreting services during meetings",
      "Administrative support throughout the event lifecycle",
    ],
    icon: "CalendarDays",
    fill: 0.45,
  },
];

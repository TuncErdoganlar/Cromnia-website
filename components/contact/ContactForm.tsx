/**
 * components/contact/ContactForm.tsx
 *
 * A controlled React contact form with client-side validation.
 *
 * "use client" IS REQUIRED HERE because this component:
 * 1. Uses `useState` to track form field values and validation errors
 * 2. Uses `useState` to show a success message after submission
 * 3. Handles browser events (onChange, onSubmit)
 *
 * FORM FIELDS (from CROMNIA Website document):
 * -----------------------------------------------------------------------
 * - Name (required)
 * - Organisation
 * - Position
 * - Phone Number (required)
 * - E-mail Address (required, validated format)
 * - Message / Description
 * - Document upload (plain text, Word, or PDF only)
 *
 * VALIDATION APPROACH:
 * -----------------------------------------------------------------------
 * We use "controlled components" — React state drives the value of every
 * input field. On submit, we validate the `formData` state object.
 * If errors exist, we update the `errors` state (which re-renders the form
 * with error messages). If valid, we show the success screen.
 *
 * NOTE ON REAL EMAIL DELIVERY:
 * -----------------------------------------------------------------------
 * This form only handles client-side validation and shows a success UI.
 * It does NOT actually send an email. For production, add one of:
 *
 * Option A — Next.js Server Action:
 *   Create app/actions/sendEmail.ts with `"use server"` and use
 *   nodemailer or Resend (resend.com) to send the email.
 *   Call it from handleSubmit: `await sendEmailAction(formData)`
 *
 * Option B — Third-party form service:
 *   Sign up at formspree.io, add their endpoint to the form `action`,
 *   and remove the handleSubmit override.
 *
 * Option C — EmailJS:
 *   Use emailjs.com's browser SDK to send directly from the client
 *   (no server required). Add their package: npm install @emailjs/browser
 */
"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// ── FORM DATA TYPE ────────────────────────────────────────────────────────────
// TypeScript interface describing the shape of our form state.
// `File | null` means the document field can hold a File object or be empty.
interface FormData {
  name: string;
  organisation: string;
  position: string;
  phone: string;
  email: string;
  message: string;
  document: File | null;
}

// ── INITIAL FORM STATE ────────────────────────────────────────────────────────
// Empty strings for text fields, null for the file input.
// We define this as a constant so we can reset to it easily.
const initialFormData: FormData = {
  name: "",
  organisation: "",
  position: "",
  phone: "",
  email: "",
  message: "",
  document: null,
};

/**
 * ContactForm Component
 *
 * Renders a controlled form with live validation and success feedback.
 */
export default function ContactForm() {
  // ── FORM STATE ────────────────────────────────────────────────────────────
  // `formData` holds the current value of every field
  const [formData, setFormData] = useState<FormData>(initialFormData);

  // `errors` holds validation error messages keyed by field name
  // Record<string, string> = an object where keys and values are strings
  const [errors, setErrors] = useState<Record<string, string>>({});

  // `submitted` controls whether to show the success message
  const [submitted, setSubmitted] = useState(false);

  // `isSubmitting` prevents double-clicks on the submit button
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ── TEXT INPUT HANDLER ────────────────────────────────────────────────────
  // This single handler works for ALL text inputs and textarea.
  // `e.target.name` reads the `name` attribute of the changed input.
  // `[e.target.name]` is JavaScript "computed property key" syntax —
  // it uses the variable's value as the object key name.
  // So typing in the "email" input calls: setFormData({ ...formData, email: newValue })
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear the error for this field as soon as the user starts typing again
    // This is better UX — errors disappear the moment the user corrects them
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  // ── FILE INPUT HANDLER ────────────────────────────────────────────────────
  // File inputs work differently from text inputs — we read `e.target.files`
  // which is a FileList. We take the first file [0] or null if none selected.
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFormData((prev) => ({ ...prev, document: file }));
  };

  // ── VALIDATION ────────────────────────────────────────────────────────────
  // Returns an errors object. Empty object = all valid. Non-empty = has errors.
  const validate = (): Record<string, string> => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      // Regex explanation:
      // ^[^\s@]+  → starts with one or more non-space, non-@ characters (local part)
      // @         → the @ symbol
      // [^\s@]+   → domain name (no spaces or @)
      // \.        → a literal dot (escaped because . means "any character" in regex)
      // [^\s@]+$  → top-level domain (no spaces or @) to end of string
      newErrors.email = "Please enter a valid email address.";
    }

    return newErrors;
  };

  // ── SUBMIT HANDLER ────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent the default browser behavior of reloading the page on form submit
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      // If there are errors, update the errors state and stop
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    // ── SIMULATED SUBMISSION ─────────────────────────────────────────────
    // This setTimeout simulates a real API call (0.8s delay).
    // REPLACE THIS with a real Server Action or API call for production.
    // Example with a Server Action:
    //   import { sendContactEmail } from "@/app/actions/sendEmail";
    //   await sendContactEmail(formData);
    await new Promise((resolve) => setTimeout(resolve, 800));

    setIsSubmitting(false);
    setSubmitted(true);
  };

  // ── SUCCESS STATE ─────────────────────────────────────────────────────────
  // If form was submitted successfully, show a thank-you message instead of the form
  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 flex flex-col items-center justify-center text-center min-h-[400px]">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-5">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Message Sent!
        </h3>
        <p className="text-gray-500 text-sm mb-6 max-w-xs">
          Thank you for contacting CROMNIA. Our team will review your message
          and get back to you shortly.
        </p>
        {/* Reset button — clears the form and shows it again */}
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData(initialFormData);
            setErrors({});
          }}
          className="text-sm text-sky-600 hover:text-sky-700 font-medium transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  // ── FORM RENDER ───────────────────────────────────────────────────────────
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        Send Us a Message
      </h2>

      {/*
       * noValidate → disables browser's built-in HTML5 validation popups.
       * We handle all validation ourselves in the `validate()` function above,
       * which gives us full control over error messages and styling.
       */}
      <form onSubmit={handleSubmit} noValidate className="space-y-5">

        {/* ── ROW 1: Name + Organisation ─────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="Name"
            required
            error={errors.name}
          >
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              className={inputClass(!!errors.name)}
            />
          </FormField>

          <FormField label="Organisation" error={errors.organisation}>
            <input
              type="text"
              name="organisation"
              id="organisation"
              value={formData.organisation}
              onChange={handleChange}
              placeholder="Company or institution"
              className={inputClass(false)}
            />
          </FormField>
        </div>

        {/* ── ROW 2: Position + Phone ─────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Position" error={errors.position}>
            <input
              type="text"
              name="position"
              id="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="Your job title"
              className={inputClass(false)}
            />
          </FormField>

          <FormField label="Phone Number" required error={errors.phone}>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+90 ..."
              className={inputClass(!!errors.phone)}
            />
          </FormField>
        </div>

        {/* ── EMAIL ────────────────────────────────────────────────────── */}
        <FormField label="Email Address" required error={errors.email}>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={inputClass(!!errors.email)}
          />
        </FormField>

        {/* ── MESSAGE ──────────────────────────────────────────────────── */}
        <FormField label="Message" error={errors.message}>
          <textarea
            name="message"
            id="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            placeholder="Describe the nature of your enquiry, project details, or what services you need..."
            className={cn(inputClass(false), "resize-y min-h-[120px]")}
          />
        </FormField>

        {/* ── FILE UPLOAD ──────────────────────────────────────────────── */}
        <div>
          <label
            htmlFor="document"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Supporting Document
            <span className="text-gray-400 text-xs font-normal ml-2">
              (optional — plain text, Word, or PDF)
            </span>
          </label>
          <input
            type="file"
            name="document"
            id="document"
            accept=".txt,.doc,.docx,.pdf"
            onChange={handleFileChange}
            // File inputs have their own styling conventions — we use a custom class
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-medium
              file:bg-navy-50 file:text-navy-700
              hover:file:bg-navy-100
              cursor-pointer
              border border-gray-200 rounded-lg p-2"
          />
          {/* Show the name of the selected file */}
          {formData.document && (
            <p className="mt-1.5 text-xs text-green-600 font-medium">
              ✓ {formData.document.name}
            </p>
          )}
        </div>

        {/* ── SUBMIT BUTTON ─────────────────────────────────────────────── */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "w-full inline-flex items-center justify-center gap-2",
            "font-semibold py-3 px-6 rounded-lg transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-500",
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-navy-500 hover:bg-navy-600 text-white shadow-md hover:shadow-lg"
          )}
        >
          {isSubmitting ? (
            <>
              {/* Simple CSS spinner using animate-spin */}
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Send Message
            </>
          )}
        </button>

        {/* Required fields note */}
        <p className="text-xs text-gray-400 text-center">
          Fields marked with <span className="text-red-500">*</span> are required.
        </p>

      </form>
    </div>
  );
}

// ── HELPER: FormField ─────────────────────────────────────────────────────────
// A small internal component (not exported) that wraps a form field with:
// - A label
// - The field input (passed as children)
// - An optional error message
//
// This avoids repeating the label + error pattern for every field.
// The `interface` is local to this file — no need to export it.
interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

function FormField({ label, required, error, children }: FormFieldProps) {
  // Best-effort: derive `htmlFor` from the child input's `id` so the label
  // is properly associated with its control for screen readers.
  // (Existing inputs in this file all carry matching `name` + `id` props.)
  const child = children as React.ReactElement<{ id?: string; name?: string }>;
  const inputId = child?.props?.id ?? child?.props?.name;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={inputId} className="text-body-sm font-medium text-gray-700">
        {label}
        {required && (
          <>
            <span aria-hidden="true" className="text-feedback-danger ml-0.5">*</span>
            <span className="sr-only"> (required)</span>
          </>
        )}
      </label>

      {children}

      {/* Error region — role="alert" announces validation problems to AT */}
      {error && (
        <div
          role="alert"
          className="flex items-center gap-1.5 text-feedback-danger text-caption"
        >
          <AlertCircle aria-hidden="true" className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

// ── HELPER: inputClass ─────────────────────────────────────────────────────────
// Returns the Tailwind classes for an input element.
// `hasError` switches the border to red when validation fails.
function inputClass(hasError: boolean): string {
  return cn(
    // Base styles
    "block w-full rounded-lg border py-2.5 px-4 text-sm text-gray-900",
    "placeholder:text-gray-400",
    "focus:outline-none focus:ring-2 focus:ring-offset-0",
    "transition-colors duration-150",
    // Conditional border color
    hasError
      ? "border-red-300 focus:border-red-400 focus:ring-red-200 bg-red-50"
      : "border-gray-200 focus:border-navy-400 focus:ring-navy-100 bg-white"
  );
}

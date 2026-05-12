/**
 * tailwind.config.ts
 *
 * This is the Tailwind CSS configuration file. It is the single source of
 * truth for your entire design system — colors, fonts, spacing, etc.
 *
 * HOW TAILWIND WORKS:
 * Tailwind scans all the files listed in `content` and generates ONLY the
 * CSS classes actually used in your code. This keeps the final CSS file tiny.
 * The `theme.extend` block lets you ADD custom values on top of Tailwind's
 * built-in defaults — you don't lose any built-in classes by adding here.
 */

import type { Config } from "tailwindcss";

const config: Config = {
  // -----------------------------------------------------------------------
  // CONTENT PATHS
  // Tell Tailwind where to look for class names. It will scan these files
  // and only include CSS for classes it finds. If you add a new folder or
  // file type, add it here or your styles won't be generated.
  // -----------------------------------------------------------------------
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  // -----------------------------------------------------------------------
  // THEME EXTENSIONS
  // The `extend` key merges your custom values with Tailwind's defaults.
  // Without `extend`, you would REPLACE the defaults entirely.
  // -----------------------------------------------------------------------
  theme: {
    extend: {
      // CUSTOM COLOR PALETTE — CROMNIA Brand Colors
      // These become usable as: bg-navy-900, text-sky-400, border-navy-500, etc.
      // The numbers follow Tailwind's convention: 50 (lightest) → 900 (darkest)
      colors: {
        navy: {
          50: "#EFF4FF",   // Very light navy tint — used for icon container backgrounds
          100: "#DBEAFE",  // Light navy tint
          400: "#60A5FA",  // Medium navy — used for lighter text on dark backgrounds
          500: "#2563EB",  // Primary brand blue — CTA buttons, active states
          600: "#1D4ED8",  // Slightly darker — button hover states
          700: "#1B3A6B",  // Dark navy — card hover borders, badge backgrounds
          800: "#112240",  // Very dark navy — footer background
          900: "#0A1628",  // Deepest navy — hero section, main dark backgrounds
        },
        // Note: sky-400 (#38BDF8) is already in Tailwind's defaults.
        // We use it for accent icons, underline bars, and highlighted text.
      },

      // CUSTOM FONT FAMILY
      // After adding Inter in app/layout.tsx via next/font, we make it the
      // default sans-serif font for the whole site.
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },

  // -----------------------------------------------------------------------
  // PLUGINS
  // @tailwindcss/forms resets browser default styling on form elements
  // (<input>, <textarea>, <select>) so they look consistent across browsers
  // and are easier to style from scratch with Tailwind utilities.
  // Without this plugin, form fields look very different in Chrome vs Firefox.
  // -----------------------------------------------------------------------
  plugins: [
    require("@tailwindcss/forms"),
  ],
};

export default config;

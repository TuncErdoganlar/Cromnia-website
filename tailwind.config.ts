/**
 * tailwind.config.ts
 *
 * Single source of truth for the CROMNIA design system.
 *
 * Structure:
 *   1. content        - files Tailwind scans for class names
 *   2. theme.extend   - design tokens layered on top of Tailwind defaults
 *      a. colors      - raw brand palette (navy/sky) + SEMANTIC tokens
 *                       Semantic tokens read CSS variables defined in
 *                       styles/globals.css.
 *      b. fontFamily  - Inter (loaded via next/font in app/layout.tsx)
 *      c. fontSize    - typography SCALE: every entry is a [size, options]
 *                       tuple that ships its own lineHeight + letterSpacing.
 *                       Use semantic names (display, h1..h4, body, caption).
 *      d. borderRadius/boxShadow - semantic radius / elevation tokens
 *   3. plugins        - @tailwindcss/forms for sane <input>/<textarea> resets
 *
 * Backward compatibility:
 *   Every existing `bg-navy-900`, `text-sky-400`, `text-3xl`, ... class
 *   still works exactly as before. The new semantic tokens are additive.
 */

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        // Raw brand palette (kept for backward compatibility)
        navy: {
          50: "#EFF4FF",
          100: "#DBEAFE",
          400: "#60A5FA",
          500: "#2563EB",
          600: "#1D4ED8",
          700: "#1B3A6B",
          800: "#112240",
          900: "#0A1628",
        },

        // Semantic tokens (PREFER these in new code)
        brand: {
          primary: "rgb(var(--color-brand-primary) / <alpha-value>)",
          "primary-hover": "rgb(var(--color-brand-primary-hover) / <alpha-value>)",
          accent: "rgb(var(--color-brand-accent) / <alpha-value>)",
          "accent-soft": "rgb(var(--color-brand-accent-soft) / <alpha-value>)",
        },
        surface: {
          default: "rgb(var(--color-surface-default) / <alpha-value>)",
          subtle: "rgb(var(--color-surface-subtle) / <alpha-value>)",
          elevated: "rgb(var(--color-surface-elevated) / <alpha-value>)",
          inverted: "rgb(var(--color-surface-inverted) / <alpha-value>)",
          "inverted-soft": "rgb(var(--color-surface-inverted-soft) / <alpha-value>)",
        },
        content: {
          primary: "rgb(var(--color-content-primary) / <alpha-value>)",
          secondary: "rgb(var(--color-content-secondary) / <alpha-value>)",
          muted: "rgb(var(--color-content-muted) / <alpha-value>)",
          inverted: "rgb(var(--color-content-inverted) / <alpha-value>)",
          "on-inverted": "rgb(var(--color-content-on-inverted) / <alpha-value>)",
        },
        border: {
          subtle: "rgb(var(--color-border-subtle) / <alpha-value>)",
          default: "rgb(var(--color-border-default) / <alpha-value>)",
          strong: "rgb(var(--color-border-strong) / <alpha-value>)",
          "on-inverted": "rgb(var(--color-border-on-inverted) / <alpha-value>)",
        },
        feedback: {
          success: "rgb(var(--color-feedback-success) / <alpha-value>)",
          warning: "rgb(var(--color-feedback-warning) / <alpha-value>)",
          danger: "rgb(var(--color-feedback-danger) / <alpha-value>)",
        },
      },

      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "monospace"],
      },

      // Semantic typography scale.
      // Each entry: [fontSize, { lineHeight, letterSpacing, fontWeight }]
      //   display   - largest hero copy (fluid via clamp)
      //   h1..h4    - section / card titles
      //   body-lg   - lead paragraphs
      //   body      - default copy
      //   body-sm   - meta / dense copy
      //   caption   - small labels
      //   eyebrow   - uppercase pre-labels above headings
      fontSize: {
        display: ["clamp(3rem, 6vw + 1rem, 4.75rem)", { lineHeight: "1.05", letterSpacing: "-0.025em", fontWeight: "700" }],
        h1: ["clamp(2.25rem, 3vw + 1rem, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        h2: ["clamp(1.875rem, 2vw + 1rem, 2.25rem)", { lineHeight: "1.15", letterSpacing: "-0.015em", fontWeight: "700" }],
        h3: ["1.5rem", { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "700" }],
        h4: ["1.25rem", { lineHeight: "1.3", letterSpacing: "-0.005em", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.65" }],
        body: ["1rem", { lineHeight: "1.65" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6" }],
        caption: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.04em" }],
        eyebrow: ["0.8125rem", { lineHeight: "1.3", letterSpacing: "0.08em", fontWeight: "600" }],
      },

      borderRadius: {
        control: "0.5rem",
        card: "1rem",
        panel: "1.25rem",
        pill: "9999px",
      },

      boxShadow: {
        "elev-1": "0 1px 2px 0 rgb(15 23 42 / 0.06), 0 1px 3px 0 rgb(15 23 42 / 0.08)",
        "elev-2": "0 4px 6px -1px rgb(15 23 42 / 0.08), 0 2px 4px -2px rgb(15 23 42 / 0.06)",
        "elev-3": "0 10px 15px -3px rgb(15 23 42 / 0.1), 0 4px 6px -4px rgb(15 23 42 / 0.08)",
        "elev-4": "0 20px 25px -5px rgb(15 23 42 / 0.12), 0 8px 10px -6px rgb(15 23 42 / 0.08)",
      },
    },
  },

  plugins: [
    require("@tailwindcss/forms"),
  ],
};

export default config;

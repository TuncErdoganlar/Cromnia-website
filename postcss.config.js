/**
 * postcss.config.js
 *
 * PostCSS is a CSS processing tool that Tailwind CSS depends on.
 * This file tells PostCSS which plugins to use:
 *
 * - tailwindcss: Reads your tailwind.config.ts and generates all the
 *   utility classes (like bg-blue-500, text-xl, flex, etc.)
 *
 * - autoprefixer: Automatically adds browser-specific prefixes to CSS rules
 *   (e.g., -webkit-, -moz-) so your styles work across all browsers.
 *
 * You almost never need to change this file.
 */
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

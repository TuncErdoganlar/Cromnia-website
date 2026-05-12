/**
 * next.config.js
 *
 * This is the Next.js configuration file. It runs on the Node.js server side,
 * not in the browser. You can customize how Next.js builds and serves your app here.
 *
 * For most simple projects, you don't need to change anything here.
 * As your project grows, you might add:
 *   - images.domains: to allow Next.js <Image> to load from external URLs
 *   - redirects(): to set up URL redirects (e.g., /old-page → /new-page)
 *   - headers(): to add custom HTTP headers for security
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // reactStrictMode enables extra development warnings and checks.
  // It helps you catch bugs early. Always keep this true.
  reactStrictMode: true,
};

module.exports = nextConfig;

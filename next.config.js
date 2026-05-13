/**
 * next.config.js
 *
 * Production-tuned Next.js configuration.
 *
 * WHAT THIS CONFIG DOES
 * -----------------------------------------------------------------------
 *   reactStrictMode     -> enables React's extra dev warnings/checks
 *   poweredByHeader off -> hides the `X-Powered-By: Next.js` HTTP header
 *   compress            -> enable gzip on the response (Next.js default)
 *   images.formats      -> opt-in to modern AVIF + WebP formats so any future
 *                          <Image> usage produces smaller, faster files.
 *   experimental.optimizePackageImports
 *                       -> tree-shake `lucide-react` so the full icon set
 *                          never lands in the client bundle.
 *   async headers()     -> ships basic security headers (no-sniff, frame
 *                          options, referrer policy, permissions policy).
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin({
  requestConfig: "./src/i18n/request.ts",
  // Compile the ICU messages at build time, so the browser doesn't need the message parser.
  experimental: { messages: { path: "./messages", format: "json", locales: "infer", precompile: true } },
});

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Google review author avatars.
    remotePatterns: [{ protocol: "https", hostname: "lh3.googleusercontent.com" }],
  },
  // Fonts and logo files read from disk by the Open Graph image route.
  outputFileTracingIncludes: { "/og": ["./src/assets/fonts/**", "./src/assets/brand/mark.png", "./src/assets/brand/wordmark-light.png"] },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/(images|icons|textures)/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
      },
    ];
  },
};

export default withNextIntl(nextConfig);

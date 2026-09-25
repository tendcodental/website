import { defineRouting } from "next-intl/routing";

export const locales = ["bg", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "bg";

export const routing = defineRouting({
  locales,
  defaultLocale,
  // Bulgarian lives at the root (/uslugi), English under /en (/en/services).
  localePrefix: "as-needed",
  // No Accept-Language redirects: crawlers and visitors always get the URL they asked for.
  localeDetection: false,
  localeCookie: false,
  // hreflang alternates are emitted per page in metadata (service slugs differ per language).
  alternateLinks: false,
  pathnames: {
    "/": "/",
    "/services": { bg: "/uslugi", en: "/services" },
    "/services/[category]": { bg: "/uslugi/[category]", en: "/services/[category]" },
    "/services/[category]/[service]": {
      bg: "/uslugi/[category]/[service]",
      en: "/services/[category]/[service]",
    },
    "/about": { bg: "/za-nas", en: "/about" },
    "/team": { bg: "/ekip", en: "/team" },
    "/contact": { bg: "/kontakti", en: "/contact" },
    "/book": { bg: "/zapazi-chas", en: "/book" },
    "/privacy": { bg: "/poveritelnost", en: "/privacy" },
  },
});

export type AppPathname = keyof typeof routing.pathnames;

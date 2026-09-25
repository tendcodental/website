import type { MetadataRoute } from "next";
import { clinic, CONTENT_UPDATED, SITE_URL } from "@/content/clinic";
import { serviceCategories } from "@/content/services";
import type { Locale } from "@/i18n/routing";
import { absoluteUrl, type Href, localizedPaths } from "@/lib/seo";

/** One entry per page and language, each listing its bg/en alternates (hreflang), Bulgarian first. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(CONTENT_UPDATED);
  const entries: MetadataRoute.Sitemap = [];

  function add(hrefs: Record<Locale, Href>, priority: number, changeFrequency: "weekly" | "monthly" | "yearly", images?: string[]) {
    const paths = localizedPaths(hrefs);
    const languages = { bg: absoluteUrl(paths.bg), en: absoluteUrl(paths.en), "x-default": absoluteUrl(paths.bg) };
    for (const locale of ["bg", "en"] as const) {
      entries.push({
        url: absoluteUrl(paths[locale]),
        lastModified,
        changeFrequency,
        priority: locale === "bg" ? priority : Math.max(0.1, priority - 0.2),
        alternates: { languages },
        ...(images ? { images } : {}),
      });
    }
  }

  const photos = [`${SITE_URL}${clinic.images.interior}`, `${SITE_URL}${clinic.images.entrance}`];

  add({ bg: "/", en: "/" }, 1, "weekly", photos);
  add({ bg: "/book", en: "/book" }, 0.9, "monthly");
  add({ bg: "/services", en: "/services" }, 0.9, "monthly");
  for (const c of serviceCategories) {
    add(
      {
        bg: { pathname: "/services/[category]", params: { category: c.text.bg.slug } },
        en: { pathname: "/services/[category]", params: { category: c.text.en.slug } },
      },
      c.urgent ? 0.9 : 0.8,
      "monthly",
    );
    for (const s of c.children) {
      add(
        {
          bg: { pathname: "/services/[category]/[service]", params: { category: c.text.bg.slug, service: s.text.bg.slug } },
          en: { pathname: "/services/[category]/[service]", params: { category: c.text.en.slug, service: s.text.en.slug } },
        },
        s.urgent ? 0.8 : 0.7,
        "monthly",
      );
    }
  }
  add({ bg: "/about", en: "/about" }, 0.7, "monthly", photos);
  add({ bg: "/team", en: "/team" }, 0.7, "monthly");
  add({ bg: "/contact", en: "/contact" }, 0.8, "monthly", [`${SITE_URL}${clinic.images.entrance}`]);
  add({ bg: "/privacy", en: "/privacy" }, 0.2, "yearly");

  return entries;
}

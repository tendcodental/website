import type { Metadata } from "next";
import { SITE_URL } from "@/content/clinic";
import { getPathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export type Href = Parameters<typeof getPathname>[0]["href"];

export const absoluteUrl = (path: string) => `${SITE_URL}${path === "/" ? "/" : path}`;

export function localizedPaths(hrefs: Record<Locale, Href>) {
  return {
    bg: getPathname({ locale: "bg", href: hrefs.bg }),
    en: getPathname({ locale: "en", href: hrefs.en }),
  };
}

export function ogImageUrl(title: string, locale: Locale, kicker?: string) {
  const params = new URLSearchParams({ title, locale });
  if (kicker) params.set("kicker", kicker);
  return `${SITE_URL}/og?${params}`;
}

/**
 * Per-page metadata: title, description, canonical, hreflang (bg / en / x-default), Open Graph and
 * Twitter cards. `hrefs` holds the page's route in each language (service slugs differ per language).
 */
export function pageMetadata({
  locale,
  hrefs,
  title,
  description,
  absoluteTitle = false,
  kicker,
  noIndex = false,
}: {
  locale: Locale;
  hrefs: Record<Locale, Href>;
  title: string;
  description: string;
  absoluteTitle?: boolean;
  kicker?: string;
  noIndex?: boolean;
}): Metadata {
  const paths = localizedPaths(hrefs);
  const url = absoluteUrl(paths[locale]);
  const fullTitle = absoluteTitle ? title : `${title} | T&Co Dental`;
  const image = ogImageUrl(title, locale, kicker);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: {
        bg: absoluteUrl(paths.bg),
        en: absoluteUrl(paths.en),
        "x-default": absoluteUrl(paths.bg),
      },
    },
    openGraph: {
      type: "website",
      siteName: "T&Co Dental",
      url,
      title: fullTitle,
      description,
      locale: locale === "bg" ? "bg_BG" : "en_GB",
      alternateLocale: locale === "bg" ? ["en_GB"] : ["bg_BG"],
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    robots: noIndex ? { index: false, follow: true } : undefined,
  };
}

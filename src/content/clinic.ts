import type { Locale } from "@/i18n/routing";

export type Localized<T = string> = Record<Locale, T>;

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://tandcodental.com").replace(/\/$/, "");

/** Bump when page content changes meaningfully, used as <lastmod> in the sitemap. */
export const CONTENT_UPDATED = "2026-09-24";

export const clinic = {
  name: "T&Co Dental",
  email: "contact@tandcodental.com",
  address: {
    street: { bg: "ул. „Даме Груев“ 34", en: "34 Dame Gruev St." } as Localized,
    streetSchema: "ул. Даме Груев 34",
    city: { bg: "Пловдив", en: "Plovdiv" } as Localized,
    district: { bg: "район Южен", en: "Yuzhen district" } as Localized,
    // TODO: confirm the postal code for ul. Dame Gruev 34 and fill it in (left empty rather than guessed).
    postalCode: "",
    region: { bg: "Пловдив", en: "Plovdiv Province" } as Localized,
    countryCode: "BG",
    country: { bg: "България", en: "Bulgaria" } as Localized,
  },
  /**
   * Approximate point on ul. Dame Gruev (Yuzhen district). Verify by dropping a pin on the entrance in
   * Google Maps and pasting the coordinates here. Navigation links use the street address, not these.
   */
  geo: { lat: 42.13006, lng: 24.7486 },
  /** Regular (planned) appointments. Emergencies are handled 24/7 by phone. */
  regularHours: { days: ["Mo", "Tu", "We", "Th", "Fr"] as const, opens: "09:00", closes: "18:00" },
  socials: {
    facebook:
      "https://www.facebook.com/p/%D0%94%D0%B5%D0%BD%D0%BE%D0%BD%D0%BE%D1%89%D0%B5%D0%BD-%D0%97%D1%8A%D0%B1%D0%BE%D0%BB%D0%B5%D0%BA%D0%B0%D1%80%D1%81%D0%BA%D0%B8-%D0%9A%D0%B0%D0%B1%D0%B8%D0%BD%D0%B5%D1%82-%D0%A1%D0%BF%D0%B5%D1%88%D0%B5%D0%BD-247-%D0%A2-%D0%B5%D0%BD%D0%B4-%D0%9A%D0%BE-%D0%94%D0%B5%D0%BD%D1%82%D0%B0%D0%BB-61587490564038/",
    instagram: "https://www.instagram.com/tandcodental",
  },
  images: {
    interior: "/images/clinic-interior.jpg",
    entrance: "/images/clinic-entrance.jpg",
    logo: "/images/logo-marble.jpg",
  },
} as const;

export function fullAddress(locale: Locale) {
  const a = clinic.address;
  const parts = [a.street[locale], [a.postalCode, a.city[locale]].filter(Boolean).join(" "), a.country[locale]];
  return parts.join(", ");
}

/** Universal links: open the native Google Maps / Waze app on phones, the website on desktop. */
export const mapLinks = {
  googleDirections: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    "T&Co Dental, ул. Даме Груев 34, Пловдив, България",
  )}`,
  googleSearch: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    "ул. Даме Груев 34, Пловдив, България",
  )}`,
  waze: `https://waze.com/ul?q=${encodeURIComponent("ул. Даме Груев 34, Пловдив")}&navigate=yes`,
};

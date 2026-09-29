import { clinic, SITE_URL } from "@/content/clinic";
import { type Doctor, doctors } from "@/content/doctors";
import type { Guide } from "@/content/guides";
import { serviceCategories } from "@/content/services";
import type { Locale } from "@/i18n/routing";
import { env } from "./env";
import { absoluteUrl, localizedPaths } from "./seo";

/** Structured data (schema.org JSON-LD). */

export const CLINIC_ID = `${SITE_URL}/#clinic`;
export const EMERGENCY_ID = `${SITE_URL}/#emergency`;

const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const ALL_DAYS = [...WEEKDAYS, "Saturday", "Sunday"];

/** The clinic's Google Maps listing (Business Profile), from the Place ID also used for reviews. */
export const googleMapsPlaceUrl = () =>
  env.placeId ? `https://www.google.com/maps/place/?q=place_id:${encodeURIComponent(env.placeId)}` : undefined;

/** Plovdiv plus the nearby towns and municipalities patients come from. */
const AREAS: Record<Locale, Array<[type: "City" | "AdministrativeArea", name: string]>> = {
  bg: [
    ["City", "Пловдив"],
    ["City", "Асеновград"],
    ["City", "Стамболийски"],
    ["City", "Раковски"],
    ["City", "Куклен"],
    ["AdministrativeArea", "Община Марица"],
    ["AdministrativeArea", "Община Родопи"],
    ["AdministrativeArea", "Област Пловдив"],
  ],
  en: [
    ["City", "Plovdiv"],
    ["City", "Asenovgrad"],
    ["City", "Stamboliyski"],
    ["City", "Rakovski"],
    ["City", "Kuklen"],
    ["AdministrativeArea", "Maritsa Municipality"],
    ["AdministrativeArea", "Rodopi Municipality"],
    ["AdministrativeArea", "Plovdiv Province"],
  ],
};
const areaServed = (locale: Locale) => AREAS[locale].map(([type, name]) => ({ "@type": type, name }));

function postalAddress(locale: Locale) {
  return {
    "@type": "PostalAddress",
    streetAddress: locale === "bg" ? clinic.address.streetSchema : clinic.address.street.en,
    addressLocality: clinic.address.city[locale],
    addressRegion: clinic.address.region[locale],
    ...(clinic.address.postalCode ? { postalCode: clinic.address.postalCode } : {}),
    addressCountry: clinic.address.countryCode,
  };
}

/**
 * The clinic as a Dentist (a LocalBusiness + MedicalBusiness subtype) with regular weekday hours, plus
 * a 24/7 emergency department, the accurate way to express "regular hours + round-the-clock emergencies".
 */
export function clinicSchema(locale: Locale, phones: string[]) {
  const home = absoluteUrl(localizedPaths({ bg: "/", en: "/" })[locale]);
  const book = absoluteUrl(localizedPaths({ bg: "/book", en: "/book" })[locale]);
  const bg = locale === "bg";
  const mapsUrl = googleMapsPlaceUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": CLINIC_ID,
    name: clinic.name,
    alternateName: ["Т енд Ко Дентал", "T and Co Dental"],
    description: bg
      ? "Денонощен и спешен зъболекар в Пловдив. Зъболекарски кабинет с дежурен лекар 24/7, включително нощем, в почивните дни и по празниците. Работи с НЗОК, прави зъбни снимки на място и работи с кофердам."
      : "24/7 emergency dentist in Plovdiv. A dental clinic with a dentist on duty around the clock, including nights, weekends and public holidays. NHIF contract, on-site dental X-rays and rubber dam isolation.",
    slogan: bg ? "Денонощен зъболекар в Пловдив" : "24/7 emergency dentist in Plovdiv",
    keywords: bg
      ? "денонощен зъболекар Пловдив, спешен зъболекар Пловдив, зъболекар Пловдив, спешна стоматологична помощ, НЗОК"
      : "24/7 dentist Plovdiv, emergency dentist Plovdiv, dentist Plovdiv, emergency dental care, NHIF",
    url: home,
    logo: `${SITE_URL}/brand/logo.png`,
    image: [`${SITE_URL}${clinic.images.interior}`, `${SITE_URL}${clinic.images.entrance}`, `${SITE_URL}${clinic.images.logo}`],
    telephone: phones[0],
    email: clinic.email,
    address: postalAddress(locale),
    geo: { "@type": "GeoCoordinates", latitude: clinic.geo.lat, longitude: clinic.geo.lng },
    hasMap: mapsUrl ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("ул. Даме Груев 34, Пловдив")}`,
    areaServed: areaServed(locale),
    priceRange: "$$",
    currenciesAccepted: "EUR",
    medicalSpecialty: "https://schema.org/Dentistry",
    isAcceptingNewPatients: true,
    knowsLanguage: ["bg", "en"],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: WEEKDAYS,
        opens: clinic.regularHours.opens,
        closes: clinic.regularHours.closes,
      },
    ],
    department: {
      "@type": ["Dentist", "EmergencyService"],
      "@id": EMERGENCY_ID,
      name: bg ? "T&Co Dental: спешна денонощна зъболекарска помощ" : "T&Co Dental: 24/7 emergency dental care",
      alternateName: bg
        ? ["Денонощен зъболекар Пловдив", "Спешен зъболекар Пловдив"]
        : ["24/7 dentist Plovdiv", "Emergency dentist Plovdiv"],
      areaServed: areaServed(locale),
      telephone: phones[0],
      address: postalAddress(locale),
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ALL_DAYS,
        opens: "00:00",
        closes: "23:59",
      },
    },
    sameAs: [clinic.socials.facebook, clinic.socials.instagram, clinic.socials.tiktok, ...(mapsUrl ? [mapsUrl] : [])],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: bg ? "Услуги" : "Services",
      itemListElement: serviceCategories.map((c) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: c.text[locale].title,
          url: absoluteUrl(
            localizedPaths({
              bg: { pathname: "/services/[category]", params: { category: c.text.bg.slug } },
              en: { pathname: "/services/[category]", params: { category: c.text.en.slug } },
            })[locale],
          ),
        },
      })),
    },
    potentialAction: {
      "@type": "ReserveAction",
      target: { "@type": "EntryPoint", urlTemplate: book, inLanguage: locale },
      result: { "@type": "Reservation", name: bg ? "Час при зъболекар" : "Dental appointment" },
    },
  };
}

export function websiteSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: clinic.name,
    inLanguage: locale,
    publisher: { "@id": CLINIC_ID },
  };
}

export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: item.url })),
  };
}

export function faqSchema(faq: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function serviceSchema({
  name,
  description,
  url,
  urgent,
  locale,
}: {
  name: string;
  description: string;
  url: string;
  urgent?: boolean;
  locale: Locale;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    serviceType: name,
    inLanguage: locale,
    provider: { "@id": urgent ? EMERGENCY_ID : CLINIC_ID },
    areaServed: areaServed(locale),
    ...(urgent ? { hoursAvailable: { "@type": "OpeningHoursSpecification", dayOfWeek: ALL_DAYS, opens: "00:00", closes: "23:59" } } : {}),
  };
}

export function doctorSchema(doctor: Doctor, locale: Locale, pageUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#${doctor.id}`,
    name: doctor.name[locale],
    jobTitle: doctor.role[locale],
    worksFor: { "@id": CLINIC_ID },
    url: pageUrl,
    ...(doctor.photo ? { image: `${SITE_URL}${doctor.photo}` } : {}),
    knowsAbout: doctor.focus[locale],
  };
}

export const allDoctorsSchema = (locale: Locale, pageUrl: string) => doctors.map((d) => doctorSchema(d, locale, pageUrl));

/** A patient guide: an Article about a health topic, published by the clinic. */
export function guideSchema(guide: Guide, locale: Locale, url: string, reviewer?: Doctor) {
  const text = guide.text[locale];
  return {
    "@context": "https://schema.org",
    "@type": ["Article", "MedicalWebPage"],
    "@id": `${url}#article`,
    headline: text.title,
    description: text.metaDescription,
    abstract: text.answer,
    url,
    mainEntityOfPage: url,
    inLanguage: locale,
    ...(guide.thumbnail ? { image: `${SITE_URL}${guide.thumbnail}` } : {}),
    datePublished: guide.published,
    dateModified: guide.updated,
    lastReviewed: guide.updated,
    audience: { "@type": "PeopleAudience", audienceType: locale === "bg" ? "Пациенти" : "Patients" },
    author: reviewer ? { "@id": `${SITE_URL}/#${reviewer.id}`, "@type": "Person", name: reviewer.name[locale] } : { "@id": CLINIC_ID },
    ...(reviewer ? { reviewedBy: { "@id": `${SITE_URL}/#${reviewer.id}`, "@type": "Person", name: reviewer.name[locale] } } : {}),
    publisher: { "@id": CLINIC_ID },
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };
}

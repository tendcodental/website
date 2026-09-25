import { clinic, SITE_URL } from "@/content/clinic";
import { type Doctor, doctors } from "@/content/doctors";
import { serviceCategories } from "@/content/services";
import type { Locale } from "@/i18n/routing";
import { absoluteUrl, localizedPaths } from "./seo";

/** Structured data (schema.org JSON-LD). */

export const CLINIC_ID = `${SITE_URL}/#clinic`;
export const EMERGENCY_ID = `${SITE_URL}/#emergency`;

const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const ALL_DAYS = [...WEEKDAYS, "Saturday", "Sunday"];

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

  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": CLINIC_ID,
    name: clinic.name,
    alternateName: ["Т енд Ко Дентал", "T and Co Dental"],
    description: bg
      ? "Зъболекарски кабинет в Пловдив и спешен денонощен зъболекарски кабинет 24/7. Работи с НЗОК, прави зъбни снимки на място и работи с кофердам."
      : "Dental clinic in Plovdiv and 24/7 emergency dental clinic. NHIF contract, on-site dental X-rays and rubber dam isolation.",
    url: home,
    logo: `${SITE_URL}/brand/logo.png`,
    image: [`${SITE_URL}${clinic.images.interior}`, `${SITE_URL}${clinic.images.entrance}`, `${SITE_URL}${clinic.images.logo}`],
    telephone: phones[0],
    email: clinic.email,
    address: postalAddress(locale),
    geo: { "@type": "GeoCoordinates", latitude: clinic.geo.lat, longitude: clinic.geo.lng },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("ул. Даме Груев 34, Пловдив")}`,
    areaServed: { "@type": "City", name: clinic.address.city[locale] },
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
      telephone: phones[0],
      address: postalAddress(locale),
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ALL_DAYS,
        opens: "00:00",
        closes: "23:59",
      },
    },
    sameAs: [clinic.socials.facebook, clinic.socials.instagram],
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
    areaServed: { "@type": "City", name: clinic.address.city[locale] },
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

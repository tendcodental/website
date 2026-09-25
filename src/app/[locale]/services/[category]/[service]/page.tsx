import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ServicePage } from "@/components/services/service-page";
import { findService, serviceCategories } from "@/content/services";
import { type Locale, routing } from "@/i18n/routing";
import { getEmergencyPhones } from "@/lib/emergency";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: Locale; category: string; service: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    serviceCategories.flatMap((c) =>
      c.children.map((s) => ({ locale, category: c.text[locale].slug, service: s.text[locale].slug })),
    ),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, category: categorySlug, service: serviceSlug } = await params;
  const found = findService(locale, categorySlug, serviceSlug);
  if (!found) return {};
  const { category, service } = found;
  const text = service.text[locale];
  return pageMetadata({
    locale,
    hrefs: {
      bg: {
        pathname: "/services/[category]/[service]",
        params: { category: category.text.bg.slug, service: service.text.bg.slug },
      },
      en: {
        pathname: "/services/[category]/[service]",
        params: { category: category.text.en.slug, service: service.text.en.slug },
      },
    },
    title: text.metaTitle,
    description: text.metaDescription,
    kicker: category.text[locale].navTitle ?? category.text[locale].title,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, category: categorySlug, service: serviceSlug } = await params;
  setRequestLocale(locale);
  const found = findService(locale, categorySlug, serviceSlug);
  if (!found) notFound();
  const { phones } = await getEmergencyPhones();
  return <ServicePage locale={locale} category={found.category} service={found.service} phones={phones} />;
}

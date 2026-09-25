import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ServicePage } from "@/components/services/service-page";
import { findCategory, serviceCategories } from "@/content/services";
import { type Locale, routing } from "@/i18n/routing";
import { getEmergencyPhones } from "@/lib/emergency";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: Locale; category: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    serviceCategories.map((c) => ({ locale, category: c.text[locale].slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, category: slug } = await params;
  const category = findCategory(locale, slug);
  if (!category) return {};
  const text = category.text[locale];
  return pageMetadata({
    locale,
    hrefs: {
      bg: { pathname: "/services/[category]", params: { category: category.text.bg.slug } },
      en: { pathname: "/services/[category]", params: { category: category.text.en.slug } },
    },
    title: text.metaTitle,
    description: text.metaDescription,
    kicker: locale === "bg" ? "Услуги" : "Services",
  });
}

export default async function CategoryPage({ params }: Props) {
  const { locale, category: slug } = await params;
  setRequestLocale(locale);
  const category = findCategory(locale, slug);
  if (!category) notFound();
  const { phones } = await getEmergencyPhones();
  return <ServicePage locale={locale} category={category} phones={phones} />;
}

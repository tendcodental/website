import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactSection } from "@/components/contact/contact-section";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { JsonLd } from "@/components/shared/primitives";
import { clinic } from "@/content/clinic";
import type { Locale } from "@/i18n/routing";
import { getEmergencyPhones } from "@/lib/emergency";
import { breadcrumbSchema, clinicSchema } from "@/lib/schema";
import { absoluteUrl, localizedPaths, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({
    locale,
    hrefs: { bg: "/contact", en: "/contact" },
    title: t("contactTitle"),
    description: t("contactDescription"),
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tn = await getTranslations({ locale, namespace: "nav" });
  const t = await getTranslations({ locale, namespace: "contact" });
  const { phones } = await getEmergencyPhones();

  return (
    <>
      <JsonLd
        data={[
          clinicSchema(locale, phones),
          breadcrumbSchema([
            { name: tn("home"), url: absoluteUrl(localizedPaths({ bg: "/", en: "/" })[locale]) },
            { name: tn("contact"), url: absoluteUrl(localizedPaths({ bg: "/contact", en: "/contact" })[locale]) },
          ]),
        ]}
      />
      <div className="bg-marble">
        <div className="container-page pt-6">
          <Breadcrumbs label={tn("breadcrumb")} items={[{ name: tn("home"), href: "/" }, { name: tn("contact") }]} />
        </div>
        <ContactSection locale={locale} phones={phones} headingAs="h1" />
      </div>

      <section aria-labelledby="entrance-title" className="section">
        <div className="container-page grid items-center gap-10 rounded-[2rem] border border-border bg-white p-5 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:p-10">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl sm:aspect-[5/4] lg:aspect-[4/3.4]">
            <Image src={clinic.images.entrance} alt={t("entranceAlt")} fill sizes="(min-width: 1024px) 40vw, 92vw" className="object-cover" />
          </div>
          <div>
            <h2 id="entrance-title" className="display-lg mt-3 text-ink">
              {t("entranceTitle")}
            </h2>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-muted-foreground">{t("entranceText")}</p>
          </div>
        </div>
      </section>
    </>
  );
}

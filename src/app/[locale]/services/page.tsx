import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CategoryCard } from "@/components/services/service-card";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CtaBand } from "@/components/shared/cta-band";
import { JsonLd, SectionHeading } from "@/components/shared/primitives";
import { serviceCategories } from "@/content/services";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getEmergencyPhones } from "@/lib/emergency";
import { breadcrumbSchema } from "@/lib/schema";
import { absoluteUrl, localizedPaths, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({
    locale,
    hrefs: { bg: "/services", en: "/services" },
    title: t("servicesTitle"),
    description: t("servicesDescription"),
  });
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "services" });
  const tn = await getTranslations({ locale, namespace: "nav" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const { phones } = await getEmergencyPhones();

  const home = absoluteUrl(localizedPaths({ bg: "/", en: "/" })[locale]);
  const self = absoluteUrl(localizedPaths({ bg: "/services", en: "/services" })[locale]);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: tn("home"), url: home },
            { name: tn("services"), url: self },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: serviceCategories.map((c, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: c.text[locale].title,
              url: absoluteUrl(
                localizedPaths({
                  bg: { pathname: "/services/[category]", params: { category: c.text.bg.slug } },
                  en: { pathname: "/services/[category]", params: { category: c.text.en.slug } },
                })[locale],
              ),
            })),
          },
        ]}
      />
      <section className="bg-marble">
        <div className="container-page pt-6 pb-10 lg:pt-8 lg:pb-12">
          <Breadcrumbs label={tn("breadcrumb")} items={[{ name: tn("home"), href: "/" }, { name: tn("services") }]} />
          <SectionHeading as="h1" title={t("pageTitle")} lead={t("pageLead")} className="mt-6 max-w-3xl" />
        </div>
      </section>

      <section className="section">
        <div className="container-page grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {serviceCategories.map((c, i) => (
            <CategoryCard
              key={c.id}
              category={c}
              locale={locale}
              featured={i === 0}
              readMore={tc("readMore")}
              className={i === 0 ? "md:col-span-2 lg:col-span-3" : undefined}
            />
          ))}
        </div>
      </section>

      {/* Full index of every service page, useful for visitors and for internal linking. */}
      <section className="bg-sand/60 section">
        <div className="container-page">
          <h2 className="reveal text-3xl text-ink sm:text-4xl">{tn("allServices")}</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {serviceCategories.map((c) => (
              <div key={c.id} className="reveal">
                <Link
                  href={{ pathname: "/services/[category]", params: { category: c.text[locale].slug } }}
                  className="font-semibold text-ink hover:text-emerald"
                >
                  {c.text[locale].title}
                </Link>
                {c.children.length > 0 && (
                  <ul className="mt-3 space-y-1.5 border-l border-gold/40 pl-4">
                    {c.children.map((s) => (
                      <li key={s.id}>
                        <Link
                          href={{
                            pathname: "/services/[category]/[service]",
                            params: { category: c.text[locale].slug, service: s.text[locale].slug },
                          }}
                          className="text-[0.93rem] text-muted-foreground hover:text-emerald"
                        >
                          {s.text[locale].title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand locale={locale} phones={phones} />
    </>
  );
}

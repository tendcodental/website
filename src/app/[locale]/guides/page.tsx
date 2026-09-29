import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ServiceArt } from "@/components/art/service-art";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CtaBand } from "@/components/shared/cta-band";
import { JsonLd, SectionHeading } from "@/components/shared/primitives";
import { guides } from "@/content/guides";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { breadcrumbSchema } from "@/lib/schema";
import { absoluteUrl, localizedPaths, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({
    locale,
    hrefs: { bg: "/guides", en: "/guides" },
    title: t("guidesTitle"),
    description: t("guidesDescription"),
  });
}

const guideUrl = (locale: Locale, bg: string, en: string) =>
  absoluteUrl(
    localizedPaths({
      bg: { pathname: "/guides/[slug]", params: { slug: bg } },
      en: { pathname: "/guides/[slug]", params: { slug: en } },
    })[locale],
  );

export default async function GuidesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "guides" });
  const tn = await getTranslations({ locale, namespace: "nav" });

  const home = absoluteUrl(localizedPaths({ bg: "/", en: "/" })[locale]);
  const self = absoluteUrl(localizedPaths({ bg: "/guides", en: "/guides" })[locale]);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: tn("home"), url: home },
            { name: tn("guides"), url: self },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: guides.map((g, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: g.text[locale].title,
              url: guideUrl(locale, g.text.bg.slug, g.text.en.slug),
            })),
          },
        ]}
      />
      <section className="bg-marble">
        <div className="container-page pt-6 pb-10 lg:pt-8 lg:pb-12">
          <Breadcrumbs label={tn("breadcrumb")} items={[{ name: tn("home"), href: "/" }, { name: tn("guides") }]} />
          <SectionHeading as="h1" title={t("pageTitle")} lead={t("pageLead")} className="mt-6 max-w-3xl" />
        </div>
      </section>

      <section className="section">
        <ul className="container-page grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {guides.map((g) => {
            const text = g.text[locale];
            return (
              <li key={g.id}>
                <Link
                  href={{ pathname: "/guides/[slug]", params: { slug: text.slug } }}
                  className="card-lift reveal group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white"
                >
                  <span className="relative block overflow-hidden">
                    {g.thumbnail ? (
                      <Image
                        src={g.thumbnail}
                        alt={text.title}
                        width={768}
                        height={480}
                        className="aspect-[16/10] w-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                      />
                    ) : (
                      <ServiceArt art={g.art} className="aspect-[16/10]" />
                    )}
                  </span>
                  <span className="flex flex-1 flex-col p-5 sm:p-6">
                    <span className="flex items-start justify-between gap-2 font-display text-[1.35rem] leading-tight font-semibold text-ink group-hover:text-emerald">
                      {text.title}
                      <ArrowUpRight className="mt-1 size-4 shrink-0 text-gold-dark transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                    </span>
                    <span className="mt-2 block text-[0.93rem] leading-relaxed text-muted-foreground">{text.excerpt}</span>
                    <span className="mt-auto pt-4 text-[0.88rem] font-semibold text-emerald">{t("readGuide")} →</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <CtaBand locale={locale} />
    </>
  );
}

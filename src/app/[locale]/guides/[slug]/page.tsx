import { ArrowUpRight, Check, Phone, Siren } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ServiceArt } from "@/components/art/service-art";
import { BookButton } from "@/components/shared/book-button";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CtaBand } from "@/components/shared/cta-band";
import { FaqList } from "@/components/shared/faq-list";
import { JsonLd, PulseDot } from "@/components/shared/primitives";
import { doctorById } from "@/content/doctors";
import { findGuide, type Guide, guides } from "@/content/guides";
import { findServiceById } from "@/content/services";
import { Link } from "@/i18n/navigation";
import { type Locale, routing } from "@/i18n/routing";
import { getEmergencyPhones } from "@/lib/emergency";
import { formatPhone } from "@/lib/phone";
import { breadcrumbSchema, faqSchema, guideSchema } from "@/lib/schema";
import { absoluteUrl, localizedPaths, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: Locale; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => guides.map((g) => ({ locale, slug: g.text[locale].slug })));
}

const guideHrefs = (g: Guide) => ({
  bg: { pathname: "/guides/[slug]" as const, params: { slug: g.text.bg.slug } },
  en: { pathname: "/guides/[slug]" as const, params: { slug: g.text.en.slug } },
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const guide = findGuide(locale, slug);
  if (!guide) return {};
  const text = guide.text[locale];
  const meta = pageMetadata({
    locale,
    hrefs: guideHrefs(guide),
    title: text.metaTitle,
    description: text.metaDescription,
    absoluteTitle: true,
    kicker: locale === "bg" ? "Съвети" : "Guides",
  });
  return {
    ...meta,
    openGraph: { ...meta.openGraph, type: "article", publishedTime: guide.published, modifiedTime: guide.updated },
  };
}

export default async function GuidePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const guide = findGuide(locale, slug);
  if (!guide) notFound();

  const [t, tn, ts, te, { phones }] = await Promise.all([
    getTranslations({ locale, namespace: "guides" }),
    getTranslations({ locale, namespace: "nav" }),
    getTranslations({ locale, namespace: "services" }),
    getTranslations({ locale, namespace: "emergency" }),
    getEmergencyPhones(),
  ]);

  const text = guide.text[locale];
  const reviewer = guide.reviewer ? doctorById(guide.reviewer) : undefined;
  const url = absoluteUrl(localizedPaths(guideHrefs(guide))[locale]);
  const crumbs = [
    { name: tn("home"), href: "/" as const, url: absoluteUrl(localizedPaths({ bg: "/", en: "/" })[locale]) },
    { name: tn("guides"), href: "/guides" as const, url: absoluteUrl(localizedPaths({ bg: "/guides", en: "/guides" })[locale]) },
    { name: text.title, url },
  ];
  const updated = new Intl.DateTimeFormat(locale === "bg" ? "bg-BG" : "en-GB", { dateStyle: "long" }).format(new Date(guide.updated));

  const related = guide.services.flatMap((id) => {
    const found = findServiceById(id);
    if (!found) return [];
    const { category, service } = found;
    const entry = service ?? category;
    const href = service
      ? { pathname: "/services/[category]/[service]" as const, params: { category: category.text[locale].slug, service: service.text[locale].slug } }
      : { pathname: "/services/[category]" as const, params: { category: category.text[locale].slug } };
    return [{ id, title: entry.text[locale].title, excerpt: entry.text[locale].excerpt, href }];
  });
  const more = guides.filter((g) => g.id !== guide.id).slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          guideSchema(guide, locale, url, reviewer),
          breadcrumbSchema(crumbs.map((c) => ({ name: c.name, url: c.url }))),
          faqSchema(text.faq),
        ]}
      />

      {/* Hero */}
      <section className="bg-marble relative overflow-hidden">
        <div className="container-page grid items-center gap-9 pt-6 pb-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:pt-8 lg:pb-14">
          <div>
            <Breadcrumbs label={tn("breadcrumb")} items={crumbs.map(({ name, href }) => ({ name, href }))} />
            <h1 className="animate-fade-up mt-6 text-[2.2rem] leading-[1.06] text-ink [animation-delay:60ms] sm:text-[2.8rem] lg:text-[clamp(2.4rem,1.2vw+2.3vh,3.5rem)]">
              {text.title}
            </h1>
            <p className="animate-fade-up mt-5 max-w-xl text-[1.08rem] leading-relaxed text-muted-foreground [animation-delay:120ms] sm:text-lg">
              {text.excerpt}
            </p>
            <p className="animate-fade-up mt-4 text-[0.85rem] text-muted-foreground [animation-delay:150ms]">
              {reviewer ? t("reviewedBy", { name: reviewer.name[locale] }) : t("authorClinic")} ·{" "}
              <time dateTime={guide.updated}>{t("updated", { date: updated })}</time>
            </p>
          </div>
          <div className="animate-rise relative aspect-[4/3] w-full lg:h-[clamp(15rem,calc(100svh-var(--header-total)-10rem),24rem)] lg:w-auto lg:justify-self-center">
            <div className="absolute -inset-3 rounded-[2.4rem] border border-gold/30" aria-hidden="true" />
            <div className="size-full overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-40px_rgb(15_51_40/0.6)]">
              {guide.thumbnail ? (
                <Image src={guide.thumbnail} alt={text.title} width={768} height={576} className="size-full object-cover" />
              ) : (
                <ServiceArt art={guide.art} label={text.title} className="size-full" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_21rem] lg:gap-16">
          <article className="min-w-0 space-y-12">
            <p className="reveal max-w-3xl text-[1.1rem] leading-[1.75] text-ink sm:text-[1.16rem]">{text.answer}</p>

            {text.sections.map((section) => {
              const ListTag = section.ordered ? "ol" : "ul";
              return (
                <div key={section.heading} className="reveal max-w-3xl">
                  <h2 className="text-[1.75rem] leading-tight text-ink sm:text-[2rem]">{section.heading}</h2>
                  {section.paragraphs?.map((p) => (
                    <p key={p.slice(0, 32)} className="mt-4 text-[1.04rem] leading-[1.75] text-ink/85">
                      {p}
                    </p>
                  ))}
                  {section.list?.length ? (
                    <ListTag className="mt-5 grid gap-3">
                      {section.list.map((item, i) => (
                        <li key={item} className="flex gap-3 rounded-2xl border border-border bg-white p-4 text-[0.98rem] leading-snug text-ink/85">
                          <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-accent text-[0.78rem] font-semibold text-emerald">
                            {section.ordered ? i + 1 : <Check className="size-3.5" aria-hidden="true" />}
                          </span>
                          {item}
                        </li>
                      ))}
                    </ListTag>
                  ) : null}
                </div>
              );
            })}

            <aside className="reveal max-w-3xl rounded-3xl border border-alert/25 bg-alert/[0.05] p-6 sm:p-7">
              <h2 className="flex items-center gap-2 text-[1.5rem] leading-tight text-ink sm:text-[1.7rem]">
                <Siren className="size-5 shrink-0 text-alert" aria-hidden="true" /> {t("urgentTitle")}
              </h2>
              <ul className="mt-4 space-y-2.5 text-[0.98rem] leading-relaxed text-ink/85">
                {text.urgent.map((u) => (
                  <li key={u} className="flex gap-2.5">
                    <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-alert" aria-hidden="true" />
                    {u}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[0.95rem] text-muted-foreground">{t("urgentText")}</p>
              <a
                href={`tel:${phones[0]}`}
                className="mt-5 inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-alert px-6 font-semibold text-white shadow-[0_14px_30px_-14px_rgb(216_69_59/0.9)] transition-[filter] hover:brightness-110"
              >
                <Phone className="size-4" aria-hidden="true" /> {formatPhone(phones[0], locale)}
              </a>
            </aside>

            <div className="reveal max-w-3xl">
              <h2 className="text-[1.75rem] leading-tight text-ink sm:text-[2rem]">{t("faq")}</h2>
              <FaqList items={text.faq} className="mt-6" />
            </div>

            {related.length > 0 && (
              <div className="reveal max-w-3xl">
                <h2 className="text-[1.75rem] leading-tight text-ink sm:text-[2rem]">{t("relatedServices")}</h2>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {related.map((r) => (
                    <li key={r.id}>
                      <Link href={r.href} className="card-lift group flex h-full flex-col rounded-3xl border border-border bg-white p-5 sm:p-6">
                        <span className="flex items-start justify-between gap-2 font-display text-[1.25rem] leading-tight font-semibold text-ink group-hover:text-emerald">
                          {r.title}
                          <ArrowUpRight className="mt-1 size-4 shrink-0 text-gold-dark" aria-hidden="true" />
                        </span>
                        <span className="mt-2 block text-[0.92rem] leading-relaxed text-muted-foreground">{r.excerpt}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p className="max-w-3xl text-[0.85rem] leading-relaxed text-muted-foreground">{t("disclaimer")}</p>
          </article>

          {/* Sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-32 lg:self-start">
            <div className="bg-emerald-glow rounded-3xl p-6 text-ivory">
              <p className="flex items-center gap-2 text-[0.72rem] font-semibold tracking-[0.16em] text-gold-light uppercase">
                <PulseDot /> {te("label")}
              </p>
              <p className="mt-2 text-[0.92rem] text-emerald-50/80">{ts("urgentText")}</p>
              <div className="mt-4 grid gap-2">
                {phones.map((tel) => (
                  <a key={tel} href={`tel:${tel}`} className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3 text-lg font-semibold text-white hover:bg-white/15">
                    {formatPhone(tel, locale)} <Phone className="size-4 text-gold-light" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-border bg-white p-6">
              <p className="font-display text-2xl font-semibold text-ink">{tn("bookLong")}</p>
              <p className="mt-1 text-sm text-muted-foreground">{ts("ctaText")}</p>
              <BookButton size="xl" className="mt-5 w-full">
                {tn("book")}
              </BookButton>
            </div>
            <nav aria-label={t("moreGuides")} className="rounded-3xl border border-border bg-white p-6">
              <p className="text-[0.72rem] font-semibold tracking-[0.16em] text-gold-dark uppercase">{t("moreGuides")}</p>
              <ul className="mt-3 space-y-1">
                {more.map((g) => (
                  <li key={g.id}>
                    <Link
                      href={{ pathname: "/guides/[slug]", params: { slug: g.text[locale].slug } }}
                      className="block rounded-lg py-1.5 text-[0.95rem] text-ink/80 transition-colors hover:text-emerald"
                    >
                      {g.text[locale].title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      </section>

      <CtaBand locale={locale} />
    </>
  );
}

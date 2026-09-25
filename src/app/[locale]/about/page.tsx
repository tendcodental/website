import { Eye, HeartHandshake, ScanLine, ShieldCheck, Siren, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CtaBand } from "@/components/shared/cta-band";
import { JsonLd, PulseDot, SectionHeading } from "@/components/shared/primitives";
import { clinic } from "@/content/clinic";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getEmergencyPhones } from "@/lib/emergency";
import { formatPhone } from "@/lib/phone";
import { breadcrumbSchema, clinicSchema } from "@/lib/schema";
import { absoluteUrl, localizedPaths, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({ locale, hrefs: { bg: "/about", en: "/about" }, title: t("aboutTitle"), description: t("aboutDescription") });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });
  const tn = await getTranslations({ locale, namespace: "nav" });
  const th = await getTranslations({ locale, namespace: "highlights" });
  const te = await getTranslations({ locale, namespace: "emergency" });
  const tc = await getTranslations({ locale, namespace: "contact" });
  const { phones } = await getEmergencyPhones();

  const values = [
    { icon: Eye, title: t("values.clarityTitle"), text: t("values.clarityText") },
    { icon: Sparkles, title: t("values.precisionTitle"), text: t("values.precisionText") },
    { icon: HeartHandshake, title: t("values.calmTitle"), text: t("values.calmText") },
    { icon: Siren, title: t("values.availabilityTitle"), text: t("values.availabilityText") },
  ];
  const tech = [
    { icon: ScanLine, title: th("xrayTitle"), text: th("xrayText") },
    { icon: ShieldCheck, title: th("damTitle"), text: th("damText") },
    { icon: Siren, title: th("emergencyTitle"), text: th("emergencyText") },
  ];

  return (
    <>
      <JsonLd
        data={[
          clinicSchema(locale, phones),
          breadcrumbSchema([
            { name: tn("home"), url: absoluteUrl(localizedPaths({ bg: "/", en: "/" })[locale]) },
            { name: tn("about"), url: absoluteUrl(localizedPaths({ bg: "/about", en: "/about" })[locale]) },
          ]),
        ]}
      />
      <section className="bg-marble">
        <div className="container-page grid items-center gap-10 pt-6 pb-10 lg:grid-cols-2 lg:gap-12 lg:pt-8 lg:pb-14">
          <div>
            <Breadcrumbs label={tn("breadcrumb")} items={[{ name: tn("home"), href: "/" }, { name: tn("about") }]} />
            <SectionHeading as="h1" title={t("title")} lead={t("lead")} className="mt-6" />
          </div>
          <div className="animate-rise relative mx-auto aspect-[4/4.4] w-full max-w-[22rem] sm:max-w-md lg:h-[clamp(20rem,calc(100svh-var(--header-total)-6rem),34rem)] lg:w-auto lg:max-w-none lg:justify-self-center">
            <div className="arch relative size-full overflow-hidden shadow-[0_50px_90px_-45px_rgb(15_51_40/0.6)]">
              <Image src={clinic.images.interior} alt={t("galleryAlt")} fill loading="eager" fetchPriority="high" sizes="(min-width: 1024px) 45vw, 92vw" className="object-cover object-[50%_65%]" />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHeading title={t("storyTitle")} />
          <div className="reveal space-y-5 text-[1.06rem] leading-[1.8] text-ink/85 sm:text-[1.1rem]">
            <p>{t("story1")}</p>
            <p>{t("story2")}</p>
            <p>{t("story3")}</p>
          </div>
        </div>
      </section>

      <section className="bg-sand/60 section">
        <div className="container-page">
          <SectionHeading title={t("valuesTitle")} align="center" />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, text }) => (
              <li key={title} className="card-lift reveal rounded-3xl border border-border bg-white p-7">
                <span className="grid size-12 place-items-center rounded-2xl bg-emerald-deep text-gold-light">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-2xl text-ink">{title}</h3>
                <p className="mt-2 text-[0.97rem] leading-relaxed text-muted-foreground">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <ul className="grid gap-4">
            {tech.map(({ icon: Icon, title, text }) => (
              <li key={title} className="reveal flex gap-5 rounded-3xl border border-border bg-white p-6">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent text-emerald">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-sans text-lg font-semibold text-ink">{title}</h3>
                  <p className="mt-1 text-[0.97rem] leading-relaxed text-muted-foreground">{text}</p>
                </div>
              </li>
            ))}
          </ul>
          <figure className="reveal-scale">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] sm:aspect-[5/4] lg:aspect-[4/3.6]">
              <Image src={clinic.images.entrance} alt={tc("entranceAlt")} fill sizes="(min-width: 1024px) 45vw, 92vw" className="object-cover" />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-emerald-night/80 p-4 text-ivory backdrop-blur-md">
                <p className="flex items-center gap-2 text-[0.72rem] font-semibold tracking-[0.16em] text-gold-light uppercase">
                  <PulseDot /> {te("label")}
                </p>
                {phones.map((tel) => (
                  <a key={tel} href={`tel:${tel}`} className="mt-1 block text-xl font-semibold text-white">
                    {formatPhone(tel, locale)}
                  </a>
                ))}
              </div>
            </div>
            <figcaption className="mt-3 text-sm text-muted-foreground">
              {tc("entranceText")}{" "}
              <Link href="/contact" className="font-semibold text-emerald">
                {tn("contact")} →
              </Link>
            </figcaption>
          </figure>
        </div>
      </section>

      <CtaBand locale={locale} phones={phones} />
    </>
  );
}

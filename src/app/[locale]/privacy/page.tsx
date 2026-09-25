import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { privacySections, PRIVACY_UPDATED } from "@/content/privacy";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({
    locale,
    hrefs: { bg: "/privacy", en: "/privacy" },
    title: t("privacyTitle"),
    description: t("privacyDescription"),
  });
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "privacy" });
  const tn = await getTranslations({ locale, namespace: "nav" });
  const updated = new Intl.DateTimeFormat(locale === "bg" ? "bg-BG" : "en-GB", { dateStyle: "long", timeZone: "UTC" }).format(
    new Date(PRIVACY_UPDATED),
  );

  return (
    <div className="bg-marble">
      <div className="container-page max-w-3xl pt-6 pb-20">
        <Breadcrumbs label={tn("breadcrumb")} items={[{ name: tn("home"), href: "/" }, { name: t("title") }]} />
        <h1 className="display-lg mt-6 text-ink">{t("title")}</h1>
        <p className="mt-3 text-sm text-muted-foreground">{t("updated", { date: updated })}</p>
        <div className="mt-10 space-y-10 rounded-3xl border border-border bg-white p-6 sm:p-10">
          {privacySections[locale].map((section) => (
            <section key={section.title}>
              <h2 className="text-2xl text-ink sm:text-3xl">{section.title}</h2>
              <div className="mt-3 space-y-3 text-[1rem] leading-relaxed text-ink/80">
                {section.body.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

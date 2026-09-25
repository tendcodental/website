import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CtaBand } from "@/components/shared/cta-band";
import { JsonLd, SectionHeading } from "@/components/shared/primitives";
import { DoctorCard } from "@/components/team/doctor-card";
import { doctors } from "@/content/doctors";
import type { Locale } from "@/i18n/routing";
import { getEmergencyPhones } from "@/lib/emergency";
import { allDoctorsSchema, breadcrumbSchema } from "@/lib/schema";
import { absoluteUrl, localizedPaths, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({ locale, hrefs: { bg: "/team", en: "/team" }, title: t("teamTitle"), description: t("teamDescription") });
}

export default async function TeamPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "team" });
  const tn = await getTranslations({ locale, namespace: "nav" });
  const { phones } = await getEmergencyPhones();
  const url = absoluteUrl(localizedPaths({ bg: "/team", en: "/team" })[locale]);

  return (
    <>
      <JsonLd
        data={[
          ...allDoctorsSchema(locale, url),
          breadcrumbSchema([
            { name: tn("home"), url: absoluteUrl(localizedPaths({ bg: "/", en: "/" })[locale]) },
            { name: tn("team"), url },
          ]),
        ]}
      />
      <section className="bg-marble">
        <div className="container-page pt-6 pb-10 lg:pt-8 lg:pb-12">
          <Breadcrumbs label={tn("breadcrumb")} items={[{ name: tn("home"), href: "/" }, { name: tn("team") }]} />
          <SectionHeading as="h1" title={t("title")} lead={t("lead")} className="mt-6 max-w-3xl" />
        </div>
      </section>
      <section className="section">
        <div className="container-page space-y-6">
          {doctors.map((d) => (
            <DoctorCard key={d.id} doctor={d} locale={locale} detailed headingLevel="h2" />
          ))}
        </div>
      </section>
      <CtaBand locale={locale} phones={phones} />
    </>
  );
}

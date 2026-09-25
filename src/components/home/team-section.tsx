import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/shared/primitives";
import { DoctorCard } from "@/components/team/doctor-card";
import { doctors } from "@/content/doctors";
import type { Locale } from "@/i18n/routing";

export async function TeamSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "team" });
  return (
    <section aria-labelledby="team-title" className="bg-sand/60 section">
      <div className="container-page">
        <SectionHeading id="team-title" title={t("title")} lead={t("lead")} align="center" />
        {/* Two doctors, split left / right on laptops and desktops */}
        <div className="mt-8 grid gap-5 lg:mt-10 xl:grid-cols-2 xl:gap-6">
          {doctors.map((d) => (
            <DoctorCard key={d.id} doctor={d} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}

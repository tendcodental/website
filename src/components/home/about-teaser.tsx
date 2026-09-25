import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/shared/primitives";
import { clinic } from "@/content/clinic";
import { doctors } from "@/content/doctors";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export async function AboutTeaser({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "about" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const stats = [
    { value: "24/7", label: t("statsEmergency") },
    { value: locale === "bg" ? "НЗОК" : "NHIF", label: t("statsNzok") },
    { value: "RTG", label: t("statsXray") },
    { value: String(doctors.length), label: t("statsDoctors") },
  ];

  return (
    <section aria-labelledby="about-title" className="bg-sand/60 section">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-14">
        <div className="reveal-scale relative order-2 lg:order-1">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-40px_rgb(15_51_40/0.5)] lg:aspect-auto lg:h-[clamp(20rem,60vh,30rem)]">
            <Image
              src={clinic.images.interior}
              alt={t("galleryAlt")}
              fill
              sizes="(min-width: 1024px) 45vw, 92vw"
              className="object-cover object-[50%_70%]"
            />
          </div>
          <div className="absolute -bottom-6 left-6 right-6 grid grid-cols-4 divide-x divide-border rounded-2xl border border-border bg-white/95 py-4 shadow-lg backdrop-blur sm:left-10 sm:right-10">
            {stats.map((s) => (
              <div key={s.label} className="px-2 text-center">
                <p className="font-display text-2xl font-semibold text-emerald sm:text-3xl">{s.value}</p>
                <p className="mt-0.5 text-[0.68rem] leading-tight text-muted-foreground sm:text-[0.75rem]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <SectionHeading id="about-title" title={t("title")} lead={t("lead")} />
          <div className="reveal mt-5 space-y-3 text-[0.98rem] leading-relaxed text-muted-foreground">
            <p>{t("story1")}</p>
            <p>{t("story2")}</p>
          </div>
          <Link
            href="/about"
            className="reveal mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-gold"
          >
            {tc("readMore")} <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

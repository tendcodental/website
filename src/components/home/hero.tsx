import { ArrowRight, BadgeCheck, Phone, ScanLine, ShieldCheck, Siren } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { BookButton } from "@/components/shared/book-button";
import { DoctorAvatar } from "@/components/booking/doctor-avatar";
import { PulseDot, Stars } from "@/components/shared/primitives";
import { clinic } from "@/content/clinic";
import { doctors } from "@/content/doctors";
import type { Locale } from "@/i18n/routing";
import { formatPhone } from "@/lib/phone";

export async function Hero({
  locale,
  phones,
  rating,
}: {
  locale: Locale;
  phones: string[];
  rating?: { value: number; count: number } | null;
}) {
  const t = await getTranslations({ locale, namespace: "hero" });
  const te = await getTranslations({ locale, namespace: "emergency" });
  const th = await getTranslations({ locale, namespace: "highlights" });

  const highlights = [
    { icon: Siren, title: th("emergencyTitle"), text: th("emergencyText") },
    { icon: BadgeCheck, title: th("nzokTitle"), text: th("nzokText") },
    { icon: ScanLine, title: th("xrayTitle"), text: th("xrayText") },
    { icon: ShieldCheck, title: th("damTitle"), text: th("damText") },
  ];

  return (
    <section className="bg-marble relative overflow-hidden">
      {/* Soft decorative glow */}
      <div className="pointer-events-none absolute -top-40 -right-40 size-[36rem] rounded-full bg-[radial-gradient(circle,rgb(46_138_94/0.14),transparent_65%)]" />
      <div className="pointer-events-none absolute -bottom-52 -left-40 size-[30rem] rounded-full bg-[radial-gradient(circle,rgb(194_155_74/0.16),transparent_65%)]" />

      {/* On laptops/desktops the hero fills exactly the first screen below the sticky header. */}
      <div className="container-page relative grid items-center gap-9 pt-7 pb-10 sm:pt-10 lg:min-h-[calc(100svh-var(--header-total))] lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:py-[clamp(1.25rem,4vh,3rem)]">
        <div>
          <h1 className="animate-fade-up display-xl text-ink">
            <span className="block">{t("title1")}</span>
            <em className="text-gold-gradient text-gold-gradient-animated block pr-1 pb-1 font-semibold not-italic sm:italic">
              {t("title2")}
            </em>
          </h1>

          <p className="animate-fade-up mt-5 max-w-xl text-[1.02rem] leading-relaxed text-muted-foreground [animation-delay:100ms] sm:text-[1.08rem] lg:mt-[clamp(1rem,2.5vh,1.5rem)]">
            {t("lead")}
          </p>

          <div className="animate-fade-up mt-7 flex flex-col gap-3 [animation-delay:180ms] sm:flex-row sm:items-center lg:mt-[clamp(1.5rem,4vh,2.25rem)]">
            <BookButton className="w-full sm:w-auto">
              {t("ctaBook")} <ArrowRight className="size-4" aria-hidden="true" />
            </BookButton>
            {/* Tapping calls straight away; on hover-capable devices the number is revealed. */}
            <a
              href={`tel:${phones[0]}`}
              aria-label={te("callNumber", { number: formatPhone(phones[0], locale) })}
              className="group inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full border border-emerald/20 bg-white/80 px-6 text-[0.95rem] font-semibold text-emerald backdrop-blur transition-colors hover:border-emerald/50 hover:bg-white sm:h-13 sm:w-auto"
            >
              <Phone className="size-4 shrink-0" aria-hidden="true" />
              <span className="grid" aria-hidden="true">
                <span className="col-start-1 row-start-1 transition-opacity duration-300 group-hover:opacity-0">
                  {t("ctaPhone")}
                </span>
                <span className="col-start-1 row-start-1 tracking-wide opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {formatPhone(phones[0], locale)}
                </span>
              </span>
            </a>
          </div>
        </div>

        {/*
          Arch-framed clinic photo. Phones: sized by width. Laptops/desktops: sized by the screen height
          (so it always fits between the header and the fold), width follows from the aspect ratio.
        */}
        <div className="animate-rise relative mx-auto hidden aspect-[4/4.4] w-full max-w-[22rem] sm:block sm:max-w-md lg:mx-0 lg:h-[clamp(20rem,calc(100svh-var(--header-total)-4.5rem),38rem)] lg:w-auto lg:max-w-none lg:justify-self-center">
          <div className="arch absolute -inset-3 border border-gold/35" aria-hidden="true" />
          <div className="arch relative size-full overflow-hidden bg-sand shadow-[0_50px_90px_-45px_rgb(15_51_40/0.6)]">
            <Image
              src={clinic.images.interior}
              alt={t("imageAlt")}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1024px) 34rem, (min-width: 640px) 28rem, 92vw"
              className="animate-settle object-cover object-[50%_62%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-night/35 via-transparent to-transparent" />
          </div>

          <div className="animate-float absolute top-[12%] -left-3 rounded-2xl border border-white/60 bg-white/85 px-3.5 py-3 shadow-[0_20px_40px_-20px_rgb(15_51_40/0.5)] backdrop-blur-md sm:-left-10">
            <p className="flex items-center gap-2 text-[0.7rem] font-semibold tracking-wide text-alert uppercase">
              <PulseDot /> {t("cardOnDuty")}
            </p>
            <p className="mt-1 text-[0.92rem] font-semibold text-ink">{t("cardOnDutyText")}</p>
          </div>

          <div className="animate-float absolute -right-3 bottom-[9%] rounded-2xl border border-white/60 bg-white/90 px-3.5 py-3 shadow-[0_20px_40px_-20px_rgb(15_51_40/0.5)] backdrop-blur-md [animation-delay:-3s] sm:-right-12 lg:-right-16">
            {rating ? (
              <>
                <p className="flex items-center gap-2">
                  <span className="font-display text-3xl leading-none font-semibold text-ink">{rating.value.toFixed(1)}</span>
                  <Stars rating={rating.value} className="text-[0.95rem]" />
                </p>
                <p className="mt-1 text-[0.75rem] text-muted-foreground">Google · {rating.count}+</p>
              </>
            ) : (
              <div className="flex items-center gap-3">
                {/* Overlapping portraits: a visual cue that you pick your dentist when booking. */}
                <span className="flex -space-x-2.5">
                  {doctors.map((d) => (
                    <DoctorAvatar key={d.id} doctor={d} size={34} className="ring-white" />
                  ))}
                </span>
                <span>
                  <span className="block text-[0.68rem] font-semibold tracking-[0.14em] text-emerald uppercase">
                    {t("cardPick")}
                  </span>
                  <span className="mt-0.5 block text-[0.92rem] font-semibold text-ink">{t("cardPickText")}</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="container-page relative pb-12 lg:pb-16">
        <h2 className="sr-only">{th("title")}</h2>
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {highlights.map(({ icon: Icon, title, text }, i) => (
            <li
              key={title}
              className="animate-fade-up rounded-2xl border border-border/80 bg-white/75 p-4 backdrop-blur-sm sm:p-5"
              style={{ animationDelay: `${300 + i * 70}ms` }}
            >
              <span className="grid size-9 place-items-center rounded-xl bg-emerald-deep text-gold-light">
                <Icon className="size-[1.1rem]" aria-hidden="true" />
              </span>
              <h3 className="mt-3 font-sans text-[0.95rem] leading-snug font-semibold text-ink sm:text-base">{title}</h3>
              <p className="mt-1 hidden text-[0.86rem] leading-relaxed text-muted-foreground sm:block">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

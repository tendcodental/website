import { CalendarCheck, Mail, Phone } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { BookButton } from "@/components/shared/book-button";
import type { Doctor } from "@/content/doctors";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/** Portrait, or an elegant brand placeholder until a real photo is provided. */
export function DoctorPortrait({ doctor, locale, alt }: { doctor: Doctor; locale: Locale; alt: string }) {
  if (doctor.photo) {
    return (
      <Image
        src={doctor.photo}
        alt={alt}
        fill
        sizes="(min-width: 1280px) 24rem, (min-width: 640px) 40vw, 92vw"
        className="object-cover object-[50%_22%] transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
      />
    );
  }
  return (
    <div className="bg-emerald-glow absolute inset-0 grid place-items-center" role="img" aria-label={alt}>
      <svg viewBox="0 0 200 240" className="absolute inset-0 size-full opacity-60" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
        <g fill="none" stroke="#c29b4a" strokeOpacity="0.35">
          <circle cx="100" cy="100" r="58" />
          <circle cx="100" cy="100" r="76" strokeDasharray="2 6" />
        </g>
      </svg>
      <span className="text-gold-gradient relative font-display text-6xl font-semibold">{doctor.initials}</span>
      <span className="absolute bottom-4 text-[0.66rem] tracking-[0.3em] text-emerald-50/50 uppercase">
        {locale === "bg" ? "Снимката предстои" : "Photo coming soon"}
      </span>
    </div>
  );
}

/**
 * Horizontal doctor card (photo beside the details from tablet width up), kept short enough that the
 * whole card fits on a laptop screen.
 */
export async function DoctorCard({
  doctor,
  locale,
  detailed = false,
  headingLevel = "h3",
  className,
}: {
  doctor: Doctor;
  locale: Locale;
  detailed?: boolean;
  headingLevel?: "h2" | "h3";
  className?: string;
}) {
  const t = await getTranslations({ locale, namespace: "team" });
  const H = headingLevel;
  const alt = t("photoAlt", { name: doctor.name[locale] });

  return (
    <article
      id={doctor.id}
      className={cn(
        "reveal group grid overflow-hidden rounded-[1.75rem] border border-border bg-white shadow-[0_30px_60px_-40px_rgb(15_51_40/0.35)]",
        detailed
          ? "sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]"
          : "sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]",
        className,
      )}
    >
      <div
        className={cn(
          "relative aspect-[4/3] overflow-hidden bg-sand sm:aspect-auto",
          detailed ? "sm:min-h-[24rem]" : "sm:min-h-[20rem]",
        )}
      >
        <DoctorPortrait doctor={doctor} locale={locale} alt={alt} />
      </div>
      <div className="flex flex-col p-5 sm:p-6 lg:p-7">
        <p className="text-[0.7rem] font-semibold tracking-[0.2em] text-gold-dark uppercase">{doctor.role[locale]}</p>
        <H className="mt-1.5 text-[1.6rem] leading-tight text-ink lg:text-[1.8rem]">{doctor.name[locale]}</H>
        <div className="mt-3 space-y-2.5 text-[0.95rem] leading-relaxed text-muted-foreground">
          {detailed ? (
            doctor.bio[locale].map((p) => <p key={p.slice(0, 24)}>{p}</p>)
          ) : (
            <p className="line-clamp-4">{doctor.bio[locale][0]}</p>
          )}
        </div>
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 border-t border-border pt-4 text-[0.92rem]">
          <li>
            <a href={`tel:${doctor.phone.tel}`} className="inline-flex items-center gap-2 font-semibold text-ink hover:text-emerald">
              <Phone className="size-4 text-gold-dark" aria-hidden="true" />
              {doctor.phone.display}
            </a>
          </li>
          <li>
            <a href={`mailto:${doctor.email}`} className="inline-flex items-center gap-2 text-ink/80 hover:text-emerald">
              <Mail className="size-4 text-gold-dark" aria-hidden="true" />
              {doctor.email}
            </a>
          </li>
        </ul>
        <div className="mt-auto pt-5">
          <BookButton doctor={doctor.id} size="pill" className="h-11 w-full px-5 sm:w-auto">
            <CalendarCheck className="size-4" aria-hidden="true" />
            {t("bookWith", { name: doctor.shortName[locale] })}
          </BookButton>
        </div>
      </div>
    </article>
  );
}

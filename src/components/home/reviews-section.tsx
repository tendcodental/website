import { ExternalLink, PenLine } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { SectionHeading, Stars } from "@/components/shared/primitives";
import type { Locale } from "@/i18n/routing";
import type { Review, ReviewsData } from "@/lib/reviews";
import { cn } from "@/lib/utils";

function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 38.2 44 33 44 24c0-1.3-.1-2.6-.4-3.5z" />
    </svg>
  );
}

function ReviewCard({ review, hidden }: { review: Review; hidden?: boolean }) {
  return (
    <figure
      aria-hidden={hidden || undefined}
      className="flex w-[19rem] shrink-0 snap-start flex-col rounded-3xl border border-border bg-white p-6 shadow-[0_20px_40px_-32px_rgb(15_51_40/0.4)] sm:w-[22rem]"
    >
      <div className="flex items-center justify-between">
        <Stars rating={review.rating} className="text-base" />
        <GoogleG className="size-5" />
      </div>
      <blockquote className="mt-4 line-clamp-6 flex-1 text-[0.97rem] leading-relaxed text-ink/85">“{review.text}”</blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        {review.photo ? (
          // eslint-disable-next-line @next/next/no-img-element -- Google-hosted avatar, tiny, lazy
          <img src={review.photo} alt="" width={36} height={36} loading="lazy" referrerPolicy="no-referrer" className="size-9 rounded-full" />
        ) : (
          <span className="grid size-9 place-items-center rounded-full bg-emerald-deep text-sm font-semibold text-gold-light">
            {review.author.charAt(0)}
          </span>
        )}
        <span className="min-w-0">
          <span className="block truncate text-[0.92rem] font-semibold text-ink">{review.author}</span>
          <span className="block text-[0.78rem] text-muted-foreground">{review.relativeTime}</span>
        </span>
      </figcaption>
    </figure>
  );
}

function Marquee({ reviews, reverse = false, duration }: { reviews: Review[]; reverse?: boolean; duration: number }) {
  // Pad short lists so the track is wider than any screen, then render it twice for a seamless loop.
  // Only the first copy is exposed to assistive tech.
  const loop: Review[] = [];
  while (loop.length < 8) loop.push(...reviews);
  return (
    <div className="marquee mask-fade-x overflow-hidden py-2" style={{ ["--marquee-duration" as string]: `${duration}s` }}>
      <div className={cn("marquee-track flex w-max gap-5", reverse ? "animate-marquee-reverse" : "animate-marquee")}>
        {loop.map((r, i) => (
          <ReviewCard key={`a${i}`} review={r} hidden={i >= reviews.length} />
        ))}
        {loop.map((r, i) => (
          <ReviewCard key={`b${i}`} review={r} hidden />
        ))}
      </div>
    </div>
  );
}

export async function ReviewsSection({ locale, data }: { locale: Locale; data: ReviewsData | null }) {
  const t = await getTranslations({ locale, namespace: "reviews" });

  if (!data) {
    return (
      <section aria-labelledby="reviews-title" className="section-sm">
        <div className="container-page">
          <div className="reveal mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-3xl border border-border bg-white p-8 text-center sm:p-12">
            <GoogleG className="size-10" />
            <h2 id="reviews-title" className="text-3xl text-ink sm:text-4xl">
              {t("fallbackTitle")}
            </h2>
            <p className="text-muted-foreground">{t("fallbackText")}</p>
          </div>
        </div>
      </section>
    );
  }

  const half = Math.ceil(data.reviews.length / 2);
  const twoRows = data.reviews.length >= 6;

  return (
    <section aria-labelledby="reviews-title" className="overflow-hidden section">
      <div className="container-page">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="reviews-title" title={t("title")} />
          <div className="reveal flex items-center gap-5 rounded-3xl border border-border bg-white p-5 pr-7 shadow-[0_20px_40px_-32px_rgb(15_51_40/0.4)]">
            <GoogleG className="size-10 shrink-0" />
            <div>
              <p className="text-[0.72rem] font-semibold tracking-[0.18em] text-muted-foreground uppercase">{t("average")}</p>
              <p className="flex items-center gap-3">
                <span className="font-display text-5xl leading-none font-semibold text-ink">
                  {data.rating.toLocaleString(locale === "bg" ? "bg-BG" : "en-GB", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                </span>
                <Stars rating={data.rating} className="text-xl" />
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{t("basedOn", { count: data.count })}</p>
            </div>
          </div>
        </div>
        {data.demo && (
          <p className="mt-6 inline-flex rounded-full bg-gold/15 px-3 py-1 text-[0.75rem] font-semibold text-gold-dark">{t("demo")}</p>
        )}
      </div>

      {data.reviews.length > 0 && (
        <div className="mt-8 space-y-5 lg:mt-10">
          {twoRows ? (
            <>
              <Marquee reviews={data.reviews.slice(0, half)} duration={70} />
              <Marquee reviews={data.reviews.slice(half)} duration={80} reverse />
            </>
          ) : (
            <Marquee reviews={data.reviews} duration={60} />
          )}
        </div>
      )}

      <div className="container-page mt-8 flex flex-col gap-3 sm:flex-row">
        {data.mapsUri && (
          <a
            href={data.mapsUri}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-white px-6 text-sm font-semibold text-ink hover:border-gold"
          >
            {t("readAll")} <ExternalLink className="size-4" aria-hidden="true" />
          </a>
        )}
        {data.writeReviewUri && (
          <a
            href={data.writeReviewUri}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-emerald px-6 text-sm font-semibold text-white hover:bg-emerald-deep"
          >
            <PenLine className="size-4" aria-hidden="true" /> {t("write")}
          </a>
        )}
      </div>
    </section>
  );
}

import { ArrowUpRight } from "lucide-react";
import { ServiceArt } from "@/components/art/service-art";
import { PulseDot } from "@/components/shared/primitives";
import type { ServiceCategory } from "@/content/services";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function CategoryCard({
  category,
  locale,
  featured = false,
  readMore,
  className,
}: {
  category: ServiceCategory;
  locale: Locale;
  featured?: boolean;
  readMore: string;
  className?: string;
}) {
  const t = category.text[locale];
  const href = { pathname: "/services/[category]" as const, params: { category: t.slug } };
  const children = category.children;

  return (
    <article
      className={cn(
        "card-lift reveal group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-white",
        featured && "lg:flex-row",
        className,
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          featured && "bg-[linear-gradient(135deg,#154535,#0f3328_60%,#0a241c)] lg:flex lg:w-1/2 lg:shrink-0 lg:items-center",
        )}
      >
        <ServiceArt
          art={category.art}
          fit={featured ? "contain" : "cover"}
          className={cn(
            "transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]",
            featured ? "aspect-[4/3]" : "aspect-[16/10]",
          )}
        />
        {category.urgent && (
          <span className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-[0.72rem] font-bold tracking-wide text-alert shadow-sm">
            <PulseDot /> 24/7
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-[1.45rem] leading-tight text-ink lg:text-[1.6rem]">
          <Link href={href} className="after:absolute after:inset-0 after:content-['']">
            {t.navTitle ?? t.title}
          </Link>
        </h3>
        <p className="mt-2 text-[0.94rem] leading-relaxed text-muted-foreground">{t.excerpt}</p>
        {children.length > 0 && (
          <ul className="relative z-10 mt-4 flex flex-wrap gap-2">
            {children.slice(0, featured ? 6 : 4).map((s) => (
              <li key={s.id}>
                <Link
                  href={{
                    pathname: "/services/[category]/[service]",
                    params: { category: t.slug, service: s.text[locale].slug },
                  }}
                  className="inline-flex rounded-full border border-border bg-ivory px-3 py-1.5 text-[0.8rem] font-medium text-ink/80 transition-colors hover:border-emerald hover:text-emerald"
                >
                  {s.text[locale].navTitle ?? s.text[locale].title}
                </Link>
              </li>
            ))}
          </ul>
        )}
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-emerald">
          {readMore}
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}

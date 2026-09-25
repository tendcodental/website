"use client";

import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type SlugMap = Record<Locale, Record<string, string>>;

export function LanguageSwitcher({
  slugMap,
  className,
  tone = "light",
  onNavigate,
}: {
  slugMap: SlugMap;
  className?: string;
  tone?: "light" | "dark";
  onNavigate?: () => void;
}) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const params = useParams<{ category?: string; service?: string }>();
  const t = useTranslations("nav");
  const other: Locale = locale === "bg" ? "en" : "bg";

  // Service slugs differ per language, so translate them; unknown routes fall back to the home page.
  const nextParams: Record<string, string> = {};
  let target = pathname as string;
  if (params.category) {
    const category = slugMap[locale][params.category];
    const service = params.service ? slugMap[locale][params.service] : undefined;
    if (category && (!params.service || service)) {
      nextParams.category = category;
      if (service) nextParams.service = service;
    } else {
      target = "/";
    }
  }
  // e.g. a 404 inside a dynamic route: the template is known but its params are not.
  if (target.includes("[") && !Object.keys(nextParams).length) target = "/";

  const href = (Object.keys(nextParams).length ? { pathname: target, params: nextParams } : target) as never;

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full p-0.5 text-[0.72rem] font-semibold tracking-wider",
        tone === "light" ? "bg-white/10 text-emerald-50" : "bg-sand text-ink",
        className,
      )}
      role="group"
      aria-label={t("language")}
    >
      {(["bg", "en"] as const).map((l) =>
        l === locale ? (
          <span
            key={l}
            aria-current="true"
            className={cn(
              "rounded-full px-2.5 py-1 uppercase",
              tone === "light" ? "bg-white/90 text-emerald-deep" : "bg-white text-emerald shadow-sm",
            )}
          >
            {l}
          </span>
        ) : (
          <Link
            key={l}
            href={href}
            locale={other}
            hrefLang={other}
            onClick={onNavigate}
            className="rounded-full px-2.5 py-1 uppercase opacity-80 transition-opacity hover:opacity-100"
            aria-label={t("switchTo")}
          >
            {l}
          </Link>
        ),
      )}
    </div>
  );
}

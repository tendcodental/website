"use client";

import { ChevronDown, MapPin, Phone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/logo";
import { useSite } from "@/components/providers/site-provider";
import { BookButton } from "@/components/shared/book-button";
import { PulseDot } from "@/components/shared/primitives";
import { clinic, mapLinks } from "@/content/clinic";
import { Link, usePathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { formatPhone } from "@/lib/phone";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./language-switcher";
import type { MenuCategory } from "./menu-data";
import { MobileMenu } from "./mobile-menu";

type SlugMap = Record<Locale, Record<string, string>>;

export function SiteHeader({ menu, slugMap }: { menu: MenuCategory[]; slugMap: SlugMap }) {
  const t = useTranslations("nav");
  const te = useTranslations("emergency");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const { phones } = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mega-menu after navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setServicesOpen(false);
  }

  const links = [
    { href: "/about" as const, label: t("about") },
    { href: "/team" as const, label: t("team") },
    { href: "/contact" as const, label: t("contact") },
  ];
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40">
      {/* Emergency strip (desktop). On phones the same info lives in the bottom action bar. */}
      <div className="hidden bg-emerald-night text-[0.86rem] text-emerald-50/85 lg:block">
        <div className="container-page flex h-[var(--topbar-h)] items-center justify-between gap-6">
          <p className="flex items-center gap-2.5">
            <PulseDot />
            <span className="font-medium text-emerald-50">{te("badge")}</span>
            <span className="text-emerald-50/30">|</span>
            {phones.map((tel, i) => (
              <a
                key={tel}
                href={`tel:${tel}`}
                className="inline-flex items-center gap-1.5 font-semibold tracking-wide text-gold-light transition-colors hover:text-white"
              >
                {i === 0 && <Phone className="size-3.5" aria-hidden="true" />}
                {formatPhone(tel, locale)}
              </a>
            ))}
          </p>
          <div className="flex items-center gap-5">
            <a
              href={mapLinks.googleSearch}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <MapPin className="size-3.5 text-gold-light" aria-hidden="true" />
              {clinic.address.street[locale]}, {clinic.address.city[locale]}
            </a>
            <LanguageSwitcher slugMap={slugMap} />
          </div>
        </div>
      </div>

      <div
        className={cn(
          "border-b transition-[background-color,box-shadow,border-color] duration-500",
          scrolled
            ? "border-border/70 bg-ivory/85 shadow-[0_12px_32px_-24px_rgb(15_51_40/0.45)] backdrop-blur-xl supports-[backdrop-filter]:bg-ivory/75"
            : "border-transparent bg-ivory/0",
        )}
      >
        <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-4">
          <Link href="/" className="shrink-0 rounded-lg" aria-label="T&Co Dental, начало">
            <Logo size="header" eager />
          </Link>

          <nav aria-label={t("mainNav")} className="hidden lg:block">
            <ul className="flex items-center gap-1">
              <li
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <div className="flex items-center">
                  <Link
                    href="/services"
                    className={cn(
                      "rounded-full py-2 pl-4 pr-1.5 text-[0.95rem] font-medium transition-colors hover:text-emerald",
                      isActive("/services") && "text-emerald",
                    )}
                  >
                    {t("services")}
                  </Link>
                  <button
                    type="button"
                    className="rounded-full p-1.5 text-muted-foreground transition-colors hover:text-emerald"
                    aria-expanded={servicesOpen}
                    aria-controls="services-menu"
                    aria-label={t("allServices")}
                    onClick={() => setServicesOpen((o) => !o)}
                  >
                    <ChevronDown className={cn("size-4 transition-transform duration-300", servicesOpen && "rotate-180")} />
                  </button>
                </div>
                <div
                  id="services-menu"
                  className={cn(
                    "absolute top-full left-1/2 w-[46rem] -translate-x-1/2 pt-3 transition-all duration-300 ease-out",
                    servicesOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
                  )}
                >
                  <div className="grid grid-cols-2 gap-1 rounded-2xl border border-border bg-white p-3 shadow-[0_30px_60px_-30px_rgb(15_51_40/0.45)]">
                    {menu.map((c) => (
                      <Link
                        key={c.id}
                        href={{ pathname: "/services/[category]", params: { category: c.slug } }}
                        className="group flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-sand/70"
                      >
                        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-deep text-gold-light transition-transform duration-500 group-hover:scale-105">
                          {c.icon}
                        </span>
                        <span className="text-[0.92rem] leading-snug font-medium text-ink">
                          {c.title}
                          {c.urgent && (
                            <span className="mt-0.5 flex items-center gap-1.5 text-[0.72rem] font-semibold text-alert">
                              <PulseDot className="size-1.5" /> 24/7
                            </span>
                          )}
                        </span>
                      </Link>
                    ))}
                    <Link
                      href="/services"
                      className="flex items-center justify-center rounded-xl bg-emerald p-3 text-[0.9rem] font-semibold text-white transition-colors hover:bg-emerald-deep"
                    >
                      {t("allServices")} →
                    </Link>
                  </div>
                </div>
              </li>
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-[0.95rem] font-medium transition-colors hover:text-emerald",
                      isActive(l.href) && "text-emerald",
                    )}
                    aria-current={isActive(l.href) ? "page" : undefined}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <BookButton size="pill" className="hidden sm:inline-flex">
              {t("bookLong")}
            </BookButton>
            <BookButton size="pill" className="px-3.5 text-[0.85rem] sm:hidden">
              {t("book")}
            </BookButton>
            <MobileMenu menu={menu} slugMap={slugMap} />
          </div>
        </div>
      </div>
    </header>
  );
}

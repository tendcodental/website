"use client";

import { ArrowUpRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { Logo } from "@/components/brand/logo";
import { useSite } from "@/components/providers/site-provider";
import { BookButton } from "@/components/shared/book-button";
import { PulseDot } from "@/components/shared/primitives";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { clinic } from "@/content/clinic";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { formatPhone } from "@/lib/phone";
import { LanguageSwitcher } from "./language-switcher";
import type { MenuCategory } from "./menu-data";

export function MobileMenu({ menu, slugMap }: { menu: MenuCategory[]; slugMap: Record<Locale, Record<string, string>> }) {
  const t = useTranslations("nav");
  const te = useTranslations("emergency");
  const locale = useLocale() as Locale;
  const { phones } = useSite();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const stagger = (i: number) => ({ animationDelay: `${80 + i * 55}ms` });
  const links = [
    { href: "/about" as const, label: t("about") },
    { href: "/team" as const, label: t("team") },
    { href: "/contact" as const, label: t("contact") },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="grid size-11 place-items-center rounded-full border border-border bg-white/70 text-ink shadow-sm transition-colors hover:bg-white lg:hidden"
          aria-label={t("openMenu")}
        >
          <Menu className="size-5" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="bg-marble w-full gap-0 overflow-y-auto border-l-0 p-0 data-[side=right]:w-full data-[side=right]:sm:max-w-md"
      >
        <SheetTitle className="sr-only">{t("menu")}</SheetTitle>
        <SheetDescription className="sr-only">{te("badge")}</SheetDescription>

        <div className="sticky top-0 z-10 flex h-[var(--header-h)] items-center justify-between border-b border-border/60 bg-ivory/80 px-4 backdrop-blur-lg">
          <Link href="/" onClick={close} aria-label="T&Co Dental">
            <Logo size="sm" />
          </Link>
          <SheetClose asChild>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-full border border-border bg-white text-ink"
              aria-label={t("closeMenu")}
            >
              <X className="size-5" />
            </button>
          </SheetClose>
        </div>

        <nav aria-label={t("mainNav")} className="px-5 pt-6 pb-4">
          <ul className="space-y-1">
            <li className="animate-fade-up" style={stagger(0)}>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between py-3 font-display text-[2rem] leading-none font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {t("services")}
                  <ChevronDown className="size-6 text-gold-dark transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <ul className="mb-3 grid gap-1 border-l border-gold/40 pl-4">
                  {menu.map((c) => (
                    <li key={c.id}>
                      <Link
                        href={{ pathname: "/services/[category]", params: { category: c.slug } }}
                        onClick={close}
                        className="flex items-center gap-3 rounded-xl py-2 text-[1.02rem] font-medium text-ink/90"
                      >
                        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-emerald-deep text-gold-light">
                          {c.icon}
                        </span>
                        <span className="leading-snug">{c.title}</span>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href="/services" onClick={close} className="inline-flex items-center gap-1 py-2 text-sm font-semibold text-emerald">
                      {t("allServices")} <ArrowUpRight className="size-4" />
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
            {links.map((l, i) => (
              <li key={l.href} className="animate-fade-up" style={stagger(i + 1)}>
                <Link
                  href={l.href}
                  onClick={close}
                  className="block py-3 font-display text-[2rem] leading-none font-semibold text-ink"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-4 px-5 pb-8">
          <div className="animate-fade-up" style={stagger(5)}>
            <BookButton className="w-full" onNavigate={close}>
              {t("bookLong")}
            </BookButton>
          </div>

          <div className="bg-emerald-glow animate-fade-up rounded-2xl p-5 text-ivory" style={stagger(6)}>
            <p className="flex items-center gap-2 text-[0.8rem] font-semibold tracking-wide text-gold-light">
              <PulseDot /> {te("label")}
            </p>
            <p className="mt-2 text-sm text-emerald-50/80">{te("badge")}</p>
            <div className="mt-4 grid gap-2">
              {phones.map((tel) => (
                <a
                  key={tel}
                  href={`tel:${tel}`}
                  className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3 text-lg font-semibold tracking-wide text-white transition-colors hover:bg-white/15"
                >
                  {formatPhone(tel, locale)}
                  <Phone className="size-5 text-gold-light" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className="animate-fade-up flex items-center justify-between pt-2" style={stagger(7)}>
            <LanguageSwitcher slugMap={slugMap} tone="dark" onNavigate={close} />
            <div className="flex gap-4 text-sm font-medium text-muted-foreground">
              <a href={clinic.socials.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-emerald">
                Facebook
              </a>
              <a href={clinic.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-emerald">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

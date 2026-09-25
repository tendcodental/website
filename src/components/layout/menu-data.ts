import type { ReactNode } from "react";
import { serviceCategories } from "@/content/services";
import type { ArtKey } from "@/content/services";
import type { Locale } from "@/i18n/routing";

export interface MenuItem {
  id: string;
  title: string;
  /** Link target: category page, or a service page inside the category. */
  category: string;
  service?: string;
}

export interface MenuCategory {
  id: string;
  title: string;
  slug: string;
  art: ArtKey;
  urgent: boolean;
  children: MenuItem[];
  /** Server-rendered icon, passed into the client header so the SVG code stays out of the JS bundle. */
  icon?: ReactNode;
}

/** Compact, serialisable menu for the header (client component). */
export function buildServicesMenu(locale: Locale): MenuCategory[] {
  return serviceCategories.map((c) => {
    const t = c.text[locale];
    const children: MenuItem[] = c.children.map((s) => ({
      id: s.id,
      title: s.text[locale].navTitle ?? s.text[locale].title,
      category: t.slug,
      service: s.text[locale].slug,
    }));
    if (c.selfListing) children.unshift({ id: c.id, title: c.selfListing[locale], category: t.slug });
    return { id: c.id, title: t.navTitle ?? t.title, slug: t.slug, art: c.art, urgent: Boolean(c.urgent), children };
  });
}

/** bg-slug ↔ en-slug lookup for the language switcher on service pages. */
export function buildSlugMap() {
  const map: Record<Locale, Record<string, string>> = { bg: {}, en: {} };
  for (const c of serviceCategories) {
    map.bg[c.text.bg.slug] = c.text.en.slug;
    map.en[c.text.en.slug] = c.text.bg.slug;
    for (const s of c.children) {
      map.bg[s.text.bg.slug] = s.text.en.slug;
      map.en[s.text.en.slug] = s.text.bg.slug;
    }
  }
  return map;
}

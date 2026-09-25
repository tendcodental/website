import type { Locale } from "@/i18n/routing";
import { diagnostics } from "./diagnostics";
import { emergency } from "./emergency";
import { endodontics } from "./endodontics";
import { oralSurgery } from "./oral-surgery";
import { preventive } from "./preventive";
import { cleaning, crowns } from "./standalone";
import type { Service, ServiceCategory } from "./types";

export type { ArtKey, Service, ServiceCategory, ServiceText } from "./types";

/** Order matters: this is the order used in menus, the services page and the sitemap. */
export const serviceCategories: ServiceCategory[] = [
  emergency,
  oralSurgery,
  endodontics,
  preventive,
  diagnostics,
  cleaning,
  crowns,
];

export function findCategory(locale: Locale, slug: string) {
  return serviceCategories.find((c) => c.text[locale].slug === slug);
}

export function findService(locale: Locale, categorySlug: string, serviceSlug: string) {
  const category = findCategory(locale, categorySlug);
  const service = category?.children.find((s) => s.text[locale].slug === serviceSlug);
  return category && service ? { category, service } : null;
}

export function findServiceById(id: string): { category: ServiceCategory; service?: Service } | null {
  for (const category of serviceCategories) {
    if (category.id === id) return { category };
    const service = category.children.find((s) => s.id === id);
    if (service) return { category, service };
  }
  return null;
}

/** Every page-backed service entry (categories + children), flattened. */
export function allServiceEntries() {
  return serviceCategories.flatMap((category) => [
    { category, service: undefined as Service | undefined },
    ...category.children.map((service) => ({ category, service: service as Service | undefined })),
  ]);
}

/** Maps a slug in one locale to the equivalent slug in the other (used by the language switcher). */
export function translateServiceSlugs(from: Locale, to: Locale, category?: string, service?: string) {
  const cat = category ? findCategory(from, category) : undefined;
  if (!cat) return null;
  const child = service ? cat.children.find((s) => s.text[from].slug === service) : undefined;
  if (service && !child) return null;
  return { category: cat.text[to].slug, service: child?.text[to].slug };
}

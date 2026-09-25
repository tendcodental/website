import type { Localized } from "../clinic";

export type ArtKey =
  | "emergency"
  | "pulp"
  | "abscess"
  | "broken"
  | "extraction-urgent"
  | "gums"
  | "surgery"
  | "extraction"
  | "jaw"
  | "wisdom"
  | "baby-tooth"
  | "surgery-urgent"
  | "endo"
  | "toothache"
  | "filling"
  | "root-canal"
  | "preventive"
  | "kids"
  | "fluoride"
  | "sealant"
  | "diagnostics"
  | "images"
  | "periapical"
  | "xray"
  | "exam"
  | "cleaning"
  | "crown";

export interface ServiceText {
  slug: string;
  title: string;
  /** Short label for menus when the title is long. */
  navTitle?: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  intro: string[];
  signsTitle?: string;
  signs?: string[];
  steps?: { title: string; text: string }[];
  notesTitle?: string;
  notes?: string[];
  faq?: { q: string; a: string }[];
}

export interface Service {
  id: string;
  art: ArtKey;
  thumbnail?: string;
  /** Urgent services surface the 24/7 emergency line prominently. */
  urgent?: boolean;
  text: Localized<ServiceText>;
}

export interface ServiceCategory extends Service {
  children: Service[];
  /**
   * When the first item of the category list is the category itself (e.g. "Спешна стоматологична
   * помощ" inside "Спешна стоматологична помощ"), it is linked to the category page instead of
   * creating a duplicate page.
   */
  selfListing?: Localized;
}

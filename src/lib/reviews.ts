import "server-only";
import type { Locale } from "@/i18n/routing";
import { env } from "@/lib/env";

export const REVIEWS_TAG = "google-reviews";

export interface Review {
  author: string;
  photo?: string;
  authorUri?: string;
  rating: number;
  text: string;
  relativeTime: string;
}

export interface ReviewsData {
  rating: number;
  count: number;
  reviews: Review[];
  mapsUri?: string;
  writeReviewUri?: string;
  /** True only for the development placeholder data, never shown in production. */
  demo?: boolean;
}

interface PlacesResponse {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: Array<{
    rating?: number;
    relativePublishTimeDescription?: string;
    text?: { text?: string };
    originalText?: { text?: string };
    authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
  }>;
}

/**
 * Rating, review count and the latest reviews from Google Places API (New). Refreshed every 6 hours,
 * so the average and total update automatically. Returns null when not configured in production.
 */
export async function getGoogleReviews(locale: Locale): Promise<ReviewsData | null> {
  if (!env.placesKey || !env.placeId) return env.isProd ? null : demoReviews(locale);

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(env.placeId)}?languageCode=${locale}`,
      {
        headers: {
          "X-Goog-Api-Key": env.placesKey,
          "X-Goog-FieldMask": "rating,userRatingCount,reviews,googleMapsUri",
        },
        next: { revalidate: 21600, tags: [REVIEWS_TAG] },
      },
    );
    if (!res.ok) {
      console.error(`[reviews] Places API ${res.status}: ${await res.text()}`);
      return null;
    }
    const data = (await res.json()) as PlacesResponse;
    const reviews = (data.reviews ?? [])
      .map((r) => ({
        author: r.authorAttribution?.displayName ?? "Google",
        photo: r.authorAttribution?.photoUri,
        authorUri: r.authorAttribution?.uri,
        rating: r.rating ?? 0,
        // Bulgarian page: the author's own words. English page: Google's translation when available.
        text: ((locale === "bg" ? r.originalText?.text : r.text?.text) ?? r.text?.text ?? "").trim(),
        relativeTime: r.relativePublishTimeDescription ?? "",
      }))
      .filter((r) => r.rating >= 4 && r.text.length > 0);

    if (!data.rating || !data.userRatingCount) return null;
    return {
      rating: data.rating,
      count: data.userRatingCount,
      reviews,
      mapsUri: data.googleMapsUri,
      writeReviewUri: `https://search.google.com/local/writereview?placeid=${encodeURIComponent(env.placeId)}`,
    };
  } catch (error) {
    console.error("[reviews] failed", error);
    return null;
  }
}

function demoReviews(locale: Locale): ReviewsData {
  const bg = locale === "bg";
  const sample = (i: number, text: string) => ({
    author: bg ? `Примерен отзив ${i}` : `Sample review ${i}`,
    rating: 5,
    text,
    relativeTime: bg ? "демо данни" : "demo data",
  });
  return {
    demo: true,
    rating: 4.9,
    count: 128,
    reviews: bg
      ? [
          sample(1, "Тук ще се показват истинските отзиви от Google, след като свържете Places API."),
          sample(2, "Отзивите се обновяват автоматично на всеки няколко часа, средната оценка и броят им също."),
          sample(3, "Това е примерен текст само за разработка. В продукция демо отзиви не се показват."),
          sample(4, "Лентата с отзиви се движи бавно и спира, когато посетителят задържи мишката върху нея."),
        ]
      : [
          sample(1, "Real Google reviews will appear here once the Places API is connected."),
          sample(2, "Reviews refresh automatically every few hours, so do the average rating and the count."),
          sample(3, "This is placeholder text for development only. Demo reviews are never shown in production."),
          sample(4, "The review strip scrolls slowly and pauses when a visitor hovers over it."),
        ],
  };
}

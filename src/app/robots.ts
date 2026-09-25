import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/clinic";

export default function robots(): MetadataRoute.Robots {
  // Keep preview deployments out of search results; only production is indexable.
  const isProduction = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : true;
  if (!isProduction) return { rules: { userAgent: "*", disallow: "/" } };

  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

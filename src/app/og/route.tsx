import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

/**
 * Branded Open Graph / Twitter card for every page: /og?title=…&kicker=…&locale=bg
 * Latin + Cyrillic font subsets are both loaded so Bulgarian titles render correctly.
 */
const fontDir = join(process.cwd(), "src/assets/fonts");
const fonts = Promise.all([
  readFile(join(fontDir, "cormorant-garamond-latin-600-normal.woff")),
  readFile(join(fontDir, "cormorant-garamond-cyrillic-600-normal.woff")),
  readFile(join(fontDir, "sofia-sans-latin-500-normal.woff")),
  readFile(join(fontDir, "sofia-sans-cyrillic-500-normal.woff")),
]);

// The original logo artwork (tooth mark + light wordmark for the dark background).
const brandDir = join(process.cwd(), "src/assets/brand");
const brand = Promise.all([readFile(join(brandDir, "mark.png")), readFile(join(brandDir, "wordmark-light.png"))]).then(
  ([mark, word]) => ({
    mark: `data:image/png;base64,${mark.toString("base64")}`,
    word: `data:image/png;base64,${word.toString("base64")}`,
  }),
);

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const locale = params.get("locale") === "en" ? "en" : "bg";
  const title = (params.get("title") || "T&Co Dental").slice(0, 110);
  const kicker = (params.get("kicker") || (locale === "bg" ? "Зъболекарски кабинет в Пловдив" : "Dental clinic in Plovdiv")).slice(0, 60);
  const badge = locale === "bg" ? "Спешен денонощен зъболекарски кабинет 24/7" : "24/7 emergency dental clinic";
  const [[cormorantLatin, cormorantCyr, sofiaLatin, sofiaCyr], logo] = await Promise.all([fonts, brand]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(135deg, #154535 0%, #0f3328 55%, #0a241c 100%)",
          color: "#fbf9f5",
          fontFamily: "Sofia, SofiaCyr",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo.mark} width={102} height={70} alt="" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo.word} width={137} height={60} alt="" />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 20px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.2)",
              fontSize: 20,
              color: "#fbf9f5",
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: 999, background: "#e2574c" }} />
            {badge}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 1000 }}>
          <span style={{ fontSize: 22, letterSpacing: 5, color: "#e6c67e", textTransform: "uppercase" }}>{kicker}</span>
          <span style={{ fontFamily: "Cormorant, CormorantCyr", fontSize: title.length > 60 ? 64 : 80, lineHeight: 1.05, marginTop: 18 }}>
            {title}
          </span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 22, color: "rgba(251,249,245,0.7)" }}>
          <span>{locale === "bg" ? "ул. „Даме Груев“ 34, Пловдив" : "34 Dame Gruev St., Plovdiv"}</span>
          <span style={{ color: "#e6c67e" }}>tandcodental.com</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Cormorant", data: cormorantLatin, weight: 600, style: "normal" },
        { name: "CormorantCyr", data: cormorantCyr, weight: 600, style: "normal" },
        { name: "Sofia", data: sofiaLatin, weight: 500, style: "normal" },
        { name: "SofiaCyr", data: sofiaCyr, weight: 500, style: "normal" },
      ],
      headers: { "cache-control": "public, max-age=86400, s-maxage=31536000, immutable" },
    },
  );
}

/**
 * IndexNow: tells Bing (which also feeds ChatGPT Search and Copilot), Yandex, Seznam and Naver that
 * pages changed, so they are re-crawled within hours instead of weeks. Run after a production deploy:
 *
 *   node scripts/indexnow.mjs                 # every URL in the live sitemap
 *   node scripts/indexnow.mjs /saveti /uslugi # only these paths
 *
 * The key file lives at public/<key>.txt; keep INDEXNOW_KEY in sync if you rotate it.
 */
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://tandcodental.com").replace(/\/$/, "");
const KEY = process.env.INDEXNOW_KEY || "2c9b0670652bb54eedde33fcba3cda88";

async function sitemapUrls() {
  const res = await fetch(`${SITE_URL}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml: HTTP ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

const paths = process.argv.slice(2);
const urlList = paths.length ? paths.map((p) => new URL(p, SITE_URL).href) : await sitemapUrls();

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(SITE_URL).host,
    key: KEY,
    keyLocation: `${SITE_URL}/${KEY}.txt`,
    urlList,
  }),
});

// 200 = accepted, 202 = accepted (key validation pending).
console.log(`IndexNow: HTTP ${res.status} for ${urlList.length} URL(s)`);
if (res.status >= 300) {
  console.error(await res.text());
  process.exit(1);
}

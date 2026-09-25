import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404, T&Co Dental",
  robots: { index: false },
};

/** Fallback for requests outside the localised routes (rare, most 404s use app/[locale]/not-found). */
export default function GlobalNotFound() {
  return (
    <html lang="bg">
      <body className="grid min-h-dvh place-items-center bg-[#fbf9f5] p-6 text-center font-sans text-[#13231d]">
        <main>
          <p className="text-sm tracking-[0.3em] text-[#8a6420] uppercase">404</p>
          <h1 className="mt-3 font-serif text-4xl">Страницата не е намерена</h1>
          <p className="mt-2 text-[#5a6863]">Page not found</p>
          <Link href="/" className="mt-8 inline-block rounded-full bg-[#1e5a45] px-6 py-3 font-semibold text-white">
            T&amp;Co Dental
          </Link>
        </main>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Cormorant_Garamond, Sofia_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";
import { ServiceArt } from "@/components/art/service-art";
import { MobileActionBar } from "@/components/layout/mobile-action-bar";
import { buildServicesMenu, buildSlugMap } from "@/components/layout/menu-data";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteProvider } from "@/components/providers/site-provider";
import { SITE_URL } from "@/content/clinic";
import { type Locale, routing } from "@/i18n/routing";
import { getEmergencyPhones } from "@/lib/emergency";

const display = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const text = Sofia_Sans({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sofia",
  display: "swap",
});

// Pages are static and re-generated in the background at most once a minute, so a change to the
// emergency number in the Google Sheet reaches every page quickly without a deployment.
export const revalidate = 60;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#fbf9f5",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "meta" });
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t("homeTitle"), template: "%s | T&Co Dental" },
    description: t("homeDescription"),
    applicationName: "T&Co Dental",
    authors: [{ name: "T&Co Dental" }],
    formatDetection: { telephone: false, address: false, email: false },
    appleWebApp: { title: "T&Co Dental", statusBarStyle: "default" },
    category: "health",
    ...(process.env.GOOGLE_SITE_VERIFICATION
      ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
      : {}),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const [messages, emergency, t] = await Promise.all([
    getMessages(),
    getEmergencyPhones(),
    getTranslations({ locale, namespace: "nav" }),
  ]);

  // Only the namespaces used by client components are sent to the browser.
  const clientMessages = Object.fromEntries(
    ["nav", "emergency", "booking", "contact", "common"].map((ns) => [ns, messages[ns]]),
  );
  const menu = buildServicesMenu(locale).map((c) => ({
    ...c,
    icon: <ServiceArt art={c.art} variant="icon" className="size-[1.4rem]" />,
  }));

  return (
    <html lang={locale} className={`${display.variable} ${text.variable}`}>
      <body className="min-h-dvh pb-[calc(6rem+env(safe-area-inset-bottom))] lg:pb-0">
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-emerald px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {t("skip")}
        </a>
        <NextIntlClientProvider locale={locale} messages={clientMessages}>
          <SiteProvider phones={emergency.phones}>
            <SiteHeader menu={menu} slugMap={buildSlugMap()} />
            <main id="main">{children}</main>
            <SiteFooter locale={locale} phones={emergency.phones} />
            <MobileActionBar />
          </SiteProvider>
        </NextIntlClientProvider>
      </body>
      {process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}

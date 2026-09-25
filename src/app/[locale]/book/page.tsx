import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { InlineBooking } from "@/components/booking/inline-booking";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { SectionHeading } from "@/components/shared/primitives";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({ locale, hrefs: { bg: "/book", en: "/book" }, title: t("bookTitle"), description: t("bookDescription") });
}

/** Stand-alone booking page, a short, shareable link (e.g. for the Instagram bio): /zapazi-chas */
export default async function BookPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "booking" });
  const tn = await getTranslations({ locale, namespace: "nav" });

  return (
    <section className="bg-marble pb-[clamp(3rem,8vh,6rem)]">
      <div className="container-page pt-6">
        <Breadcrumbs label={tn("breadcrumb")} items={[{ name: tn("home"), href: "/" }, { name: tn("bookLong") }]} />
        <SectionHeading as="h1" title={t("title")} lead={t("lead")} align="center" className="mt-6 mb-8 lg:mb-10" />
        <div className="mx-auto max-w-6xl">
          <InlineBooking />
        </div>
      </div>
    </section>
  );
}

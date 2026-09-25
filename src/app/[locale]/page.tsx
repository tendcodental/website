import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactSection } from "@/components/contact/contact-section";
import { AboutTeaser } from "@/components/home/about-teaser";
import { BookingSection } from "@/components/home/booking-section";
import { EmergencyBand } from "@/components/home/emergency-band";
import { Hero } from "@/components/home/hero";
import { ReviewsSection } from "@/components/home/reviews-section";
import { ServicesSection } from "@/components/home/services-section";
import { TeamSection } from "@/components/home/team-section";
import { FaqList } from "@/components/shared/faq-list";
import { JsonLd, SectionHeading } from "@/components/shared/primitives";
import { generalFaq } from "@/content/faq";
import type { Locale } from "@/i18n/routing";
import { getEmergencyPhones } from "@/lib/emergency";
import { getGoogleReviews } from "@/lib/reviews";
import { clinicSchema, faqSchema, websiteSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({
    locale,
    hrefs: { bg: "/", en: "/" },
    title: t("homeTitle"),
    description: t("homeDescription"),
    absoluteTitle: true,
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [{ phones }, reviews, tf] = await Promise.all([
    getEmergencyPhones(),
    getGoogleReviews(locale),
    getTranslations({ locale, namespace: "faq" }),
  ]);
  const faq = generalFaq[locale];

  return (
    <>
      <JsonLd data={[clinicSchema(locale, phones), websiteSchema(locale), faqSchema(faq)]} />
      <Hero locale={locale} phones={phones} rating={reviews && !reviews.demo ? { value: reviews.rating, count: reviews.count } : null} />
      <BookingSection locale={locale} />
      <EmergencyBand locale={locale} phones={phones} />
      <ServicesSection locale={locale} />
      <TeamSection locale={locale} />
      <ReviewsSection locale={locale} data={reviews} />
      <AboutTeaser locale={locale} />
      <section aria-labelledby="faq-title" className="section">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading id="faq-title" title={tf("title")} />
          <FaqList items={faq} className="reveal" />
        </div>
      </section>
      <div className="hairline container-page" />
      <ContactSection locale={locale} phones={phones} />
    </>
  );
}

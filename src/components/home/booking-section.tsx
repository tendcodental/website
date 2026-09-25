import { getTranslations } from "next-intl/server";
import { InlineBooking } from "@/components/booking/inline-booking";
import { SectionHeading } from "@/components/shared/primitives";
import type { Locale } from "@/i18n/routing";

export async function BookingSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "booking" });
  return (
    <section aria-labelledby="booking-title" className="relative bg-ivory section">
      <div className="container-page">
        <SectionHeading
          id="booking-title"
          title={t("title")}
          lead={t("lead")}
          align="center"
          className="mb-8 lg:mb-10"
        />
        <div className="reveal-scale mx-auto max-w-6xl">
          <InlineBooking />
        </div>
      </div>
    </section>
  );
}

import { Phone } from "lucide-react";
import { doctors } from "@/content/doctors";
import type { Locale } from "@/i18n/routing";
import { formatPhone } from "@/lib/phone";
import { cn } from "@/lib/utils";

/**
 * Two "call the dentist" links, one per doctor. Used instead of a single ambiguous phone button
 * wherever a page invites a call to book (as opposed to the 24/7 emergency number, shown elsewhere).
 */
export function DoctorCallLinks({
  locale,
  className,
  linkClassName,
}: {
  locale: Locale;
  className?: string;
  linkClassName: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {doctors.map((doctor) => (
        <a key={doctor.id} href={`tel:${doctor.phone.tel}`} className={linkClassName}>
          <Phone className="size-4 shrink-0" aria-hidden="true" />
          <span className="truncate">
            {doctor.shortName[locale]} · {formatPhone(doctor.phone.tel, locale)}
          </span>
        </a>
      ))}
    </div>
  );
}

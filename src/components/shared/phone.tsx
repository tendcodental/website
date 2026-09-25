import type { ReactNode } from "react";
import { formatPhone } from "@/lib/phone";

export function PhoneLink({
  tel,
  locale,
  className,
  children,
  label,
}: {
  tel: string;
  locale: "bg" | "en";
  className?: string;
  children?: ReactNode;
  label?: string;
}) {
  return (
    <a href={`tel:${tel}`} className={className} aria-label={label}>
      {children ?? formatPhone(tel, locale)}
    </a>
  );
}

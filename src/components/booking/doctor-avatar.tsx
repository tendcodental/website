import Image from "next/image";
import type { CSSProperties } from "react";
import type { Doctor } from "@/content/doctors";
import { cn } from "@/lib/utils";

/** Doctor photo, or an elegant monogram until a real portrait is provided. */
export function DoctorAvatar({
  doctor,
  size = 48,
  className,
  style,
}: {
  doctor: Pick<Doctor, "photo" | "initials" | "name">;
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  if (doctor.photo) {
    return (
      <Image
        src={doctor.photo}
        alt=""
        width={size}
        height={size}
        className={cn("shrink-0 rounded-full object-cover object-top ring-2 ring-white", className)}
        style={{ ...style, width: size, height: size }}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className={cn(
        "bg-emerald-glow grid shrink-0 place-items-center rounded-full font-display font-semibold text-gold-light ring-2 ring-white",
        className,
      )}
      style={{ ...style, width: size, height: size, fontSize: size * 0.36 }}
    >
      {doctor.initials}
    </span>
  );
}

/** Overlapping portraits, for "any doctor" and for slots more than one doctor can take. */
export function DoctorStack({
  doctors,
  size = 26,
  className,
}: {
  doctors: Array<Pick<Doctor, "id" | "photo" | "initials" | "name">>;
  size?: number;
  className?: string;
}) {
  return (
    <span className={cn("flex shrink-0", className)} style={{ marginRight: size * 0.35 * (doctors.length - 1) }}>
      {doctors.map((d, i) => (
        <DoctorAvatar
          key={d.id}
          doctor={d}
          size={size}
          className="relative"
          style={{ marginLeft: i ? -size * 0.35 : 0, zIndex: doctors.length - i }}
        />
      ))}
    </span>
  );
}

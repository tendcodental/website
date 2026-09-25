import Image from "next/image";
import type { Doctor } from "@/content/doctors";
import { cn } from "@/lib/utils";

/** Doctor photo, or an elegant monogram until a real portrait is provided. */
export function DoctorAvatar({
  doctor,
  size = 48,
  className,
}: {
  doctor: Pick<Doctor, "photo" | "initials" | "name">;
  size?: number;
  className?: string;
}) {
  if (doctor.photo) {
    return (
      <Image
        src={doctor.photo}
        alt=""
        width={size}
        height={size}
        className={cn("shrink-0 rounded-full object-cover object-top ring-2 ring-white", className)}
        style={{ width: size, height: size }}
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
      style={{ width: size, height: size, fontSize: size * 0.36 }}
    >
      {doctor.initials}
    </span>
  );
}

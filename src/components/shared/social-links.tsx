import { clinic } from "@/content/clinic";
import { cn } from "@/lib/utils";

export function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21z" />
    </svg>
  );
}

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Brand-coloured social buttons (Facebook blue, Instagram gradient). */
export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-2.5", className)}>
      <a
        href={clinic.socials.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-11 items-center gap-2.5 rounded-full bg-[#1877f2] px-5 text-sm font-semibold text-white shadow-[0_10px_24px_-12px_rgb(24_119_242/0.9)] transition-[filter,transform] hover:brightness-110 active:scale-[0.98]"
      >
        <FacebookIcon className="size-[1.15rem]" />
        Facebook
      </a>
      <a
        href={clinic.socials.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-11 items-center gap-2.5 rounded-full bg-[linear-gradient(60deg,#f9ce34,#ee2a7b_45%,#6228d7)] px-5 text-sm font-semibold text-white shadow-[0_10px_24px_-12px_rgb(238_42_123/0.9)] transition-[filter,transform] hover:brightness-110 active:scale-[0.98]"
      >
        <InstagramIcon className="size-[1.15rem]" />
        Instagram
      </a>
    </div>
  );
}

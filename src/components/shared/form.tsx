import type { ReactNode } from "react";

export const inputClass =
  "h-12 w-full rounded-xl border border-input bg-white px-4 text-base text-ink shadow-[inset_0_1px_2px_rgb(19_35_29/0.04)] outline-none transition-[border-color,box-shadow] placeholder:text-ink/35 focus:border-gold focus:ring-4 focus:ring-gold/20 aria-invalid:border-alert aria-invalid:ring-alert/15";

export function Field({
  id,
  label,
  hint,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  optional?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[0.85rem] font-semibold text-ink">
        {label} {optional && <span className="font-normal text-muted-foreground">{optional}</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-[0.8rem] font-medium text-alert">
          {error}
        </p>
      ) : (
        hint && <p className="mt-1.5 text-[0.8rem] text-muted-foreground">{hint}</p>
      )}
    </div>
  );
}

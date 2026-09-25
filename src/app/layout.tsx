import type { ReactNode } from "react";
import "./globals.css";

// The <html> element lives in app/[locale]/layout.tsx so that `lang` matches the page language.
// This root layout only exists because app/not-found.tsx needs one.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}

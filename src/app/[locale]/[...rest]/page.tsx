import { notFound } from "next/navigation";

// Unknown localised URLs render app/[locale]/not-found.tsx (with the site header, footer and a 404 status).
export default function CatchAll() {
  notFound();
}

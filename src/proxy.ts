import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next internals, OG images, metadata files and anything with a file extension.
  matcher: ["/((?!api|og|_next|_vercel|sitemap|robots|manifest|icon|apple-icon|favicon|.*\\..*).*)"],
};

/**
 * MapLibre GL v6 runs map rendering work in a module Web Worker that it locates via import.meta.url,
 * which bundlers rewrite. We serve the worker (and the shared chunk it imports) from /public instead
 * and point MapLibre at it with setWorkerUrl(). Runs automatically before `dev` and `build`, so the
 * copies always match the installed maplibre-gl version.
 */
import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(root, "node_modules/maplibre-gl/dist");
const dest = path.join(root, "public/vendor/maplibre");

await mkdir(dest, { recursive: true });
for (const file of ["maplibre-gl-worker.mjs", "maplibre-gl-shared.mjs"]) {
  await copyFile(path.join(src, file), path.join(dest, file));
}
console.log("MapLibre worker copied to public/vendor/maplibre");

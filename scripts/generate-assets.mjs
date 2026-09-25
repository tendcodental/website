/**
 * Generates brand assets from the original logo artwork (src/assets/brand/mark-source.png):
 *   - src/app/icon.png, src/app/apple-icon.png, src/app/favicon.ico
 *   - public/icons/icon-192.png, icon-512.png, maskable-512.png
 *   - public/textures/marble.webp (procedural marble texture used behind light sections)
 *
 * Run with: npm run generate:assets
 */
import { mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = (p) => path.join(root, p);
const MARK = out("src/assets/brand/mark-source.png");
const IVORY = "#fbf9f5";

/** The tooth mark centred on an ivory tile. `pad` = breathing room (maskable icons need ~20%). */
async function squareIcon(size, { pad = 0.12, radius = 0.22 } = {}) {
  const inner = Math.round(size * (1 - pad * 2));
  const mark = await sharp(MARK).resize({ width: inner, height: inner, fit: "inside" }).toBuffer();
  const meta = await sharp(mark).metadata();
  const r = Math.round(size * radius);
  const tile = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${r}" fill="${IVORY}"/></svg>`,
  );
  return sharp(tile)
    .composite([{ input: mark, left: Math.round((size - meta.width) / 2), top: Math.round((size - meta.height) / 2) }])
    .png()
    .toBuffer();
}

// An .ico that embeds PNG images (supported by all modern browsers).
function buildIco(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  const entries = [];
  let offset = 6 + 16 * pngs.length;
  for (const { size, data } of pngs) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    entries.push(e);
  }
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)]);
}

// Procedural Carrara-style marble: fractal noise shaped into thin diagonal veins on transparent.
function marbleSvg(width = 1200, height = 800) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <filter id="f" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.003 0.008" numOctaves="6" seed="21" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.50  0 0 0 0 0.54  0 0 0 0 0.54  1 0.6 0 0 -0.3"/>
      <feComponentTransfer>
        <feFuncA type="table" tableValues="0 0 0 0 0 0 0 0 0.28 0 0 0 0 0 0 0 0 0.12 0 0 0 0 0 0"/>
      </feComponentTransfer>
      <feGaussianBlur stdDeviation="0.5"/>
    </filter>
    <g transform="rotate(-28 ${width / 2} ${height / 2})">
      <rect x="-500" y="-600" width="${width + 1000}" height="${height + 1200}" filter="url(#f)"/>
    </g>
  </svg>`;
}

async function main() {
  await mkdir(out("public/icons"), { recursive: true });
  await mkdir(out("public/textures"), { recursive: true });

  await writeFile(out("src/app/icon.png"), await squareIcon(192, { pad: 0.1 }));
  await writeFile(out("src/app/apple-icon.png"), await squareIcon(180, { pad: 0.12, radius: 0 }));
  await writeFile(out("public/icons/icon-192.png"), await squareIcon(192));
  await writeFile(out("public/icons/icon-512.png"), await squareIcon(512));
  await writeFile(out("public/icons/maskable-512.png"), await squareIcon(512, { pad: 0.22, radius: 0 }));

  // Tiny favicons: less padding so the tooth stays legible at 16 px.
  const ico = buildIco(
    await Promise.all([16, 32, 48].map(async (size) => ({ size, data: await squareIcon(size, { pad: 0.04, radius: 0.18 }) }))),
  );
  await writeFile(out("src/app/favicon.ico"), ico);

  await sharp(Buffer.from(marbleSvg())).webp({ quality: 50, alphaQuality: 50, effort: 6 }).toFile(out("public/textures/marble.webp"));
  console.log("Brand assets generated.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

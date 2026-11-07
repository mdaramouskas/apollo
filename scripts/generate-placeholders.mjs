#!/usr/bin/env node
/**
 * Generates neutral placeholder SVGs into public/images (no network needed).
 * Re-run after changing the list below: `npm run placeholders`.
 * Replace the files with real photos per CUSTOMIZE.md (keep names or update site.config.ts).
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "public", "images");
mkdirSync(out, { recursive: true });

const palettes = [
  ["#d9dee4", "#aeb7c2"],
  ["#dcd7cf", "#b5ab9d"],
  ["#d3dcd6", "#a3b3a8"],
  ["#e0d9d9", "#b9a9a9"],
];

function svg(name, w, h, label, i) {
  const [a, b] = palettes[i % palettes.length];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <circle cx="${w * 0.72}" cy="${h * 0.3}" r="${Math.min(w, h) * 0.12}" fill="#ffffff" fill-opacity="0.25"/>
  <path d="M0 ${h * 0.78} L${w * 0.3} ${h * 0.55} L${w * 0.55} ${h * 0.7} L${w * 0.75} ${h * 0.5} L${w} ${h * 0.72} L${w} ${h} L0 ${h} Z" fill="#ffffff" fill-opacity="0.18"/>
  <text x="50%" y="52%" text-anchor="middle" font-family="system-ui, sans-serif" font-size="${Math.round(Math.min(w, h) * 0.07)}" fill="#3b3f45" fill-opacity="0.65">${label}</text>
</svg>
`;
}

const files = [
  ["placeholder-hero.svg", 1920, 1080, "Hero image"],
  ["placeholder-og.svg", 1200, 630, "Share image"],
  ["placeholder-about-1.svg", 900, 1200, "About 1"],
  ["placeholder-about-2.svg", 900, 1200, "About 2"],
  ["placeholder-coming-soon.svg", 1920, 1080, "Coming soon"],
  ...Array.from({ length: 8 }, (_, i) => [`placeholder-gallery-${String(i + 1).padStart(2, "0")}.svg`, 1200, 900, `Gallery ${i + 1}`]),
  ...Array.from({ length: 3 }, (_, i) => [`placeholder-menu-${i + 1}.svg`, 800, 600, `Dish ${i + 1}`]),
  ...Array.from({ length: 6 }, (_, i) => [`placeholder-insta-${i + 1}.svg`, 800, 800, `Post ${i + 1}`]),
];

files.forEach(([name, w, h, label], i) => writeFileSync(join(out, name), svg(name, w, h, label, i)));
console.log(`Wrote ${files.length} placeholders to ${out}`);

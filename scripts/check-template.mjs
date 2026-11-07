#!/usr/bin/env node
/**
 * Fails (exit 1) if client-specific strings from the source project or secret
 * patterns remain anywhere in the template. `TODO-CLIENT` markers are allowed.
 * Usage: npm run check:template
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, extname } from "node:path";

const root = process.cwd();

// Strings from the source project (kyanorama-villa) that must not survive.
const FORBIDDEN = [
  "kyanorama", "Kyanorama", "KYANORAMA",
  "Seaside Escape",
  "Tragaki", "Τραγάκι", "Arkadio", "Αρκάδιο", "Zakynthos", "Ζάκυνθος", "Zante",
  "Amboula", "Tsilivi", "Gaidaros",
  "kyanoramavilla@gmail.com",
  "698 556 9072", "697 695 7613", "6985569072", "6976957613",
  "00003867564",
  "37.8250609", "20.8483078", "20.8457329",
  "0x136747001f4ae8b5", "11zc2rdjgx",
  "bpbVjJ7mM1xX1P8nRgzpgr2eymquQGtrBw2rCRo9OQw",
  "mdaramouskas", "mdara", "Michail",
  "mandalasuites",
  "kyanorama-villa.vercel.app", "kyanorama-villa.gr",
];

const SECRET_PATTERNS = [
  /sk_live_[0-9a-zA-Z]+/, /sk_test_[0-9a-zA-Z]+/, /whsec_[0-9a-zA-Z]+/,
  /postgres(ql)?:\/\//, /eyJhbGci/, /re_[0-9A-Za-z]{20,}/, /xkeysib-[0-9a-f]{10,}/,
];

const SCAN_DIRS = ["src", "public", "scripts", "prisma", "messages", "i18n"];
const SCAN_ROOT_FILES = [".env.example", "site.config.ts", "next.config.ts", "package.json", "vercel.json", "CLAUDE.md"];
const TEXT_EXT = new Set([".ts", ".tsx", ".js", ".mjs", ".json", ".md", ".css", ".svg", ".txt", ".html", ".prisma", ".sql", ".example", ".yml", ".yaml"]);
const SKIP = new Set(["node_modules", ".next", ".git", "out", "build"]);
const SELF = relative(root, new URL(import.meta.url).pathname);

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) yield* walk(p);
    else yield p;
  }
}

const files = [];
for (const d of SCAN_DIRS) {
  try { statSync(join(root, d)); } catch { continue; }
  for (const f of walk(join(root, d))) files.push(f);
}
for (const f of readdirSync(root)) {
  if (SCAN_ROOT_FILES.includes(f) || (extname(f) === ".md" && !SKIP.has(f))) files.push(join(root, f));
}
for (const name of [".env", ".env.local", ".env.production", ".env.development"]) {
  try { statSync(join(root, name)); console.error(`FORBIDDEN FILE: ${name} must not exist in the template`); process.exitCode = 1; } catch { /* good */ }
}

let hits = 0;
for (const file of files) {
  const rel = relative(root, file);
  if (rel === SELF) continue;
  if (!TEXT_EXT.has(extname(file)) && !rel.endsWith(".env.example")) continue;
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    for (const s of FORBIDDEN) {
      if (line.includes(s)) { console.error(`${rel}:${i + 1}: forbidden "${s}"`); hits++; }
    }
    for (const re of SECRET_PATTERNS) {
      if (re.test(line)) { console.error(`${rel}:${i + 1}: secret pattern ${re}`); hits++; }
    }
  });
}

if (hits || process.exitCode) {
  console.error(`\ncheck-template: ${hits} hit(s). Fix them before shipping.`);
  process.exit(1);
}
console.log(`check-template: OK (${files.length} files scanned)`);

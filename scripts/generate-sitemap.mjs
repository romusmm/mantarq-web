// scripts/generate-sitemap.mjs
import { writeFile, mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// ====== Config rutas a indexar ======
const ROUTES = ["/", "/historia/", "/servicios/", "/faq/", "/contacto/"];

// ====== Utilidades ======
const __dirname = dirname(fileURLToPath(import.meta.url));

function parseArgs(argv = process.argv.slice(2)) {
  const out = {};
  for (const a of argv) {
    const m = a.match(/^--([^=]+)=(.*)$/);
    if (m) out[m[1]] = m[2];
  }
  return out;
}
function joinUrl(...parts) {
  const url = parts
    .map((p, i) => (i === 0 ? (p || "").replace(/\/+$/,"") : (p || "").replace(/^\/+|\/+$/g,"")))
    .filter(Boolean)
    .join("/");
  return url.startsWith("http") ? url : `/${url}`;
}
function ensureSlash(p, { leading = true, trailing = true } = {}) {
  let s = p || "/";
  if (leading && !s.startsWith("/")) s = "/" + s;
  if (trailing && !s.endsWith("/")) s = s + "/";
  return s;
}

// ====== Entradas (env + CLI) ======
const args = parseArgs();
const {
  CUSTOM_DOMAIN = process.env.CUSTOM_DOMAIN || args.domain || "",
  GITHUB_REPOSITORY = process.env.GITHUB_REPOSITORY || "",
  VITE_BASE = process.env.VITE_BASE || args.base || "",
} = process.env;

// owner/repo (CLI puede sobrescribir)
let owner, repo;
if (args.owner) owner = args.owner;
if (args.repo) repo = args.repo;
if ((!owner || !repo) && GITHUB_REPOSITORY.includes("/")) {
  [owner, repo] = GITHUB_REPOSITORY.split("/");
}

// ====== Resolver origin y base ======
let origin = "";
let base = "/";

if (CUSTOM_DOMAIN) {
  // Dominio propio
  origin = `https://${CUSTOM_DOMAIN}`;
  base = "/";
} else if (owner && repo) {
  // Project Pages
  origin = `https://${owner}.github.io`;
  base = ensureSlash(VITE_BASE || `/${repo}/`);
} else {
  // Modo local (sin datos de Actions)
  console.warn("[sitemap] Ejecutando en modo local sin GITHUB_REPOSITORY/CUSTOM_DOMAIN.");
  console.warn("[sitemap] Usa parámetros: --owner=TUUSUARIO --repo=mantarq-web --base=/mantarq-web/");
  origin = "http://localhost:4173";
  base = ensureSlash(VITE_BASE || args.base || "/");
}

// ====== Construir URLs ======
const pages = ROUTES.map((r) => {
  const full = `${origin}${joinUrl(base, r)}`;
  return full.endsWith("/") ? full : `${full}/`;
});

// ====== Generar archivos ======
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  pages.map((u) => `  <url><loc>${u}</loc></url>`).join("\n") +
  `\n</urlset>\n`;

const robots =
  `User-agent: *\n` +
  `Allow: /\n` +
  `Sitemap: ${origin}${joinUrl(base, "sitemap.xml")}\n`;

const outDir = resolve(__dirname, "../dist");
await mkdir(outDir, { recursive: true });
await writeFile(resolve(outDir, "sitemap.xml"), sitemap, "utf8");
await writeFile(resolve(outDir, "robots.txt"), robots, "utf8");

console.log("✔ sitemap.xml y robots.txt generados en dist/");
console.log("  origin =", origin);
console.log("  base   =", base);

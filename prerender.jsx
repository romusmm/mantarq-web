// prerender.jsx
import React from "react";
import { renderToString } from "react-dom/server";
import App from "./src/App.jsx";
import {
  COMPANY,
  META_BY_PAGE,
  BRAND,
  ICON_URL,
  FAQS,
  SERVICES,
  pageFromPathname,
  buildLocalBusinessSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
  buildServicesSchema,
} from "./src/site-data.js";

// Resuelve origin/base igual que scripts/generate-sitemap.mjs, para que las
// URLs absolutas (canonical, og:url) coincidan con el dominio real desplegado.
function resolveOrigin() {
  const { CUSTOM_DOMAIN, GITHUB_REPOSITORY } = process.env;
  if (CUSTOM_DOMAIN) return { origin: `https://${CUSTOM_DOMAIN}`, base: "/" };
  if (GITHUB_REPOSITORY && GITHUB_REPOSITORY.includes("/")) {
    const [owner, repo] = GITHUB_REPOSITORY.split("/");
    return { origin: `https://${owner}.github.io`, base: `/${repo}/` };
  }
  return { origin: "https://www.mantarq.com", base: "/" };
}

function joinUrl(origin, base, path) {
  const full = (base.replace(/\/+$/, "") + path).replace(/\/{2,}/g, "/");
  return `${origin}${full}`;
}

// El plugin llamará a esta función por cada ruta (data.url)
export async function prerender(data) {
  const url = data?.url || "/";
  const initialPage = pageFromPathname(url);
  const meta = META_BY_PAGE[initialPage] || META_BY_PAGE.inicio;

  const html = renderToString(<App initialPage={initialPage} />);

  const { origin, base } = resolveOrigin();
  const canonical = joinUrl(origin, base, meta.path);
  const home = joinUrl(origin, base, "/");

  const ldLocal = buildLocalBusinessSchema(COMPANY, canonical);
  const ldBreadcrumb = buildBreadcrumbSchema(initialPage, canonical, home);
  const ldFAQ = initialPage === "faq" ? buildFAQSchema(FAQS) : null;
  const ldServices = initialPage === "servicios" ? buildServicesSchema(SERVICES, COMPANY, canonical) : null;

  const elements = new Set([
    { type: "meta", props: { name: "description", content: meta.desc } },
    { type: "meta", props: { name: "robots", content: "index, follow" } },
    { type: "meta", props: { name: "theme-color", content: BRAND.primary } },
    { type: "link", props: { rel: "canonical", href: canonical } },
    { type: "meta", props: { property: "og:title", content: meta.title } },
    { type: "meta", props: { property: "og:description", content: meta.desc } },
    { type: "meta", props: { property: "og:url", content: canonical } },
    { type: "meta", props: { property: "og:type", content: "website" } },
    { type: "meta", props: { property: "og:image", content: ICON_URL } },
    { type: "meta", props: { property: "og:site_name", content: "Manos a la Obra – MANTARQ" } },
    { type: "meta", props: { property: "og:locale", content: "es_EC" } },
    { type: "meta", props: { name: "twitter:card", content: "summary_large_image" } },
    { type: "script", props: { type: "application/ld+json", id: "ld-local", textContent: JSON.stringify(ldLocal) } },
  ]);

  if (ldBreadcrumb) {
    elements.add({ type: "script", props: { type: "application/ld+json", id: "ld-breadcrumb", textContent: JSON.stringify(ldBreadcrumb) } });
  }
  if (ldFAQ) {
    elements.add({ type: "script", props: { type: "application/ld+json", id: "ld-faq", textContent: JSON.stringify(ldFAQ) } });
  }
  if (ldServices) {
    ldServices.forEach((s, i) => {
      elements.add({ type: "script", props: { type: "application/ld+json", id: `ld-service-${i}`, textContent: JSON.stringify(s) } });
    });
  }

  return {
    html,
    // Optional data to serialize into a script tag for use on the client
    data: { initialPage },
    head: {
      lang: "es-EC",
      title: meta.title,
      elements,
    },
  };
}

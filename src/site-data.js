// Datos y utilidades puras compartidas entre la app cliente (App.jsx) y el
// script de prerenderizado (prerender.jsx). Viven en un módulo aparte (sin
// componentes) para no romper el Fast Refresh de Vite, que exige que un
// archivo de componente solo exporte componentes.
import {
  Building2,
  PlugZap,
  Paintbrush,
  DoorOpen,
  Factory,
} from "lucide-react";

export const BRAND = {
  primary: "#08549C",
  accent: "#FFC200",
};

export const COMPANY = {
  legalName: "MANTARQ S.A.S.",
  brandName: "Manos a la Obra",
  city: "Cuenca, Ecuador",
  email: "info@mantarq.com",
  phone: "+593 99 624 2213",
  phoneHref: "593996242213",
  address: "Fray Vicente Solano y Avenida del Estado. Edificio CICA, Oficina 520",
  facebook: "https://www.facebook.com/Manosalaobra.Cuenca",
  instagram: "https://www.instagram.com/manosalaobraecuador",
  linkedin: "https://www.linkedin.com/company/manos-a-la-obra-mantarq-s-a-s/",
  mapsUrl: "https://www.google.com/maps/place/Manos+a+la+Obra+MANTARQ+SAS/@-2.9060613,-79.0094591,17z/data=!3m1!4b1!4m6!3m5!1s0x91cd19006167e407:0x8c14fa3327f3b7d!8m2!3d-2.9060613!4d-79.0068842!16s%2Fg%2F11vyj3pb6c?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D",
  mapsLat: -2.9060613,
  mapsLng: -79.0068842,
};

export const META_BY_PAGE = {
  inicio: {
    title: "Mantenimiento Empresarial en Ecuador | Manos a la Obra – MANTARQ | Cuenca · Guayaquil",
    desc: "Empresa de mantenimiento empresarial en Ecuador. Cuenca, Guayaquil y cobertura nacional. Mantenimiento preventivo, eléctrico, pintura y más.",
    path: "/",
  },
  historia: {
    title: "Nuestra Historia | Empresa de Mantenimiento desde 2014 | Manos a la Obra Ecuador",
    desc: "Desde 2014 en Cuenca, Ecuador, Manos a la Obra es referente en mantenimiento empresarial. Expandidos a Guayaquil y cobertura nacional.",
    path: "/historia/",
  },
  servicios: {
    title: "Servicios de Mantenimiento Industrial y Comercial en Ecuador | Manos a la Obra",
    desc: "Servicios de mantenimiento industrial y comercial en Ecuador: gypsum, eléctrico, pintura, aluminio y cubiertas. Cuenca, Guayaquil y todo el país.",
    path: "/servicios/",
  },
  faq: {
    title: "Preguntas Frecuentes | Mantenimiento Empresarial en Ecuador | Manos a la Obra",
    desc: "Preguntas frecuentes sobre mantenimiento empresarial en Ecuador. Cobertura en Cuenca, Guayaquil y todo el país. Más de 10 años de experiencia.",
    path: "/faq/",
  },
  contacto: {
    title: "Solicita una Propuesta de Mantenimiento | Manos a la Obra – Cuenca y Guayaquil",
    desc: "Solicita una propuesta de mantenimiento empresarial sin compromiso. Atendemos en Cuenca, Guayaquil y todo Ecuador. Respuesta rápida garantizada.",
    path: "/contacto/",
  },
};

export function withBase(path) {
  const base = import.meta?.env?.BASE_URL || "/";
  if (base === "/" || base === "") return path;
  return (base.replace(/\/+$/, "") + path).replace(/\/{2,}/g, "/");
}

function stripBase(pathname) {
  const base = import.meta?.env?.BASE_URL || "/";
  if (base !== "/" && base !== "" && pathname.startsWith(base)) {
    return "/" + pathname.slice(base.length);
  }
  return pathname;
}

export function normalizePath(p) {
  let s = p || "/";
  if (!s.startsWith("/")) s = "/" + s;
  if (s !== "/" && !s.endsWith("/")) s += "/";
  return s;
}

export function pageFromPathname(pathname) {
  const clean = normalizePath(stripBase(pathname || "/"));
  const found = Object.keys(META_BY_PAGE).find((k) => META_BY_PAGE[k].path === clean);
  return found || "inicio";
}

export const SERVICES = [
  { slug: "paredes-gypsum", icon: Building2, name: "Paredes Gypsum", desc: "Instalación profesional de tabiques, cielos rasos y soluciones acústicas en gypsum para empresas en Ecuador." },
  { slug: "sistema-electrico", icon: PlugZap, name: "Sistema Eléctrico", desc: "Mantenimiento y cableado seguro, tableros, canalizaciones y luminarias para entornos industriales y comerciales en Ecuador." },
  { slug: "pintura-integral", icon: Paintbrush, name: "Pintura Integral", desc: "Acabados premium para instalaciones comerciales e industriales: interiores, exteriores, epóxicos y señalética." },
  { slug: "puertas-aluminio", icon: DoorOpen, name: "Puertas de Aluminio", desc: "Fabricación e instalación de puertas, ventanería y fachadas ligeras para empresas en Ecuador." },
  { slug: "cubiertas-metalicas", icon: Factory, name: "Cubiertas Metálicas", desc: "Estructuras y cubiertas metálicas seguras, durables y estéticas para instalaciones industriales en Ecuador." },
];

export const FAQS = [
  { q: "¿Atienden solo a empresas?", a: "Nos especializamos en empresas, edificios comerciales e instalaciones industriales en Ecuador. Coordinamos equipos y logística según el alcance de cada proyecto." },
  { q: "¿Solo realizan trabajos de mantenimiento?", a: "Si bien somos especialistas en mantenimiento, también ofrecemos servicios de construcción, remodelación y reparación." },
  { q: "¿Trabajan fuera del país?", a: "Actualmente no ofrecemos servicios fuera de Ecuador." },
  { q: "¿Tienen el equipo necesario para los trabajos?", a: "Contamos con el equipo técnico necesario y con más de 10 años de experiencia." },
  { q: "¿En qué ciudades brindan servicios?", a: "Brindamos cobertura a nivel nacional en Ecuador; coordinamos equipos y logística según el alcance de cada proyecto." },
];

export const ICON_URL = "https://i.ibb.co/VYKcrNBR/mantarqlogopng.png";

const PAGE_NAMES = {
  inicio: "Inicio",
  historia: "Historia",
  servicios: "Servicios",
  faq: "Preguntas frecuentes",
  contacto: "Contacto",
};

// Nodo completo de la organización. Se emite solo una vez, en Home; el resto
// de rutas la referencian por "@id" (ver buildPageGraph) para no duplicar
// sus datos en cada página.
function buildOrganizationNode(c, id, url) {
  const parts = (c.city || "").split(",").map((s) => s.trim());
  const locality = parts[0] || "Cuenca";
  const region = parts[1] || "Azuay";
  return {
    "@type": "HomeAndConstructionBusiness",
    "@id": id,
    name: c.brandName,
    legalName: c.legalName,
    alternateName: "MANTARQ",
    url,
    telephone: c.phoneHref ? "+" + c.phoneHref : c.phone,
    email: c.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: c.address,
      addressLocality: locality,
      addressRegion: region,
      addressCountry: "EC",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: c.mapsLat,
      longitude: c.mapsLng,
    },
    sameAs: [c.facebook, c.instagram].filter(Boolean),
    areaServed: ["Cuenca", "Guayaquil", "Ecuador"],
    hasMap: c.mapsUrl,
  };
}

// Nodo completo del sitio. Igual que la organización, se emite solo en Home.
function buildWebsiteNode(c, id, url, orgId) {
  return {
    "@type": "WebSite",
    "@id": id,
    url,
    name: c.brandName,
    alternateName: "MANTARQ",
    publisher: { "@id": orgId },
  };
}

function buildWebPageNode({ id, url, name, websiteId, orgId, breadcrumbId }) {
  const node = {
    "@type": "WebPage",
    "@id": id,
    url,
    name,
    isPartOf: { "@id": websiteId },
    about: { "@id": orgId },
  };
  if (breadcrumbId) node.breadcrumb = { "@id": breadcrumbId };
  return node;
}

function buildBreadcrumbNode(page, canonical, home, id) {
  if (page === "inicio") return null;
  return {
    "@type": "BreadcrumbList",
    "@id": id,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: home || canonical },
      { "@type": "ListItem", position: 2, name: PAGE_NAMES[page] || page, item: canonical },
    ],
  };
}

// FAQPage se conserva únicamente como marcado semántico Schema.org (función
// pura ya existente, sin lógica ni mantenimiento adicional). No se presenta
// como oportunidad de rich result: Google retiró el soporte de resultados
// enriquecidos para FAQ en mayo de 2026 y su documentación en junio de 2026.
function buildFAQNode(faqs) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

function buildServiceNodes(services, orgId) {
  return services.map((s) => ({
    "@type": "Service",
    name: s.name,
    description: s.desc,
    provider: { "@id": orgId },
    areaServed: "Ecuador",
  }));
}

// Construye el grafo JSON-LD completo de una página como un único
// "@graph". Home emite los nodos completos de organización y sitio;
// las páginas internas solo los referencian por "@id" (sin duplicar sus
// datos) y añaden su propio WebPage/BreadcrumbList y los nodos específicos
// de esa ruta (Service, FAQPage).
export function buildPageGraph({ page, canonical, home, title, company, faqs, services }) {
  const orgId = `${home}#organization`;
  const websiteId = `${home}#website`;
  const pageId = `${canonical}#webpage`;
  const graph = [];

  if (page === "inicio") {
    graph.push(buildOrganizationNode(company, orgId, home));
    graph.push(buildWebsiteNode(company, websiteId, home, orgId));
    graph.push(buildWebPageNode({ id: pageId, url: canonical, name: title, websiteId, orgId }));
  } else {
    const breadcrumbId = `${canonical}#breadcrumb`;
    graph.push(buildWebPageNode({ id: pageId, url: canonical, name: title, websiteId, orgId, breadcrumbId }));
    graph.push(buildBreadcrumbNode(page, canonical, home, breadcrumbId));
    if (page === "faq") graph.push(buildFAQNode(faqs));
    if (page === "servicios") graph.push(...buildServiceNodes(services, orgId));
  }

  return { "@context": "https://schema.org", "@graph": graph.filter(Boolean) };
}

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
  { icon: Building2, name: "Paredes Gypsum", desc: "Instalación profesional de tabiques, cielos rasos y soluciones acústicas en gypsum para empresas en Ecuador." },
  { icon: PlugZap, name: "Sistema Eléctrico", desc: "Mantenimiento y cableado seguro, tableros, canalizaciones y luminarias para entornos industriales y comerciales en Ecuador." },
  { icon: Paintbrush, name: "Pintura Integral", desc: "Acabados premium para instalaciones comerciales e industriales: interiores, exteriores, epóxicos y señalética." },
  { icon: DoorOpen, name: "Puertas de Aluminio", desc: "Fabricación e instalación de puertas, ventanería y fachadas ligeras para empresas en Ecuador." },
  { icon: Factory, name: "Cubiertas Metálicas", desc: "Estructuras y cubiertas metálicas seguras, durables y estéticas para instalaciones industriales en Ecuador." },
];

export const FAQS = [
  { q: "¿Atienden solo a empresas?", a: "Nos especializamos en empresas, edificios comerciales e instalaciones industriales en Ecuador. Coordinamos equipos y logística según el alcance de cada proyecto." },
  { q: "¿Solo realizan trabajos de mantenimiento?", a: "Si bien somos especialistas en mantenimiento, también ofrecemos servicios de construcción, remodelación y reparación." },
  { q: "¿Trabajan fuera del país?", a: "Actualmente no ofrecemos servicios fuera de Ecuador." },
  { q: "¿Tienen el equipo necesario para los trabajos?", a: "Contamos con el equipo técnico necesario y con más de 10 años de experiencia." },
  { q: "¿En qué ciudades brindan servicios?", a: "Brindamos cobertura a nivel nacional en Ecuador; coordinamos equipos y logística según el alcance de cada proyecto." },
];

export const ICON_URL = "https://i.ibb.co/VYKcrNBR/mantarqlogopng.png";

export function buildLocalBusinessSchema(c, canonical) {
  const parts = (c.city || "").split(",").map((s) => s.trim());
  const locality = parts[0] || "Cuenca";
  const region = parts[1] || "Azuay";
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: c.brandName,
    legalName: c.legalName,
    url: canonical || "",
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

export function buildBreadcrumbSchema(page, canonical, home) {
  const names = {
    inicio: "Inicio",
    historia: "Historia",
    servicios: "Servicios",
    faq: "Preguntas frecuentes",
    contacto: "Contacto",
  };
  if (page === "inicio") return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: home || canonical },
      { "@type": "ListItem", position: 2, name: names[page] || page, item: canonical },
    ],
  };
}

export function buildFAQSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function buildServicesSchema(services, company, canonical) {
  return services.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.desc,
    provider: {
      "@type": "LocalBusiness",
      name: company.brandName,
      url: canonical || "",
    },
    areaServed: "Ecuador",
  }));
}

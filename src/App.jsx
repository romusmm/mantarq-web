import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { onCLS, onINP, onLCP } from "web-vitals";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  ChevronDown,
  Send,
  Menu,
  X
} from "lucide-react";
import {
  BRAND,
  COMPANY,
  META_BY_PAGE,
  withBase,
  pageFromPathname,
  normalizePath,
  SERVICES,
  FAQS,
  ICON_URL,
  buildPageGraph,
} from "./site-data.js";

const NAV_ITEMS = [
  { key: "inicio", label: "Inicio" },
  { key: "historia", label: "Historia" },
  { key: "servicios", label: "Servicios" },
  { key: "faq", label: "FAQ" },
  { key: "contacto", label: "Contacto" },
];

function handleNavClick(e, action) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  e.preventDefault();
  action();
}

const CLIENT_LOGOS = [
  { name: "Grupo Ortiz (Cuenca)", url: "https://i.ibb.co/PvSHrjyC/gruporotizlogo.png" },
  { name: "Marcimex", url: "https://i.ibb.co/WvJ8pRf0/Marcimex-Logo.png", scale: 1.3 },
  { name: "Junta de Beneficencia de Guayaquil", url: "https://i.ibb.co/7JyR16qj/Junta-Guayaquil-Logo.png", scale: 1.3 },
  { name: "Grupo Consenso", url: "https://i.ibb.co/whCrK4SK/grupoconsensologofinal.png" },
  { name: "Indurama", url: "https://i.ibb.co/KxmfhzBV/Indurama-Logo.png" },
  { name: "Lotería Nacional", url: "https://i.ibb.co/XrQH1J0X/Loter-a-Nacional-Logo.png" },
  { name: "Nucleomed", url: "https://i.ibb.co/4gTcdhb7/nucleomedlogo.webp" },
  { name: "Universidad Católica de Cuenca", url: "https://i.ibb.co/F401j09F/Cato-De-Cuenca-Logo-removebg-preview.png" },
];

const Button = ({ as: As = "button", children, className = "", ...props }) => (
  <As className={`inline-flex cursor-pointer items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold shadow-sm transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`} {...props}>{children}</As>
);

const Card = ({ className = "", children }) => (
  <div className={`rounded-2xl border border-neutral-200 bg-white p-6 ${className}`}>{children}</div>
);

function useDarkMode() {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);
}

function useStickyNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrolled;
}

function useScrollTopOnRoute(pageKey) {
  useEffect(() => {
    try { if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual"; } catch { /* noop */ }
    // Se difiere un frame (en vez de saltar de forma síncrona en el mismo
    // commit) porque un scroll instantáneo síncrono interfiere con la
    // medición de salida de framer-motion's AnimatePresence y deja la
    // transición de página congelada. `behavior: "instant"` sigue siendo
    // necesario para saltar sin animar pese al `scroll-behavior: smooth`
    // global (src/index.css).
    const id = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    });
    return () => cancelAnimationFrame(id);
  }, [pageKey]);
}

function upsertHeadEl(head, selector, tag, attrs) {
  let el = head.querySelector(selector);
  if (!el) { el = document.createElement(tag); head.appendChild(el); }
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  return el;
}

function upsertJsonLd(head, id, data) {
  if (!data) { head.querySelector(`script#${id}`)?.remove(); return; }
  let el = head.querySelector(`script#${id}`);
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = id;
    head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

// Los metadatos se gestionan de forma imperativa sobre document.head (no como JSX
// devuelto por el componente) porque este proyecto usa React 18, que no hace
// "hoisting" automático de <title>/<meta>/<link> renderizados fuera de <head>.
// Para el HTML estático (sin JS) estos mismos valores ya vienen incluidos por
// prerender.jsx vía la opción `head` del plugin de prerender.
function SEO({ page, title, description }) {
  const base = (import.meta?.env?.BASE_URL || "/").replace(/\/+$/, "/");
  const path = (META_BY_PAGE[page] || META_BY_PAGE.inicio).path;
  const [canonicalHref, setCanonicalHref] = useState("");
  const [homeHref, setHomeHref] = useState("");
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const origin = window.location.origin;
        const mk = (p) => new URL((base + p).replace(/\/+/g, "/"), origin).href;
        setCanonicalHref(mk(path));
        setHomeHref(mk("/"));
      }
    } catch { /* noop */ }
  }, [page, base, path]);

  const faviconSvg = homeHref ? new URL('favicon.svg', homeHref).href : undefined;
  const favicon32 = homeHref ? new URL('favicon-32x32.png', homeHref).href : undefined;
  const favicon16 = homeHref ? new URL('favicon-16x16.png', homeHref).href : undefined;
  const appleIcon = homeHref ? new URL('apple-touch-icon.png', homeHref).href : undefined;
  const manifestUrl = homeHref ? new URL('site.webmanifest', homeHref).href : undefined;

  const graph = (canonicalHref && homeHref) ? buildPageGraph({
    page,
    canonical: canonicalHref,
    home: homeHref,
    title,
    company: COMPANY,
    faqs: FAQS,
    services: SERVICES,
  }) : null;

  useEffect(() => {
    try {
      const head = document.head;

      if (title) document.title = title;
      if (description) upsertHeadEl(head, 'meta[name="description"]', "meta", { name: "description", content: description });
      upsertHeadEl(head, 'meta[name="robots"]', "meta", { name: "robots", content: "index, follow" });
      upsertHeadEl(head, 'meta[name="theme-color"]', "meta", { name: "theme-color", content: BRAND.primary });
      if (canonicalHref) upsertHeadEl(head, 'link[rel="canonical"]', "link", { rel: "canonical", href: canonicalHref });
      if (title) upsertHeadEl(head, 'meta[property="og:title"]', "meta", { property: "og:title", content: title });
      if (description) upsertHeadEl(head, 'meta[property="og:description"]', "meta", { property: "og:description", content: description });
      if (canonicalHref) upsertHeadEl(head, 'meta[property="og:url"]', "meta", { property: "og:url", content: canonicalHref });
      upsertHeadEl(head, 'meta[property="og:type"]', "meta", { property: "og:type", content: "website" });
      upsertHeadEl(head, 'meta[property="og:image"]', "meta", { property: "og:image", content: ICON_URL });
      upsertHeadEl(head, 'meta[property="og:site_name"]', "meta", { property: "og:site_name", content: COMPANY.brandName });
      upsertHeadEl(head, 'meta[property="og:locale"]', "meta", { property: "og:locale", content: "es_EC" });
      upsertHeadEl(head, 'meta[name="twitter:card"]', "meta", { name: "twitter:card", content: "summary_large_image" });

      head.querySelectorAll('link[rel="icon"]').forEach((lnk) => {
        const href = lnk.getAttribute('href') || '';
        if (/vite\.svg/i.test(href)) lnk.remove();
      });
      if (faviconSvg) upsertHeadEl(head, 'link[rel="icon"][type="image/svg+xml"]', "link", { rel: "icon", type: "image/svg+xml", href: faviconSvg });
      if (favicon32) upsertHeadEl(head, 'link[rel="icon"][sizes="32x32"]', "link", { rel: "icon", type: "image/png", sizes: "32x32", href: favicon32 });
      if (favicon16) upsertHeadEl(head, 'link[rel="icon"][sizes="16x16"]', "link", { rel: "icon", type: "image/png", sizes: "16x16", href: favicon16 });
      if (appleIcon) upsertHeadEl(head, 'link[rel="apple-touch-icon"]', "link", { rel: "apple-touch-icon", href: appleIcon });
      if (manifestUrl) upsertHeadEl(head, 'link[rel="manifest"]', "link", { rel: "manifest", href: manifestUrl });
      upsertHeadEl(head, 'link[rel="icon"][data-fallback="true"]', "link", { rel: "icon", href: ICON_URL, "data-fallback": "true" });

      upsertJsonLd(head, "ld-graph", graph);
    } catch { /* noop */ }
  }, [title, description, canonicalHref, homeHref, faviconSvg, favicon32, favicon16, appleIcon, manifestUrl, graph]);

  return null;
}

function BrandLogo({ className }) {
  return (
    <div className={"relative " + (className || "")}>
      <div
        className="absolute inset-[-20%] -z-10 rounded-2xl opacity-40 blur-2xl"
        style={{ background: "radial-gradient(60% 60% at 50% 40%, rgba(8,84,156,.55), transparent)" }}
      />
      <img
        src={ICON_URL}
        alt={COMPANY.publicName}
        className="h-full w-full object-contain"
        style={{ filter: "drop-shadow(0 10px 20px rgba(0,0,0,.35)) drop-shadow(0 6px 18px rgba(8,84,156,.35))" }}
      />
    </div>
  );
}

function Reveal({ children, delay = 0 }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.5, delay }}>{children}</motion.div>
  );
}

function Navbar({ page, goTo }) {
  const scrolled = useStickyNav();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`fixed inset-x-0 top-0 z-50 border-b ${scrolled ? "border-neutral-200 bg-white/80 backdrop-blur" : "border-transparent bg-transparent"}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl border border-neutral-200 bg-white">
            <BrandLogo className="h-8 w-8" />
          </div>
          <div className="min-w-0 leading-tight">
            <div className="truncate text-sm text-neutral-600">{COMPANY.legalName}</div>
            <div className="truncate font-bold tracking-tight text-neutral-900">{COMPANY.brandName}</div>
          </div>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.key}
              href={withBase(META_BY_PAGE[item.key].path)}
              onClick={(e) => handleNavClick(e, () => goTo(item.key))}
              aria-current={page === item.key ? "page" : undefined}
              className={`cursor-pointer rounded-xl px-3 py-2 text-sm transition-colors hover:text-neutral-900 ${page === item.key ? "text-neutral-900" : "text-neutral-600"}`}
            >
              {item.label}
            </a>
          ))}
          <a href={COMPANY.facebook} target="_blank" rel="noreferrer" title="Facebook" className="grid h-10 w-10 cursor-pointer place-items-center rounded-xl border border-neutral-200 bg-white text-neutral-700 transition hover:bg-neutral-50">
            <Facebook className="h-5 w-5" />
          </a>
          <a href={COMPANY.instagram} target="_blank" rel="noreferrer" title="Instagram" className="grid h-10 w-10 cursor-pointer place-items-center rounded-xl border border-neutral-200 bg-white text-neutral-700 transition hover:bg-neutral-50">
            <Instagram className="h-5 w-5" />
          </a>
          <a href={COMPANY.linkedin} target="_blank" rel="noreferrer" title="LinkedIn" className="grid h-10 w-10 cursor-pointer place-items-center rounded-xl border border-neutral-200 bg-white text-neutral-700 transition hover:bg-neutral-50">
            <Linkedin className="h-5 w-5" />
          </a>
          <Button as="a" href={`https://wa.me/${COMPANY.phoneHref}`} target="_blank" rel="noreferrer" className="border border-neutral-200 bg-[var(--brand-primary)] text-white hover:translate-y-[-1px]" style={{ "--brand-primary": BRAND.primary }}>Solicita tu servicio</Button>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-xl border border-neutral-200 bg-white text-neutral-700 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-t border-neutral-200 bg-white/95 backdrop-blur"
          >
            <div className="mx-auto max-w-7xl px-4 py-3">
              <div className="flex flex-col gap-1">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.key}
                    href={withBase(META_BY_PAGE[item.key].path)}
                    onClick={(e) => handleNavClick(e, () => { setOpen(false); goTo(item.key); })}
                    aria-current={page === item.key ? "page" : undefined}
                    className={`w-full cursor-pointer rounded-lg px-3 py-2 text-left text-base ${page === item.key ? "text-neutral-900" : "text-neutral-700"} hover:text-neutral-900`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2">
                <a href={COMPANY.facebook} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-xl border border-neutral-200 bg-white text-neutral-700" title="Facebook">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href={COMPANY.instagram} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-xl border border-neutral-200 bg-white text-neutral-700" title="Instagram">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href={COMPANY.linkedin} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-xl border border-neutral-200 bg-white text-neutral-700" title="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
                <Button as="a" href={`https://wa.me/${COMPANY.phoneHref}`} target="_blank" rel="noreferrer" className="border border-neutral-200 bg-[var(--brand-primary)] text-white" style={{ "--brand-primary": BRAND.primary }}>Solicita tu servicio</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function Hero({ goTo }) {
  return (
    <section className="relative overflow-hidden pt-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-56 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full opacity-15 blur-3xl" style={{ background: BRAND.primary }} />
        <motion.div className="absolute -bottom-48 left-1/3 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full opacity-10 blur-3xl" style={{ background: BRAND.accent }} animate={{ y: [0, -10, 0] }} transition={{ duration: 8, repeat: Infinity }} />
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-10">
        <Reveal>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-neutral-900 md:text-6xl">El aliado de mantenimiento que tu empresa necesita en Ecuador</h1>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-6 max-w-3xl text-lg text-neutral-700">Somos Manos a la Obra, especializados en mantenimiento integral para empresas en todo Ecuador. Un solo proveedor para todos tus desafíos de mantenimiento.</p>
        </Reveal>
        <Reveal delay={0.07}>
          <p className="mt-4 max-w-3xl text-neutral-700">
            {COMPANY.brandName} es el nombre comercial de {COMPANY.legalName}. Nuestra oficina está en {COMPANY.officeDisplayLocation} desde 2014 y coordinamos equipos para proyectos en todo el país.{" "}
            <a href={withBase(META_BY_PAGE.historia.path)} onClick={(e) => handleNavClick(e, () => goTo("historia"))} className="cursor-pointer underline decoration-neutral-300 underline-offset-4 hover:text-neutral-900">Conoce nuestra historia</a>.
          </p>
        </Reveal>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button as="a" href={withBase(META_BY_PAGE.servicios.path)} onClick={(e) => handleNavClick(e, () => goTo("servicios"))} className="border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50">Conócenos</Button>
          <Button as="a" href={`https://wa.me/${COMPANY.phoneHref}`} target="_blank" rel="noreferrer" className="border border-neutral-200 text-neutral-900 hover:translate-y-[-1px]" style={{ background: BRAND.accent }}>Solicita tu servicio</Button>
        </div>
      </div>
    </section>
  );
}

function LogosMarquee() {
  const duplicated = [...CLIENT_LOGOS, ...CLIENT_LOGOS];
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // El desplazamiento del loop se mide en píxeles reales (no en % del ancho
    // total) porque `gap` de flexbox no agrega espacio tras el último elemento:
    // usar `translateX(-50%)` deja siempre un desfase de medio `gap` en el
    // punto de reinicio, visible como un salto en cada vuelta del carrusel.
    const measure = () => {
      const items = track.children;
      if (items.length < CLIENT_LOGOS.length + 1) return;
      const first = items[0].getBoundingClientRect().left;
      const secondSetStart = items[CLIENT_LOGOS.length].getBoundingClientRect().left;
      track.style.setProperty("--marquee-shift", `${secondSetStart - first}px`);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    return () => ro.disconnect();
  }, []);

  return (
    <section className="cv-auto border-y border-neutral-200 py-8">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal>
          <div className="mb-4 text-center text-xs uppercase tracking-widest text-neutral-600">EMPRESAS QUE CONFÍAN EN NUESTRO TRABAJO</div>
        </Reveal>

        <div className="relative overflow-hidden">
          <div ref={trackRef} className="animate-marquee flex items-center gap-6 whitespace-nowrap">
            {duplicated.map((item, i) => {
              const isDuplicate = i >= CLIENT_LOGOS.length;
              return (
                <div key={i} className="logo-item-desktop group flex h-24 min-w-[320px] items-center justify-center rounded-xl border border-neutral-200 bg-white px-10" aria-hidden={isDuplicate ? "true" : undefined}>
                  {item.url ? (
                    <img src={item.url} alt={isDuplicate ? "" : `Logo de ${item.name}`} className="logo-img-desktop h-16 w-auto opacity-90 transition-all duration-200 group-hover:opacity-100" style={item.scale ? { transform: `translateZ(0) scale(${item.scale})` } : undefined} loading="lazy" decoding="async" width="320" height="64" />
                  ) : (
                    <span className="text-sm text-neutral-700">{item.name}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(calc(-1 * var(--marquee-shift, 50%))); } }
        .animate-marquee { animation: marquee var(--marquee-duration,36s) linear infinite; will-change: transform; }
        .logo-img-desktop { filter: grayscale(1) contrast(1) brightness(0.6) drop-shadow(0 0 1px rgba(0,0,0,0.18)); transform: translateZ(0); transition: filter .2s ease, opacity .2s ease; }
        .logo-item-desktop:hover .logo-img-desktop { filter: none; }
        @media (max-width: 640px) {
          .animate-marquee { --marquee-duration: 30s; }
          .logo-img-desktop { filter: none; }
        }
        @media (prefers-reduced-motion: reduce) { .animate-marquee { animation: none; } }
        .cv-auto { content-visibility: auto; contain-intrinsic-size: 1px 1000px; }
      `}</style>
    </section>
  );
}

function QuickContact() {
  return (
    <section className="cv-auto py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 md:grid-cols-4">
        <Card>
          <div className="flex items-center gap-3 text-neutral-900"><Mail className="h-5 w-5 text-neutral-700" /><div className="text-sm font-semibold">Correo</div></div>
          <a href={`mailto:${COMPANY.email}`} className="mt-2 block text-neutral-700 hover:text-neutral-900">{COMPANY.email}</a>
        </Card>
        <Card>
          <div className="flex items-center gap-3 text-neutral-900"><Phone className="h-5 w-5 text-neutral-700" /><div className="text-sm font-semibold">Teléfono / WhatsApp</div></div>
          <a href={`https://wa.me/${COMPANY.phoneHref}`} target="_blank" rel="noreferrer" className="mt-2 block text-neutral-700 hover:text-neutral-900">{COMPANY.phone}</a>
        </Card>
        <Card>
          <div className="flex items-center gap-3 text-neutral-900"><MapPin className="h-5 w-5 text-neutral-700" /><div className="text-sm font-semibold">Ubicación</div></div>
          <a href={COMPANY.mapsUrl} target="_blank" rel="noreferrer" className="mt-2 block text-neutral-700 hover:text-neutral-900">{COMPANY.address}</a>
        </Card>
        <Card>
          <div className="flex items-center gap-3 text-neutral-900"><Facebook className="h-5 w-5 text-neutral-700" /><div className="text-sm font-semibold">Facebook</div></div>
          <a href={COMPANY.facebook} target="_blank" rel="noreferrer" className="mt-2 block text-neutral-700 hover:text-neutral-900">Manosalaobra.Cuenca</a>
        </Card>
      </div>
    </section>
  );
}

function AccordionItem({ q, a }) {
  return (
    <details className="group overflow-hidden rounded-xl border border-neutral-200 bg-white">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left [&::-webkit-details-marker]:hidden">
        <span className="text-neutral-900">{q}</span>
        <ChevronDown className="h-5 w-5 flex-shrink-0 text-neutral-700 transition-transform duration-300 group-open:rotate-180" />
      </summary>
      <div className="px-5 pb-5 text-neutral-700">{a}</div>
    </details>
  );
}

function FAQSection({ full = false, goTo }) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-4xl px-4">
        {!full && <Reveal><h3 className="mb-6 text-xl font-bold text-neutral-900">Preguntas frecuentes</h3></Reveal>}
        <div className="flex flex-col gap-3">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} q={f.q} a={f.a} />
          ))}
        </div>
        <div className="mt-6 text-center">
          <span className="text-neutral-700">¿Tienes otra pregunta? </span>
          <Button
            as="a"
            href={goTo ? withBase(META_BY_PAGE.contacto.path) : `mailto:${COMPANY.email}`}
            onClick={(e) => { if (goTo) handleNavClick(e, () => goTo("contacto")); }}
            className="border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50"
          >
            Escríbenos
          </Button>
        </div>
      </div>
    </section>
  );
}

function Footer({ goTo }) {
  return (
    <footer className="border-t border-neutral-200 py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 md:grid-cols-3">
        <div>
          <Reveal><div className="text-sm text-neutral-600">{COMPANY.legalName}</div></Reveal>
          <Reveal delay={0.05}><div className="text-lg font-bold text-neutral-900">{COMPANY.brandName}</div></Reveal>
          <Reveal delay={0.08}><p className="mt-2 text-sm text-neutral-600">{COMPANY.brandName} es el nombre comercial de {COMPANY.legalName}.</p></Reveal>
          <Reveal delay={0.1}><div className="mt-3 text-neutral-700">{COMPANY.officeDisplayLocation}</div></Reveal>
        </div>
        <div>
          <Reveal><div className="mb-3 text-sm font-semibold text-neutral-900">Mapa del sitio</div></Reveal>
          <ul className="space-y-2 text-neutral-700">
            {NAV_ITEMS.map((i) => (
              <li key={i.key}><a href={withBase(META_BY_PAGE[i.key].path)} onClick={(e) => handleNavClick(e, () => goTo(i.key))} className="cursor-pointer hover:text-neutral-900">{i.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <Reveal><div className="mb-3 text-sm font-semibold text-neutral-900">Contacto</div></Reveal>
          <ul className="space-y-2 text-neutral-700">
            <li><a href={`mailto:${COMPANY.email}`} className="hover:text-neutral-900">{COMPANY.email}</a></li>
            <li><a href={`https://wa.me/${COMPANY.phoneHref}`} target="_blank" rel="noreferrer" className="hover:text-neutral-900">{COMPANY.phone}</a></li>
            <li><a href={COMPANY.mapsUrl} target="_blank" rel="noreferrer" className="hover:text-neutral-900">{COMPANY.address}</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-7xl px-4 text-center text-xs text-neutral-500">© {new Date().getFullYear()} {COMPANY.legalName} – {COMPANY.brandName}. Todos los derechos reservados.</div>
    </footer>
  );
}

function HistoriaPage({ goTo }) {
  const CURRENT_YEAR = new Date().getFullYear();
  const STEPS = [
    { year: 2014, text: "Inicio de Actividades en Cuenca, Ecuador" },
    { year: "2015–2018", text: "Expansión de servicios a más provincias" },
    { year: 2019, text: "Diversificación a remodelaciones y construcción" },
    { year: 2022, text: "Implementación de procesos digitales, mejora operativa" },
    { year: CURRENT_YEAR, text: "Seguimos brindando servicios de mantenimiento empresarial en Ecuador" },
  ];
  return (
    <main>
      <section className="mx-auto max-w-5xl px-4 pt-28">
        <Reveal><h1 className="text-3xl font-bold text-neutral-900">Nuestra historia</h1></Reveal>
        <Reveal delay={0.05}><p className="mt-3 max-w-3xl text-neutral-700">Cada hito refleja nuestro compromiso con la calidad y la confianza de nuestros clientes en Ecuador.</p></Reveal>
      </section>
      <section className="cv-auto mx-auto max-w-5xl px-4 py-12">
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 hidden w-px bg-neutral-200 sm:block" />
          <div className="space-y-4">
            {STEPS.map((s, idx) => (
              <Reveal key={idx}>
                <article className="relative rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                  <div className="sm:pl-10">
                    <div className="mb-1 flex items-center gap-3">
                      <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full border border-neutral-300 bg-neutral-50 px-2 text-sm font-semibold text-neutral-700">{s.year}</span>
                      <span className="hidden h-px flex-1 bg-neutral-200 sm:block" />
                    </div>
                    <p className="text-neutral-700">{s.text}</p>
                  </div>
                  <div className="absolute left-[0.65rem] top-6 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 border-white bg-[var(--brand-primary)] sm:block" style={{ "--brand-primary": BRAND.primary }} />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal>
          <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 text-center text-lg font-semibold text-neutral-800 shadow-sm">
            Cada cliente satisfecho es nuestra mejor recomendación
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button as="a" href={withBase(META_BY_PAGE.servicios.path)} onClick={(e) => handleNavClick(e, () => goTo("servicios"))} className="border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50">Conoce nuestros servicios</Button>
            <Button as="a" href={withBase(META_BY_PAGE.contacto.path)} onClick={(e) => handleNavClick(e, () => goTo("contacto"))} className="border border-neutral-200 text-neutral-900" style={{ background: BRAND.accent }}>Contáctanos</Button>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

function ServiciosPage({ goTo }) {
  return (
    <main className="pt-28">
      <section className="mx-auto max-w-6xl px-4">
        <Reveal><h1 className="text-3xl font-bold text-neutral-900">Servicios</h1></Reveal>
        <Reveal delay={0.05}><p className="mt-3 max-w-3xl text-neutral-700">Soluciones integrales para empresas, comercios y residencias, con estándares de calidad y seguridad.</p></Reveal>
        <Reveal delay={0.08}>
          <p className="mt-2 max-w-3xl text-neutral-700">
            <a href={withBase(META_BY_PAGE.historia.path)} onClick={(e) => handleNavClick(e, () => goTo("historia"))} className="cursor-pointer underline decoration-neutral-300 underline-offset-4 hover:text-neutral-900">Conoce nuestra trayectoria desde 2014</a>.
          </p>
        </Reveal>
      </section>
      <section className="cv-auto mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.div key={i} id={s.slug} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.35 }} className="group h-full scroll-mt-28 rounded-2xl border border-neutral-200 bg-white p-6 transition-all hover:translate-y-[-2px] hover:shadow-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-xl" style={{ background: BRAND.primary }}>
                  <s.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900">{s.name}</h3>
              </div>
              <p className="text-neutral-700">{s.desc}</p>
            </motion.div>
          ))}
        </div>
        <Card className="mt-8">
          <div className="grid items-center gap-4 md:grid-cols-[1fr_auto]">
            <div className="text-neutral-800">
              <h3 className="text-lg font-semibold text-neutral-900">¿Requiere un servicio específico no listado?</h3>
              <p className="mt-1 text-neutral-700">En {COMPANY.brandName} evaluamos su necesidad y presentamos una propuesta técnica alineada a estándares de calidad y seguridad. Nuestro equipo se adapta a sus requerimientos con seriedad y eficiencia.</p>
            </div>
            <div className="flex gap-3">
              <Button as="a" href={`https://wa.me/${COMPANY.phoneHref}`} target="_blank" rel="noreferrer" className="border border-neutral-200 text-neutral-900" style={{ background: BRAND.accent }}>Solicitar cotización</Button>
              <Button as="a" href={withBase(META_BY_PAGE.contacto.path)} onClick={(e) => handleNavClick(e, () => goTo("contacto"))} className="border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50">Ir a contacto</Button>
            </div>
          </div>
        </Card>
      </section>
    </main>
  );
}

function ContactoPage() {
  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const formRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    setOk(false);
    setErr("");
    try {
      const res = await fetch("https://formsubmit.co/ajax/" + encodeURIComponent(COMPANY.email), {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, company, email, phone, message, _subject: "Nueva consulta web – Manos a la Obra", _template: "table" }),
      });
      if (!res.ok) throw new Error("No se pudo enviar el formulario");
      setOk(true);
      setName("");
      setCompany("");
      setEmail("");
      setPhone("");
      setMessage("");
      formRef.current?.reset();
    } catch {
      const mail = `mailto:${COMPANY.email}?subject=${encodeURIComponent("Nueva consulta web – Manos a la Obra")}&body=${encodeURIComponent(`Nombre: ${name}\nEmpresa: ${company}\nEmail: ${email}\nTeléfono: ${phone}\n\nMensaje:\n${message}`)}`;
      window.location.href = mail;
      setErr("No se pudo enviar automáticamente. Abrimos tu correo para enviar el mensaje manualmente.");
    } finally {
      setSending(false);
    }
  }

  const embedSrc = `https://www.google.com/maps?ll=${COMPANY.mapsLat},${COMPANY.mapsLng}&q=${COMPANY.mapsLat},${COMPANY.mapsLng}&z=17&t=m&output=embed`;

  return (
    <main className="pt-28" id="contacto">
      <section className="mx-auto max-w-6xl px-4">
        <Reveal><h1 className="text-3xl font-bold text-neutral-900">Contacto</h1></Reveal>
        <Reveal delay={0.05}><p className="mt-3 max-w-3xl text-neutral-700">Cuéntanos sobre tu proyecto. Te responderemos a la brevedad.</p></Reveal>
      </section>

      <section className="cv-auto mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 md:grid-cols-2">
        <Card>
          <form onSubmit={handleSubmit} ref={formRef} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="mb-1 block text-sm text-neutral-700">Nombre</label>
                <input id="contact-name" name="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]" placeholder="Tu nombre" style={{ "--brand-primary": BRAND.primary }} />
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-1 block text-sm text-neutral-700">Email</label>
                <input id="contact-email" name="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]" placeholder="tunombre@correo.com" style={{ "--brand-primary": BRAND.primary }} />
              </div>
            </div>
            <div>
              <label htmlFor="contact-company" className="mb-1 block text-sm text-neutral-700">Empresa <span className="text-neutral-400">(opcional)</span></label>
              <input id="contact-company" name="company" autoComplete="organization" value={company} onChange={(e) => setCompany(e.target.value)} className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]" placeholder="Nombre de tu empresa" style={{ "--brand-primary": BRAND.primary }} />
            </div>
            <div>
              <label htmlFor="contact-phone" className="mb-1 block text-sm text-neutral-700">Teléfono</label>
              <input id="contact-phone" name="phone" type="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]" placeholder="Ej: +593 99 999 9999" style={{ "--brand-primary": BRAND.primary }} />
            </div>
            <div>
              <label htmlFor="contact-message" className="mb-1 block text-sm text-neutral-700">Mensaje</label>
              <textarea id="contact-message" name="message" value={message} onChange={(e) => setMessage(e.target.value)} required rows={4} className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]" placeholder="Cuéntanos brevemente tu requerimiento" style={{ "--brand-primary": BRAND.primary }} />
            </div>
            <div className="flex items-center gap-3">
              <Button type="submit" disabled={sending} className="border border-neutral-200 text-neutral-900" style={{ background: BRAND.accent }}>{sending ? "Enviando…" : (<><Send className="h-4 w-4" /> Enviar</>)}</Button>
              <Button as="a" href={`https://wa.me/${COMPANY.phoneHref}`} target="_blank" rel="noreferrer" className="border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50">WhatsApp directo</Button>
            </div>
            {ok && <div role="status" aria-live="polite" className="text-sm text-emerald-600">¡Gracias! Tu mensaje se ha enviado correctamente.</div>}
            {err && <div role="alert" className="text-sm text-amber-600">{err}</div>}
          </form>
        </Card>
        <div className="space-y-4">
          <Card>
            <div className="flex items-start gap-3 text-neutral-800"><Mail className="mt-0.5 h-5 w-5" /> <a className="hover:text-neutral-900" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></div>
            <div className="mt-2 flex items-start gap-3 text-neutral-800"><Phone className="mt-0.5 h-5 w-5" /> <a className="hover:text-neutral-900" href={`https://wa.me/${COMPANY.phoneHref}`} target="_blank" rel="noreferrer">{COMPANY.phone}</a></div>
            <div className="mt-2 flex items-start gap-3 text-neutral-800"><MapPin className="mt-0.5 h-5 w-5" /> <a href={COMPANY.mapsUrl} target="_blank" rel="noreferrer" className="hover:text-neutral-900">{COMPANY.address}</a></div>
          </Card>
          <div className="overflow-hidden rounded-2xl border border-neutral-200"><iframe title="Mapa Manos a la Obra" src={embedSrc} loading="lazy" className="h-72 w-full" /></div>
        </div>
      </section>
    </main>
  );
}

function FAQPage({ goTo }) {
  return (
    <main className="pt-28">
      <section className="mx-auto max-w-5xl px-4">
        <Reveal><h1 className="text-3xl font-bold text-neutral-900">Preguntas frecuentes</h1></Reveal>
        <Reveal delay={0.05}><p className="mt-3 max-w-3xl text-neutral-700">Todo lo que necesitas saber sobre nuestros servicios y procesos.</p></Reveal>
      </section>
      <FAQSection full goTo={goTo} />
    </main>
  );
}

function InicioPage({ goTo }) {
  return (
    <main>
      <Hero goTo={goTo} />
      <LogosMarquee />
      <QuickContact />
      <ServiciosCTA goTo={goTo} />
      <FAQSection goTo={goTo} />
    </main>
  );
}

function ServiciosCTA({ goTo }) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="rounded-2xl border border-neutral-200 bg-gradient-to-r from-neutral-50 to-white p-8 text-center">
          <Reveal><h3 className="text-xl font-bold text-neutral-900">Conoce nuestros servicios</h3></Reveal>
          <Reveal delay={0.05}><p className="mt-2 text-neutral-700">Descubre cómo podemos ayudarte con soluciones integrales y confiables.</p></Reveal>
          <Reveal delay={0.1}>
            <div className="mt-6">
              <Button as="a" href={withBase(META_BY_PAGE.servicios.path)} onClick={(e) => handleNavClick(e, () => goTo("servicios"))} className="border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50">Ver servicios</Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function App({ initialPage } = {}) {
  const [page, setPage] = useState(() => {
    if (initialPage && META_BY_PAGE[initialPage]) return initialPage;
    if (typeof window !== "undefined") return pageFromPathname(window.location.pathname);
    return "inicio";
  });
  useDarkMode();
  useScrollTopOnRoute(page);

  useEffect(() => {
    if (!import.meta.env.DEV) return;
    onCLS(console.log);
    onINP(console.log);
    onLCP(console.log);
  }, []);

  useEffect(() => {
    const onPopState = () => setPage(pageFromPathname(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const goTo = (key) => {
    const target = META_BY_PAGE[key] ? key : "inicio";
    if (typeof window !== "undefined") {
      const path = withBase(META_BY_PAGE[target].path);
      if (normalizePath(window.location.pathname) !== normalizePath(path)) {
        window.history.pushState({ page: target }, "", path);
      }
    }
    setPage(target);
  };
  const meta = META_BY_PAGE[page] || META_BY_PAGE.inicio;

  return (
    <>
      <SEO page={page} title={meta.title} description={meta.desc} />
      <Navbar page={page} goTo={goTo} />
      <AnimatePresence mode="wait">
        <motion.div key={page} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
          {page === "inicio" && <InicioPage goTo={goTo} />}
          {page === "historia" && <HistoriaPage goTo={goTo} />}
          {page === "servicios" && <ServiciosPage goTo={goTo} />}
          {page === "faq" && <FAQPage goTo={goTo} />}
          {page === "contacto" && <ContactoPage />}
        </motion.div>
      </AnimatePresence>
      <Footer goTo={goTo} />
    </>
  );
}

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Paintbrush,
  PlugZap,
  DoorOpen,
  Factory,
  Building2,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  ChevronDown,
  Send,
  Menu,
  X
} from "lucide-react";

const BRAND = {
  primary: "#08549C",
  accent: "#FFC200",
};

const COMPANY = {
  legalName: "MANTARQ S.A.S.",
  brandName: "Manos a la Obra",
  city: "Cuenca, Ecuador",
  email: "info@mantarq.com",
  phone: "+593 99 624 2213",
  phoneHref: "593996242213",
  address: "Fray Vicente Solano y Avenida del Estado. Edificio CICA, Oficina 520",
  facebook: "https://www.facebook.com/Manosalaobra.Cuenca",
  instagram: "https://www.instagram.com/manosalaobraecuador",
  mapsUrl: "https://www.google.com/maps/place/Manos+a+la+Obra+MANTARQ+SAS/@-2.9060613,-79.0094591,17z/data=!3m1!4b1!4m6!3m5!1s0x91cd19006167e407:0x8c14fa3327f3b7d!8m2!3d-2.9060613!4d-79.0068842!16s%2Fg%2F11vyj3pb6c?entry=ttu&g_ep=EgoyMDI1MDgxMy4wIKXMDSoASAFQAw%3D%3D",
  mapsLat: -2.9060613,
  mapsLng: -79.0068842,
};

const NAV_ITEMS = [
  { key: "inicio", label: "Inicio" },
  { key: "historia", label: "Historia" },
  { key: "servicios", label: "Servicios" },
  { key: "faq", label: "FAQ" },
  { key: "contacto", label: "Contacto" },
];

const META_BY_PAGE = {
  inicio: {
    title: "Manos a la Obra | Mantenimiento y construcción en Cuenca",
    desc: "MANTARQ S.A.S. – Manos a la Obra. Mantenimiento empresarial y residencial, construcción y remodelación en Cuenca y Ecuador. Calidad, seguridad y profesionalismo.",
    path: "/",
  },
  historia: {
    title: "Nuestra historia | Manos a la Obra",
    desc: "De 2014 a hoy, hitos y evolución de MANTARQ S.A.S. en mantenimiento y construcción.",
    path: "/historia/",
  },
  servicios: {
    title: "Servicios | Manos a la Obra",
    desc: "Gypsum, eléctrico, pintura, aluminio y cubiertas metálicas. Soluciones integrales para empresas y residencias.",
    path: "/servicios/",
  },
  faq: {
    title: "Preguntas frecuentes | Manos a la Obra",
    desc: "Respuestas claras sobre alcance, ciudades, equipo y más.",
    path: "/faq/",
  },
  contacto: {
    title: "Contacto | Manos a la Obra",
    desc: "Solicita una cotización sin compromiso en Cuenca, Ecuador.",
    path: "/contacto/",
  },
};

const CURRENT_YEAR = new Date().getFullYear();

const TIMELINE = [
  { year: "2014", text: "Fundación en Cuenca, Ecuador." },
  { year: "2015–2018", text: "Expansión de servicios a más provincias y primeros grandes clientes." },
  { year: "2019", text: "Diversificación a remodelaciones y obras pequeñas." },
  { year: "2022", text: "Implementación de procesos digitales y mejora operativa." },
  { year: String(CURRENT_YEAR), text: "Actualmente seguimos brindando nuestros servicios." },
];

const SERVICES = [
  { icon: Building2, name: "Paredes Gypsum", desc: "Instalación profesional de tabiques, cielos rasos y soluciones acústicas en gypsum." },
  { icon: PlugZap, name: "Sistema Eléctrico", desc: "Mantenimiento y cableado seguro, tableros, canalizaciones y luminarias industriales y residenciales." },
  { icon: Paintbrush, name: "Pintura Integral", desc: "Acabados premium: interiores, exteriores, epóxicos y señalética." },
  { icon: DoorOpen, name: "Puertas de Aluminio", desc: "Fabricación e instalación de puertas, ventanería y fachadas ligeras." },
  { icon: Factory, name: "Cubiertas Metálicas", desc: "Estructuras y cubiertas metálicas seguras, durables y estéticas." },
];

const FAQS = [
  { q: "¿Atienden solo a empresas?", a: "Trabajamos con todo tipo de clientes: desde grandes empresas hasta negocios pequeños y viviendas unifamiliares." },
  { q: "¿Solo realizan trabajos de mantenimiento?", a: "Si bien somos especialistas en mantenimiento, también ofrecemos servicios de construcción, remodelación y reparación." },
  { q: "¿Trabajan fuera del país?", a: "Actualmente no ofrecemos servicios fuera de Ecuador." },
  { q: "¿Tienen el equipo necesario para los trabajos?", a: "Contamos con el equipo técnico necesario y con más de 10 años de experiencia." },
  { q: "¿En qué ciudades brindan servicios?", a: "Brindamos cobertura a nivel nacional en Ecuador; coordinamos equipos y logística según el alcance de cada proyecto." },
];

const CLIENT_LOGOS = [
  { name: "Grupo Ortiz (Cuenca)", url: "https://i.ibb.co/PvSHrjyC/gruporotizlogo.png" },
  { name: "Marcimex", url: "https://i.ibb.co/WvJ8pRf0/Marcimex-Logo.png" },
  { name: "Junta de Beneficencia de Guayaquil", url: "https://i.ibb.co/7JyR16qj/Junta-Guayaquil-Logo.png" },
  { name: "Grupo Consenso", url: "https://i.ibb.co/whCrK4SK/grupoconsensologofinal.png" },
  { name: "Indurama", url: "https://i.ibb.co/KxmfhzBV/Indurama-Logo.png" },
  { name: "Lotería Nacional", url: "https://i.ibb.co/XrQH1J0X/Loter-a-Nacional-Logo.png" },
  { name: "Nucleomed", url: "https://i.ibb.co/4gTcdhb7/nucleomedlogo.webp" },
  { name: "Universidad Católica de Cuenca", url: "https://i.ibb.co/F401j09F/Cato-De-Cuenca-Logo-removebg-preview.png" },
];

const ICON_URL = "https://i.ibb.co/VYKcrNBR/mantarqlogopng.png";

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
    try { if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual"; } catch {}
    const scrollNow = () => window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    scrollNow();
    const t0 = setTimeout(scrollNow, 0);
    const t1 = setTimeout(scrollNow, 100);
    const r0 = requestAnimationFrame(scrollNow);
    const r1 = requestAnimationFrame(() => setTimeout(scrollNow, 16));
    return () => { clearTimeout(t0); clearTimeout(t1); cancelAnimationFrame(r0); cancelAnimationFrame(r1); };
  }, [pageKey]);
}

function buildLocalBusinessSchema(c, canonical) {
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
    areaServed: "Ecuador",
  };
}

function buildBreadcrumbSchema(page, canonical, home) {
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

function buildFAQSchema(faqs) {
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

function SEO({ page, title, description }) {
  useEffect(() => { if (title) document.title = title; }, [title]);
  const base = (import.meta?.env?.BASE_URL || "/").replace(/\/+$/, "/");
  const map = { inicio: "/", historia: "/historia/", servicios: "/servicios/", faq: "/faq/", contacto: "/contacto/" };
  const path = map[page] || "/";
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
    } catch {}
  }, [page]);

  const ldLocal = buildLocalBusinessSchema(COMPANY, canonicalHref);
  const ldBreadcrumb = buildBreadcrumbSchema(page, canonicalHref, homeHref);
  const ldFAQ = page === "faq" ? buildFAQSchema(FAQS) : null;

  return (
    <>
      {description && <meta name="description" content={description} />}
      {canonicalHref && <link rel="canonical" href={canonicalHref} />}
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {canonicalHref && <meta property="og:url" content={canonicalHref} />}
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldLocal) }} />
      {ldBreadcrumb && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldBreadcrumb) }} />
      )}
      {ldFAQ && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldFAQ) }} />
      )}
    </>
  );
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
        alt="Logo"
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

        {/* Desktop nav */}
        <div className="hidden items-center gap-2 md:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => goTo(item.key)}
              className={`cursor-pointer rounded-xl px-3 py-2 text-sm transition-colors hover:text-neutral-900 ${page === item.key ? "text-neutral-900" : "text-neutral-600"}`}
            >
              {item.label}
            </button>
          ))}
          <a
            href={COMPANY.facebook}
            target="_blank"
            rel="noreferrer"
            title="Facebook"
            className="grid h-10 w-10 cursor-pointer place-items-center rounded-xl border border-neutral-200 bg-white text-neutral-700 transition hover:bg-neutral-50"
          >
            <Facebook className="h-5 w-5" />
          </a>
          <a
            href={COMPANY.instagram}
            target="_blank"
            rel="noreferrer"
            title="Instagram"
            className="grid h-10 w-10 cursor-pointer place-items-center rounded-xl border border-neutral-200 bg-white text-neutral-700 transition hover:bg-neutral-50"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a href={`https://wa.me/${COMPANY.phoneHref}`} target="_blank" rel="noreferrer">
            <Button className="border border-neutral-200 bg-[var(--brand-primary)] text-white hover:translate-y-[-1px]" style={{ "--brand-primary": BRAND.primary }}>Solicita tu servicio</Button>
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="grid h-10 w-10 place-items-center rounded-xl border border-neutral-200 bg-white text-neutral-700 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile dropdown */}
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
                  <button
                    key={item.key}
                    onClick={() => { setOpen(false); goTo(item.key); }}
                    className={`w-full cursor-pointer rounded-lg px-3 py-2 text-left text-base ${page === item.key ? "text-neutral-900" : "text-neutral-700"} hover:text-neutral-900`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2">
                <a
                  href={COMPANY.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-xl border border-neutral-200 bg-white text-neutral-700"
                  title="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href={COMPANY.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-10 w-10 place-items-center rounded-xl border border-neutral-200 bg-white text-neutral-700"
                  title="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a href={`https://wa.me/${COMPANY.phoneHref}`} target="_blank" rel="noreferrer">
                  <Button className="border border-neutral-200 bg-[var(--brand-primary)] text-white" style={{ "--brand-primary": BRAND.primary }}>Solicita tu servicio</Button>
                </a>
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
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-neutral-900 md:text-6xl">Excelencia en cada proyecto. <span className="text-neutral-700">Manos a la Obra</span></h1>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-6 max-w-3xl text-lg text-neutral-700">La excelencia es nuestro compromiso. Somos {COMPANY.brandName}, una empresa de mantenimiento que se enorgullece de su alta calidad y profesionalidad en el servicio. Ya sea un entorno comercial grande o una pequeña empresa, estamos equipados para manejar todos sus desafíos de mantenimiento.</p>
        </Reveal>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button onClick={() => goTo("servicios")} className="border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50">Conócenos</Button>
          <a href={`https://wa.me/${COMPANY.phoneHref}`} target="_blank" rel="noreferrer"><Button className="border border-neutral-200 text-neutral-900 hover:translate-y-[-1px]" style={{ background: BRAND.accent }}>Solicita tu servicio</Button></a>
        </div>
      </div>
    </section>
  );
}

function LogosMarquee() {
  const duplicated = [...CLIENT_LOGOS, ...CLIENT_LOGOS];
  return (
    <section className="cv-auto border-y border-neutral-200 py-8">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal>
          <div className="mb-4 text-center text-xs uppercase tracking-widest text-neutral-600">EMPRESAS QUE CONFÍAN EN NUESTRO TRABAJO</div>
        </Reveal>

        {/* Mobile: slider con snap */}
        <div className="sm:hidden -mx-4 px-4">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent" />
            <div className="no-scrollbar overflow-x-auto snap-x snap-mandatory">
              <div className="flex gap-4 pr-4">
                {CLIENT_LOGOS.map((item, i) => (
                  <div key={i} className="logo-item-mobile snap-center flex min-w-[220px] items-center justify-center rounded-xl border border-neutral-200 bg-white px-6 py-4">
                    {item.url ? (
                      <img src={item.url} alt={item.name} className="logo-img-mobile h-12 w-auto object-contain opacity-90" loading="lazy" decoding="async" width="220" height="48" />
                    ) : (
                      <span className="text-sm text-neutral-700">{item.name}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop/Tablet: marquee continuo */}
        <div className="relative hidden overflow-hidden sm:block">
          <div className="animate-marquee flex min-w-full items-center gap-6 whitespace-nowrap">
            {duplicated.map((item, i) => (
              <div key={i} className="logo-item-desktop group flex h-24 min-w-[320px] items-center justify-center rounded-xl border border-neutral-200 bg-white px-10">
                {item.url ? (
                  <img src={item.url} alt={item.name} className="logo-img-desktop h-16 w-auto opacity-90 transition-all duration-200 group-hover:opacity-100" loading="lazy" decoding="async" width="320" height="64" />
                ) : (
                  <span className="text-sm text-neutral-700">{item.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`$1`}</style></section>
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
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left">
        <span className="text-neutral-900">{q}</span>
        <ChevronDown className={`h-5 w-5 text-neutral-700 transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }} className="px-5 pb-5 text-neutral-700">{a}</motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQSection({ full = false, goTo }) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-4xl px-4">
        <Reveal><h3 className="mb-6 text-xl font-bold text-neutral-900">Preguntas frecuentes</h3></Reveal>
        <div className="flex flex-col gap-3">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} q={f.q} a={f.a} />
          ))}
        </div>
        {!full && (
          <div className="mt-6 text-center">
            <span className="text-neutral-700">¿Tienes otra pregunta? </span>
            <Button onClick={() => (goTo ? goTo("contacto") : (window.location.href = `mailto:${COMPANY.email}`))} className="border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50">Escríbenos</Button>
          </div>
        )}
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
          <Reveal delay={0.1}><div className="mt-3 text-neutral-700">{COMPANY.city}</div></Reveal>
        </div>
        <div>
          <Reveal><div className="mb-3 text-sm font-semibold text-neutral-900">Mapa del sitio</div></Reveal>
          <ul className="space-y-2 text-neutral-700">
            {NAV_ITEMS.map((i) => (
              <li key={i.key}><button onClick={() => goTo(i.key)} className="cursor-pointer hover:text-neutral-900">{i.label}</button></li>
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

function HistoriaPage() {
  const CURRENT_YEAR = new Date().getFullYear();
  const STEPS = [
    { year: 2014, text: "Fundación en Cuenca, Ecuador" },
    { year: "2015–2018", text: "Expansión de servicios a más provincias, primeros grandes clientes" },
    { year: 2019, text: "Diversificación a remodelaciones y obras pequeñas" },
    { year: 2022, text: "Implementación de procesos digitales, mejora operativa" },
    { year: CURRENT_YEAR, text: "Actualmente seguimos brindando nuestros servicios" },
  ];
  return (
    <main>
      <section className="mx-auto max-w-5xl px-4 pt-28">
        <Reveal><h2 className="text-3xl font-bold text-neutral-900">Nuestra historia</h2></Reveal>
        <Reveal delay={0.05}><p className="mt-3 max-w-3xl text-neutral-700">Cada hito refleja nuestro compromiso con la excelencia y la confianza de nuestros clientes en Ecuador.</p></Reveal>
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
      </section>
    </main>
  );
}

function ServiciosPage({ goTo }) {
  return (
    <main className="pt-28">
      <section className="mx-auto max-w-6xl px-4">
        <Reveal><h2 className="text-3xl font-bold text-neutral-900">Servicios</h2></Reveal>
        <Reveal delay={0.05}><p className="mt-3 max-w-3xl text-neutral-700">Soluciones integrales para empresas, comercios y residencias, con estándares de calidad y seguridad.</p></Reveal>
      </section>
      <section className="cv-auto mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.35 }} className="group h-full rounded-2xl border border-neutral-200 bg-white p-6 transition-all hover:translate-y-[-2px] hover:shadow-xl">
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
              <p className="mt-1 text-neutral-700">En {COMPANY.brandName} evaluamos su necesidad y presentamos una propuesta técnica integral, alineada a estándares de calidad, seguridad y cumplimiento normativo. Nuestro equipo se adapta a sus requerimientos con seriedad y eficiencia.</p>
            </div>
            <div className="flex gap-3">
              <a href={`https://wa.me/${COMPANY.phoneHref}`} target="_blank" rel="noreferrer"><Button className="border border-neutral-200 text-neutral-900" style={{ background: BRAND.accent }}>Solicitar cotización</Button></a>
              <Button onClick={() => goTo("contacto")} className="border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50">Ir a contacto</Button>
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
        body: JSON.stringify({ name, email, phone, message, _subject: "Nueva consulta web – Manos a la Obra", _template: "table" }),
      });
      if (!res.ok) throw new Error("No se pudo enviar el formulario");
      setOk(true);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      formRef.current?.reset();
    } catch (e) {
      const mail = `mailto:${COMPANY.email}?subject=${encodeURIComponent("Nueva consulta web – Manos a la Obra")}&body=${encodeURIComponent(`Nombre: ${name}
Email: ${email}
Teléfono: ${phone}

Mensaje:
${message}`)}`;
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
        <Reveal><h2 className="text-3xl font-bold text-neutral-900">Contacto</h2></Reveal>
        <Reveal delay={0.05}><p className="mt-3 max-w-3xl text-neutral-700">Cuéntanos sobre tu proyecto. Te responderemos a la brevedad.</p></Reveal>
      </section>

      <section className="cv-auto mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 md:grid-cols-2">
        <Card>
          <form onSubmit={handleSubmit} ref={formRef} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm text-neutral-700">Nombre</label>
                <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]" placeholder="Tu nombre" style={{ "--brand-primary": BRAND.primary }} />
              </div>
              <div>
                <label className="mb-1 block text-sm text-neutral-700">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]" placeholder="tunombre@correo.com" style={{ "--brand-primary": BRAND.primary }} />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm text-neutral-700">Teléfono</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]" placeholder="Ej: +593 99 999 9999" style={{ "--brand-primary": BRAND.primary }} />
            </div>
            <div>
              <label className="mb-1 block text-sm text-neutral-700">Mensaje</label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} required rows={4} className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]" placeholder="Cuéntanos brevemente tu requerimiento" style={{ "--brand-primary": BRAND.primary }} />
            </div>
            <div className="flex items-center gap-3">
              <Button type="submit" disabled={sending} className="border border-neutral-200 text-neutral-900" style={{ background: BRAND.accent }}>{sending ? "Enviando…" : (<><Send className="h-4 w-4" /> Enviar</>)}</Button>
              <a href={`https://wa.me/${COMPANY.phoneHref}`} target="_blank" rel="noreferrer"><Button className="border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50">WhatsApp directo</Button></a>
            </div>
            {ok && <div className="text-sm text-emerald-600">¡Gracias! Tu mensaje se ha enviado correctamente.</div>}
            {err && <div className="text-sm text-amber-600">{err}</div>}
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
        <Reveal><h2 className="text-3xl font-bold text-neutral-900">Preguntas frecuentes</h2></Reveal>
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
          <div className="mt-5"><Button onClick={() => goTo("servicios")} className="border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50">Ver servicios</Button></div>
        </div>
      </div>
    </section>
  );
}

function ContactFloating() {
  return (
    <a href={`https://wa.me/${COMPANY.phoneHref}`} target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full shadow-lg transition-transform hover:translate-y-[-2px]" style={{ background: BRAND.accent }} aria-label="Abrir contacto">
      <Phone className="h-7 w-7" />
    </a>
  );
}

function TestSuite() {
  useEffect(() => {
    console.assert(Array.isArray(FAQS) && FAQS.length >= 3, "FAQS debe ser un arreglo con elementos");
    console.assert(FAQS.every((f) => typeof f.q === "string" && typeof f.a === "string"), "FAQS con forma inválida");
    console.assert(TIMELINE[TIMELINE.length - 1].year === String(CURRENT_YEAR), "El último año del timeline debe ser el año actual");
    console.assert(SERVICES.length >= 5, "Se esperan al menos 6 servicios");
    console.assert(CLIENT_LOGOS.length >= 8, "Se esperan 8 logos de clientes");
  }, []);
  return null;
}

export default function App({ initialPage }) {
  const [page, setPage] = useState(() => {
    if (initialPage) return initialPage;
    try {
      const el = document.getElementById("prerender-data");
      if (el?.textContent) {
        const d = JSON.parse(el.textContent);
        if (d?.initialPage) return d.initialPage;
      }
    } catch {}
    const map = { "/": "inicio", "/historia/": "historia", "/servicios/": "servicios", "/faq/": "faq", "/contacto/": "contacto" };
    return map[location.pathname] || "inicio";
  });

  useDarkMode();

  useEffect(() => {
    try { document.documentElement.setAttribute("lang", "es-EC"); } catch {}
    const root = document.documentElement;
    root.style.setProperty("--brand-primary", BRAND.primary);
    root.style.setProperty("--brand-accent", BRAND.accent);
  }, []);

  // Inyectar GA4 si se define VITE_GA_ID
  useEffect(() => {
    const id = import.meta?.env?.VITE_GA_ID;
    if (!id) return;
    if (!window.__gaInit) {
      const s1 = document.createElement("script");
      s1.async = true;
      s1.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
      document.head.appendChild(s1);
      const s2 = document.createElement("script");
      s2.innerHTML = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config','${id}');`;
      document.head.appendChild(s2);
      window.__gaInit = true;
    }
  }, []);

  // Enviar Core Web Vitals a GA4 y (opcional) a un endpoint propio
  useEffect(() => {
    (async () => {
      try {
        const mod = await import("web-vitals");
        const send = (metric) => {
          try {
            const id = import.meta?.env?.VITE_GA_ID;
            const val = metric.name === "CLS" ? Math.round(metric.value * 1000) : Math.round(metric.value);
            if (window.gtag && id) {
              window.gtag("event", metric.name, {
                value: val,
                metric_id: metric.id,
                metric_value: metric.value,
                metric_delta: metric.delta,
                event_category: "Web Vitals",
                event_label: metric.id,
                non_interaction: true,
              });
            }
            const endpoint = import.meta?.env?.VITE_VITALS_URL;
            if (endpoint) {
              fetch(endpoint, {
                method: "POST",
                keepalive: true,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  name: metric.name,
                  value: metric.value,
                  delta: metric.delta,
                  id: metric.id,
                  page,
                  url: location.href,
                  ts: Date.now(),
                }),
              });
            }
          } catch {}
        };
        mod.onLCP(send);
        mod.onINP(send);
        mod.onCLS(send);
      } catch {}
    })();
  }, [page]);

  const goTo = (key) => setPage(key);
  useScrollTopOnRoute(page);

  const meta = META_BY_PAGE[page] || META_BY_PAGE.inicio;

  return (
    <div className="min-h-screen bg-white text-neutral-900 overflow-x-hidden">
      <SEO page={page} title={meta.title} description={meta.desc} />
      <Navbar page={page} goTo={goTo} />
      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo({ top: 0, left: 0, behavior: "auto" })}>
        <motion.div
          key={page}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
        >
          {page === "inicio" && <InicioPage goTo={goTo} />}
          {page === "historia" && <HistoriaPage />}
          {page === "servicios" && <ServiciosPage goTo={goTo} />}
          {page === "faq" && <FAQPage goTo={goTo} />}
          {page === "contacto" && <ContactoPage />}
        </motion.div>
      </AnimatePresence>
      <Footer goTo={goTo} />
      <ContactFloating />
      <TestSuite />
    </div>
  );
}

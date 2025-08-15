import React, { useEffect, useRef, useState } from "react";
import {
  Paintbrush,
  PlugZap,
  DoorOpen,
  Snowflake,
  Factory,
  Building2,
  Phone,
  Mail,
  MapPin,
  Facebook,
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
  phoneHref: "+593996242213",
  address: "Fray Vicente Solano y Avenida del Estado. Edificio CICA, Oficina 520",
  facebook: "https://www.facebook.com/Manosalaobra.Cuenca",
};

const NAV_ITEMS = [
  { key: "inicio", label: "Inicio" },
  { key: "historia", label: "Historia" },
  { key: "servicios", label: "Servicios" },
  { key: "faq", label: "FAQ" },
  { key: "contacto", label: "Contacto" },
];

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
  { icon: Snowflake, name: "Sistemas de Aire Acondicionado", desc: "Instalación, mantenimiento y optimización energética HVAC." },
  { icon: Factory, name: "Cubiertas Metálicas", desc: "Estructuras y cubiertas metálicas seguras, durables y estéticas." },
];

const FAQS = [
  { q: "¿Atienden solo a empresas?", a: "Trabajamos con todo tipo de clientes: desde grandes empresas hasta negocios pequeños y viviendas unifamiliares." },
  { q: "¿Solo realizan trabajos de mantenimiento?", a: "Si bien somos especialistas en mantenimiento, también ofrecemos servicios de construcción, remodelación y reparación." },
  { q: "¿Trabajan fuera del país?", a: "Actualmente no ofrecemos servicios fuera de Ecuador." },
  { q: "¿Tienen el equipo necesario para los trabajos?", a: "Contamos con el equipo técnico necesario y con más de 10 años de experiencia." },
  { q: "¿En qué ciudades brindan servicios?", a: "Prestamos servicios de mantenimiento a nivel nacional." },
];

const CLIENT_LOGOS = [
  { name: "Grupo Ortiz (Cuenca)", url: "https://i.ibb.co/PvSHrjyC/gruporotizlogo.png" },
  { name: "Marcimex", url: "https://i.ibb.co/WvJ8pRf0/Marcimex-Logo.png" },
  { name: "Junta de Beneficencia de Guayaquil", url: "https://i.ibb.co/7JyR16qj/Junta-Guayaquil-Logo.png" },
  { name: "Grupo Concenso", url: "https://i.ibb.co/WvQ9TdYn/Grupo-Consenso-Logo-removebg-preview.png" },
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
  <div className={`rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur ${className}`}>{children}</div>
);

function useDarkMode() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
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

function SEO({ page }) {
  useEffect(() => {
    const title = {
      inicio: `${COMPANY.brandName} – Excelencia en mantenimiento y construcción`,
      historia: `Historia – ${COMPANY.brandName}`,
      servicios: `Servicios – ${COMPANY.brandName}`,
      faq: `Preguntas Frecuentes – ${COMPANY.brandName}`,
      contacto: `Contacto – ${COMPANY.brandName}`,
    }[page];
    document.title = title;

    const ensureMeta = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    ensureMeta("description", "MANTARQ S.A.S. – Manos a la Obra. Mantenimiento empresarial y residencial, construcción, remodelación y soluciones a medida en Ecuador.");
    ensureMeta("theme-color", BRAND.primary);

    const ensureOg = (p, c) => {
      let tag = document.querySelector(`meta[property="${p}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", p);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", c);
    };
    ensureOg("og:title", document.title);
    ensureOg("og:description", "Excelencia en cada proyecto. Manos a la Obra.");
    ensureOg("og:type", "website");
    ensureOg("og:locale", "es_EC");
    ensureOg("og:image", ICON_URL);

    const ensureLink = (rel, href, attrs = {}) => {
      let link = document.querySelector(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", rel);
        document.head.appendChild(link);
      }
      link.setAttribute("href", href);
      Object.entries(attrs).forEach(([k, v]) => link.setAttribute(k, v));
    };
    ensureLink("icon", ICON_URL, { type: "image/png" });
    ensureLink("apple-touch-icon", ICON_URL);
  }, [page]);
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
      className={`fixed inset-x-0 top-0 z-50 border-b ${scrolled ? "border-white/10 bg-neutral-950/70 backdrop-blur" : "border-transparent bg-transparent"}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5">
            <BrandLogo className="h-8 w-8" />
          </div>
          <div className="min-w-0 leading-tight">
            <div className="truncate text-sm text-white/60">{COMPANY.legalName}</div>
            <div className="truncate font-bold tracking-tight text-white">{COMPANY.brandName}</div>
          </div>
        </div>

        {/* Desktop nav */}
        <div className="hidden items-center gap-2 md:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => goTo(item.key)}
              className={`cursor-pointer rounded-xl px-3 py-2 text-sm transition-colors hover:text-white ${page === item.key ? "text-white" : "text-white/70"}`}
            >
              {item.label}
            </button>
          ))}
          <a
            href={COMPANY.facebook}
            target="_blank"
            rel="noreferrer"
            title="Facebook"
            className="grid h-10 w-10 cursor-pointer place-items-center rounded-xl border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10"
          >
            <Facebook className="h-5 w-5" />
          </a>
          <a href={`https://wa.me/${COMPANY.phoneHref}`} target="_blank" rel="noreferrer">
            <Button className="border border-white/10 bg-[var(--brand-primary)] text-white hover:translate-y-[-1px]" style={{ "--brand-primary": BRAND.primary }}>Solicita tu servicio</Button>
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/80 md:hidden"
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
            className="md:hidden border-t border-white/10 bg-neutral-950/95 backdrop-blur"
          >
            <div className="mx-auto max-w-7xl px-4 py-3">
              <div className="flex flex-col gap-1">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => { setOpen(false); goTo(item.key); }}
                    className={`w-full cursor-pointer rounded-lg px-3 py-2 text-left text-base ${page === item.key ? "text-white" : "text-white/80"} hover:text-white`}
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
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/80"
                  title="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a href={`https://wa.me/${COMPANY.phoneHref}`} target="_blank" rel="noreferrer">
                  <Button className="border border-white/10 bg-[var(--brand-primary)] text-white" style={{ "--brand-primary": BRAND.primary }}>Solicita tu servicio</Button>
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
        <div className="absolute -top-56 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full opacity-20 blur-3xl" style={{ background: BRAND.primary }} />
        <motion.div className="absolute -bottom-48 left-1/3 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full opacity-20 blur-3xl" style={{ background: BRAND.accent }} animate={{ y: [0, -10, 0] }} transition={{ duration: 8, repeat: Infinity }} />
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-10">
        <Reveal>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">Excelencia en cada proyecto. <span className="text-white/80">Manos a la Obra</span></h1>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-6 max-w-3xl text-lg text-white/80">La excelencia es nuestro compromiso. Somos {COMPANY.brandName}, una empresa de mantenimiento que se enorgullece de su alta calidad y profesionalidad en el servicio. Ya sea un entorno comercial grande o una pequeña empresa, estamos equipados para manejar todos sus desafíos de mantenimiento.</p>
        </Reveal>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button onClick={() => goTo("servicios")} className="border border-white/10 bg-white/10 text-white hover:bg-white/15">Conócenos</Button>
          <a href={`https://wa.me/${COMPANY.phoneHref}`} target="_blank" rel="noreferrer"><Button className="border border-white/10 text-neutral-900 hover:translate-y-[-1px]" style={{ background: BRAND.accent }}>Solicita tu servicio</Button></a>
        </div>
      </div>
    </section>
  );
}

function LogosMarquee() {
  const track = [...CLIENT_LOGOS, ...CLIENT_LOGOS];
  return (
    <section className="border-y border-white/10 py-8">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal>
          <div className="mb-4 text-center text-xs uppercase tracking-widest text-white/60">Empresas que confían en nosotros</div>
        </Reveal>
        <div className="relative overflow-hidden">
          <div className="marquee-track flex items-center gap-4">
            {track.map((item, i) => (
              <div key={`t1-${i}`} className="logo-item group flex items-center justify-center rounded-xl border border-white/20 bg-white/[0.04] px-6">
                {item.url ? (
                  <img src={item.url} alt={item.name} className="logo-img opacity-90 transition-all duration-200 group-hover:opacity-100" />
                ) : (
                  <span className="text-sm text-white/80">{item.name}</span>
                )}
              </div>
            ))}
          </div>
          <div className="marquee-track flex items-center gap-4" aria-hidden="true">
            {track.map((item, i) => (
              <div key={`t2-${i}`} className="logo-item group flex items-center justify-center rounded-xl border border-white/20 bg-white/[0.04] px-6">
                {item.url ? (
                  <img src={item.url} alt={item.name} className="logo-img opacity-90 transition-all duration-200 group-hover:opacity-100" />
                ) : (
                  <span className="text-sm text-white/80">{item.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .marquee-track { width: max-content; white-space: nowrap; animation: marquee 20s linear infinite; will-change: transform; }
        .marquee-track[aria-hidden="true"] { position: absolute; inset: 0; transform: translateX(100%); }
        @keyframes marquee { 0% { transform: translateX(0);} 100% { transform: translateX(-100%);} }
        .logo-item { min-width: 260px; height: 5.5rem; }
        .logo-img { height: 3rem; width: auto; object-fit: contain; filter: grayscale(1) brightness(0) invert(1) drop-shadow(0 0 2px rgba(255,255,255,0.9)) drop-shadow(0 0 6px rgba(255,255,255,0.35)); }
        .logo-item:hover .logo-img { filter: none; }
        @media (max-width: 640px) {
          .marquee-track { animation-duration: 8s; }
          .logo-item { min-width: 200px; height: 5rem; }
          .logo-img { height: 2.5rem; }
        }
      `}</style>
    </section>
  );
}

function QuickContact() {
  return (
    <section className="py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 md:grid-cols-4">
        <Card>
          <div className="flex items-center gap-3 text-white"><Mail className="h-5 w-5 opacity-80" /><div className="text-sm font-semibold">Correo</div></div>
          <a href={`mailto:${COMPANY.email}`} className="mt-2 block text-white/80 hover:text-white">{COMPANY.email}</a>
        </Card>
        <Card>
          <div className="flex items-center gap-3 text-white"><Phone className="h-5 w-5 opacity-80" /><div className="text-sm font-semibold">Teléfono / WhatsApp</div></div>
          <a href={`https://wa.me/${COMPANY.phoneHref}`} target="_blank" rel="noreferrer" className="mt-2 block text-white/80 hover:text-white">{COMPANY.phone}</a>
        </Card>
        <Card>
          <div className="flex items-center gap-3 text-white"><MapPin className="h-5 w-5 opacity-80" /><div className="text-sm font-semibold">Ubicación</div></div>
          <div className="mt-2 text-white/80">{COMPANY.address}</div>
        </Card>
        <Card>
          <div className="flex items-center gap-3 text-white"><Facebook className="h-5 w-5 opacity-80" /><div className="text-sm font-semibold">Facebook</div></div>
          <a href={COMPANY.facebook} target="_blank" rel="noreferrer" className="mt-2 block text-white/80 hover:text-white">Manosalaobra.Cuenca</a>
        </Card>
      </div>
    </section>
  );
}

function AccordionItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left">
        <span className="text-white">{q}</span>
        <ChevronDown className={`h-5 w-5 text-white/70 transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="px-5 pb-5 text-white/80" style={{ willChange: "height, opacity" }}>{a}</motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQSection({ full = false, goTo }) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-4xl px-4">
        <Reveal><h3 className="mb-6 text-xl font-bold text-white">Preguntas frecuentes</h3></Reveal>
        <div className="flex flex-col gap-3">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} q={f.q} a={f.a} />
          ))}
        </div>
        {!full && (
          <div className="mt-6 text-center">
            <span className="text-white/70">¿Tienes otra pregunta? </span>
            <Button onClick={() => (goTo ? goTo("contacto") : (window.location.href = `mailto:${COMPANY.email}`))} className="border border-white/10 bg-white/10 text-white hover:bg-white/15">Escríbenos</Button>
          </div>
        )}
      </div>
    </section>
  );
}

function Footer({ goTo }) {
  return (
    <footer className="border-t border-white/10 py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 md:grid-cols-3">
        <div>
          <Reveal><div className="text-sm text-white/60">{COMPANY.legalName}</div></Reveal>
          <Reveal delay={0.05}><div className="text-lg font-bold text-white">{COMPANY.brandName}</div></Reveal>
          <Reveal delay={0.1}><div className="mt-3 text-white/70">{COMPANY.city}</div></Reveal>
        </div>
        <div>
          <Reveal><div className="mb-3 text-sm font-semibold text-white">Mapa del sitio</div></Reveal>
          <ul className="space-y-2 text-white/70">
            {NAV_ITEMS.map((i) => (
              <li key={i.key}><button onClick={() => goTo(i.key)} className="cursor-pointer hover:text-white">{i.label}</button></li>
            ))}
          </ul>
        </div>
        <div>
          <Reveal><div className="mb-3 text-sm font-semibold text-white">Contacto</div></Reveal>
          <ul className="space-y-2 text-white/70">
            <li><a href={`mailto:${COMPANY.email}`} className="hover:text-white">{COMPANY.email}</a></li>
            <li><a href={`https://wa.me/${COMPANY.phoneHref}`} target="_blank" rel="noreferrer" className="hover:text-white">{COMPANY.phone}</a></li>
            <li>{COMPANY.address}</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-7xl px-4 text-center text-xs text-white/50">© {new Date().getFullYear()} {COMPANY.legalName} – {COMPANY.brandName}. Todos los derechos reservados.</div>
    </footer>
  );
}

function HistoriaPage() {
  return (
    <main>
      <section className="mx-auto max-w-5xl px-4 pt-28">
        <Reveal><h2 className="text-3xl font-bold text-white">Nuestra historia</h2></Reveal>
        <Reveal delay={0.05}><p className="mt-3 max-w-3xl text-white/80">Cada hito refleja nuestro compromiso con la excelencia y la confianza de nuestros clientes en Ecuador.</p></Reveal>
      </section>
      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10 md:left-1/2" />
          <div className="space-y-10">
            {TIMELINE.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.4 }} className={`relative md:grid md:grid-cols-2 md:gap-10 ${i % 2 ? "md:pt-10" : "md:pb-10"}`}>
                <div className={`md:text-right ${i % 2 ? "md:order-2" : ""}`}>
                  <div className="inline-flex items-center gap-3"><span className="rounded-full bg-white/10 px-3 py-1 text-sm text-white/80">{item.year}</span></div>
                  <div className="mt-3 text-white">{item.text}</div>
                </div>
                <div className={`md:order-1 md:pl-8 ${i % 2 ? "md:pr-8" : ""}`}><div className="h-0.5 w-16 bg-white/10 md:hidden" /></div>
              </motion.div>
            ))}
          </div>
        </div>
        <Card className="mt-10 border-white/20 bg-gradient-to-br from-white/10 to-transparent"><div className="text-center text-lg font-semibold text-white">“Cada año hemos construido más que estructuras: construimos relaciones de confianza y resultados duraderos.”</div></Card>
      </section>
    </main>
  );
}

function ServiciosPage({ goTo }) {
  return (
    <main className="pt-28">
      <section className="mx-auto max-w-6xl px-4">
        <Reveal><h2 className="text-3xl font-bold text-white">Servicios</h2></Reveal>
        <Reveal delay={0.05}><p className="mt-3 max-w-3xl text-white/80">Soluciones integrales para empresas, comercios y residencias, con estándares de calidad y seguridad.</p></Reveal>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.35 }} className="group h-full rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:translate-y-[-2px] hover:shadow-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-xl" style={{ background: BRAND.primary }}>
                  <s.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">{s.name}</h3>
              </div>
              <p className="text-white/80">{s.desc}</p>
            </motion.div>
          ))}
        </div>
        <Card className="mt-8 border-white/10 bg-gradient-to-r from-white/10 to-transparent">
          <div className="grid items-center gap-4 md:grid-cols-[1fr_auto]">
            <div className="text-white/90">
              <h3 className="text-lg font-semibold text-white">¿Requiere un servicio específico no listado?</h3>
              <p className="mt-1 text-white/80">En {COMPANY.brandName} evaluamos su necesidad y presentamos una propuesta técnica integral, alineada a estándares de calidad, seguridad y cumplimiento normativo. Nuestro equipo se adapta a sus requerimientos con seriedad y eficiencia.</p>
            </div>
            <div className="flex gap-3">
              <a href={`https://wa.me/${COMPANY.phoneHref}`} target="_blank" rel="noreferrer"><Button className="border border-white/10 text-neutral-900" style={{ background: BRAND.accent }}>Solicitar cotización</Button></a>
              <Button onClick={() => goTo("contacto")} className="border border-white/10 bg-white/10 text-white hover:bg-white/15">Ir a contacto</Button>
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

  const mapQuery = encodeURIComponent(`${COMPANY.address}, ${COMPANY.city}`);

  return (
    <main className="pt-28" id="contacto">
      <section className="mx-auto max-w-6xl px-4">
        <Reveal><h2 className="text-3xl font-bold text-white">Contacto</h2></Reveal>
        <Reveal delay={0.05}><p className="mt-3 max-w-3xl text-white/80">Cuéntanos sobre tu proyecto. Te responderemos a la brevedad.</p></Reveal>
      </section>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 md:grid-cols-2">
        <Card>
          <form onSubmit={handleSubmit} ref={formRef} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm text-white/70">Nombre</label>
                <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full rounded-xl border border-white/10 bg-neutral-900 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]" placeholder="Tu nombre" style={{ "--brand-primary": BRAND.primary }} />
              </div>
              <div>
                <label className="mb-1 block text-sm text-white/70">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full rounded-xl border border-white/10 bg-neutral-900 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]" placeholder="tunombre@correo.com" style={{ "--brand-primary": BRAND.primary }} />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm text-white/70">Teléfono</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-xl border border-white/10 bg-neutral-900 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]" placeholder="Ej: +593 99 999 9999" style={{ "--brand-primary": BRAND.primary }} />
            </div>
            <div>
              <label className="mb-1 block text-sm text-white/70">Mensaje</label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} required rows={4} className="w-full rounded-xl border border-white/10 bg-neutral-900 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]" placeholder="Cuéntanos brevemente tu requerimiento" style={{ "--brand-primary": BRAND.primary }} />
            </div>
            <div className="flex items-center gap-3">
              <Button type="submit" disabled={sending} className="border border-white/10 text-neutral-900" style={{ background: BRAND.accent }}>{sending ? "Enviando…" : (<><Send className="h-4 w-4" /> Enviar</>)}</Button>
              <a href={`https://wa.me/${COMPANY.phoneHref}`} target="_blank" rel="noreferrer"><Button className="border border-white/10 bg-white/10 text-white hover:bg-white/15">WhatsApp directo</Button></a>
            </div>
            {ok && <div className="text-sm text-emerald-400">¡Gracias! Tu mensaje se ha enviado correctamente.</div>}
            {err && <div className="text-sm text-amber-400">{err}</div>}
          </form>
        </Card>
        <div className="space-y-4">
          <Card>
            <div className="flex items-start gap-3 text-white/90"><Mail className="mt-0.5 h-5 w-5" /> <a className="hover:text-white" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></div>
            <div className="mt-2 flex items-start gap-3 text-white/90"><Phone className="mt-0.5 h-5 w-5" /> <a className="hover:text-white" href={`https://wa.me/${COMPANY.phoneHref}`} target="_blank" rel="noreferrer">{COMPANY.phone}</a></div>
            <div className="mt-2 flex items-start gap-3 text-white/90"><MapPin className="mt-0.5 h-5 w-5" /> <span>{COMPANY.address}</span></div>
          </Card>
          <div className="overflow-hidden rounded-2xl border border-white/10"><iframe title="Mapa Manos a la Obra" src={`https://www.google.com/maps?q=${mapQuery}&output=embed`} loading="lazy" className="h-72 w-full" /></div>
        </div>
      </section>
    </main>
  );
}

function FAQPage({ goTo }) {
  return (
    <main className="pt-28">
      <section className="mx-auto max-w-5xl px-4">
        <Reveal><h2 className="text-3xl font-bold text-white">Preguntas frecuentes</h2></Reveal>
        <Reveal delay={0.05}><p className="mt-3 max-w-3xl text-white/80">Todo lo que necesitas saber sobre nuestros servicios y procesos.</p></Reveal>
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
        <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-white/10 to-transparent p-8 text-center">
          <Reveal><h3 className="text-xl font-bold text-white">Conoce nuestros servicios</h3></Reveal>
          <Reveal delay={0.05}><p className="mt-2 text-white/70">Descubre cómo podemos ayudarte con soluciones integrales y confiables.</p></Reveal>
          <div className="mt-5"><Button onClick={() => goTo("servicios")} className="border border-white/10 bg-white/10 text-white hover:bg-white/15">Ver servicios</Button></div>
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
    console.assert(SERVICES.length >= 6, "Se esperan al menos 6 servicios");
    console.assert(CLIENT_LOGOS.length >= 8, "Se esperan 8 logos de clientes");
  }, []);
  return null;
}

export default function App() {
  const [page, setPage] = useState("inicio");
  useDarkMode();

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--brand-primary", BRAND.primary);
    root.style.setProperty("--brand-accent", BRAND.accent);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const goTo = (p) => setPage(p);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 overflow-x-hidden">
      <TestSuite />
      <SEO page={page} />
      <Navbar page={page} goTo={goTo} />
      <AnimatePresence mode="wait">
        {page === "inicio" && (<motion.div key="inicio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><InicioPage goTo={goTo} /></motion.div>)}
        {page === "historia" && (<motion.div key="historia" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><HistoriaPage /></motion.div>)}
        {page === "servicios" && (<motion.div key="servicios" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><ServiciosPage goTo={goTo} /></motion.div>)}
        {page === "faq" && (<motion.div key="faq" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><FAQPage goTo={goTo} /></motion.div>)}
        {page === "contacto" && (<motion.div key="contacto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><ContactoPage /></motion.div>)}
      </AnimatePresence>
      <Footer goTo={goTo} />
      <ContactFloating />
    </div>
  );
}

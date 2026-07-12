import { Link, useRouterState } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown, FileDown, Flame } from "lucide-react";
import { LangToggle } from "./LangToggle";
import { ThemeToggle } from "./ThemeToggle";
import { Socials } from "./Socials";
import { openLead } from "./LeadFormSheet";
import { INDUSTRY_SLUGS } from "@/data/industries";
import catalogAsset from "@/assets/radiocom-catalog.pdf.asset.json";

export function Nav() {
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 120], ["color-mix(in oklab, var(--pitch) 0%, transparent)", "color-mix(in oklab, var(--pitch) 85%, transparent)"]);
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const industriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    setIndustriesOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (industriesRef.current && !industriesRef.current.contains(e.target as Node)) setIndustriesOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/catalog", label: t("nav.catalog") },
    { to: "/poc", label: t("nav.poc") },
    { to: "/service", label: t("nav.service") },
  ] as const;

  const goTradeIn = () => {
    if (pathname === "/") {
      document.getElementById("tradein")?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#tradein";
    }
  };

  return (
    <>
      <motion.header
        style={{ backgroundColor: bg }}
        className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md border-b hairline"
      >
        <div className="px-4 md:px-10 h-16 flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <RadiocomMark />
            <span className="text-display text-lg tracking-tight">RADIOCOM</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 min-w-0">
            {links.map((l) => {
              const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`text-mono text-[11px] px-3 py-2 transition-colors ${
                    active ? "text-signal" : "text-cool hover:text-crisp"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
            {/* Industries dropdown */}
            <div ref={industriesRef} className="relative">
              <button
                onClick={() => setIndustriesOpen((v) => !v)}
                className={`text-mono text-[11px] px-3 py-2 flex items-center gap-1 transition-colors ${
                  pathname.startsWith("/industries") ? "text-signal" : "text-cool hover:text-crisp"
                }`}
              >
                {t("nav.industries")} <ChevronDown className="w-3 h-3" />
              </button>
              <AnimatePresence>
                {industriesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-0 mt-2 w-72 bg-charcoal border hairline shadow-2xl p-2"
                  >
                    <Link to="/industries" className="block px-4 py-3 text-mono text-[11px] text-signal hover:bg-panel">
                      → {t("industries.view_all")}
                    </Link>
                    {INDUSTRY_SLUGS.map((s) => (
                      <Link
                        key={s}
                        to="/industries/$slug"
                        params={{ slug: s }}
                        className="block px-4 py-3 text-sm text-crisp/80 hover:text-crisp hover:bg-panel transition-colors"
                      >
                        {t(`industries.${s}.name`)}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={goTradeIn}
              className="hidden md:inline-flex items-center gap-1.5 text-mono text-[10px] bg-signal/15 text-signal border border-signal/40 px-3 py-1.5 rounded-full hover:bg-signal hover:text-crisp transition-colors"
            >
              <Flame className="w-3 h-3" />
              {t("nav.tradein_badge")}
            </button>

            <a
              href={catalogAsset.url}
              download="radiocom-catalog.pdf"
              className="hidden md:inline-flex items-center gap-1.5 text-mono text-[10px] text-cool hover:text-signal border hairline px-3 py-1.5 transition-colors"
              aria-label={t("nav.download")}
            >
              <FileDown className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">{t("nav.download")}</span>
            </a>

            <LangToggle />
            <ThemeToggle />
            <button
              onClick={() => openLead({ title: t("nav.contact") })}
              className="hidden sm:inline-flex text-mono text-[11px] bg-signal text-crisp px-4 py-2 hover:bg-signal/90 transition-colors"
            >
              {t("nav.contact")}
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden h-9 w-9 flex items-center justify-center border hairline text-cool hover:text-crisp"
              aria-label={t("nav.menu")}
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div className="absolute inset-0 bg-pitch/85 backdrop-blur-md" onClick={() => setMobileOpen(false)} />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.4 }}
              className="absolute right-0 top-0 h-full w-full max-w-sm bg-charcoal border-l hairline overflow-y-auto"
            >
              <div className="p-6 flex items-center justify-between">
                <span className="text-mono text-[11px] text-cool">{t("nav.menu")}</span>
                <button onClick={() => setMobileOpen(false)} aria-label={t("nav.close")} className="text-cool hover:text-signal">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="px-6 pb-6 flex flex-col">
                {links.map((l) => (
                  <Link key={l.to} to={l.to} className="text-display text-3xl py-3 border-t hairline text-crisp hover:text-signal">
                    {l.label}
                  </Link>
                ))}
                <div className="border-t hairline pt-3 mt-1">
                  <div className="text-mono text-[10px] text-cool mb-2">{t("nav.industries")}</div>
                  {INDUSTRY_SLUGS.map((s) => (
                    <Link key={s} to="/industries/$slug" params={{ slug: s }} className="block py-2 text-crisp/80 hover:text-signal">
                      {t(`industries.${s}.name`)}
                    </Link>
                  ))}
                </div>
                <a
                  href={catalogAsset.url}
                  download="radiocom-catalog.pdf"
                  className="mt-4 flex items-center gap-2 text-mono text-[11px] border border-signal text-signal px-4 py-3 hover:bg-signal hover:text-crisp"
                >
                  <FileDown className="w-4 h-4" /> {t("nav.download")}
                </a>
                <button
                  onClick={() => { setMobileOpen(false); openLead({ title: t("form.test_title") }); }}
                  className="mt-3 flex items-center justify-center gap-2 text-mono text-[11px] bg-signal text-crisp px-4 py-4 signal-pulse"
                >
                  {t("form.test_title")}
                </button>
                <div className="mt-6 border-t hairline pt-6 flex items-center justify-between">
                  <span className="text-mono text-[10px] text-cool">{t("footer.follow")}</span>
                  <Socials />
                </div>
              </nav>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function RadiocomMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <path d="M4 20 A10 10 0 0 1 24 20" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <path d="M7.5 20 A6.5 6.5 0 0 1 20.5 20" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      <circle cx="14" cy="20" r="3" fill="var(--signal)" />
    </svg>
  );
}

import { Link, useRouterState } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { motion, useScroll, useTransform } from "framer-motion";
import { LangToggle } from "./LangToggle";
import { openLead } from "./LeadFormSheet";

export function Nav() {
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 120], ["rgba(10,10,10,0)", "rgba(10,10,10,0.85)"]);
  const border = useTransform(scrollY, [0, 120], ["rgba(255,255,255,0)", "rgba(255,255,255,0.08)"]);
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  const links: Array<{ to: string; key: keyof typeof t; label: string }> = [
    { to: "/",        key: "nav.home" as any,    label: t("nav.home") },
    { to: "/catalog", key: "nav.catalog" as any, label: t("nav.catalog") },
    { to: "/poc",     key: "nav.poc" as any,     label: t("nav.poc") },
    { to: "/service", key: "nav.service" as any, label: t("nav.service") },
  ];

  return (
    <motion.header
      style={{ backgroundColor: bg, borderBottom: "1px solid", borderColor: border }}
      className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md"
    >
      <div className="px-6 md:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <RadiocomMark />
          <span className="text-display text-lg tracking-tight">RADIOCOM</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`text-mono text-[11px] px-4 py-2 transition-colors ${
                  active ? "text-signal" : "text-cool hover:text-crisp"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <LangToggle />
          <button
            onClick={() => openLead({ title: t("nav.contact") })}
            className="hidden sm:inline-flex text-mono text-[11px] bg-signal text-crisp px-4 py-2 hover:bg-signal/90 transition-colors"
          >
            {t("nav.contact")}
          </button>
        </div>
      </div>
    </motion.header>
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

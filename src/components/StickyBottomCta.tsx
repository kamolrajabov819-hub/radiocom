import { useTranslation } from "react-i18next";
import { useRouterState } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { openLead } from "./LeadFormSheet";

/**
 * Mobile-only sticky bottom conversion bar. Shows on Home, Industries, Catalog.
 * Hidden on lg+ (desktop already has header CTA + floating radar button).
 */
export function StickyBottomCta() {
  const { t } = useTranslation();
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const shouldShow =
    pathname === "/" ||
    pathname.startsWith("/industries") ||
    pathname.startsWith("/catalog");

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.button
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => openLead({ title: t("lead.sticky_cta") })}
          className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-signal text-crisp px-5 py-4 flex items-center justify-between gap-3 text-left shadow-[0_-20px_50px_-10px_rgba(227,6,19,0.35)]"
          aria-label={t("lead.sticky_cta")}
        >
          <div className="min-w-0">
            <div className="text-mono text-[11px] font-medium truncate">{t("lead.sticky_cta")}</div>
            <div className="text-mono text-[9px] opacity-80 truncate">{t("lead.sticky_sub")}</div>
          </div>
          <div className="shrink-0 h-10 w-10 rounded-full bg-crisp/15 flex items-center justify-center">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

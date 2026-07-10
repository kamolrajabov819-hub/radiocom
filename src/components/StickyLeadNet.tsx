import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { openLead } from "./LeadFormSheet";

export function StickyLeadNet() {
  const { t } = useTranslation();
  return (
    <motion.button
      onClick={() => openLead({ title: t("form.test_title") })}
      className="fixed bottom-6 right-6 z-50 group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
    >
      <span className="absolute inset-0 rounded-full bg-signal animate-ping opacity-40" />
      <span className="relative flex items-center gap-3 bg-signal text-crisp text-mono text-[11px] px-5 py-4 rounded-full shadow-[0_10px_40px_-10px_rgba(255,0,30,0.6)] group-hover:pr-6 transition-all">
        <span className="relative flex h-2 w-2">
          <span className="absolute inset-0 rounded-full bg-crisp animate-ping" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-crisp" />
        </span>
        {t("lead.float")}
      </span>
    </motion.button>
  );
}

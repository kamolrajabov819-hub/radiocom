import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Radio } from "lucide-react";
import { openLead } from "./LeadFormSheet";

export function StickyLeadNet() {
  const { t } = useTranslation();
  return (
    <motion.button
      onClick={() => openLead({ title: t("form.test_title") })}
      className="hidden lg:flex fixed bottom-8 right-8 z-40 group signal-pulse rounded-full"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.6, type: "spring" }}
      aria-label={t("lead.tooltip")}
    >
      <span className="relative flex items-center gap-3 bg-signal text-crisp text-mono text-[11px] px-5 py-4 md:px-6 md:py-5 rounded-full">
        <Radio className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.2} />
        <span className="hidden sm:inline">{t("lead.float")}</span>
      </span>
    </motion.button>
  );
}

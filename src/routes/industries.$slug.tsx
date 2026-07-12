import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { INDUSTRY_SLUGS, industryPicks, type IndustrySlug } from "@/data/industries";
import { products, formatPrice } from "@/data/products";
import { Reveal, RevealWords } from "@/components/Reveal";
import { openLead } from "@/components/LeadFormSheet";
import { MagneticButton } from "@/components/MagneticButton";
import horecaImg from "@/assets/industry-horeca.jpg";
import constructionImg from "@/assets/industry-construction.jpg";
import securityImg from "@/assets/industry-security.jpg";

const IMAGES: Record<string, string> = {
  horeca: horecaImg,
  construction: constructionImg,
  security: securityImg,
  mining: constructionImg,
  transport: securityImg,
  manufacturing: constructionImg,
};

export const Route = createFileRoute("/industries/$slug")({
  beforeLoad: ({ params }) => {
    if (!INDUSTRY_SLUGS.includes(params.slug as IndustrySlug)) throw notFound();
  },
  head: ({ params }) => ({
    meta: [
      { title: `Industry: ${params.slug} — Radiocom` },
      { name: "description", content: `Radio systems engineered for ${params.slug} in Uzbekistan.` },
    ],
  }),
  component: IndustryPage,
});

function IndustryPage() {
  const { slug } = Route.useParams();
  const { t, i18n } = useTranslation();
  const lang = (i18n.language.slice(0, 2) as "ru" | "en" | "uz") || "ru";
  const s = slug as IndustrySlug;
  const picks = industryPicks[s].map((id) => products.find((p) => p.id === id)).filter(Boolean) as typeof products;

  return (
    <>
      {/* Hero */}
      <section className="relative pt-16 min-h-[75vh] overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES[s]} alt="" className="absolute inset-0 h-full w-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-r from-pitch via-pitch/70 to-pitch/30" />
        </div>
        <div className="relative px-6 md:px-10 pt-16 md:pt-32 pb-16 md:pb-24">
          <Reveal>
            <Link to="/industries" className="text-mono text-[11px] text-signal">← {t("industries.view_all")}</Link>
          </Reveal>
          <h1 className="mt-8 text-display text-6xl sm:text-7xl md:text-[10vw] leading-[0.9]">
            <RevealWords text={t(`industries.${s}.name`)} />
            <span className="text-signal">.</span>
          </h1>
          <Reveal delay={0.3}>
            <p className="mt-8 max-w-xl text-cool text-lg leading-relaxed">{t(`industries.${s}.desc`)}</p>
          </Reveal>
          <Reveal delay={0.5}>
            <div className="mt-10">
              <button
                onClick={() => openLead({ title: `${t("industries.cta")} · ${t(`industries.${s}.name`)}` })}
                className="signal-glow bg-signal text-crisp text-mono text-[12px] px-6 md:px-8 py-4 md:py-5 hover:bg-signal/90 transition-all flex items-center gap-3 min-h-14"
              >
                {t("industries.cta")}
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="border-t hairline grid grid-cols-1 md:grid-cols-2 gap-px bg-crisp/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-charcoal p-10 md:p-16"
        >
          <div className="text-mono text-[10px] text-cool mb-6">/ 01 · {t("industries.problem_title")}</div>
          <p className="text-display text-2xl md:text-3xl leading-tight text-crisp">
            {t(`industries.${s}.problem`)}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="bg-signal text-crisp p-10 md:p-16"
        >
          <div className="text-mono text-[10px] mb-6 opacity-80">/ 02 · {t("industries.solution_title")}</div>
          <p className="text-display text-2xl md:text-3xl leading-tight">
            {t(`industries.${s}.solution`)}
          </p>
        </motion.div>
      </section>

      {/* Recommended */}
      <section className="border-t hairline px-6 md:px-10 py-16 md:py-24">
        <Reveal>
          <div className="text-mono text-[11px] text-signal mb-6">/ 03 · {t("industries.recommended")}</div>
          <h2 className="text-display text-4xl md:text-6xl mb-12 max-w-3xl">
            {t("industries.recommended")}<span className="text-signal">.</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-crisp/10">
          {picks.map((p, i) => (
            <motion.button
              key={p.id}
              onClick={() => openLead({ product: p.name })}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.08 }}
              className="relative bg-charcoal p-6 md:p-8 text-left group overflow-hidden"
            >
              <div className="absolute inset-0 bg-signal origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500" />
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-mono text-[10px] text-cool group-hover:text-crisp">{p.brand}</div>
                  <ArrowUpRight className="w-4 h-4 text-cool group-hover:text-crisp -rotate-45 group-hover:rotate-0 transition-transform" />
                </div>
                <div className="aspect-[4/5] flex items-center justify-center mb-4 overflow-hidden">
                  <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-700" />
                </div>
                <h3 className="text-display text-xl md:text-2xl leading-tight mb-2 group-hover:text-crisp">{p.name}</h3>
                <div className="text-display text-lg text-signal group-hover:text-crisp mb-3">
                  {formatPrice(p.price, lang)}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.slice(0, 3).map((tg) => (
                    <span key={tg} className="text-mono text-[9px] px-2 py-1 border border-crisp/15 group-hover:border-crisp/40 flex items-center gap-1">
                      <Check className="w-2.5 h-2.5" /> {tg}
                    </span>
                  ))}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t hairline px-6 md:px-10 py-24 md:py-32">
        <div className="max-w-3xl">
          <h2 className="text-display text-4xl md:text-7xl leading-[0.9]">
            {t("industries.cta")}<span className="text-signal">.</span>
          </h2>
          <div className="mt-10">
            <MagneticButton onClick={() => openLead({ title: `${t("industries.cta")} · ${t(`industries.${s}.name`)}` })}>
              {t("industries.cta")}
              <ArrowUpRight className="w-4 h-4" />
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}

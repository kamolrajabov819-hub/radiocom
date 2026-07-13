import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, Check, AlertCircle, Plus, Minus, FileDown, Quote } from "lucide-react";
import { INDUSTRY_SLUGS, industryPicks, type IndustrySlug } from "@/data/industries";
import { products, formatPrice } from "@/data/products";
import { Reveal, RevealWords } from "@/components/Reveal";
import { openLead } from "@/components/LeadFormSheet";
import { MagneticButton } from "@/components/MagneticButton";
import { CountUp } from "@/components/CountUp";
import catalogAsset from "@/assets/radiocom-catalog.pdf.asset.json";
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

type Outcome = { n: string; u: string; l: string };
type FAQ = { q: string; a: string };

function IndustryPage() {
  const { slug } = Route.useParams();
  const { t, i18n } = useTranslation();
  const lang = (i18n.language.slice(0, 2) as "ru" | "en" | "uz") || "ru";
  const s = slug as IndustrySlug;
  const picks = industryPicks[s].map((id) => products.find((p) => p.id === id)).filter(Boolean) as typeof products;

  const pains = (t(`industries.${s}.pains`, { returnObjects: true }) as string[]) || [];
  const outcomes = (t(`industries.${s}.outcomes`, { returnObjects: true }) as Outcome[]) || [];
  const faq = (t(`industries.${s}.faq`, { returnObjects: true }) as FAQ[]) || [];
  const industryName = t(`industries.${s}.name`);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-16 min-h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <motion.img
            src={IMAGES[s]}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-50"
            initial={{ scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-pitch via-pitch/75 to-pitch/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-pitch to-transparent" />
        </div>
        <div className="relative px-5 sm:px-6 md:px-10 pt-16 md:pt-32 pb-16 md:pb-24">
          <Reveal>
            <Link to="/industries" className="text-mono text-[11px] text-signal">← {t("industries.view_all")}</Link>
          </Reveal>
          <h1 className="mt-8 hero-headline-sm">
            <RevealWords text={industryName} />
            <span className="text-signal">.</span>
          </h1>
          <Reveal delay={0.3}>
            <p className="mt-8 max-w-xl text-cool text-base md:text-lg leading-relaxed">{t(`industries.${s}.desc`)}</p>
          </Reveal>

          {/* Trust strip */}
          <Reveal delay={0.5}>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-mono text-[10px] md:text-[11px] text-cool">
              <span className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-signal" /> {t("industries.trust_delivered")}</span>
              <span className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-signal" /> {t("industries.trust_years")}</span>
              <span className="hidden sm:flex items-center gap-2"><Check className="w-3.5 h-3.5 text-signal" /> {t("industries.trust_teams", { industry: industryName })}</span>
            </div>
          </Reveal>

          <Reveal delay={0.7}>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 md:gap-4 max-w-lg">
              <button
                onClick={() => openLead({ title: `${t("industries.cta")} · ${industryName}` })}
                className="signal-glow bg-signal text-crisp text-mono text-[12px] px-6 md:px-8 py-4 md:py-5 hover:bg-signal/90 transition-all flex items-center justify-center gap-3 min-h-14"
              >
                {t("industries.cta")}
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <a
                href={catalogAsset.url}
                download="radiocom-catalog.pdf"
                className="text-mono text-[12px] border border-crisp/25 text-crisp px-6 py-4 md:py-5 hover:border-signal hover:text-signal transition-colors flex items-center justify-center gap-2 min-h-14"
              >
                <FileDown className="w-4 h-4" /> {t("industries.cta_secondary")}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pains */}
      {pains.length > 0 && (
        <section className="border-t hairline px-5 sm:px-6 md:px-10 py-16 md:py-24">
          <Reveal>
            <div className="text-mono text-[11px] text-signal mb-6">/ 01 · {t("industries.pains_title")}</div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {pains.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="relative border-t hairline pt-6 md:pt-8"
              >
                <AlertCircle className="w-6 h-6 text-signal mb-4" />
                <p className="text-display text-xl md:text-2xl leading-tight text-crisp">{p}</p>
                <motion.div
                  className="absolute top-0 left-0 h-px bg-signal origin-left"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3, duration: 0.7 }}
                  style={{ width: "40%" }}
                />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Problem / Solution */}
      <section className="border-t hairline grid grid-cols-1 md:grid-cols-2 gap-px bg-crisp/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-charcoal p-8 md:p-16"
        >
          <div className="text-mono text-[10px] text-cool mb-6">/ 02 · {t("industries.problem_title")}</div>
          <p className="text-display text-2xl md:text-3xl leading-tight text-crisp">
            {t(`industries.${s}.problem`)}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="bg-signal text-crisp p-8 md:p-16"
        >
          <div className="text-mono text-[10px] mb-6 opacity-80">/ 03 · {t("industries.solution_title")}</div>
          <p className="text-display text-2xl md:text-3xl leading-tight">
            {t(`industries.${s}.solution`)}
          </p>
        </motion.div>
      </section>

      {/* Outcomes / Metrics */}
      {outcomes.length > 0 && (
        <section className="border-t hairline px-5 sm:px-6 md:px-10 py-20 md:py-28">
          <Reveal>
            <div className="text-mono text-[11px] text-signal mb-6">/ 04 · {t("industries.outcomes_title")}</div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {outcomes.map((o, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.7 }}
                className="border-t hairline pt-6"
              >
                <div className="flex items-baseline gap-1">
                  <OutcomeNumber value={o.n} />
                  {o.u && <span className="text-display text-2xl md:text-3xl text-signal">{o.u}</span>}
                </div>
                <div className="text-cool text-sm md:text-base mt-4 leading-relaxed">{o.l}</div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Recommended */}
      <section className="border-t hairline px-5 sm:px-6 md:px-10 py-16 md:py-24">
        <Reveal>
          <div className="text-mono text-[11px] text-signal mb-6">/ 05 · {t("industries.recommended")}</div>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
            <h2 className="text-display text-4xl md:text-6xl max-w-3xl">
              {t("industries.recommended")}<span className="text-signal">.</span>
            </h2>
            <Link to="/catalog" className="text-mono text-[11px] text-signal border-b border-signal/50 hover:border-signal">
              {t("industries.compare_all")}
            </Link>
          </div>
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
                <div className="photo-frame aspect-[4/5] flex items-center justify-center mb-4 overflow-hidden">
                  <img src={p.image} alt={p.name} className="photo-multiply max-h-full max-w-full object-contain group-hover:scale-105" />
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

      {/* Testimonial */}
      <section className="border-t hairline px-5 sm:px-6 md:px-10 py-20 md:py-32">
        <div className="max-w-4xl">
          <Reveal>
            <div className="text-mono text-[11px] text-signal mb-8">/ 06 · {t("industries.quote_kicker")}</div>
          </Reveal>
          <Reveal delay={0.2}>
            <Quote className="w-10 h-10 md:w-14 md:h-14 text-signal mb-6" strokeWidth={1.5} />
            <p className="text-display text-2xl sm:text-3xl md:text-5xl leading-[1.1] text-crisp">
              {t(`industries.${s}.quote`)}
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="h-px w-10 bg-signal" />
              <div className="text-mono text-[11px] text-cool">{t(`industries.${s}.quote_author`)}</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      {faq.length > 0 && (
        <section className="border-t hairline px-5 sm:px-6 md:px-10 py-16 md:py-24">
          <Reveal>
            <div className="text-mono text-[11px] text-signal mb-6">/ 07 · {t("industries.faq_title")}</div>
            <h2 className="text-display text-3xl md:text-5xl mb-10 md:mb-16">
              {t("industries.faq_title")}<span className="text-signal">.</span>
            </h2>
          </Reveal>
          <div className="max-w-3xl">
            {faq.map((f, i) => (
              <FaqRow key={i} q={f.q} a={f.a} />
            ))}
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="border-t hairline px-5 sm:px-6 md:px-10 py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-signal/5 to-signal/15 pointer-events-none" />
        <div className="relative max-w-3xl">
          <h2 className="hero-headline-sm">
            {t("industries.cta")}<span className="text-signal">.</span>
          </h2>
          <p className="mt-6 text-cool text-base md:text-lg max-w-xl">{t("form.trust_line")}</p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 md:gap-4">
            <MagneticButton onClick={() => openLead({ title: `${t("industries.cta")} · ${industryName}` })}>
              {t("industries.cta")}
              <ArrowUpRight className="w-4 h-4" />
            </MagneticButton>
            <a
              href={catalogAsset.url}
              download="radiocom-catalog.pdf"
              className="text-mono text-[12px] border border-crisp/25 text-crisp px-6 py-4 hover:border-signal hover:text-signal transition-colors inline-flex items-center justify-center gap-2 min-h-14"
            >
              <FileDown className="w-4 h-4" /> {t("industries.cta_secondary")}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function OutcomeNumber({ value }: { value: string }) {
  // If pure numeric or numeric with % or K/dB suffix — parse the leading integer part
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (match) {
    const n = parseFloat(match[1]);
    const suffix = match[2];
    if (n < 10000 && Number.isFinite(n)) {
      return (
        <span className="metric-num text-crisp" style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}>
          <CountUp to={n} /> <span className="text-signal">{suffix}</span>
        </span>
      );
    }
  }
  return (
    <span className="metric-num text-crisp" style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}>
      {value}
    </span>
  );
}

function FaqRow({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t hairline">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start justify-between gap-6 py-6 text-left group"
      >
        <span className="text-display text-lg md:text-2xl text-crisp group-hover:text-signal transition-colors">{q}</span>
        <span className="mt-1 shrink-0 h-8 w-8 rounded-full border border-crisp/20 flex items-center justify-center text-cool group-hover:border-signal group-hover:text-signal transition-colors">
          {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p className="pb-8 pr-14 text-cool text-base leading-relaxed">{a}</p>
      </motion.div>
    </div>
  );
}

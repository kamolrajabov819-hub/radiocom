import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Check, X, ArrowUpRight } from "lucide-react";
import antennaImg from "@/assets/poc-antenna.jpg";
import pocImg from "@/assets/product-poc.jpg";
import { Reveal, RevealWords } from "@/components/Reveal";
import { MagneticButton } from "@/components/MagneticButton";
import { openLead } from "@/components/LeadFormSheet";

export const Route = createFileRoute("/poc")({
  head: () => ({
    meta: [
      { title: "PoC Systems & Network Design — Push-to-Talk over Cellular | Radiocom" },
      { name: "description", content: "Push-to-Talk over Cellular systems, PMR comparison, network design, commissioning and radio rental across Uzbekistan." },
      { property: "og:title", content: "PoC · Global range, zero repeaters" },
      { property: "og:description", content: "Instant group communication over LTE and WiFi with GPS and multimedia." },
    ],
  }),
  component: PoCPage,
});

function PoCPage() {
  return (
    <>
      <PocHero />
      <VsTable />
      <NetworkDesign />
      <Rental />
    </>
  );
}

function PocHero() {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  return (
    <section ref={ref} className="relative min-h-[90vh] overflow-hidden pt-16">
      <motion.div style={{ y }} className="absolute inset-0">
        <img src={antennaImg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-pitch via-pitch/80 to-pitch/20" />
      </motion.div>

      {/* radar rings */}
      <div className="absolute right-8 md:right-24 top-32 pointer-events-none">
        {[80, 160, 240, 320].map((s, i) => (
          <motion.div
            key={s}
            className="absolute rounded-full border border-signal/30"
            style={{ width: s, height: s, top: -s / 2, left: -s / 2 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 0.6, 0], scale: [0, 1, 1.4] }}
            transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
          />
        ))}
        <div className="absolute -top-1 -left-1 h-2 w-2 rounded-full bg-signal" />
      </div>

      <div className="relative px-6 md:px-10 pt-24 md:pt-40 pb-16">
        <Reveal>
          <div className="text-mono text-[11px] text-signal mb-8">{t("poc.kicker")}</div>
        </Reveal>
        <h1 className="text-display text-[13vw] md:text-[9vw] leading-[0.85] max-w-6xl">
          <RevealWords text={t("poc.title_a")} />
          <span className="block pl-[8vw]">
            <RevealWords text={t("poc.title_b")} stagger={0.06} />
          </span>
        </h1>
        <Reveal delay={0.6}>
          <p className="mt-12 max-w-2xl text-cool text-lg md:text-xl leading-relaxed">{t("poc.sub")}</p>
        </Reveal>
      </div>
    </section>
  );
}

function VsTable() {
  const { t } = useTranslation();
  const keys = ["coverage", "infra", "media", "gps", "scale", "cost"] as const;

  return (
    <section className="border-t hairline px-6 md:px-10 py-24">
      <div className="grid grid-cols-12 gap-6 mb-16">
        <div className="col-span-12 md:col-span-6">
          <Reveal>
            <h2 className="text-display text-5xl md:text-7xl">{t("poc.vs_title")}</h2>
          </Reveal>
        </div>
        <div className="col-span-12 md:col-span-5 md:col-start-8 flex items-end">
          <Reveal delay={0.2}>
            <p className="text-cool">{t("poc.vs_sub")}</p>
          </Reveal>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-px bg-crisp/10 border hairline">
        {/* header */}
        <div className="col-span-4 bg-pitch p-6 text-mono text-[10px] text-cool">PARAMETER</div>
        <div className="col-span-4 bg-signal p-6 text-mono text-[10px] text-crisp flex items-center gap-2">
          <Check className="w-3 h-3" /> PoC
        </div>
        <div className="col-span-4 bg-charcoal p-6 text-mono text-[10px] text-cool">PMR / DMR</div>

        {keys.map((k, i) => (
          <motion.div
            key={k}
            className="contents"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="col-span-4 bg-pitch p-6 text-sm text-cool">
              {t(`poc.rows.${k}`)}
            </div>
            <div className="col-span-4 bg-pitch p-6 text-sm text-crisp flex items-center gap-3">
              <Check className="w-4 h-4 text-signal shrink-0" />
              {t(`poc.poc_vals.${k}`)}
            </div>
            <div className="col-span-4 bg-pitch p-6 text-sm text-cool flex items-center gap-3">
              <X className="w-4 h-4 text-cool/60 shrink-0" />
              {t(`poc.pmr_vals.${k}`)}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function NetworkDesign() {
  const { t } = useTranslation();
  const steps = t("poc.design.steps", { returnObjects: true }) as string[];
  return (
    <section className="border-t hairline px-6 md:px-10 py-24 relative overflow-hidden">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-5">
          <Reveal>
            <div className="text-mono text-[11px] text-signal mb-6">{t("poc.design.kicker")}</div>
            <h2 className="text-display text-4xl md:text-6xl mb-10 leading-tight">{t("poc.design.title")}</h2>
          </Reveal>
          <div className="aspect-[4/5] relative bg-charcoal overflow-hidden">
            <img src={pocImg} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 md:col-start-7 md:pt-24">
          <ol className="space-y-6">
            {steps.map((s, i) => (
              <motion.li
                key={i}
                className="grid grid-cols-12 gap-6 items-start border-t hairline pt-6"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <div className="col-span-2 text-mono text-[11px] text-signal">
                  0{i + 1}
                </div>
                <div className="col-span-10 text-crisp text-lg md:text-xl leading-snug">{s}</div>
              </motion.li>
            ))}
          </ol>
          <div className="mt-10 text-mono text-[11px] text-cool border-t hairline pt-6">
            +998 93 381-16-20 · +998 71 233-16-20
          </div>
        </div>
      </div>
    </section>
  );
}

function Rental() {
  const { t } = useTranslation();
  return (
    <section className="border-t hairline relative overflow-hidden">
      <div className="px-6 md:px-10 py-24 grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-7">
          <Reveal>
            <div className="text-mono text-[11px] text-signal mb-6">{t("poc.rental.kicker")}</div>
            <h2 className="text-display text-5xl md:text-8xl leading-[0.9]">
              {t("poc.rental.title")}
            </h2>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-10 text-cool text-lg max-w-lg">{t("poc.rental.desc")}</p>
            <div className="mt-10">
              <MagneticButton onClick={() => openLead({ title: t("poc.rental.cta") })}>
                {t("poc.rental.cta")}
                <ArrowUpRight className="w-4 h-4" />
              </MagneticButton>
            </div>
          </Reveal>
        </div>

        <div className="col-span-12 md:col-span-5 flex items-end">
          <div className="w-full grid grid-cols-5 gap-1">
            {[1, 7, 30, 365, 1825].map((d, i) => (
              <motion.div
                key={d}
                className="border border-crisp/15 p-3 flex flex-col justify-between aspect-[2/3]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-mono text-[9px] text-cool">{i === 4 ? "5+" : i === 3 ? "1Y" : `${d}D`}</div>
                <div className={`h-${(i + 1) * 6} bg-signal/${20 + i * 15}`} style={{ height: `${(i + 1) * 18}%`, background: `oklch(0.58 0.24 25 / ${0.2 + i * 0.15})` }} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

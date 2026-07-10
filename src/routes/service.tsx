import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, Check, Plus, Minus } from "lucide-react";
import techImg from "@/assets/service-tech.jpg";
import { Reveal, RevealWords } from "@/components/Reveal";
import { MagneticButton } from "@/components/MagneticButton";
import { openLead } from "@/components/LeadFormSheet";

export const Route = createFileRoute("/service")({
  head: () => ({
    meta: [
      { title: "Authorized Service Center — Radio Repair Tashkent | Radiocom" },
      { name: "description", content: "Warranty and post-warranty repair for Motorola, Hytera and Vertex Standard radios. Original parts, certified technicians, fixed pricing." },
      { property: "og:title", content: "Authorized Service Center — Radiocom" },
      { property: "og:description", content: "Certified radio repair with original parts and fixed pricing in Tashkent." },
    ],
  }),
  component: ServicePage,
});

function ServicePage() {
  return (
    <>
      <Hero />
      <Advantages />
      <Flow />
      <Policy />
    </>
  );
}

function Hero() {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <section ref={ref} className="relative overflow-hidden pt-16 min-h-[90vh]">
      <div className="grid grid-cols-12 gap-6 px-6 md:px-10 pt-24 md:pt-32 pb-16">
        <div className="col-span-12 md:col-span-7">
          <Reveal>
            <div className="text-mono text-[11px] text-signal mb-8">{t("service.kicker")}</div>
          </Reveal>
          <h1 className="text-display text-[13vw] md:text-[10vw] leading-[0.85]">
            <RevealWords text={t("service.title_a")} />
            <span className="block text-signal">
              <RevealWords text={t("service.title_b")} stagger={0.06} />
            </span>
          </h1>
          <Reveal delay={0.6}>
            <p className="mt-12 max-w-lg text-cool text-lg leading-relaxed">{t("service.sub")}</p>
            <div className="mt-10">
              <MagneticButton onClick={() => openLead({ title: t("service.title_a") + " " + t("service.title_b") })}>
                Request repair
                <ArrowUpRight className="w-4 h-4" />
              </MagneticButton>
            </div>
          </Reveal>
        </div>

        <motion.div
          style={{ y }}
          className="col-span-12 md:col-span-5 relative"
        >
          <div className="aspect-[3/4] relative overflow-hidden">
            <img src={techImg} alt="Technician repairing radio circuit board" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute -inset-0.5 border border-signal pointer-events-none translate-x-3 translate-y-3" />
          </div>
          <div className="absolute -bottom-4 -left-4 bg-signal text-crisp text-mono text-[11px] px-4 py-3">
            +998 93 505-16-20
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Advantages() {
  const { t } = useTranslation();
  const keys = ["certified", "parts", "fast", "fixed"] as const;
  return (
    <section className="border-y hairline px-6 md:px-10 py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-crisp/10">
        {keys.map((k, i) => (
          <motion.div
            key={k}
            className="bg-pitch p-10 md:p-14 flex items-start gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
          >
            <div className="mt-2 h-10 w-10 rounded-full border-2 border-signal flex items-center justify-center shrink-0">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.5, type: "spring" }}
              >
                <Check className="w-5 h-5 text-signal" strokeWidth={2.5} />
              </motion.div>
            </div>
            <div>
              <div className="text-mono text-[11px] text-cool mb-2">0{i + 1}</div>
              <h3 className="text-display text-3xl md:text-4xl leading-tight">
                {t(`service.advantages.${k}`)}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Flow() {
  const { t } = useTranslation();
  const steps = t("service.flow", { returnObjects: true }) as string[];
  return (
    <section className="px-6 md:px-10 py-24">
      <Reveal>
        <div className="text-mono text-[11px] text-cool mb-10">/ PROCESS</div>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
        {steps.map((s, i) => (
          <motion.div
            key={s}
            className="relative p-8 border hairline overflow-hidden group"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
          >
            <div className="absolute inset-0 bg-signal origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            <div className="relative">
              <div className="text-mono text-[10px] text-signal group-hover:text-crisp mb-8">
                STEP · 0{i + 1}
              </div>
              <div className="text-display text-3xl md:text-4xl group-hover:text-crisp leading-tight">
                {s}
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 text-cool group-hover:text-crisp text-mono text-[10px]">
                  →
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Policy() {
  const { t } = useTranslation();
  const rows = t("service.policy", { returnObjects: true }) as Array<{ q: string; a: string }>;
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="border-t hairline px-6 md:px-10 py-24">
      <Reveal>
        <h2 className="text-display text-4xl md:text-6xl mb-12 max-w-3xl">
          {t("service.policy_title")}<span className="text-signal">.</span>
        </h2>
      </Reveal>
      <div>
        {rows.map((r, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="border-t hairline">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full text-left py-6 md:py-8 flex items-center justify-between gap-8 group"
              >
                <div className="flex items-center gap-6">
                  <span className="text-mono text-[10px] text-cool">0{i + 1}</span>
                  <span className="text-display text-2xl md:text-3xl group-hover:text-signal transition-colors">
                    {r.q}
                  </span>
                </div>
                <span className="text-signal shrink-0">
                  {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </span>
              </button>
              <motion.div
                initial={false}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <p className="text-cool text-base md:text-lg leading-relaxed pb-8 pl-14 max-w-3xl">
                  {r.a}
                </p>
              </motion.div>
            </div>
          );
        })}
        <div className="border-t hairline" />
      </div>
    </section>
  );
}

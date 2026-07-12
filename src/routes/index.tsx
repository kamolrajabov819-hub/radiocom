import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, Radio, HardHat, ShieldCheck } from "lucide-react";
import heroImg from "@/assets/hero-radio.jpg";
import horecaImg from "@/assets/industry-horeca.jpg";
import constructionImg from "@/assets/industry-construction.jpg";
import securityImg from "@/assets/industry-security.jpg";
import { MagneticButton } from "@/components/MagneticButton";
import { Reveal, RevealWords } from "@/components/Reveal";
import { openLead } from "@/components/LeadFormSheet";
import { BrandsStrip } from "@/components/BrandsStrip";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Radiocom — Professional Radio Systems in Uzbekistan" },
      { name: "description", content: "11 years. 10,000+ clients. Motorola, Hytera and PoC radios with authorized service, free testing and nationwide delivery." },
      { property: "og:title", content: "Radiocom — Professional Radio Systems in Uzbekistan" },
      { property: "og:description", content: "11 years. 10,000+ clients. Motorola, Hytera and PoC radios with authorized service, free testing and nationwide delivery." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Industries />
      <TradeIn />
      <Stats />
      <BrandsStrip />
    </>
  );
}

function Hero() {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden pt-16">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src={heroImg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-70 dark:opacity-70"
          width={1600}
          height={1200}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-pitch via-pitch/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-pitch via-transparent to-pitch/40" />
      </motion.div>

      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <div className="absolute inset-y-0 left-[8.33%] w-px bg-crisp/[0.04]" />
        <div className="absolute inset-y-0 left-1/2 w-px bg-crisp/[0.04]" />
        <div className="absolute inset-y-0 right-[8.33%] w-px bg-crisp/[0.04]" />
      </div>

      <div className="relative px-6 md:px-10 pt-16 md:pt-32 pb-24 min-h-screen flex flex-col justify-between">
        <div>
          <Reveal delay={0.1}>
            <div className="flex items-center gap-4 mb-8 md:mb-12">
              <span className="h-px w-8 md:w-12 bg-signal" />
              <span className="text-mono text-[11px] text-cool">{t("hero.eyebrow")}</span>
            </div>
          </Reveal>

          <h1 className="text-display text-[14vw] md:text-[11vw] leading-[0.85] tracking-tighter">
            <span className="block">
              <RevealWords text={t("hero.title_a")} />
            </span>
            <span className="block pl-[8vw] md:pl-[20vw] relative">
              <RevealWords text={t("hero.title_b")} stagger={0.06} />
              <span className="absolute -bottom-2 md:-bottom-4 left-[8vw] md:left-[20vw] h-1 md:h-2 w-[30vw] bg-signal origin-left scale-x-0 animate-[grow_1s_1.2s_forwards_ease-out]" />
            </span>
          </h1>

          <div className="mt-12 md:mt-24 grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-6 md:col-start-6">
              <Reveal delay={0.6}>
                <p className="text-cool text-base md:text-xl leading-relaxed">{t("hero.sub")}</p>
              </Reveal>
              <Reveal delay={0.8}>
                <div className="mt-8 md:mt-10 flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4">
                  <button
                    onClick={() => openLead({ title: t("hero.cta_primary") })}
                    className="w-full sm:w-auto signal-glow bg-signal text-crisp text-mono text-[12px] px-6 md:px-8 py-4 md:py-5 hover:bg-signal/90 transition-all flex items-center justify-center gap-3 min-h-14"
                  >
                    {t("hero.cta_primary")}
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                  <MagneticButton
                    variant="ghost"
                    onClick={() =>
                      document.getElementById("industries")?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    {t("hero.cta_secondary")}
                  </MagneticButton>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        <Reveal delay={1}>
          <div className="flex items-end justify-between mt-12">
            <div className="text-mono text-[10px] text-cool">[ 01 ] · TASHKENT · UZ</div>
            <div className="text-mono text-[10px] text-cool hidden md:block">SCROLL ↓</div>
          </div>
        </Reveal>
      </div>

      <style>{`@keyframes grow { to { transform: scaleX(1); } }`}</style>
    </section>
  );
}

function Marquee() {
  const { t } = useTranslation();
  const items = t("marquee", { returnObjects: true }) as string[];
  const all = [...items, ...items, ...items];
  return (
    <section className="border-y hairline overflow-hidden py-6 bg-charcoal">
      <div className="marquee-track flex gap-16 whitespace-nowrap">
        {all.map((s, i) => (
          <div key={i} className="flex items-center gap-16 text-mono text-sm text-crisp">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" />
            {s}
          </div>
        ))}
      </div>
    </section>
  );
}

function Industries() {
  const { t } = useTranslation();
  const rows = [
    { key: "horeca", img: horecaImg, Icon: Radio },
    { key: "construction", img: constructionImg, Icon: HardHat },
    { key: "security", img: securityImg, Icon: ShieldCheck },
  ] as const;
  const [hover, setHover] = useState<number | null>(null);

  return (
    <section id="industries" className="relative">
      <div className="px-6 md:px-10 pt-24 md:pt-32 pb-12 md:pb-16 grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-8">
          <Reveal>
            <div className="text-mono text-[11px] text-signal mb-4">{t("industries.kicker")}</div>
            <h2 className="text-display text-5xl md:text-7xl">
              {t("industries.title")}<span className="text-signal">.</span>
            </h2>
          </Reveal>
        </div>
        <div className="col-span-12 md:col-span-4 flex md:justify-end md:items-end">
          <Link to="/industries" className="text-mono text-[11px] text-signal border-b border-signal/50 hover:border-signal">
            → {t("industries.view_all")}
          </Link>
        </div>
      </div>

      <div className="relative">
        {rows.map((r, i) => {
          const name = t(`industries.${r.key}.name`);
          const desc = t(`industries.${r.key}.desc`);
          return (
            <Link
              key={r.key}
              to="/industries/$slug"
              params={{ slug: r.key }}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              className="relative border-t hairline group cursor-pointer overflow-hidden block"
            >
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={false}
                animate={{ opacity: hover === i ? 1 : 0 }}
                transition={{ duration: 0.6 }}
              >
                <img src={r.img} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-pitch/60" />
              </motion.div>

              <div className="relative px-6 md:px-10 py-8 md:py-14 grid grid-cols-12 gap-4 md:gap-6 items-center">
                <div className="col-span-2 md:col-span-1 text-mono text-[11px] text-cool">0{i + 1}</div>
                <div className="col-span-10 md:col-span-4 flex items-center gap-4 md:gap-6 min-w-0">
                  <r.Icon className={`w-5 h-5 md:w-6 md:h-6 shrink-0 transition-colors ${hover === i ? "text-signal" : "text-cool"}`} />
                  <h3 className="text-display text-3xl md:text-6xl transition-transform group-hover:translate-x-3 truncate">
                    {name}
                  </h3>
                </div>
                <div className="col-span-12 md:col-span-6 md:col-start-7">
                  <p className="text-cool text-sm md:text-lg max-w-md">{desc}</p>
                </div>
                <div className="col-span-12 md:col-span-1 flex md:justify-end">
                  <ArrowUpRight className={`w-6 h-6 transition-all ${hover === i ? "text-signal rotate-0" : "text-cool -rotate-45"}`} />
                </div>
              </div>
            </Link>
          );
        })}
        <div className="border-t hairline" />
      </div>
    </section>
  );
}

function TradeIn() {
  const { t } = useTranslation();
  return (
    <section id="tradein" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0">
        <div className="absolute inset-y-0 right-0 w-full md:w-1/2 bg-signal opacity-90 md:opacity-100" />
      </div>
      <div className="relative px-6 md:px-10 grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-6">
          <Reveal>
            <div className="text-mono text-[11px] text-signal mb-6">{t("tradein.kicker")}</div>
          </Reveal>
          <h2 className="text-display text-4xl sm:text-5xl md:text-8xl leading-[0.9]">
            <RevealWords text={t("tradein.title_a")} />
            <span className="block text-crisp md:text-signal">
              <RevealWords text={t("tradein.title_b")} />
            </span>
          </h2>
          <Reveal delay={0.4}>
            <p className="text-cool text-base md:text-lg max-w-md mt-8 md:mt-10">{t("tradein.desc")}</p>
            <div className="mt-8 md:mt-10">
              <MagneticButton onClick={() => openLead({ title: t("tradein.cta") })}>
                {t("tradein.cta")}
                <ArrowUpRight className="w-4 h-4" />
              </MagneticButton>
            </div>
          </Reveal>
        </div>
        <div className="col-span-12 md:col-span-6 relative min-h-[280px] md:min-h-[380px] flex items-center justify-center">
          <TradeInGraphic />
        </div>
      </div>
    </section>
  );
}

function TradeInGraphic() {
  return (
    <div className="relative w-full max-w-md aspect-square">
      <motion.div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-32 md:w-40 h-44 md:h-56"
        initial={{ opacity: 0, x: -30, rotate: -12 }}
        whileInView={{ opacity: 1, x: 0, rotate: -8 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-full h-full bg-pitch/80 border-2 border-crisp/40 relative">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-14 bg-crisp/40" />
          <div className="absolute top-16 left-3 right-3 h-14 bg-crisp/10 border border-crisp/20" />
          <div className="absolute inset-x-3 bottom-3 grid grid-cols-3 gap-1">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="aspect-square bg-crisp/10 border border-crisp/20" />
            ))}
          </div>
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <path d="M 20 15 L 45 35 L 30 50 L 55 65 L 40 85" stroke="var(--signal)" strokeWidth="1.5" fill="none" />
          </svg>
        </div>
      </motion.div>

      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-36 md:w-44 h-48 md:h-60"
        initial={{ opacity: 0, x: 30, rotate: 15 }}
        whileInView={{ opacity: 1, x: 0, rotate: 6 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="w-full h-full bg-crisp text-pitch relative shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-12 bg-pitch" />
          <div className="absolute top-16 left-3 right-3 h-12 bg-signal/90" />
          <div className="absolute inset-x-3 bottom-3 grid grid-cols-3 gap-1">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="aspect-square bg-pitch/80" />
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-pitch border border-signal flex items-center justify-center text-signal text-mono text-[10px]">↔</div>
      </motion.div>
    </div>
  );
}

function Stats() {
  const { t } = useTranslation();
  const items = [
    { n: "35", label: t("stats.types") },
    { n: "10K+", label: t("stats.clients") },
    { n: "11", label: t("stats.years") },
  ];
  return (
    <section className="border-t hairline">
      <div className="px-6 md:px-10 grid grid-cols-1 md:grid-cols-3">
        {items.map((it, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div className={`py-12 md:py-24 px-2 ${i < 2 ? "md:border-r hairline" : ""} border-b md:border-b-0 hairline`}>
              <div className="text-display text-7xl md:text-9xl text-crisp">{it.n}</div>
              <div className="text-mono text-[11px] text-cool mt-4">{it.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

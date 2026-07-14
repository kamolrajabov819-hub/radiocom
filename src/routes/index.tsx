import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { ChevronRight, Repeat, ShieldCheck, Truck, Wrench, Package, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-radio.jpg";
import horecaImg from "@/assets/industry-horeca.jpg";
import constructionImg from "@/assets/industry-construction.jpg";
import securityImg from "@/assets/industry-security.jpg";
import { openLead } from "@/components/LeadFormSheet";
import { BrandsStrip } from "@/components/BrandsStrip";
import { products, formatPrice } from "@/data/products";
import { spring } from "@/lib/springs";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Radiocom — Professional Radio Systems in Uzbekistan" },
      { name: "description", content: "Pro communication. Unbreakable. 11 years, 10,000+ clients. Motorola, Hytera, PoC — authorized service and free testing across Uzbekistan." },
      { property: "og:title", content: "Radiocom — Pro Communication. Unbreakable." },
      { property: "og:description", content: "Motorola, Hytera and PoC radios with authorized service, free testing and nationwide delivery." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <FeatureDark />
      <Bento />
      <IndustriesTeaser />
      <FeaturedCatalog />
      <BrandsStrip />
      <FinalCta />
    </>
  );
}

/* ─── Hero ───────────────────────────────────────────────── */
function Hero() {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  return (
    <section ref={ref} className="pt-24 md:pt-28 pb-0 bg-pitch overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={spring}
          className="headline-hero text-crisp"
        >
          {t("home.hero.title")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.1 }}
          className="subhead mt-5 text-lg md:text-2xl max-w-3xl mx-auto"
        >
          {t("home.hero.sub")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.2 }}
          className="mt-8 flex items-center justify-center gap-2 md:gap-4 flex-wrap"
        >
          <button onClick={() => openLead({ title: t("home.hero.cta_primary") })} className="pill pill-accent">
            {t("home.hero.cta_primary")}
          </button>
          <Link to="/catalog" className="pill-link">
            {t("home.hero.cta_secondary")} <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>

      <motion.div
        style={{ scale, opacity }}
        className="mt-16 md:mt-20 relative w-full h-[60vh] md:h-[80vh]"
      >
        <img src={heroImg} alt="" className="w-full h-full object-cover" />
      </motion.div>
    </section>
  );
}

/* ─── Dark feature strip ─────────────────────────────────── */
function FeatureDark() {
  const { t } = useTranslation();
  return (
    <section className="bg-black text-white py-24 md:py-40 text-center px-6 overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={spring}
        className="headline text-white mx-auto max-w-4xl"
        style={{ fontSize: "clamp(2.25rem, 6vw, 4.5rem)" }}
      >
        {t("home.feature.title")}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ ...spring, delay: 0.1 }}
        className="mt-5 text-lg md:text-xl text-white/60 max-w-2xl mx-auto"
      >
        {t("home.feature.sub")}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ ...spring, delay: 0.15 }}
        className="mt-8 flex items-center justify-center gap-6 flex-wrap"
      >
        <Link to="/catalog" className="pill pill-primary" style={{ background: "#fff", color: "#000" }}>
          {t("home.hero.cta_secondary")}
        </Link>
        <Link to="/poc" className="text-signal text-[15px] inline-flex items-center gap-1">
          {t("home.feature.link")} <ChevronRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </section>
  );
}

/* ─── Bento grid ─────────────────────────────────────────── */
function Bento() {
  const { t } = useTranslation();
  const items = [
    { key: "tradein", Icon: Repeat, span: "md:col-span-2 md:row-span-2", size: "large" },
    { key: "models", Icon: Package, span: "" },
    { key: "warranty", Icon: ShieldCheck, span: "" },
    { key: "delivery", Icon: Truck, span: "" },
    { key: "test", Icon: Sparkles, span: "" },
    { key: "service", Icon: Wrench, span: "md:col-span-2" },
  ] as const;

  return (
    <section className="section bg-pitch px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={spring}
          className="text-center mb-14"
        >
          <h2 className="headline text-crisp text-4xl md:text-6xl">{t("home.bento.title")}</h2>
          <p className="subhead mt-4 text-lg max-w-2xl mx-auto">{t("home.bento.sub")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[220px] md:auto-rows-[240px] gap-4">
          {items.map((it, i) => (
            <motion.div
              key={it.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ ...spring, delay: i * 0.05 }}
              className={`bento-card p-8 flex flex-col justify-between ${it.span}`}
            >
              <div>
                <it.Icon className="w-6 h-6 text-signal" strokeWidth={1.75} />
                <h3 className={`headline text-crisp mt-4 ${it.key === "tradein" ? "text-3xl md:text-5xl" : "text-2xl md:text-3xl"}`}>
                  {t(`home.bento.${it.key}.title`)}
                </h3>
              </div>
              <p className="subhead text-[15px] mt-4 max-w-md">{t(`home.bento.${it.key}.sub`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Industries teaser ─────────────────────────────────── */
function IndustriesTeaser() {
  const { t } = useTranslation();
  const items = [
    { slug: "horeca" as const, img: horecaImg },
    { slug: "construction" as const, img: constructionImg },
    { slug: "security" as const, img: securityImg },
  ];
  return (
    <section className="section bg-charcoal px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={spring}
          className="text-center mb-14"
        >
          <h2 className="headline text-crisp text-4xl md:text-6xl">{t("industries.title")}</h2>
          <p className="subhead mt-4 text-lg">{t("industries.overview_sub")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((it, i) => (
            <motion.div
              key={it.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ ...spring, delay: i * 0.08 }}
            >
              <Link
                to="/industries/$slug"
                params={{ slug: it.slug }}
                className="block bg-pitch rounded-3xl overflow-hidden group"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={it.img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[900ms]" />
                </div>
                <div className="p-6">
                  <h3 className="headline text-2xl text-crisp">{t(`industries.${it.slug}.name`)}</h3>
                  <p className="subhead text-[15px] mt-2 line-clamp-2">{t(`industries.${it.slug}.desc`)}</p>
                  <div className="mt-4 text-signal text-[14px] inline-flex items-center gap-1">
                    {t("industries.cta")} <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/industries" className="pill-link">
            {t("industries.view_all")} <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Featured catalog ──────────────────────────────────── */
function FeaturedCatalog() {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language.slice(0, 2) as "ru" | "en" | "uz") || "ru";
  const featured = ["m-dp4400", "c-e690", "h-s35-pro-lf", "rc-21"]
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as typeof products;

  return (
    <section className="section bg-pitch px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={spring}
          className="flex items-end justify-between mb-10"
        >
          <h2 className="headline text-crisp text-4xl md:text-5xl">{t("home.featured.title")}</h2>
          <Link to="/catalog" className="pill-link">
            {t("home.featured.link")} <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featured.map((p, i) => (
            <motion.button
              key={p.id}
              onClick={() => openLead({ product: p.name })}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ ...spring, delay: i * 0.06 }}
              className="bento-card p-6 md:p-8 text-left group"
            >
              <div className="aspect-square flex items-center justify-center mb-6">
                <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="text-[12px] text-cool">{p.brand}</div>
              <h3 className="text-[15px] md:text-base font-semibold text-crisp mt-1 leading-tight">{p.name}</h3>
              <div className="text-[13px] text-cool mt-1">{formatPrice(p.price, lang)}</div>
              <div className="text-signal text-[13px] mt-3 inline-flex items-center gap-1">
                {t("product.cta")} <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Final CTA ────────────────────────────────────────── */
function FinalCta() {
  const { t } = useTranslation();
  return (
    <section className="bg-black text-white py-24 md:py-40 px-6 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={spring}
        className="headline text-white mx-auto max-w-3xl"
        style={{ fontSize: "clamp(2.25rem, 6vw, 4.5rem)" }}
      >
        {t("home.final_cta.title")}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ ...spring, delay: 0.1 }}
        className="mt-4 text-lg text-white/60 max-w-2xl mx-auto"
      >
        {t("home.final_cta.sub")}
      </motion.p>
      <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
        <button
          onClick={() => openLead({ title: t("home.final_cta.button") })}
          className="pill"
          style={{ background: "#fff", color: "#000" }}
        >
          {t("home.final_cta.button")}
        </button>
        <Link to="/service" className="text-signal text-[15px] inline-flex items-center gap-1">
          {t("nav.service")} <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

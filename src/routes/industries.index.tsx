import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { INDUSTRY_SLUGS } from "@/data/industries";
import { Reveal, RevealWords } from "@/components/Reveal";
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

export const Route = createFileRoute("/industries/")({
  head: () => ({
    meta: [
      { title: "Industries — Radiocom Uzbekistan" },
      { name: "description", content: "Turnkey radio systems for HoReCa, Construction, Security, Mining, Transport and Manufacturing." },
      { property: "og:title", content: "Industries — Radiocom" },
      { property: "og:description", content: "Radio solutions engineered for 6 industries in Uzbekistan." },
    ],
  }),
  component: IndustriesOverview,
});

function IndustriesOverview() {
  const { t } = useTranslation();
  return (
    <>
      <section className="pt-32 md:pt-40 px-6 md:px-10 pb-16">
        <Reveal><div className="text-mono text-[11px] text-signal mb-6">/ INDUSTRIES</div></Reveal>
        <h1 className="text-display text-6xl md:text-[10vw] leading-[0.9]">
          <RevealWords text={t("industries.title")} />
          <span className="text-signal">.</span>
        </h1>
        <Reveal delay={0.3}>
          <p className="mt-10 max-w-2xl text-cool text-lg leading-relaxed">{t("industries.overview_sub")}</p>
        </Reveal>
      </section>

      <section className="border-t hairline grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-crisp/10">
        {INDUSTRY_SLUGS.map((s, i) => (
          <motion.div
            key={s}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 6) * 0.08, duration: 0.5 }}
          >
            <Link
              to="/industries/$slug"
              params={{ slug: s }}
              className="relative block overflow-hidden bg-charcoal aspect-[4/5] group"
            >
              <img src={IMAGES[s]} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-pitch via-pitch/40 to-transparent" />
              <div className="relative h-full flex flex-col justify-between p-8">
                <div className="text-mono text-[11px] text-cool">0{i + 1}</div>
                <div>
                  <h2 className="text-display text-4xl md:text-5xl text-crisp mb-4 group-hover:text-signal transition-colors">
                    {t(`industries.${s}.name`)}
                  </h2>
                  <div className="flex items-center gap-2 text-mono text-[11px] text-signal">
                    {t("industries.cta")} <ArrowUpRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </section>
    </>
  );
}

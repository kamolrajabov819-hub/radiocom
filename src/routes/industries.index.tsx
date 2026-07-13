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
        <h1 className="text-display leading-[0.9]" style={{ fontSize: "clamp(3rem, 10vw, 9rem)" }}>
          <RevealWords text={t("industries.title")} />
          <span className="text-signal">.</span>
        </h1>
        <Reveal delay={0.3}>
          <p className="mt-10 max-w-2xl text-cool text-lg leading-relaxed">{t("industries.overview_sub")}</p>
        </Reveal>
      </section>

      <section className="border-t hairline grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-crisp/10">
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
              className="relative block overflow-hidden bg-charcoal min-h-[380px] sm:min-h-[440px] group"
            >
              <img src={IMAGES[s]} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-pitch via-pitch/60 to-transparent" />
              <div className="relative h-full min-h-[380px] sm:min-h-[440px] flex flex-col justify-between p-6 md:p-8">
                <div className="text-mono text-[11px] text-cool">0{i + 1}</div>
                <div>
                  <h2
                    className="text-display text-crisp mb-4 group-hover:text-signal transition-colors break-words hyphens-auto leading-[0.95]"
                    style={{
                      fontSize: "clamp(1.75rem, 5.5vw, 3rem)",
                      hyphens: "auto",
                      overflowWrap: "anywhere",
                    }}
                  >
                    {t(`industries.${s}.name`)}
                  </h2>
                  <p className="text-cool text-sm max-w-xs mb-5 line-clamp-2">
                    {t(`industries.${s}.desc`)}
                  </p>
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

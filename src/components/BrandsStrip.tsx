import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { products } from "@/data/products";

const brands = ["Motorola", "Hytera", "Radiocom RC", "Decross", "Baofeng", "Alinco", "Samcom", "Caltta"] as const;

function BrandMark({ name }: { name: string }) {
  // stylized wordmark using our display font
  return (
    <div className="text-display text-2xl md:text-3xl tracking-tighter whitespace-nowrap">
      {name.toUpperCase()}
    </div>
  );
}

export function BrandsStrip() {
  const { t } = useTranslation();
  return (
    <section className="border-t hairline px-6 md:px-10 py-16 md:py-24">
      <div className="text-mono text-[11px] text-cool mb-10">{t("brands_title")}</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-crisp/10">
        {brands.map((b, i) => {
          const count = products.filter((p) => p.brand === b).length;
          return (
            <motion.div
              key={b}
              className="relative bg-pitch p-8 md:p-10 [perspective:1000px] group cursor-default min-h-[120px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
            >
              <motion.div
                className="relative w-full h-full [transform-style:preserve-3d] transition-transform duration-700"
                whileHover={{ rotateY: 180 }}
              >
                <div className="absolute inset-0 flex items-center justify-center [backface-visibility:hidden] text-crisp/80 group-hover:text-signal transition-colors">
                  <BrandMark name={b} />
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)] bg-signal text-crisp">
                  <div className="text-display text-4xl">{count > 0 ? count : "—"}</div>
                  <div className="text-mono text-[10px] mt-2 opacity-80">{t("brands.models")}</div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

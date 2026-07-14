import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { products } from "@/data/products";

const brands = ["Motorola", "Hytera", "Radiocom RC", "Decross", "Caltta", "Baofeng", "Alinco", "Samcom"] as const;

export function BrandsStrip() {
  const { t } = useTranslation();
  return (
    <section className="section-tight px-6 md:px-10 bg-pitch">
      <div className="max-w-[1200px] mx-auto text-center">
        <div className="text-[13px] text-cool mb-10">{t("brands_title")}</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
          {brands.map((b, i) => {
            const count = products.filter((p) => p.brand === b).length;
            return (
              <motion.div
                key={b}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="flex flex-col items-center justify-center"
              >
                <div className="text-xl md:text-2xl font-semibold tracking-tight text-crisp opacity-80 hover:opacity-100 transition-opacity">
                  {b}
                </div>
                {count > 0 && (
                  <div className="text-[11px] text-cool mt-1">{count} {t("brands.models")}</div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

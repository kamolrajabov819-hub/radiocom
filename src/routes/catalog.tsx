import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Check, X } from "lucide-react";
import { products, categoryLabels, allBrands, type Brand, type Category, type Product } from "@/data/products";
import { openLead } from "@/components/LeadFormSheet";
import { Reveal, RevealWords } from "@/components/Reveal";

export const Route = createFileRoute("/catalog")({
  head: () => ({
    meta: [
      { title: "Catalog — Motorola, Hytera, PoC & Amateur Radios | Radiocom" },
      { name: "description", content: "Filterable multi-brand catalog: professional and amateur radios, PoC devices, accessories, PDAs and baby monitors. Request a tailored quote." },
      { property: "og:title", content: "Radiocom Catalog — Multi-brand radio systems" },
      { property: "og:description", content: "Professional and amateur radios from Motorola, Hytera, Baofeng and more." },
    ],
  }),
  component: CatalogPage,
});

const featureChips = ["GPS", "Bluetooth", "IP67", "IP68", "PoC", "DMR"] as const;

function CatalogPage() {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language.slice(0, 2) as "ru" | "en" | "uz") || "ru";
  const [cat, setCat] = useState<Category | null>(null);
  const [brand, setBrand] = useState<Brand | null>(null);
  const [features, setFeatures] = useState<string[]>([]);
  const [selected, setSelected] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (cat && p.category !== cat) return false;
      if (brand && p.brand !== brand) return false;
      if (features.length && !features.every((f) => p.tags.some((t) => t.toLowerCase().includes(f.toLowerCase())))) return false;
      return true;
    });
  }, [cat, brand, features]);

  const toggleFeature = (f: string) =>
    setFeatures((v) => (v.includes(f) ? v.filter((x) => x !== f) : [...v, f]));

  const clear = () => { setCat(null); setBrand(null); setFeatures([]); };

  return (
    <>
      <section className="pt-32 md:pt-40 px-6 md:px-10 pb-16">
        <Reveal>
          <div className="text-mono text-[11px] text-signal mb-6">/ CATALOG</div>
        </Reveal>
        <h1 className="text-display text-6xl md:text-[11vw] leading-[0.9]">
          <RevealWords text={t("catalog.title_a")} />
          <span className="block text-signal">
            <RevealWords text={t("catalog.title_b")} />
          </span>
        </h1>
        <Reveal delay={0.4}>
          <p className="mt-10 max-w-2xl text-cool text-lg leading-relaxed">{t("catalog.sub")}</p>
        </Reveal>
      </section>

      <section className="border-t hairline px-6 md:px-10 py-10 grid grid-cols-12 gap-8 md:gap-12">
        {/* Sidebar */}
        <aside className="col-span-12 md:col-span-3 lg:col-span-3">
          <div className="md:sticky md:top-24 space-y-8">
            <div className="flex items-baseline justify-between">
              <div className="text-mono text-[11px] text-cool">{t("catalog.filters")}</div>
              <button onClick={clear} className="text-mono text-[10px] text-signal hover:underline">
                {t("catalog.clear")}
              </button>
            </div>

            <FilterGroup title={t("catalog.categories")}>
              {(Object.keys(categoryLabels) as Category[]).map((c) => (
                <FilterRow key={c} active={cat === c} onClick={() => setCat(cat === c ? null : c)}>
                  {categoryLabels[c][lang]}
                </FilterRow>
              ))}
            </FilterGroup>

            <FilterGroup title={t("catalog.brands")}>
              {allBrands.map((b) => (
                <FilterRow key={b} active={brand === b} onClick={() => setBrand(brand === b ? null : b)}>
                  {b}
                </FilterRow>
              ))}
            </FilterGroup>

            <FilterGroup title={t("catalog.features")}>
              <div className="flex flex-wrap gap-2">
                {featureChips.map((f) => {
                  const on = features.includes(f);
                  return (
                    <button
                      key={f}
                      onClick={() => toggleFeature(f)}
                      className={`text-mono text-[10px] px-3 py-1.5 border transition-colors ${
                        on ? "bg-signal border-signal text-crisp" : "border-crisp/20 text-cool hover:text-crisp hover:border-crisp/50"
                      }`}
                    >
                      ✓ {f}
                    </button>
                  );
                })}
              </div>
            </FilterGroup>

            <div className="text-mono text-[10px] text-cool pt-4 border-t hairline">
              {filtered.length.toString().padStart(2, "0")} {t("catalog.results")}
            </div>
          </div>
        </aside>

        {/* Grid */}
        <div className="col-span-12 md:col-span-9 lg:col-span-9">
          {filtered.length === 0 ? (
            <div className="py-32 text-center text-cool text-mono text-sm">{t("catalog.empty")}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-crisp/10">
              {filtered.map((p, i) => (
                <ProductCard key={p.id} p={p} lang={lang} idx={i} onOpen={() => setSelected(p)} />
              ))}
            </div>
          )}
        </div>
      </section>

      <ProductPanel product={selected} lang={lang} onClose={() => setSelected(null)} />
    </>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-mono text-[10px] text-cool mb-3">{title}</div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function FilterRow({
  active, onClick, children,
}: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left text-sm py-1.5 flex items-center justify-between group transition-colors ${
        active ? "text-signal" : "text-crisp/80 hover:text-crisp"
      }`}
    >
      <span>{children}</span>
      <span className={`h-1 w-1 rounded-full transition-colors ${active ? "bg-signal" : "bg-transparent group-hover:bg-cool"}`} />
    </button>
  );
}

function ProductCard({
  p, lang, idx, onOpen,
}: { p: Product; lang: "ru" | "en" | "uz"; idx: number; onOpen: () => void }) {
  return (
    <motion.button
      onClick={onOpen}
      className="relative bg-charcoal p-8 text-left group overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: (idx % 6) * 0.06 }}
    >
      <div className="absolute inset-0 bg-signal origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
      <div className="relative">
        <div className="flex items-start justify-between mb-6">
          <div className="text-mono text-[10px] text-cool group-hover:text-crisp">{p.brand}</div>
          <ArrowUpRight className="w-4 h-4 text-cool group-hover:text-crisp -rotate-45 group-hover:rotate-0 transition-transform" />
        </div>
        <div className="aspect-[3/4] flex items-center justify-center mb-6 overflow-hidden">
          <img
            src={p.image}
            alt={p.name}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
        </div>
        <h3 className="text-display text-2xl leading-tight mb-3 group-hover:text-crisp">
          {p.name}
        </h3>
        <div className="text-mono text-[10px] text-cool group-hover:text-crisp/80 mb-4">
          {categoryLabels[p.category][lang]}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {p.tags.map((tg) => (
            <span key={tg} className="text-mono text-[9px] px-2 py-1 border border-crisp/15 group-hover:border-crisp/40">
              ✓ {tg}
            </span>
          ))}
        </div>
      </div>
    </motion.button>
  );
}

function ProductPanel({
  product, lang, onClose,
}: { product: Product | null; lang: "ru" | "en" | "uz"; onClose: () => void }) {
  const { t } = useTranslation();
  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[90]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-pitch/80 backdrop-blur-sm" onClick={onClose} />
          <motion.aside
            className="absolute right-0 top-0 h-full w-full max-w-[640px] bg-charcoal border-l hairline overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.5 }}
          >
            <div className="p-8 md:p-12">
              <div className="flex items-start justify-between mb-8">
                <div className="text-mono text-[11px] text-signal">{product.brand}</div>
                <button onClick={onClose} className="text-cool hover:text-signal">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="aspect-[4/3] bg-pitch flex items-center justify-center mb-8">
                <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" />
              </div>
              <h2 className="text-display text-4xl md:text-5xl leading-tight mb-3">{product.name}</h2>
              <div className="text-mono text-[11px] text-cool mb-6">{categoryLabels[product.category][lang]}</div>
              <p className="text-cool leading-relaxed mb-8">{product.blurb}</p>

              <div className="text-mono text-[10px] text-cool mb-4">{t("product.spec")}</div>
              <dl className="border-t hairline mb-8">
                <SpecRow label={t("product.band")} val={product.band} />
                <SpecRow label={t("product.range")} val={product.range} />
                <SpecRow label={t("product.battery")} val={product.battery} />
                <SpecRow label={t("product.protection")} val={product.protection} />
              </dl>

              <div className="text-mono text-[10px] text-cool mb-3">{t("product.features")}</div>
              <div className="flex flex-wrap gap-2 mb-10">
                {product.tags.map((tg) => (
                  <span key={tg} className="text-mono text-[10px] text-crisp px-3 py-1.5 border border-crisp/20 flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-signal" /> {tg}
                  </span>
                ))}
              </div>

              <button
                onClick={() => {
                  onClose();
                  setTimeout(() => openLead({ product: product.name }), 350);
                }}
                className="w-full bg-signal text-crisp text-mono text-[13px] py-4 hover:bg-signal/90 flex items-center justify-center gap-3 transition-colors"
              >
                {t("product.cta")} <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SpecRow({ label, val }: { label: string; val: string }) {
  return (
    <div className="grid grid-cols-3 border-b hairline py-3">
      <dt className="text-mono text-[10px] text-cool col-span-1">{label}</dt>
      <dd className="text-sm text-crisp col-span-2">{val}</dd>
    </div>
  );
}

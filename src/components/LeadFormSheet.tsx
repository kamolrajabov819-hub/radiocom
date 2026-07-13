import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RadarLoader } from "./RadarLoader";
import { X } from "lucide-react";

type Ctx = { open: boolean; title?: string; product?: string };
let listeners: Array<(c: Ctx) => void> = [];
let state: Ctx = { open: false };

export function openLead(opts: { title?: string; product?: string } = {}) {
  state = { open: true, ...opts };
  listeners.forEach((l) => l(state));
}
function closeLead() {
  state = { ...state, open: false };
  listeners.forEach((l) => l(state));
}

export function LeadFormSheet() {
  const { t } = useTranslation();
  const [ctx, setCtx] = useState<Ctx>(state);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const l = (c: Ctx) => setCtx({ ...c });
    listeners.push(l);
    return () => {
      listeners = listeners.filter((x) => x !== l);
    };
  }, []);

  useEffect(() => {
    if (!ctx.open) {
      const t = setTimeout(() => setSent(false), 400);
      return () => clearTimeout(t);
    }
  }, [ctx.open]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log("[lead]", { ...data, product: ctx.product });
    await new Promise((r) => setTimeout(r, 900));
    setSending(false);
    setSent(true);
  };

  return (
    <AnimatePresence>
      {ctx.open && (
        <motion.div
          className="fixed inset-0 z-[100]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-pitch/80 backdrop-blur-sm" onClick={closeLead} />
          <motion.aside
            className="absolute right-0 top-0 h-full w-full max-w-[520px] bg-charcoal border-l hairline overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.5 }}
          >
            <div className="p-8 md:p-12">
              <div className="flex items-start justify-between mb-10">
                <div>
                  <div className="text-mono text-[11px] text-signal mb-3">{ctx.title ?? t("form.title")}</div>
                  <h2 className="text-display text-4xl">{t("form.title")}</h2>
                </div>
                <button onClick={closeLead} className="text-cool hover:text-signal p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {sent ? (
                <div className="py-16">
                  <RadarLoader size={48} />
                  <p className="mt-8 text-mono text-[13px] text-signal">{t("form.success")}</p>
                </div>
              ) : (
                <>
                  <p className="text-cool text-sm mb-8 leading-relaxed">{t("form.sub")}</p>
                  {ctx.product && (
                    <div className="mb-6 border hairline px-4 py-3 text-mono text-[11px] text-cool">
                      → {ctx.product}
                    </div>
                  )}
                  <form onSubmit={submit} className="space-y-5">
                    <Field name="name" label={t("form.name")} required />
                    <Field name="company" label={t("form.company")} />
                    <Field name="phone" label={t("form.phone")} required type="tel" />
                    <Field name="qty" label={t("form.qty")} type="number" />
                    <Field name="message" label={t("form.message")} textarea />
                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full mt-4 bg-signal text-crisp text-mono text-[13px] py-4 hover:bg-signal/90 transition-colors flex items-center justify-center gap-3 disabled:opacity-70"
                    >
                      {sending ? <RadarLoader size={16} /> : null}
                      {t("form.submit")}
                    </button>
                    <div className="text-center text-mono text-[10px] text-cool mt-3">
                      {t("form.trust_line")}
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  name, label, required, type = "text", textarea,
}: { name: string; label: string; required?: boolean; type?: string; textarea?: boolean }) {
  return (
    <label className="block group">
      <span className="text-mono text-[10px] text-cool block mb-2">
        {label}{required && <span className="text-signal ml-1">*</span>}
      </span>
      {textarea ? (
        <textarea
          name={name}
          rows={3}
          className="w-full bg-transparent border-b hairline border-crisp/20 focus:border-signal outline-none py-2 text-sm text-crisp transition-colors resize-none"
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          className="w-full bg-transparent border-b hairline border-crisp/20 focus:border-signal outline-none py-2 text-sm text-crisp transition-colors"
        />
      )}
    </label>
  );
}

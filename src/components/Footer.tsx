import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t hairline mt-32">
      <div className="px-6 md:px-10 py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2.5">
            <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
              <path d="M4 20 A10 10 0 0 1 24 20" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
              <path d="M7.5 20 A6.5 6.5 0 0 1 20.5 20" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
              <circle cx="14" cy="20" r="3" fill="var(--signal)" />
            </svg>
            <span className="text-display text-2xl">RADIOCOM</span>
          </div>
          <p className="text-cool text-sm mt-6 max-w-md leading-relaxed">
            {t("footer.address")}
          </p>
          <p className="text-mono text-[11px] text-cool mt-4">{t("footer.hours")}</p>
        </div>

        <div className="md:col-span-3">
          <div className="text-mono text-[10px] text-cool mb-4">CONTACT</div>
          <ul className="space-y-2 text-sm">
            <li><a href="tel:+998781131618" className="hover:text-signal">+998 78 113-16-18</a></li>
            <li><a href="tel:+998933870710" className="hover:text-signal">+998 93 387-07-10</a></li>
            <li><a href="tel:+998935050719" className="hover:text-signal">+998 93 505-07-19</a></li>
            <li className="pt-2"><a href="mailto:info@radiocom.uz" className="hover:text-signal">info@radiocom.uz</a></li>
            <li><a href="mailto:sales@radiocom.uz" className="hover:text-signal">sales@radiocom.uz</a></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <div className="text-mono text-[10px] text-cool mb-4">NAVIGATE</div>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            <li><Link to="/" className="hover:text-signal">{t("nav.home")}</Link></li>
            <li><Link to="/catalog" className="hover:text-signal">{t("nav.catalog")}</Link></li>
            <li><Link to="/poc" className="hover:text-signal">{t("nav.poc")}</Link></li>
            <li><Link to="/service" className="hover:text-signal">{t("nav.service")}</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t hairline px-6 md:px-10 py-6 flex flex-wrap items-center justify-between gap-4">
        <div className="text-mono text-[10px] text-cool">{t("footer.rights")}</div>
        <div className="text-mono text-[10px] text-cool flex items-center gap-3">
          <span className="h-1 w-1 rounded-full bg-signal" />
          MOTOROLA · HYTERA · VERTEX STANDARD · RADIOCOM RC
        </div>
      </div>
    </footer>
  );
}

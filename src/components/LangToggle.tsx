import { useTranslation } from "react-i18next";

const langs = ["ru", "uz", "en"] as const;

export function LangToggle() {
  const { i18n } = useTranslation();
  const current = i18n.language.slice(0, 2);

  const change = (l: string) => {
    i18n.changeLanguage(l);
    if (typeof window !== "undefined") localStorage.setItem("radiocom-lang", l);
  };

  return (
    <div className="text-[12px] flex items-center rounded-full bg-charcoal p-0.5">
      {langs.map((l) => (
        <button
          key={l}
          onClick={() => change(l)}
          className={`px-2.5 py-1 rounded-full transition-colors ${
            current === l ? "bg-pitch text-crisp shadow-sm" : "text-cool hover:text-crisp"
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

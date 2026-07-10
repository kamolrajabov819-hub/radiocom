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
    <div className="text-mono text-[11px] flex items-center gap-0 border border-crisp/15 rounded-full overflow-hidden">
      {langs.map((l, i) => (
        <button
          key={l}
          onClick={() => change(l)}
          className={`px-2.5 py-1 transition-colors ${
            current === l
              ? "bg-signal text-crisp"
              : "text-cool hover:text-crisp"
          } ${i > 0 ? "border-l border-crisp/15" : ""}`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

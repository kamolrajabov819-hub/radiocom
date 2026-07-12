import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { applyTheme, getInitialTheme, type Theme } from "@/lib/theme";

export function ThemeToggle() {
  const { t } = useTranslation();
  const [theme, setTheme] = useState<Theme>("dark");
  useEffect(() => { setTheme(getInitialTheme()); }, []);
  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  };
  const isDark = theme === "dark";
  return (
    <button
      onClick={toggle}
      aria-label={isDark ? t("nav.theme_light") : t("nav.theme_dark")}
      className="h-8 w-8 flex items-center justify-center border border-crisp/15 rounded-full text-cool hover:text-signal hover:border-signal transition-colors"
    >
      {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
    </button>
  );
}

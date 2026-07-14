import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { applyTheme, getInitialTheme, type Theme } from "@/lib/theme";

export function ThemeToggle() {
  const { t } = useTranslation();
  const [theme, setTheme] = useState<Theme>("light");
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
      className="h-8 w-8 flex items-center justify-center rounded-full text-crisp/80 hover:text-crisp hover:bg-charcoal transition-colors"
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}

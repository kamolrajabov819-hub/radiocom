export type Theme = "dark" | "light";
const KEY = "radiocom-theme";

export function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const saved = window.localStorage.getItem(KEY) as Theme | null;
  if (saved === "dark" || saved === "light") return saved;
  return window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function applyTheme(t: Theme) {
  if (typeof document === "undefined") return;
  const el = document.documentElement;
  el.classList.toggle("dark", t === "dark");
  window.localStorage.setItem(KEY, t);
}

export function hydrateTheme() {
  if (typeof window === "undefined") return;
  applyTheme(getInitialTheme());
}

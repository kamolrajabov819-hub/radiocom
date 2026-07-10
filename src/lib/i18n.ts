import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ru from "@/i18n/ru.json";
import uz from "@/i18n/uz.json";
import en from "@/i18n/en.json";

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      ru: { translation: ru },
      uz: { translation: uz },
      en: { translation: en },
    },
    lng: "ru",
    fallbackLng: "ru",
    interpolation: { escapeValue: false },
  });
}

export function hydrateLanguage() {
  if (typeof window === "undefined") return;
  const saved = window.localStorage.getItem("radiocom-lang");
  if (saved && saved !== i18n.language) i18n.changeLanguage(saved);
}

export default i18n;

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ru from "@/i18n/ru.json";
import uz from "@/i18n/uz.json";
import en from "@/i18n/en.json";

if (!i18n.isInitialized) {
  const saved =
    typeof window !== "undefined" ? window.localStorage.getItem("radiocom-lang") : null;

  i18n.use(initReactI18next).init({
    resources: {
      ru: { translation: ru },
      uz: { translation: uz },
      en: { translation: en },
    },
    lng: saved ?? "ru",
    fallbackLng: "ru",
    interpolation: { escapeValue: false },
  });
}

export default i18n;

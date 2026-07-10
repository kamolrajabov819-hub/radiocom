import motorolaImg from "@/assets/product-motorola.jpg";
import hyteraImg from "@/assets/product-hytera.jpg";
import pocImg from "@/assets/product-poc.jpg";
import baofengImg from "@/assets/product-baofeng.jpg";

export type Category =
  | "amateur"
  | "professional"
  | "poc"
  | "accessories"
  | "monitors"
  | "pda";
export type Brand =
  | "Motorola"
  | "Hytera"
  | "Decross"
  | "Baofeng"
  | "Alinco"
  | "Samcom"
  | "Radiocom RC";

export type Product = {
  id: string;
  name: string;
  brand: Brand;
  category: Category;
  image: string;
  tags: string[];
  band: string;
  range: string;
  battery: string;
  protection: string;
  blurb: string;
};

export const products: Product[] = [
  { id: "m-dp4400e", name: "Motorola DP4400e", brand: "Motorola", category: "professional", image: motorolaImg, tags: ["GPS", "Bluetooth", "IP68"], band: "UHF 403-527 MHz", range: "до 8 км", battery: "1650 mAh · 12ч", protection: "IP68", blurb: "Флагманская DMR-рация для промышленных задач." },
  { id: "m-r7", name: "Motorola R7", brand: "Motorola", category: "professional", image: motorolaImg, tags: ["GPS", "Wi-Fi", "IP68"], band: "VHF/UHF", range: "до 10 км", battery: "2450 mAh · 28ч", protection: "IP68", blurb: "Новая платформа R7 — умный шумоподав, TFT-дисплей." },
  { id: "m-xt420", name: "Motorola XT420", brand: "Motorola", category: "professional", image: motorolaImg, tags: ["PMR446", "IP55"], band: "PMR 446 MHz", range: "до 5 км", battery: "1800 mAh · 15ч", protection: "IP55", blurb: "Безлицензионная PMR для HoReCa и объектной охраны." },
  { id: "m-cp200d", name: "Motorola CP200d", brand: "Motorola", category: "professional", image: motorolaImg, tags: ["DMR", "IP54"], band: "UHF/VHF", range: "до 6 км", battery: "1600 mAh · 11ч", protection: "IP54", blurb: "Проверенный DMR-стандарт для коммерции и производства." },

  { id: "h-pd485", name: "Hytera PD485", brand: "Hytera", category: "professional", image: hyteraImg, tags: ["DMR", "GPS", "IP54"], band: "UHF 400-470 MHz", range: "до 7 км", battery: "1500 mAh · 14ч", protection: "IP54", blurb: "Компактный DMR с шифрованием и GPS." },
  { id: "h-hp785", name: "Hytera HP785", brand: "Hytera", category: "professional", image: hyteraImg, tags: ["DMR Tier III", "Bluetooth", "IP68"], band: "VHF", range: "до 12 км", battery: "2400 mAh · 18ч", protection: "IP68", blurb: "Тир-III инфраструктура. Для транковых сетей." },
  { id: "h-bd505", name: "Hytera BD505", brand: "Hytera", category: "amateur", image: hyteraImg, tags: ["DMR", "Compact"], band: "UHF", range: "до 4 км", battery: "1500 mAh · 10ч", protection: "IP54", blurb: "Легкая рация для розничной торговли." },

  { id: "b-uv5r", name: "Baofeng UV-5R", brand: "Baofeng", category: "amateur", image: baofengImg, tags: ["Dual band"], band: "VHF/UHF", range: "до 5 км", battery: "1800 mAh · 12ч", protection: "IP54", blurb: "Классика любительского эфира. Двухдиапазонная." },
  { id: "b-uv82", name: "Baofeng UV-82", brand: "Baofeng", category: "amateur", image: baofengImg, tags: ["Dual PTT"], band: "VHF/UHF", range: "до 6 км", battery: "2100 mAh · 14ч", protection: "IP54", blurb: "Двухканальный PTT для активного использования." },

  { id: "a-dj-a41", name: "Alinco DJ-A41", brand: "Alinco", category: "amateur", image: baofengImg, tags: ["PMR446"], band: "UHF 446 MHz", range: "до 5 км", battery: "1200 mAh · 14ч", protection: "IP54", blurb: "Японское качество для PMR-диапазона." },

  { id: "d-rl-108", name: "Decross RL-108", brand: "Decross", category: "amateur", image: baofengImg, tags: ["LPD/PMR"], band: "LPD/PMR", range: "до 4 км", battery: "1500 mAh · 10ч", protection: "IP54", blurb: "Бюджетный вариант для базовых задач." },
  { id: "s-sm-138", name: "Samcom SM-138", brand: "Samcom", category: "amateur", image: baofengImg, tags: ["Compact"], band: "UHF", range: "до 3 км", battery: "1200 mAh · 8ч", protection: "IP54", blurb: "Ультра-компактная — для HoReCa." },

  { id: "p-inrico-t320", name: "Inrico T320", brand: "Radiocom RC", category: "poc", image: pocImg, tags: ["PoC", "4G LTE", "GPS", "WiFi"], band: "LTE Band 1/3/7/8/20", range: "Глобальная", battery: "3800 mAh · 30ч", protection: "IP54", blurb: "Смарт-PoC на Android. Групповые вызовы, GPS-трекинг." },
  { id: "p-hytera-pnc370", name: "Hytera PNC370", brand: "Hytera", category: "poc", image: pocImg, tags: ["PoC", "LTE", "WiFi"], band: "LTE + WiFi", range: "Глобальная", battery: "3200 mAh · 24ч", protection: "IP54", blurb: "Профессиональный PoC от Hytera. Совместим с DMR через шлюз." },
  { id: "p-radiocom-p1", name: "Radiocom RC-P1", brand: "Radiocom RC", category: "poc", image: pocImg, tags: ["PoC", "GPS", "Compact"], band: "LTE + WiFi", range: "Глобальная", battery: "2800 mAh · 20ч", protection: "IP54", blurb: "Наш собственный PoC. Работает в сети Radiocom." },

  { id: "acc-earpiece", name: "Скрытая гарнитура акустическая", brand: "Motorola", category: "accessories", image: baofengImg, tags: ["Discreet"], band: "—", range: "—", battery: "—", protection: "—", blurb: "Прозрачный шнур, скрытный тип. Для охраны и HoReCa." },
  { id: "acc-battery", name: "Аккумулятор Li-Ion 2450 mAh", brand: "Motorola", category: "accessories", image: baofengImg, tags: ["Original"], band: "—", range: "—", battery: "2450 mAh", protection: "—", blurb: "Оригинальная батарея с увеличенной ёмкостью." },
  { id: "acc-antenna", name: "Антенна выносная UHF", brand: "Hytera", category: "accessories", image: baofengImg, tags: ["UHF"], band: "UHF 400-470", range: "—", battery: "—", protection: "IP67", blurb: "Стационарная антенна для базовых станций." },

  { id: "bm-motorola-mbp50", name: "Радионяня Motorola MBP50", brand: "Motorola", category: "monitors", image: baofengImg, tags: ["Video", "Two-way"], band: "2.4 GHz", range: "до 300 м", battery: "8ч", protection: "—", blurb: "Видеомониторинг с двусторонней связью." },

  { id: "pda-caterpillar-t20", name: "КПК Caterpillar T20", brand: "Radiocom RC", category: "pda", image: pocImg, tags: ["Rugged", "PoC", "IP68"], band: "LTE / WiFi", range: "Глобальная", battery: "4200 mAh · 24ч", protection: "IP68", blurb: "Защищённый Android-КПК для логистики и складов." },
];

export const categoryLabels: Record<Category, { ru: string; en: string; uz: string }> = {
  amateur:      { ru: "Любительские",      en: "Amateur",      uz: "Havaskor" },
  professional: { ru: "Профессиональные",  en: "Professional", uz: "Professional" },
  poc:          { ru: "PoC радиостанции",  en: "PoC",          uz: "PoC" },
  accessories:  { ru: "Аксессуары",        en: "Accessories",  uz: "Aksessuarlar" },
  monitors:     { ru: "Радио- и видеоняни", en: "Baby monitors", uz: "Bolalar monitorlari" },
  pda:          { ru: "Промышленные КПК",  en: "Rugged PDAs",  uz: "KPK" },
};

export const allBrands: Brand[] = [
  "Motorola", "Hytera", "Decross", "Baofeng", "Alinco", "Samcom", "Radiocom RC",
];

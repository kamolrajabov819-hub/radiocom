import { Instagram, Facebook, Send } from "lucide-react";
import { useTranslation } from "react-i18next";

const links = [
  { href: "https://www.instagram.com/radiocom_uzb", Icon: Instagram, label: "Instagram", key: "instagram" as const },
  { href: "https://www.facebook.com/people/Radiocom-%D0%A0%D0%B0%D1%86%D0%B8%D0%B8-Motorola-%D0%B2-%D0%A3%D0%B7%D0%B1%D0%B5%D0%BA%D0%B8%D1%81%D1%82%D0%B0%D0%BD%D0%B5/100085709424020/", Icon: Facebook, label: "Facebook", key: "facebook" as const },
  { href: "https://t.me/uz_Radiocom", Icon: Send, label: "Telegram", key: "telegram" as const },
];

export function Socials({ variant = "row" }: { variant?: "row" | "stack" }) {
  const { t } = useTranslation();
  return (
    <div className={variant === "row" ? "flex items-center gap-2" : "flex flex-col gap-3"}>
      {links.map((l) => (
        <a
          key={l.key}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t(`footer.follow`) + " " + l.label}
          className="h-10 w-10 flex items-center justify-center border hairline text-cool hover:text-crisp hover:bg-signal hover:border-signal transition-colors"
        >
          <l.Icon className="w-4 h-4" />
        </a>
      ))}
    </div>
  );
}

import { useTranslation } from "react-i18next";

export function MapEmbed() {
  const { t } = useTranslation();
  return (
    <div className="map-embed border hairline">
      <iframe
        title={t("footer.map_title")}
        src="https://maps.google.com/maps?width=661&height=400&hl=en&q=radiocom.u&t=&z=17&ie=UTF8&iwloc=B&output=embed"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

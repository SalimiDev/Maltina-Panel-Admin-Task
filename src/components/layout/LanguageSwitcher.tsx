"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/lib/i18n/navigation";
import { locales } from "@/lib/i18n/config";
import { useState, ChangeEvent, useEffect } from "react";

const LanguageSwitcher = () => {
  const t = useTranslations("Language");
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const [locale, setLocale] = useState(currentLocale);

  useEffect(() => {
    setLocale(currentLocale);
  }, [currentLocale]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    setLocale(newLocale);
    router.push(pathname, { locale: newLocale });
  };

  return (
    <select onChange={handleChange} value={locale} aria-label="Select language">
      {locales.map((loc) => (
        <option
          key={loc}
          value={loc}
          dir={loc === "fa" ? "rtl" : "ltr"}
          className="text-foreground bg-page-background"
        >
          {loc === "en" ? t("english") : t("persian")}
        </option>
      ))}
    </select>
  );
};

export default LanguageSwitcher;

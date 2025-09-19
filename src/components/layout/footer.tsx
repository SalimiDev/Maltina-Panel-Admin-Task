"use client";

import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-background border-border-default mt-auto border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <p className="text-muted-foreground text-sm">
            {t("copyright", {
              year: currentYear,
            })}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

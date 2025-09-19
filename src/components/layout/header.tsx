"use client";

import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import { Avatar } from "../ui/avatar";

const Header = () => {
  const t = useTranslations("Header");

  return (
    <header className="bg-surface-background border-border-default border-b shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <h1 className="text-foreground text-xl font-bold">{t("title")}</h1>
          </div>
          <div className="flex items-center gap-2 space-x-4 rtl:space-x-reverse">
            <LanguageSwitcher />
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Avatar fallback="MS" size="small" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

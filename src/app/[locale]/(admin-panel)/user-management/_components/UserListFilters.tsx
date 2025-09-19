"use client";

import React from "react";
import { useTranslations } from "next-intl";

type Props = {
  searchTerm: string;
  onSearchChange: (s: string) => void;
  selectedCity: string;
  onCityChange: (c: string) => void;
  cityOptions: string[];
};

export default function UserListFilters({
  searchTerm,
  selectedCity,
  cityOptions,
  onSearchChange,
  onCityChange,
}: Props) {
  const t = useTranslations("UserManagement.filters");
  const handleSearchChange = (value: string) => {
    if (value && selectedCity) {
      onCityChange("");
    }
    onSearchChange(value);
  };

  const handleCityChange = (value: string) => {
    if (value && searchTerm) {
      onSearchChange("");
    }
    onCityChange(value);
  };

  return (
    <div className="border-border-default flex w-full justify-between gap-4 border-b border-dashed pb-4">
      <input
        className="border-border-default focus:ring-primary w-1/2 rounded-md border p-2 focus:ring-1 focus:outline-none"
        type="text"
        placeholder={t("searchPlaceholder")}
        value={searchTerm}
        onChange={(e) => handleSearchChange(e.target.value)}
      />
      <select
        title={t("selectCity")}
        className="border-border-default focus:ring-primary [&>option]:bg-page-background text-subtle-foreground rounded-md border p-2 focus:ring-1 focus:outline-none"
        value={selectedCity}
        onChange={(e) => handleCityChange(e.target.value)}
        disabled={cityOptions.length === 0}
      >
        <option value="" disabled hidden>
          {cityOptions.length === 0 ? t("noCitiesFound") : t("sortByCity")}
        </option>
        {cityOptions.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}

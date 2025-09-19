"use client";

import { Button } from "@/components";
import React, { useState } from "react";
import { NewUserInput } from "@/types/user-interface";
import { FormInput } from "@/components/ui/form-input";
import { useTranslations } from "next-intl";

type Props = {
  onAdd: (user: NewUserInput) => void;
};

type FormState = {
  name: string;
  email: string;
  city: string;
};

export default function AddUserForm({ onAdd }: Props) {
  const t = useTranslations("UserManagement");
  const [form, setForm] = useState<FormState>({ name: "", email: "", city: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = t("errors.nameRequired");
    if (!form.email.trim()) {
      newErrors.email = t("errors.emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = t("errors.invalidEmail");
    }
    if (!form.city.trim()) newErrors.city = t("errors.cityRequired");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onAdd(form);
    setForm({ name: "", email: "", city: "" });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <FormInput
          label={t("form.nameLabel")}
          name="name"
          value={form.name}
          onChange={(val) => handleChange("name", val)}
          placeholder={t("form.namePlaceholder")}
          error={errors.name}
        />
        <FormInput
          label={t("form.emailLabel")}
          name="email"
          type="email"
          value={form.email}
          onChange={(val) => handleChange("email", val)}
          placeholder={t("form.emailPlaceholder")}
          error={errors.email}
        />
        <FormInput
          label={t("form.cityLabel")}
          name="city"
          value={form.city}
          onChange={(val) => handleChange("city", val)}
          placeholder={t("form.cityPlaceholder")}
          error={errors.city}
        />
      </div>
      <div>
        <Button type="submit">{t("form.addUserButton")}</Button>
      </div>
    </form>
  );
}

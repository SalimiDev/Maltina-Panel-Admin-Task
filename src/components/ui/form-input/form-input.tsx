"use client";

import React from "react";
import clsx from "clsx";

type Props = {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
};

export default function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
}: Props) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-2 text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        type={type}
        className={clsx(
          "focus:border-primary border-border-default rounded-md border p-2 focus:ring-1 focus:outline-none",
          error && !value && "border-danger border-ring-none",
        )}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {error && !value && <span className="text-danger mt-1 text-xs">{error}</span>}
    </div>
  );
}

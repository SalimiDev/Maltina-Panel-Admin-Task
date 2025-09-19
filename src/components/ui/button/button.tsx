"use client";

import { button } from "./button.variants";
import { ButtonProps } from "./button.types";
import { Loading } from "../loading";
import { cn } from "@/lib/cn";

const Button = ({
  children,
  type = "button",
  variant,
  color,
  size,
  radius,
  loading,
  disabled,
  loadingColor,
  loadingVariant,
  isRTL,
  className,
  ...rest
}: ButtonProps) => {
  const { base, content, spinner } = button({
    variant,
    color,
    size,
    radius,
    loading,
    disabled,
    isRTL,
  });

  return (
    <button className={cn(base(), className)} type={type} disabled={disabled || loading} {...rest}>
      <span className={content()}>{children}</span>
      <span className={spinner()}>
        <Loading
          size={size}
          color={loadingColor ? loadingColor : variant !== "solid" ? color : "white"}
          variant={loadingVariant}
        />
      </span>
    </button>
  );
};

export default Button;

import { tv, type VariantProps } from "tailwind-variants";
import { colors } from "@/constants/colors";

type Color = (typeof colors)[number];

export const avatar = tv({
  base: "relative flex items-center justify-center text-center overflow-hidden uppercase font-semibold",
  variants: {
    color: Object.fromEntries(
      colors.map((color) => [color, `text-${color} bg-${color} border-${color}`]),
    ) as Record<Color, string>,

    variant: {
      solid: "text-white",
      soft: "",
    },

    size: {
      tiny: "h-6 w-6 text-xs",
      small: "h-8 w-8 text-sm",
      medium: "h-10 w-10 text-base",
      large: "h-12 w-12 text-lg",
      huge: "h-14 w-14 text-xl",
    },
    radius: {
      small: "rounded-sm",
      medium: "rounded-md",
      large: "rounded-lg",
      full: "rounded-full",
    },
  },
  compoundVariants: [
    ...colors.map((color) => ({
      variant: "solid" as const,
      color: color,
      className: `bg-${color}`,
    })),

    ...colors.map((color) => ({
      variant: "soft" as const,
      color: color,
      className: `bg-${color}-subtle text-${color}`,
    })),
  ],
  defaultVariants: {
    color: "primary",
    variant: "solid",
    size: "medium",
    radius: "full",
  },
});

export type AvatarVariants = VariantProps<typeof avatar>;

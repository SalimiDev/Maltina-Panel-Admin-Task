import { tv, type VariantProps } from "tailwind-variants";
import { colors } from "@/constants/colors";

export const button = tv({
  slots: {
    base: [
      "inline-grid grid-cols-1 grid-rows-1",
      "items-center justify-center text-center gap-2",
      " transition duration-100 ease-in-out",
      "no-underline border font-medium cursor-pointer select-none  ",
      "relative",
    ],
    content: "flex gap-1 items-center justify-center row-start-1 col-start-1 transition-opacity duration-150",
    spinner: "row-start-1 col-start-1 flex items-center justify-center transition-opacity duration-150",
  },
  variants: {
    color: {
      primary: { base: "text-primary bg-primary border-primary" },
      secondary: { base: "text-secondary bg-secondary border-secondary" },
      "accent-1": { base: "text-accent-1 bg-accent-1 border-accent-1" },
      "accent-2": { base: "text-accent-2 bg-accent-2 border-accent-2" },
      "accent-3": { base: "text-accent-3 bg-accent-3 border-accent-3" },
      "accent-4": { base: "text-accent-4 bg-accent-4 border-accent-4" },
      success: { base: "text-success bg-success border-success" },
      info: { base: "text-info bg-info border-info" },
      warning: { base: "text-warning bg-warning border-warning" },
      danger: { base: "text-danger bg-danger border-danger" },
    },

    variant: {
      solid: "shadow-lg",
      soft: "",
      outline: "bg-transparent",
      ghost: "",
      link: "border-none bg-transparent p-0 text-link h-auto underline hover:text-link-hover",
    },

    size: {
      tiny: "px-1.5 py-1 text-xs h-auto min-w-6",
      small: "px-2 py-1 text-sm h-auto min-w-8",
      normal: "px-3 py-1.5 text-md h-auto min-w-10",
      large: "px-4 py-2 text-xl h-auto min-w-12",
    },

    radius: {
      none: "rounded-none",
      small: "rounded-sm",
      medium: "rounded-md",
      large: "rounded-lg",
      full: "rounded-full",
    },

    loading: {
      true: {
        base: "opacity-55 pointer-events-none cursor-not-allowed",
        content: "opacity-0",
        spinner: "opacity-100",
      },
      false: {
        content: "opacity-100",
        spinner: "opacity-0",
      },
    },

    disabled: {
      true: { base: "opacity-40 pointer-events-none cursor-not-allowed" },
    },

    isRTL: {
      true: { content: "flex-row-reverse" },
    },
  },
  compoundVariants: [
    ...colors.map((color) => ({
      variant: "solid" as const,
      color,
      className: {
        base: `hover:bg-${color}-hover active:bg-${color}-active text-${color}-foreground`,
      },
    })),

    ...colors.map((color) => ({
      variant: "soft" as const,
      color,
      className: {
        base: `bg-${color}-subtle border-${color}-subtle hover:bg-${color} hover:text-${color}-foreground hover:border-${color} active:bg-${color}-active`,
      },
    })),

    ...colors.map((color) => ({
      variant: "outline" as const,
      color,
      className: {
        base: `hover:bg-${color} hover:text-${color}-foreground`,
      },
    })),

    ...colors.map((color) => ({
      variant: "ghost" as const,
      color,
      className: {
        base: `border-${color} bg-${color}/8 hover:border-${color}-hover active:bg-${color}-active/8`,
      },
    })),
  ],
  defaultVariants: {
    variant: "solid",
    color: "primary",
    size: "normal",
    radius: "medium",
    loading: false,
    disabled: false,
    isRTL: false,
  },
});

export type ButtonVariants = VariantProps<typeof button>;

import { tv, type VariantProps } from "tailwind-variants";
import { colors } from "../../../constants/colors";

type Color = (typeof colors)[number] | "white" | "black";

export const loading = tv({
  base: [
    "inline-flex items-center justify-center bg-current",
    "pointer-events-none aspect-square",
    "mask-size-[100%] mask-no-repeat mask-center",
  ],
  variants: {
    color: Object.fromEntries(colors.map((color) => [color, `text-${color}`])) as Record<
      Color,
      string
    >,

    variant: {
      spinner:
        "mask-[url('data:image/svg+xml,%3Csvg%20width%3D%2724%27%20height%3D%2724%27%20stroke%3D%27%23000%27%20viewBox%3D%270%200%2024%2024%27%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%3E%3Cstyle%3E.spinner_V8m1%7Btransform-origin%3Acenter%3Banimation%3Aspinner_zKoa%202s%20linear%20infinite%7D.spinner_V8m1%20circle%7Bstroke-linecap%3Around%3Banimation%3Aspinner_YpZS%201.5s%20ease-in-out%20infinite%7D%40keyframes%20spinner_zKoa%7B100%25%7Btransform%3Arotate(360deg)%7D%7D%40keyframes%20spinner_YpZS%7B0%25%7Bstroke-dasharray%3A0%20150%3Bstroke-dashoffset%3A0%7D47.5%25%7Bstroke-dasharray%3A42%20150%3Bstroke-dashoffset%3A-16%7D95%25%2C100%25%7Bstroke-dasharray%3A42%20150%3Bstroke-dashoffset%3A-59%7D%7D%3C/style%3E%3Cg%20class%3D%27spinner_V8m1%27%3E%3Ccircle%20cx%3D%2712%27%20cy%3D%2712%27%20r%3D%279.5%27%20fill%3D%27none%27%20stroke-width%3D%273%27%3E%3C/circle%3E%3C/g%3E%3C/svg%3E')]",
      ring: "mask-[url('data:image/svg+xml,%3Csvg%20width%3D%2744%27%20height%3D%2744%27%20viewBox%3D%270%200%2044%2044%27%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20stroke%3D%27%23fff%27%3E%3Cg%20fill%3D%27none%27%20fillRule%3D%27evenodd%27%20stroke-width%3D%272%27%3E%3Ccircle%20cx%3D%2722%27%20cy%3D%2722%27%20r%3D%271%27%3E%3Canimate%20attributeName%3D%27r%27%20begin%3D%270s%27%20dur%3D%271.8s%27%20values%3D%271%3B%2020%27%20calcMode%3D%27spline%27%20keyTimes%3D%270%3B%201%27%20keySplines%3D%270.165%2C%200.84%2C%200.44%2C%201%27%20repeatCount%3D%27indefinite%27%20/%3E%3Canimate%20attributeName%3D%27stroke-opacity%27%20begin%3D%270s%27%20dur%3D%271.8s%27%20values%3D%271%3B%200%27%20calcMode%3D%27spline%27%20keyTimes%3D%270%3B%201%27%20keySplines%3D%270.3%2C%200.61%2C%200.355%2C%201%27%20repeatCount%3D%27indefinite%27%20/%3E%3C/circle%3E%3Ccircle%20cx%3D%2722%27%20cy%3D%2722%27%20r%3D%271%27%3E%3Canimate%20attributeName%3D%27r%27%20begin%3D%27-0.9s%27%20dur%3D%271.8s%27%20values%3D%271%3B%2020%27%20calcMode%3D%27spline%27%20keyTimes%3D%270%3B%201%27%20keySplines%3D%270.165%2C%200.84%2C%200.44%2C%201%27%20repeatCount%3D%27indefinite%27%20/%3E%3Canimate%20attributeName%3D%27stroke-opacity%27%20begin%3D%27-0.9s%27%20dur%3D%271.8s%27%20values%3D%271%3B%200%27%20calcMode%3D%27spline%27%20keyTimes%3D%270%3B%201%27%20keySplines%3D%270.3%2C%200.61%2C%200.355%2C%201%27%20repeatCount%3D%27indefinite%27%20/%3E%3C/circle%3E%3C/g%3E%3C/svg%3E')]",
    },

    size: {
      tiny: "w-3 h-3",
      small: "w-4 h-4",
      normal: "w-5 h-5",
      large: "w-6 h-6",
    },
  },
  defaultVariants: {
    variant: "spinner",
    color: "primary",
    size: "normal",
  },
});

export type LoadingVariants = VariantProps<typeof loading>;

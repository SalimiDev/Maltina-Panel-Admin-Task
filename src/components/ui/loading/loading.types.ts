import { type LoadingVariants } from "./loading.variants";
import { type ClassValue } from "tailwind-variants";

export type LoadingProps = LoadingVariants & {
  className?: ClassValue;
};

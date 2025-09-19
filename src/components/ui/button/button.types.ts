import { ReactNode } from "react";
import { ButtonVariants } from "./button.variants";
import { LoadingVariants } from "../loading/loading.variants";

type LoadingColor = LoadingVariants["color"];
type LoadingVariant = LoadingVariants["variant"];

export type ButtonProps = {
  children: ReactNode;
  loadingColor?: LoadingColor;
  loadingVariant?: LoadingVariant;
} & ButtonVariants &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

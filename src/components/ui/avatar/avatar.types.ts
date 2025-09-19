import { ReactNode } from "react";
import { AvatarVariants } from "./avatar.variants";

export type AvatarProps = {
  fallback: ReactNode | string;
} & AvatarVariants &
  React.HTMLAttributes<HTMLSpanElement>;

import { LoadingProps } from "./loading.types";
import { loading } from "./loading.variants";

const Loading = ({ size, variant, color, className }: LoadingProps) => {
  const loadingClass = loading({ size, variant, color });

  return <span className={`${loadingClass} ${className}`}></span>;
};

export default Loading;

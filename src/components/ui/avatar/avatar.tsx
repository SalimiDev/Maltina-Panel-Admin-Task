import { avatar } from "./avatar.variants";
import { AvatarProps } from "./avatar.types";

const Avatar = ({
  color,
  variant,
  size,
  radius,
  fallback,
  className,
  ...rest
}: AvatarProps) => {
  const avatarClasses = avatar({ color, variant, size, radius, className });

  return (
    <span className={avatarClasses} {...rest}>
      {fallback && fallback}
    </span>
  );
};

export default Avatar;

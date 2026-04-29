import classNames from "classnames/bind";
import type { ReactNode } from "react";

import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

type Variant = "primary" | "secondary";
type Size = "small" | "medium" | "large";

type Props = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  onClick?: () => void;
};

function Button({
  children,
  variant = "primary",
  size = "medium",
  disabled = false,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      className={cx("button", `variant-${variant}`, `size-${size}`)}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;

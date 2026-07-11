import classNames from "classnames/bind";
import { type ReactNode } from "react";

import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}

function Button({
  children,
  onClick,
  variant = "secondary",
  type = "button",
  disabled,
  className,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cx("button", variant, className)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;

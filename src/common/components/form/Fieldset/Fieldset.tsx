import classNames from "classnames/bind";
import { type ReactNode } from "react";

import styles from "./Fieldset.module.scss";

const cx = classNames.bind(styles);

export interface FieldsetProps {
  legend: string;
  children: ReactNode;
  className?: string;
}

function Fieldset({ legend, children, className }: FieldsetProps) {
  return (
    <fieldset className={cx("fieldset", className)}>
      <legend className={cx("legend")}>{legend}</legend>
      <div className={cx("content")}>{children}</div>
    </fieldset>
  );
}

export default Fieldset;

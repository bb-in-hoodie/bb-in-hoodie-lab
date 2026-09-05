import classNames from "classnames/bind";
import { type ReactNode } from "react";

import styles from "./Description.module.scss";

const cx = classNames.bind(styles);

function Description({ children }: { children: ReactNode }) {
  return (
    <div className={cx("description")}>
      <p className={cx("text")}>{children}</p>
    </div>
  );
}

export default Description;

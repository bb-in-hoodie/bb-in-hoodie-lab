import classNames from "classnames/bind";

import styles from "./NotFound.module.scss";

const cx = classNames.bind(styles);

function NotFound() {
  return (
    <main className={cx("wrap")}>
      <h1 className={cx("code")}>404</h1>
      <p className={cx("description")}>Page not found</p>
    </main>
  );
}

export default NotFound;

import classNames from "classnames/bind";

import styles from "./NotFound.module.scss";

const cx = classNames.bind(styles);

function NotFound() {
  return (
    <main className={cx("wrap")}>
      <div className={cx("content")}>
        <h1 className={cx("blind")}>Error</h1>
        <p className={cx("title")}>OOPS,</p>
        <p className={cx("description")}>SOMETHING WENT WRONG HERE</p>
      </div>
    </main>
  );
}

export default NotFound;

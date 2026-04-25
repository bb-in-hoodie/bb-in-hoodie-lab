import classNames from "classnames/bind";

import styles from "./Index.module.scss";

const cx = classNames.bind(styles);

function Index() {
  return (
    <main className={cx("wrap")}>
      <h1 className={cx("title")}>bb-in-hoodie: lab</h1>
      <p className={cx("description")}>Experiments</p>
    </main>
  );
}

export default Index;

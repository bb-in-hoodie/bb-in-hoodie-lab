import classNames from "classnames/bind";

import DevButton from "@/common/components/DevButton/DevButton";
import { DEV_HOME_URL } from "@/common/constants/environment";
import useDocumentMetadata from "@/common/hooks/useDocumentMetadata";

import styles from "./NotFound.module.scss";

const cx = classNames.bind(styles);

function NotFound() {
  useDocumentMetadata({ title: "Not Found" });

  return (
    <main className={cx("wrap")}>
      <div className={cx("content")}>
        <h1 className={cx("blind")}>Error</h1>
        <p className={cx("title")}>OOPS,</p>
        <p className={cx("description")}>SOMETHING WENT{"\n"}WRONG HERE</p>
      </div>
      <DevButton url={DEV_HOME_URL} className={cx("dev-button")} />
    </main>
  );
}

export default NotFound;

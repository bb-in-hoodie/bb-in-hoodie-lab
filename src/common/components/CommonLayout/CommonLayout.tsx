import classNames from "classnames/bind";
import { type ReactNode } from "react";

import { DEV_HOME_URL } from "@/common/constants/environment";
import useDocumentMetadata from "@/common/hooks/useDocumentMetadata";

import Article from "../Article/Article";
import styles from "./CommonLayout.module.scss";

const cx = classNames.bind(styles);

type Props = {
  title: string;
  tags: string[];
  description: string;
  githubUrl?: string;
  children?: ReactNode;
};

function CommonLayout({ title, tags, description, githubUrl, children }: Props) {
  useDocumentMetadata({ title, description });

  return (
    <main className={cx("wrap")}>
      <div className={cx("scene")}>{children}</div>
      <Article
        title={title}
        tags={tags}
        description={description}
        githubUrl={githubUrl}
        homeUrl={DEV_HOME_URL}
        className={cx("article")}
      />
    </main>
  );
}

export default CommonLayout;

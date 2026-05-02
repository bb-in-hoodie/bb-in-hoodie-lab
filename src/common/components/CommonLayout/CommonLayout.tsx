import classNames from "classnames/bind";
import { type ReactNode } from "react";

import Article from "../Article/Article";
import GitHub from "../GitHub/GitHub";
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
  return (
    <main className={cx("wrap")}>
      <div className={cx("scene")}>{children}</div>
      <Article
        title={title}
        tags={tags}
        description={description}
        className={cx("article")}
      />
      {githubUrl && <GitHub url={githubUrl} className={cx("github")} />}
    </main>
  );
}

export default CommonLayout;

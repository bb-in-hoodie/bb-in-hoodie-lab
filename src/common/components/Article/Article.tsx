import classNames from "classnames/bind";

import Description from "../Description/Description";
import GitHub from "../GitHub/GitHub";
import Home from "../Home/Home";
import Tags from "../Tags/Tags";
import styles from "./Article.module.scss";

const cx = classNames.bind(styles);

type Props = {
  title: string;
  tags: string[];
  description: string;
  githubUrl?: string;
  homeUrl?: string;
  className?: string;
};

function Article({
  title,
  tags,
  description,
  githubUrl,
  homeUrl,
  className,
}: Props) {
  return (
    <article className={cx("article", className)}>
      <header className={cx("header")}>
        <div className={cx("title-row")}>
          <h1 className={cx("title")}>{title}</h1>
          {(githubUrl || homeUrl) && (
            <div className={cx("actions")}>
              {githubUrl && <GitHub url={githubUrl} />}
              {homeUrl && <Home url={homeUrl} />}
            </div>
          )}
        </div>
        <Tags tags={tags} />
      </header>
      <Description>{description}</Description>
    </article>
  );
}

export default Article;

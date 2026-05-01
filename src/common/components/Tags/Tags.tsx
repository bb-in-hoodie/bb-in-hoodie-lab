import classNames from "classnames/bind";

import styles from "./Tags.module.scss";

const cx = classNames.bind(styles);

type Props = { tags: string[] };

function Tags({ tags }: Props) {
  return (
    <ul className={cx("tags")}>
      {tags.map((tag) => (
        <li key={tag} className={cx("tag")}>
          {tag}
        </li>
      ))}
    </ul>
  );
}

export default Tags;

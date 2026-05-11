import homeIcon from "@/common/assets/images/home.png";

import IconLink from "../IconLink/IconLink";

type Props = { url: string; className?: string };

function Home({ url, className }: Props) {
  return (
    <IconLink
      url={url}
      iconSrc={homeIcon}
      ariaLabel="Homepage"
      className={className}
    />
  );
}

export default Home;

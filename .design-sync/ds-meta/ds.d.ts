// Type contract for the design-sync bundle. Mirrors the props of each storied
// component (see src/common/components/<Name>/<Name>.tsx). Hand-authored: the
// app is built as a Vite app, not a typed library, so there is no emitted .d.ts
// to ship. Keep these in sync with the component sources — see
// .design-sync/NOTES.md "Re-sync risks".
import type { FC, ReactNode } from "react";

export interface ArticleProps {
  title: string;
  tags: string[];
  description: string;
  githubUrl?: string;
  homeUrl?: string;
  className?: string;
}
export declare const Article: FC<ArticleProps>;

export interface CommonLayoutProps {
  title: string;
  tags: string[];
  description: string;
  githubUrl?: string;
  children?: ReactNode;
}
export declare const CommonLayout: FC<CommonLayoutProps>;

export interface DescriptionProps {
  children: ReactNode;
}
export declare const Description: FC<DescriptionProps>;

export interface GitHubProps {
  url: string;
  className?: string;
}
export declare const GitHub: FC<GitHubProps>;

export interface HomeProps {
  url: string;
  className?: string;
}
export declare const Home: FC<HomeProps>;

export interface IconLinkProps {
  url: string;
  iconSrc: string;
  ariaLabel: string;
  className?: string;
  iconClassName?: string;
  eventName?: string;
}
export declare const IconLink: FC<IconLinkProps>;

export interface TagsProps {
  tags: string[];
}
export declare const Tags: FC<TagsProps>;

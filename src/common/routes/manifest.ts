import { METADATA as TESTING_METADATA } from "../../pages/3d/Testing.metadata";

export type RouteMetadata = {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
};

export const ROUTES = [
  { path: "/3d/testing", metadata: TESTING_METADATA },
] as const;

export type RoutePath = (typeof ROUTES)[number]["path"];

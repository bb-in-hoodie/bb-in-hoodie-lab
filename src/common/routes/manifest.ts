import { METADATA as FBO_PARTICLES_METADATA } from "../../pages/3d/FBOParticles/index.metadata";

export type RouteMetadata = {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
};

export const ROUTES = [
  { path: "/3d/fbo-particles", metadata: FBO_PARTICLES_METADATA },
] as const;

export type RoutePath = (typeof ROUTES)[number]["path"];

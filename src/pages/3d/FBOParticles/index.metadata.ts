import type { RouteMetadata } from "@/common/routes/manifest";

export const METADATA: RouteMetadata = {
  title: "FBO Particles",
  tags: ["3D", "THREE.JS", "FBO", "PARTICLES", "SHADER"],
  description: `An FBO (Frame Buffer Object) is a GPU-based optimization technique. By setting the render target to a texture rather than the screen, large amounts of computation data can be packed into the texture and processed in parallel by a fragment shader on the GPU.\n\nA representative use case is particle simulation. Updating particle positions in real time is a massively parallel task over a large dataset, making the GPU a better fit than the CPU.\n\nDuring the FBO simulation step, a fragment shader computes each particle's next-frame position and stores it in a texture; then the particle's vertex shader samples that texture to set each particle's position.\n\nThis demo also uses MeshSurfaceSampler to set each particle's initial position — a Three.js helper class that samples random points across a mesh's surface.`,
  githubUrl:
    "https://github.com/bb-in-hoodie/bb-in-hoodie-lab/tree/main/src/pages/3d/FBOParticles",
};

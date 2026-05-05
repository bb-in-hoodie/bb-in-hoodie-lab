import { shaderMaterial } from "@react-three/drei";
import { ReactThreeFiber } from "@react-three/fiber";

import { createDataTextureForParticle } from "@/pages/3d/FBOParticles/helpers/particles";
import { PARTICLE_SIMULATION_SPEC } from "@/pages/3d/FBOParticles/helpers/spec";

import fragment from "./fragment.glsl?raw";
import vertex from "./vertex.glsl?raw";

declare module "@react-three/fiber" {
  export interface ThreeElements {
    particlesMaterial: ReactThreeFiber.ThreeElement<typeof ParticlesMaterial>;
  }
}

const ParticlesMaterial = shaderMaterial(
  {
    uLightSource: [-1, 0.5, 2],
    uPointSize: 10,
    uMinPointSize: 3,
    uMinAlpha: 0.3,
    uResolution: [
      PARTICLE_SIMULATION_SPEC.width,
      PARTICLE_SIMULATION_SPEC.height,
    ],
    uFboTexture: createDataTextureForParticle(
      new Float32Array(
        PARTICLE_SIMULATION_SPEC.width * PARTICLE_SIMULATION_SPEC.height * 4,
      ),
    ),
  },
  vertex,
  fragment,
);

export default ParticlesMaterial;

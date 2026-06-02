import { shaderMaterial } from "@react-three/drei";
import { ReactThreeFiber } from "@react-three/fiber";

import { createDataTextureForParticle } from "@/pages/3d/FBOParticles/helpers/particles";
import { PARTICLE_SIMULATION_SPEC } from "@/pages/3d/FBOParticles/helpers/spec";

import fragment from "./fragment.glsl?raw";
import vertex from "./vertex.glsl?raw";

declare module "@react-three/fiber" {
  export interface ThreeElements {
    particleSimulationMaterial: ReactThreeFiber.ThreeElement<
      typeof ParticleSimulationMaterial
    >;
  }
}

const createInitialData = (height: number) =>
  new Float32Array(PARTICLE_SIMULATION_SPEC.width * height * 4);

const ParticleSimulationMaterial = shaderMaterial(
  {
    uLatestFboTexture: createDataTextureForParticle(createInitialData(2), 2),
    uStartFboTexture: createDataTextureForParticle(createInitialData(2), 2),
    uEndFboTexture: createDataTextureForParticle(createInitialData(2), 2),
    uResolution: [
      PARTICLE_SIMULATION_SPEC.width,
      PARTICLE_SIMULATION_SPEC.height,
    ],
    uTime: 0,
    uStartTime: 0,
    uEndTime: 0,
    uNoiseFrequency: 1.0,
    uNoiseNormalIntensity: 0.2,
    uNoiseDriftIntensity: 0.15,
    uNoiseSpeed: 0.5,
  },
  vertex,
  fragment,
);

export default ParticleSimulationMaterial;

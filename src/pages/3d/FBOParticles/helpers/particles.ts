import { DataTexture, FloatType, RGBAFormat } from "three";

import { PARTICLE_SIMULATION_SPEC } from "@/pages/3d/FBOParticles/helpers/spec";

export const createDataTextureForParticle = (
  data: Float32Array | null,
  height: number = PARTICLE_SIMULATION_SPEC.height
) =>
  new DataTexture(
    data,
    PARTICLE_SIMULATION_SPEC.width,
    height,
    RGBAFormat,
    FloatType
  );

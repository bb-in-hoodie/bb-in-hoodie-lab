const SAFE_PARTICLES_COUNT = 2_048; // WebGL 1 spec
const MAX_PARTICLES_COUNT = 12_000;

let particleCount = 0;

/** get the total number of particles (checking MAX_TEXTURE_SIZE of current environment) */
export const getParticlesCount = () => {
  if (particleCount > 0) {
    return particleCount;
  }

  const canvas = document.createElement("canvas");
  const gl2 = canvas.getContext("webgl2");
  const gl =
    gl2 ||
    canvas.getContext("webgl") ||
    (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

  if (gl) {
    const maxTextureSize = gl.getParameter?.(gl.MAX_TEXTURE_SIZE);

    if (maxTextureSize) {
      particleCount = Math.min(maxTextureSize, MAX_PARTICLES_COUNT);
      console.log(
        `[three] particles count: ${particleCount} (MAX_TEXTURE_SIZE: ${maxTextureSize} / WebGL ${
          gl2 ? "2" : "1"
        })`,
      );
    } else {
      particleCount = SAFE_PARTICLES_COUNT;
      console.warn(
        `[three] particles count: ${particleCount} (failed to read MAX_TEXTURE_SIZE)`,
      );
    }
  } else {
    particleCount = SAFE_PARTICLES_COUNT;
    console.warn(
      `[three] particles count: ${particleCount} (failed to get WebGL context)`,
    );
  }

  canvas.remove();

  return particleCount;
};

/** fbo spec of particle simulation material */
export const PARTICLE_SIMULATION_SPEC = {
  width: getParticlesCount(),
  /** 0: positions, 1: normals */
  height: 2,
} as const;

export const TRANSITION_DURATION = 1.5;

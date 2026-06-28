import { extend, ThreeElements, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import {
  FloatType,
  NearestFilter,
  NormalBlending,
  RGBAFormat,
  Vector3,
} from "three";

import { createDataTextureForParticle } from "@/pages/3d/FBOParticles/helpers/particles";
import {
  getParticlesCount,
  PARTICLE_SIMULATION_SPEC,
} from "@/pages/3d/FBOParticles/helpers/spec";
import { useFboSimulation } from "@/pages/3d/FBOParticles/hooks/useFboSimulation";
import ParticleSimulationMaterial from "@/pages/3d/FBOParticles/materials/ParticleSimulationMaterial";
import ParticlesMaterial from "@/pages/3d/FBOParticles/materials/ParticlesMaterial";

import { type SampledData } from "./helpers/objectSpecs";

extend({ ParticleSimulationMaterial, ParticlesMaterial });

type Props = {
  data: SampledData | null;
  /** multiplier applied to sampled noise offset (higher means wider particle spread) */
  noiseFrequency: number;
  /** how far particles move along the surface normal (higher means more bump) */
  noiseNormalIntensity: number;
  /** how far particles drift freely in 3d space (higher means more float) */
  noiseDriftIntensity: number;
  /** speed of the noise animation over time (higher means faster shimmer) */
  noiseSpeed: number;
  /** spring constant pulling particles toward the target surface (higher means faster snap and more overshoot) */
  springStrength: number;
  /** velocity-proportional resistance that settles the spring (higher means the bounce dies sooner) */
  springDamping: number;
  /** per-particle variation in the spring response (higher means more varied motion) */
  springJitter: number;
};

export default function Particles({
  data,
  noiseFrequency,
  noiseNormalIntensity,
  noiseDriftIntensity,
  noiseSpeed,
  springStrength,
  springDamping,
  springJitter,
}: Props) {
  const particlesMaterialRef = useRef<ThreeElements["shaderMaterial"]>(null);

  const { updateMaterial, requestInitializationOnce } = useFboSimulation({
    FboMaterialClass: ParticleSimulationMaterial,
    fboSettings: [
      PARTICLE_SIMULATION_SPEC.width,
      PARTICLE_SIMULATION_SPEC.height,
      {
        type: FloatType,
        magFilter: NearestFilter,
        minFilter: NearestFilter,
        format: RGBAFormat,
        generateMipmaps: false,
      },
    ],
    targetMaterialRef: particlesMaterialRef,
  });

  // convert vectors into textures and send those to material
  useEffect(() => {
    if (!data) return;

    const { positions, normals } = data;

    if (!positions.length || !normals.length) return;

    const uTargetTexture = createDataTextureForParticle(
      createCombinedArray([positions, normals]),
      2,
    );
    uTargetTexture.needsUpdate = true;

    updateMaterial((material) => {
      material.uniforms.uTargetTexture.value = uTargetTexture;
    });

    // on the first object the buffer is empty, so fill it with the target as the initial state
    requestInitializationOnce();

    return () => {
      uTargetTexture.dispose();
    };
  }, [updateMaterial, requestInitializationOnce, data]);

  // add some dynamics to particles
  useFrame(({ camera, clock }) => {
    if (particlesMaterialRef.current?.uniforms) {
      particlesMaterialRef.current.uniforms.uLightSource.value
        .copy(camera.position)
        .add(LIGHT_OFFSET);
    }

    updateMaterial((material) => {
      material.uniforms.uTime.value = clock.getElapsedTime();
      material.uniforms.uNoiseFrequency.value = noiseFrequency;
      material.uniforms.uNoiseNormalIntensity.value = noiseNormalIntensity;
      material.uniforms.uNoiseDriftIntensity.value = noiseDriftIntensity;
      material.uniforms.uNoiseSpeed.value = noiseSpeed;
      material.uniforms.uSpringStrength.value = springStrength;
      material.uniforms.uSpringDamping.value = springDamping;
      material.uniforms.uSpringJitter.value = springJitter;
    });
  });

  if (!data) {
    return null;
  }

  return (
    <points
      // because we don't change the actual position of particles,
      // the particles would disappear when camera moves if frustumCulled is set as true
      frustumCulled={false}
    >
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[INITIAL_POSITIONS, 3]}
        />
        <bufferAttribute attach="attributes-index" args={[INDICES, 1]} />
        <bufferAttribute attach="attributes-random" args={[RANDOMS, 1]} />
      </bufferGeometry>
      <particlesMaterial
        ref={particlesMaterialRef}
        depthWrite={false}
        blending={NormalBlending}
        transparent
        depthTest={true}
      />
    </points>
  );
}

/**
 * initial positions must be randomized values greater than 1,
 * or particles fail to render
 */
const INITIAL_POSITIONS = new Float32Array(getParticlesCount() * 3).map(
  () => Math.random() * 10,
);
const INDICES = new Float32Array(getParticlesCount()).map((_, i) => i);
const RANDOMS = new Float32Array(getParticlesCount()).map(() => Math.random());

// world-space offset preserved from the original ParticlesMaterial uLightSource
// so the light keeps its original distance from the camera as it follows it
const LIGHT_OFFSET = new Vector3(-1, 0.5, 2);

const createCombinedArray = (arrays: Float32Array[]) => {
  const totalLength = arrays.reduce((sum, arr) => sum + arr.length, 0);
  const combined = new Float32Array(totalLength);

  let pointer = 0;
  arrays.forEach((array) => {
    combined.set(array, pointer);
    pointer += array.length;
  });
  return combined;
};

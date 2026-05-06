import { extend, ThreeElements, useFrame } from "@react-three/fiber";
import { useCallback, useEffect, useRef } from "react";
import {
  DataTexture,
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
  TRANSITION_DURATION,
} from "@/pages/3d/FBOParticles/helpers/spec";
import { useFboSimulation } from "@/pages/3d/FBOParticles/hooks/useFboSimulation";
import ParticleSimulationMaterial from "@/pages/3d/FBOParticles/materials/ParticleSimulationMaterial";
import ParticlesMaterial from "@/pages/3d/FBOParticles/materials/ParticlesMaterial";

extend({ ParticleSimulationMaterial, ParticlesMaterial });

type Props = {
  data: {
    positions: Float32Array;
    normals: Float32Array;
    corePosition: Vector3;
  } | null;
};

export default function Particles({ data }: Props) {
  const particlesMaterialRef = useRef<ThreeElements["shaderMaterial"]>(null);

  const prevPositions = useRef<Float32Array | null>(null);
  const prevNormals = useRef<Float32Array | null>(null);
  const prevCorePosition = useRef<Vector3 | null>(null);

  const updatedTexturesRef = useRef<{
    uStartFboTexture: DataTexture;
    uEndFboTexture: DataTexture;
    startCorePosition: Vector3;
    targetCorePosition: Vector3;
  } | null>(null);

  const updatePrevUniforms = useCallback(
    (positions: Float32Array, normals: Float32Array, corePosition: Vector3) => {
      prevPositions.current = positions;
      prevNormals.current = normals;
      prevCorePosition.current = corePosition;
    },
    [],
  );

  const { updateMaterial } = useFboSimulation({
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

    const {
      positions: targetPositions,
      normals: targetNormals,
      corePosition: targetCorePosition,
    } = data;

    if (!targetPositions.length || !targetNormals.length) return;

    // handle initial render (where prevPositions and prevNormals are null)
    const startPositions = prevPositions.current?.length
      ? prevPositions.current
      : targetPositions;
    const startNormals = prevNormals.current?.length
      ? prevNormals.current
      : targetNormals;
    const startCorePosition = prevCorePosition.current ?? targetCorePosition;

    // combine positions and normals into a texture
    const uStartFboTexture = createDataTextureForParticle(
      createCombinedArray([startPositions, startNormals]),
      2,
    );
    const uEndFboTexture = createDataTextureForParticle(
      createCombinedArray([targetPositions, targetNormals]),
      2,
    );

    uStartFboTexture.needsUpdate = true;
    uEndFboTexture.needsUpdate = true;

    // schedule for the update
    updatedTexturesRef.current = {
      uStartFboTexture,
      uEndFboTexture,
      startCorePosition,
      targetCorePosition,
    };
    return () => {
      updatePrevUniforms(targetPositions, targetNormals, targetCorePosition);

      uStartFboTexture.dispose();
      uEndFboTexture.dispose();
    };
  }, [updateMaterial, updatePrevUniforms, data]);

  // add some dynamics to particles
  useFrame(({ camera, clock }) => {
    if (particlesMaterialRef.current?.uniforms) {
      particlesMaterialRef.current.uniforms.uLightSource.value
        .copy(camera.position)
        .add(LIGHT_OFFSET);
    }

    updateMaterial((material) => {
      material.uniforms.uTime.value = clock.getElapsedTime();

      if (updatedTexturesRef.current) {
        const {
          uStartFboTexture,
          uEndFboTexture,
          startCorePosition,
          targetCorePosition,
        } = updatedTexturesRef.current;

        material.uniforms.uStartFboTexture.value = uStartFboTexture;
        material.uniforms.uEndFboTexture.value = uEndFboTexture;
        material.uniforms.uStartCorePosition.value = startCorePosition;
        material.uniforms.uEndCorePosition.value = targetCorePosition;

        material.uniforms.uStartTime.value = clock.getElapsedTime();
        material.uniforms.uEndTime.value =
          clock.getElapsedTime() + TRANSITION_DURATION;

        updatedTexturesRef.current = null;
      }
    });
  });

  if (!data) {
    return null;
  }

  return (
    <points
      // because we don't change the actual position of particles,
      // the particles would be disappeared when camera moves if frustumCulled is set as true
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
 * don't know why but initial positions should be randomized values larger than 1
 * if not, the particles would disappear
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

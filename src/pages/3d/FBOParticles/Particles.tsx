import { extend, ThreeElements, useFrame } from "@react-three/fiber";
import { useControls } from "leva";
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
  } | null;
};

export default function Particles({ data }: Props) {
  const { noiseIntensity, noiseSpeed } = useControls("noise", {
    noiseIntensity: {
      value: 0.02,
      min: 0,
      max: 0.5,
      step: 0.001,
      label: "intensity",
    },
    noiseSpeed: { value: 1.0, min: 0, max: 5, step: 0.1, label: "speed" },
  });

  const particlesMaterialRef = useRef<ThreeElements["shaderMaterial"]>(null);

  const prevPositions = useRef<Float32Array | null>(null);
  const prevNormals = useRef<Float32Array | null>(null);

  const updatedTexturesRef = useRef<{
    uStartFboTexture: DataTexture;
    uEndFboTexture: DataTexture;
  } | null>(null);

  const updatePrevUniforms = useCallback(
    (positions: Float32Array, normals: Float32Array) => {
      prevPositions.current = positions;
      prevNormals.current = normals;
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
    } = data;

    if (!targetPositions.length || !targetNormals.length) return;

    // handle initial render (where prevPositions and prevNormals are null)
    const startPositions = prevPositions.current?.length
      ? prevPositions.current
      : targetPositions;
    const startNormals = prevNormals.current?.length
      ? prevNormals.current
      : targetNormals;

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
    };
    return () => {
      updatePrevUniforms(targetPositions, targetNormals);

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
      material.uniforms.uNoiseIntensity.value = noiseIntensity;
      material.uniforms.uNoiseSpeed.value = noiseSpeed;

      if (updatedTexturesRef.current) {
        const {
          uStartFboTexture,
          uEndFboTexture,
        } = updatedTexturesRef.current;

        material.uniforms.uStartFboTexture.value = uStartFboTexture;
        material.uniforms.uEndFboTexture.value = uEndFboTexture;

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

import { useFBO } from "@react-three/drei";
import { ThreeElements, useFrame } from "@react-three/fiber";
import { useCallback, useMemo, useRef } from "react";
import {
  BufferAttribute,
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
} from "three";

import { getParticlesCount } from "@/pages/3d/FBOParticles/helpers/spec";

export type UseFboSimulationParams = {
  FboMaterialClass: typeof ShaderMaterial;
  fboSettings: Parameters<typeof useFBO>;
  targetMaterialRef?: React.RefObject<ThreeElements["shaderMaterial"] | null>;
};

export const useFboSimulation = ({
  FboMaterialClass,
  targetMaterialRef,
  fboSettings,
}: UseFboSimulationParams) => {
  // needs two fbo render targets to swap their roles on each frame
  const renderTargetA = useFBO(...fboSettings);
  const renderTargetB = useFBO(...fboSettings);

  const readingRenderTarget = useRef(renderTargetA);
  const writingRenderTarget = useRef(renderTargetB);

  const { scene, camera, material } = useMemo(() => {
    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    camera.position.z = 0;

    const plane = new PlaneGeometry(2, 2);
    plane.setAttribute(
      "random",
      new BufferAttribute(
        new Float32Array(getParticlesCount()).map(() => Math.random()),
        1
      )
    );
    const material = new FboMaterialClass();
    const mesh = new Mesh(plane, material);
    scene.add(mesh);

    return { scene, camera, material };
  }, [FboMaterialClass]);

  useFrame(({ gl }) => {
    // pass the previous texture to the material
    material.uniforms.uLatestFboTexture.value =
      readingRenderTarget.current.texture;

    // simulate
    gl.setRenderTarget(writingRenderTarget.current);
    gl.clear();
    gl.render(scene, camera);
    gl.setRenderTarget(null);

    // handle texture update
    const texture = writingRenderTarget.current.texture;

    if (targetMaterialRef?.current?.uniforms) {
      targetMaterialRef.current.uniforms.uFboTexture.value = texture;
    }

    // swap render targets
    const temp = readingRenderTarget.current;
    readingRenderTarget.current = writingRenderTarget.current;
    writingRenderTarget.current = temp;
  });

  const updateMaterial = useCallback(
    (updater: (_material: ShaderMaterial) => void) => updater(material),
    [material]
  );

  return {
    updateMaterial,
  };
};

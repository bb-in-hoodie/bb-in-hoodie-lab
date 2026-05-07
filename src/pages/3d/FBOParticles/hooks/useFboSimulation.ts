import { useFBO } from "@react-three/drei";
import { ThreeElements, useFrame } from "@react-three/fiber";
import { useCallback, useMemo } from "react";
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
  const renderTarget = useFBO(...fboSettings);

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
    gl.setRenderTarget(renderTarget);
    gl.clear();
    gl.render(scene, camera);
    gl.setRenderTarget(null);

    if (targetMaterialRef?.current?.uniforms) {
      targetMaterialRef.current.uniforms.uFboTexture.value =
        renderTarget.texture;
    }
  });

  const updateMaterial = useCallback(
    (updater: (_material: ShaderMaterial) => void) => updater(material),
    [material]
  );

  return {
    updateMaterial,
  };
};

import { useFBO } from "@react-three/drei";
import { ThreeElements, useFrame } from "@react-three/fiber";
import { useCallback, useMemo, useRef } from "react";
import {
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
} from "three";

export interface UseFboSimulationParams {
  FboMaterialClass: typeof ShaderMaterial;
  fboSettings: Parameters<typeof useFBO>;
  targetMaterialRef?: React.RefObject<ThreeElements["shaderMaterial"] | null>;
}

type InitPhase = "idle" | "init" | "active";

export const useFboSimulation = ({
  FboMaterialClass,
  targetMaterialRef,
  fboSettings,
}: UseFboSimulationParams) => {
  // needs two fbo render targets to swap their roles on each frame (ping-pong)
  const renderTargetA = useFBO(...fboSettings);
  const renderTargetB = useFBO(...fboSettings);

  const readingRenderTarget = useRef(renderTargetA);
  const writingRenderTarget = useRef(renderTargetB);

  const initPhaseRef = useRef<InitPhase>("idle");

  const { scene, camera, material } = useMemo(() => {
    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    camera.position.z = 0;

    const plane = new PlaneGeometry(2, 2);
    const material = new FboMaterialClass();
    const mesh = new Mesh(plane, material);
    scene.add(mesh);

    return { scene, camera, material };
  }, [FboMaterialClass]);

  useFrame(({ gl }, delta) => {
    // clamp delta time so a long pause doesn't blow up the spring on resume
    material.uniforms.uDeltaTime.value = Math.min(delta, 1 / 30);

    // pass the previous texture to the material
    material.uniforms.uLatestFboTexture.value =
      readingRenderTarget.current.texture;

    // set to "init" from outside once a target texture is ready (see requestInitializationOnce)
    const shouldInitialize = initPhaseRef.current === "init";
    material.uniforms.uShouldInitialize.value = shouldInitialize;

    // simulate
    gl.setRenderTarget(writingRenderTarget.current);
    gl.clear();
    gl.render(scene, camera);
    gl.setRenderTarget(null);

    if (shouldInitialize) {
      initPhaseRef.current = "active";
    }

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
    [material],
  );

  const requestInitializationOnce = useCallback(() => {
    if (initPhaseRef.current === "idle") {
      initPhaseRef.current = "init";
    }
  }, []);

  return {
    updateMaterial,
    /**
     * after a target texture is assigned, call this to fill the buffer with the target as the initial state
     * (only the first call switches the phase to "init")
     */
    requestInitializationOnce,
  };
};

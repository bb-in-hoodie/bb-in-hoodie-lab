import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import { BufferGeometry, Mesh } from "three";

interface Props {
  modelPath: string;
}

function GLTFGeometry({ modelPath }: Props) {
  const { scene } = useGLTF(modelPath);

  const geometry = useMemo(() => {
    let result: BufferGeometry | null = null;
    scene.traverse((child) => {
      if (!result && child instanceof Mesh) {
        result = child.geometry;
      }
    });
    return result;
  }, [scene]);

  if (!geometry) {
    return null;
  }

  return <primitive object={geometry} attach="geometry" />;
}

export default GLTFGeometry;

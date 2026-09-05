import { useGLTF } from "@react-three/drei";
import { BufferGeometry, Mesh } from "three";

interface Props {
  modelPath: string;
}

function GLTFGeometry({ modelPath }: Props) {
  const { scene } = useGLTF(modelPath);

  let geometry: BufferGeometry | null = null;

  scene.traverse((child) => {
    if (!geometry && child instanceof Mesh) {
      geometry = child.geometry;
    }
  });

  if (!geometry) {
    return null;
  }

  return <primitive object={geometry} attach="geometry" />;
}

export default GLTFGeometry;

export type ObjectSpec = {
  modelPath: string;
  position?: [number, number, number];
  rotation: [number, number, number];
  scale: number;
};

export type SampledData = {
  positions: Float32Array;
  normals: Float32Array;
};

export const OBJECT_KEYS = ["mobius", "flask", "computer"] as const;

export type ObjectKey = (typeof OBJECT_KEYS)[number];

export const OBJECT_SPECS: Record<ObjectKey, ObjectSpec> = {
  mobius: {
    modelPath: "/models/mobius.glb",
    rotation: [Math.PI * -0.1, Math.PI * 0.1, Math.PI * 0.1],
    scale: 3.5,
  },
  flask: {
    modelPath: "/models/flask.glb",
    position: [-1, 1.8, 0],
    rotation: [Math.PI * 0.1, 0, Math.PI * 0.07],
    scale: 1.6,
  },
  computer: {
    modelPath: "/models/computer.glb",
    position: [-1, 0.3, 0],
    rotation: [Math.PI * 0.06, Math.PI * 0.72, Math.PI * 0.02],
    scale: 4,
  },
};

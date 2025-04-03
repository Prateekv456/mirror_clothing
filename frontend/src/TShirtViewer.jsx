import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";

function TShirtModel({ position }) {
  const { scene } = useGLTF("/tshirt.glb");
  const modelRef = useRef();

  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.position.set(...position);
      console.log("🟢 Model position set to:", position);
    }
  }, [position]);

  return <primitive ref={modelRef} object={scene} scale={5} />;
}

export default function TShirtViewer({ pose }) {
  const chestPosition = pose
    ? [
        (pose.keypoints[11].x + pose.keypoints[12].x) / 2 / 100 - 3, // X
        (pose.keypoints[11].y + pose.keypoints[12].y) / 2 / 100 - 5, // Y
        -5, // 🔥 Move forward so it's visible
      ]
    : [0, 0, -5];

  console.log("🟢 Pose Data:", pose);
  console.log("📌 Chest Position:", chestPosition);

  return (
    <Canvas camera={{ position: [0, 2, 10], fov: 50 }} style={{ position: "absolute", zIndex: 2 }}>
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <Suspense fallback={<span>Loading 3D Model...</span>}>
        <TShirtModel position={chestPosition} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}

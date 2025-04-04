import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function TShirtModel() {
  const { scene } = useGLTF("/tshirt.glb"); // Ensure the correct path

  return <primitive object={scene} scale={1.5} />;
}

export default function TShirtViewer() {
  return (
    <Canvas
      camera={{ position: [0, 2, 5], fov: 50 }}
      style={{ width: "100vw", height: "100vh" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 2]} intensity={1} />
      <TShirtModel />
      <OrbitControls />
    </Canvas>
  );
}

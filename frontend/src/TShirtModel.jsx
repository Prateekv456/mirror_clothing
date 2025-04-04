import { useGLTF } from "@react-three/drei";

export default function TShirtModel({ position }) {
  const { scene } = useGLTF("/tshirt.glb");

  return <primitive object={scene} position={position} scale={1.2} />;
}

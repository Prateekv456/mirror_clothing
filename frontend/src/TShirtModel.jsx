import { useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";

export default function TShirtModel({ position }) {
  const { scene } = useGLTF("/tshirt.glb"); // Ensure it's in 'public/'
  const modelRef = useRef();

  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.position.set(...position);
      console.log("📌 Updated Model Position:", position);
    }
  }, [position]);

  return <primitive ref={modelRef} object={scene} scale={5} />;
}

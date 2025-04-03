import WebcamCanvas from "./WebcamCanvas";

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#000" }}>
      <WebcamCanvas />
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import TShirtViewer from "./TShirtViewer";

export default function WebcamCanvas() {
  const videoRef = useRef(null);
  const [pose, setPose] = useState(null);

  useEffect(() => {
    const initializeTF = async () => {
      await tf.setBackend("webgl");
      await tf.ready();
      console.log("TensorFlow.js Backend Ready:", tf.getBackend());
    };

    const startVideo = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
    };

    const loadPoseModel = async () => {
      await initializeTF();
      const detector = await poseDetection.createDetector(poseDetection.SupportedModels.BlazePose, {
        runtime: "tfjs",
      });

      const detectPose = async () => {
        if (videoRef.current && videoRef.current.readyState === 4) {
          const poses = await detector.estimatePoses(videoRef.current);
          if (poses.length > 0) {
            setPose(poses[0]);
          }
        }
        requestAnimationFrame(detectPose);
      };

      detectPose();
    };

    startVideo();
    loadPoseModel();
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
      <video ref={videoRef} autoPlay playsInline width={640} height={480} style={{ position: "absolute", zIndex: 1 }} />
      <TShirtViewer pose={pose} />
    </div>
  );
}

from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import mediapipe as mp
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

mp_pose = mp.solutions.pose
pose = mp_pose.Pose()
mp_drawing = mp.solutions.drawing_utils

@app.route('/process_frame', methods=['POST'])
def process_frame():
    file = request.files['image']
    if not file:
        return jsonify({"error": "No image received"}), 400
    
    # Read image from request
    file_bytes = np.frombuffer(file.read(), np.uint8)
    frame = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
    
    # Convert to RGB (required by Mediapipe)
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    
    # Process the frame with Mediapipe
    results = pose.process(frame_rgb)
    
    if results.pose_landmarks:
        landmarks = [{"x": lm.x, "y": lm.y, "z": lm.z} for lm in results.pose_landmarks.landmark]
    else:
        landmarks = []

    return jsonify({"landmarks": landmarks})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

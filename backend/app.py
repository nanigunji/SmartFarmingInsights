from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS to allow frontend access

# Load the trained model
model = joblib.load("/Users/shaazhussain/Downloads/mini-project-1/backend/stacking_pipeline.pkl")

# Optional: Crop mapping (if prediction outputs an encoded integer)
crop_labels = {
    0: "Wheat", 1: "Rice", 2: "Maize", 3: "Barley", 4: "Millet",
    5: "Sorghum", 6: "Soybean", 7: "Groundnut", 8: "Sugarcane",
    9: "Cotton", 10: "Jute", 11: "Tea", 12: "Coffee", 13: "Coconut",
    14: "Rubber", 15: "Tobacco", 16: "Pepper", 17: "Cardamom",
    18: "Cashew", 19: "Arecanut", 20: "Banana", 21: "Mango",
    22: "Orange", 23: "Pineapple", 24: "Grapes", 25: "Apple"
}

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json  # Get JSON data from React
        
        # Ensure all required fields exist
        required_fields = ["nitrogen", "phosphorus", "potassium", "temperature", "humidity", "ph", "rainfall"]
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing one or more required fields"}), 400
        
        # Convert input data to NumPy array
        features = np.array([
            data["nitrogen"], data["phosphorus"], data["potassium"], 
            data["temperature"], data["humidity"], data["ph"], data["rainfall"]
        ]).reshape(1, -1)  # Convert to 2D array
        
        # Make prediction
        prediction = model.predict(features)[0]  # Extract single prediction
        
        # Convert prediction to a readable crop name (if applicable)
        recommended_crop = crop_labels.get(int(prediction), str(prediction))

        return jsonify({"recommended_crop": recommended_crop})

    except Exception as e:
        return jsonify({"error": str(e)}), 400  # Return error response

if __name__ == '__main__':
    app.run(debug=True)

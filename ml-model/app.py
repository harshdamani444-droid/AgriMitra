# from flask import Flask, request, jsonify
# import numpy as np
# import pickle
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)

# # Load both models
# soil_model = pickle.load(open("soil_model.pkl", "rb"))
# crop_model = pickle.load(open("crop_recommendation_model.pkl", "rb"))

# @app.route("/predict/soil", methods=["POST"])
# def predict_soil():
#     try:
#         data = request.get_json()
#         if "features" not in data:
#             return jsonify({"error": "Missing 'features' key in request"}), 400
        
#         input_features = np.array(data["features"]).reshape(1, -1)
#         prediction = soil_model.predict(input_features)
#         predicted_fertility = int(prediction[0])

#         return jsonify({"fertility": predicted_fertility})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# @app.route("/predict/crop", methods=["POST"])
# def predict_crop():
#     try:
#         data = request.get_json()
#         if "features" not in data:
#             return jsonify({"error": "Missing 'features' key in request"}), 400
        
#         input_features = np.array(data["features"]).reshape(1, -1)
#         prediction = crop_model.predict(input_features)
#         predicted_crop = prediction[0]

#         return jsonify({"recommended_crop": predicted_crop})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == "__main__":
#     app.run(debug=True)











# from flask import Flask, request, jsonify
# import numpy as np
# import pickle
# from flask_cors import CORS
# import logging

# # Configure logging
# logging.basicConfig(level=logging.DEBUG)
# logger = logging.getLogger(__name__)

# app = Flask(__name__)
# CORS(app)

# # Load models with error handling
# try:
#     with open("soil_model.pkl", "rb") as f:
#         soil_model = pickle.load(f)
#     with open("crop_recommendation_model.pkl", "rb") as f:
#         crop_model = pickle.load(f)
#     logger.info("Models loaded successfully")
# except Exception as e:
#     logger.error(f"Error loading models: {e}")
#     raise

# @app.route("/predict/soil", methods=["POST", "OPTIONS"])
# def predict_soil():
#     if request.method == "OPTIONS":
#         return jsonify({}), 200
    
#     try:
#         data = request.get_json()
#         logger.debug(f"Soil prediction request data: {data}")
        
#         if "features" not in data:
#             return jsonify({"error": "Missing 'features' key in request"}), 400
        
#         input_features = np.array(data["features"]).reshape(1, -1)
#         logger.debug(f"Input features shape: {input_features.shape}")
        
#         prediction = soil_model.predict(input_features)
#         predicted_fertility = int(prediction[0])
#         logger.debug(f"Predicted fertility: {predicted_fertility}")

#         return jsonify({"fertility": predicted_fertility})
#     except Exception as e:
#         logger.error(f"Error in soil prediction: {str(e)}", exc_info=True)
#         return jsonify({"error": str(e)}), 500

# @app.route("/predict/crop", methods=["POST", "OPTIONS"])
# def predict_crop():
#     if request.method == "OPTIONS":
#         return jsonify({}), 200
    
#     try:
#         data = request.get_json()
#         logger.debug(f"Crop prediction request data: {data}")
        
#         if "features" not in data:
#             return jsonify({"error": "Missing 'features' key in request"}), 400
        
#         input_features = np.array(data["features"]).reshape(1, -1)
#         logger.debug(f"Input features shape: {input_features.shape}")
        
#         prediction = crop_model.predict(input_features)
#         predicted_crop = prediction[0]
#         logger.debug(f"Predicted crop: {predicted_crop}")

#         return jsonify({"recommended_crop": predicted_crop})
#     except Exception as e:
#         logger.error(f"Error in crop prediction: {str(e)}", exc_info=True)
#         return jsonify({"error": str(e)}), 500

# if __name__ == "__main__":
#     app.run(debug=True)







from flask import Flask, request, jsonify
import numpy as np
import pickle
from flask_cors import CORS
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Load all models and encoders
try:
    with open("./Soil_fertility_prediction_model/soil_model.pkl", "rb") as f:
        soil_model = pickle.load(f)
    with open("./Crop_recommendation_model/crop_recommendation_model.pkl", "rb") as f:
        crop_model = pickle.load(f)
    with open("./Fertilizer_prediction_model/fertilizer_recommendation_model.pkl", "rb") as f:
        fertilizer_model = pickle.load(f)
    with open("./Fertilizer_prediction_model/fertilizer_label_encoders.pkl", "rb") as f:
        label_encoders = pickle.load(f)
    logger.info("All models loaded successfully")
except Exception as e:
    logger.error(f"Error loading models: {e}")
    raise

@app.route("/predict/soil", methods=["POST", "OPTIONS"])
def predict_soil():
    if request.method == "OPTIONS":
        return jsonify({}), 200
    
    try:
        data = request.get_json()
        logger.debug(f"Soil prediction request data: {data}")
        
        if "features" not in data:
            return jsonify({"error": "Missing 'features' key in request"}), 400
        
        input_features = np.array(data["features"]).reshape(1, -1)
        prediction = soil_model.predict(input_features)
        predicted_fertility = int(prediction[0])

        return jsonify({"fertility": predicted_fertility})
    except Exception as e:
        logger.error(f"Error in soil prediction: {str(e)}", exc_info=True)
        return jsonify({"error": str(e)}), 500

@app.route("/predict/crop", methods=["POST", "OPTIONS"])
def predict_crop():
    if request.method == "OPTIONS":
        return jsonify({}), 200
    
    try:
        data = request.get_json()
        logger.debug(f"Crop prediction request data: {data}")
        
        if "features" not in data:
            return jsonify({"error": "Missing 'features' key in request"}), 400
        
        input_features = np.array(data["features"]).reshape(1, -1)
        prediction = crop_model.predict(input_features)
        predicted_crop = prediction[0]

        return jsonify({"recommended_crop": predicted_crop})
    except Exception as e:
        logger.error(f"Error in crop prediction: {str(e)}", exc_info=True)
        return jsonify({"error": str(e)}), 500

# @app.route("/predict/fertilizer", methods=["POST", "OPTIONS"])
# def predict_fertilizer():
#     if request.method == "OPTIONS":
#         return jsonify({}), 200
    
#     try:
#         data = request.get_json()
#         logger.debug(f"Fertilizer prediction request data: {data}")
        
#         if not all(key in data for key in ['temperature', 'humidity', 'moisture', 'soil_type', 'crop_type', 'nitrogen', 'potassium', 'phosphorous']):
#             return jsonify({"error": "Missing required parameters"}), 400

#         # Encode soil type and crop type
#         try:
#             soil_type_encoded = label_encoders['soil_type'][data['soil_type']]
#             crop_type_encoded = label_encoders['crop_type'][data['crop_type']]
#         except KeyError as e:
#             return jsonify({"error": f"Invalid {str(e)} value"}), 400

#         # Prepare features in correct order
#         features = [
#             float(data['temperature']),
#             float(data['humidity']),
#             float(data['moisture']),
#             soil_type_encoded,
#             crop_type_encoded,
#             float(data['nitrogen']),
#             float(data['potassium']),
#             float(data['phosphorous'])
#         ]

#         input_features = np.array(features).reshape(1, -1)
#         prediction = fertilizer_model.predict(input_features)
#         recommended_fertilizer = prediction[0]

#         return jsonify({"recommended_fertilizer": recommended_fertilizer})
#     except Exception as e:
#         logger.error(f"Error in fertilizer prediction: {str(e)}", exc_info=True)
#         return jsonify({"error": str(e)}), 500


@app.route("/predict/fertilizer", methods=["POST", "OPTIONS"])
def predict_fertilizer():
    if request.method == "OPTIONS":
        return jsonify({}), 200

    try:
        data = request.get_json()
        logger.debug(f"Fertilizer prediction request data: {data}")

        if "features" not in data or len(data["features"]) != 8:
            return jsonify({"error": "Invalid input: 'features' must be an array of length 8"}), 400

        # Extract features
        features = data["features"]

        # Encode soil type and crop type
        try:
            soil_type_encoded = label_encoders["soil_type"][features[3]]
            crop_type_encoded = label_encoders["crop_type"][features[4]]
        except KeyError as e:
            return jsonify({"error": f"Invalid value for {str(e)}"}), 400

        # Prepare features with encoded values
        input_features = np.array([
            float(features[0]),  # temperature
            float(features[1]),  # humidity
            float(features[2]),  # moisture
            soil_type_encoded,   # encoded soil type
            crop_type_encoded,   # encoded crop type
            float(features[5]),  # nitrogen
            float(features[6]),  # potassium
            float(features[7])   # phosphorous
        ]).reshape(1, -1)

        # Predict fertilizer
        prediction = fertilizer_model.predict(input_features)
        recommended_fertilizer = prediction[0]

        return jsonify({"recommended_fertilizer": recommended_fertilizer})
    except Exception as e:
        logger.error(f"Error in fertilizer prediction: {str(e)}", exc_info=True)
        return jsonify({"error": str(e)}), 500



if __name__ == "__main__":
    app.run(debug=True)
import React, { useState } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";
import axios from "axios";

function CottonPrediction() {
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      setLoading(true);
      const res = await axios.post(
        `${API_URL}/predict/cotton-leaf-disease-prediction`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setPrediction(res.data.data); // Adjust according to your API response
    } catch (error) {
      console.error("Prediction Error:", error);
      setPrediction("Error during prediction.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setPreview(null);
    setPrediction(null);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow m-10">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-green-600 text-center">
        <ImageIcon />
        <h2 className="text-center">Cotton Disease Detection</h2>
      </h2>
      <p className="text-gray-600 mb-4">
        Upload an image of your cotton plant leaf to detect diseases. This tool
        uses machine learning to analyze the image and provide a prediction.
      </p>
      <p className="text-gray-600 mb-4">
        Supported formats: PNG, JPG, JPEG. Max size: 10MB.
      </p>
      <p className="text-gray-600 mb-4">
        Note: Ensure the image is clear and well-lit for better accuracy.
      </p>
      <p className="text-gray-600 mb-4">
        This tool is for educational purposes and may not be 100% accurate.
      </p>
      <p className="text-gray-600 mb-4">
        Always consult a professional for accurate diagnosis and treatment.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Image
          </label>
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="h-32 w-32 object-cover rounded-md border mb-4"
            />
          )}
          <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <label
                htmlFor="image-upload"
                className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500"
              >
                <span>Upload a file</span>
                <input
                  id="image-upload"
                  name="image"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleImageChange}
                />
              </label>
              <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 10MB</p>
            </div>
          </div>
        </div>

        {/* Submit & Reset Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading || !selectedImage}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Predicting..." : "Predict"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
          >
            Reset
          </button>
        </div>

        {/* Prediction Result */}
        {prediction && (
          <div className="mt-4 p-4 bg-green-50 text-green-800 border border-green-200 rounded-md">
            <strong>Prediction:</strong> {prediction.predicted_class}
            <br />
            <strong>Confidence:</strong> {prediction.confidence}
          </div>
        )}
      </form>
    </div>
  );
}

export default CottonPrediction;

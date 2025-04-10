import React, { useState } from "react";
import { RotateCcw, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import YardIcon from "@mui/icons-material/Yard";
import axios from "axios";

function CropYieldPrediction() {
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const [formData, setFormData] = useState({
    Soil_Type: "Sandy",
    Crop: "Cotton",
    Rainfall_mm: 897.077,
    Temperature_Celsius: 27.68,
    Fertilizer_Used: false,
    Irrigation_Used: true,
    Weather_Condition: "Cloudy",
    Days_to_Harvest: 122,
  });

  const initialValue = {
    Soil_Type: "Sandy",
    Crop: "Cotton",
    Rainfall_mm: 897.077,
    Temperature_Celsius: 27.68,
    Fertilizer_Used: false,
    Irrigation_Used: true,
    Weather_Condition: "Cloudy",
    Days_to_Harvest: 122,
  };

  const [predictedYield, setPredictedYield] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue;

    if (type === "checkbox") {
      newValue = checked;
    } else if (type === "number") {
      newValue = parseFloat(value);
    } else {
      newValue = value;
    }

    setFormData({ ...formData, [name]: newValue });
  };

  const handleReset = (e) => {
    e.preventDefault();
    setFormData(initialValue);
    setPredictedYield(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${API_URL}/predict/crop-yield-prediction`,
        formData
      );

      setPredictedYield(res.data.data.predicted_yield_tons_per_hectare);
    } catch (error) {
      // console.error("Prediction failed", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 rounded-xl shadow-lg bg-white m-10">
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
        <Leaf className="text-green-600" />
        Crop Yield Prediction
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Soil Type</label>
          <input
            type="text"
            name="Soil_Type"
            value={formData.Soil_Type}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label>Crop</label>
          <input
            type="text"
            name="Crop"
            value={formData.Crop}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label>Rainfall (mm)</label>
          <input
            type="number"
            name="Rainfall_mm"
            value={formData.Rainfall_mm}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label>Temperature (°C)</label>
          <input
            type="number"
            name="Temperature_Celsius"
            value={formData.Temperature_Celsius}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="flex items-center space-x-4">
          <label>
            <input
              type="checkbox"
              name="Fertilizer_Used"
              checked={formData.Fertilizer_Used}
              onChange={handleChange}
            />
            Fertilizer Used
          </label>

          <label>
            <input
              type="checkbox"
              name="Irrigation_Used"
              checked={formData.Irrigation_Used}
              onChange={handleChange}
            />
            Irrigation Used
          </label>
        </div>

        <div>
          <label>Weather Condition</label>
          <input
            type="text"
            name="Weather_Condition"
            value={formData.Weather_Condition}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label>Days to Harvest</label>
          <input
            type="number"
            name="Days_to_Harvest"
            value={formData.Days_to_Harvest}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Predict Yield
          </button>

          <button
            onClick={handleReset}
            className="flex items-center text-gray-600 hover:text-black"
          >
            <RotateCcw className="mr-1" />
            Reset
          </button>
        </div>
      </form>

      {predictedYield !== null && (
        <div className="mt-6 bg-green-100 p-4 rounded text-green-800">
          <strong>Predicted Yield:</strong> {predictedYield} tons/ha
        </div>
      )}
    </div>
  );
}

export default CropYieldPrediction;

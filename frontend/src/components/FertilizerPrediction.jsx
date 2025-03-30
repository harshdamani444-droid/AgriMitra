import React, { useState } from "react";
import { Archive, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import YardIcon from "@mui/icons-material/Yard";
import InputML from "./InputML";
import axios from "axios";

function FertilizerPrediction() {
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const [formData, setFormData] = useState({
    temperature: 37.0,
    humidity: 70.0,
    moisture: 32.0,
    nitrogen: 12.0,
    potassium: 0.0,
    phosphorous: 39.0,
    soil_type: "",
    crop_type: "",
  });

  const intialValue = {
    temperature: 37.0,
    humidity: 70.0,
    moisture: 32.0,
    nitrogen: 12.0,
    potassium: 0.0,
    phosphorous: 39.0,
    soil_type: "",
    crop_type: "",
  };

  const label = [
    "Temperature (°C)",
    "Humidity (%)",
    "Moisture (%)",
    "Nitrogen (N)",
    "Potassium (K)",
    "Phosphorous (P)",
  ];

  const name = [
    "temperature",
    "humidity",
    "moisture",
    "nitrogen",
    "potassium",
    "phosphorous",
  ];

  const [error, setError] = useState();

  const soilTypes = ["Black", "Clayey", "Loamy", "Red", "Sandy"];

  const [recommended_fertilizer, setRecommendedFertilizer] = useState("");

  const cropTypes = [
    "Maize",
    "Sugarcane",
    "Cotton",
    "Tobacco",
    "Paddy",
    "Barley",
    "Wheat",
    "Millets",
    "Ground Nuts",
    "Oil seeds",
    "Pulses",
  ];

  const handleReset = (e) => {
    e.preventDefault();
    setFormData(intialValue);
    setRecommendedFertilizer("");
  };

  const handleChange = (e) => {
    setError(null);
    if (e.target.value === "") {
      setFormData({ ...formData, [e.target.name]: "" });
      return;
    }
    setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) });
  };

  const handleSoilChange = (e) => {
    setError(null);
    setFormData({ ...formData, soil_type: e.target.value });
  };

  const handleCropChange = (e) => {
    setError(null);
    setFormData({ ...formData, crop_type: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.crop_type === "") {
      setError("Please select a crop type");
      return;
    }

    if (formData.soil_type === "") {
      setError("Please select a soil type");
      return;
    }

    try {
      const response = await axios
        .post(`${API_URL}/predict/fertilizer-prediction`, formData, {
          withCredentials: true,
        })
        .then((res) => res.data);
      setRecommendedFertilizer(response.data.recommended_fertilizer);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <Archive size={35} className="text-green-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Predict required fertilizer
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6">
              {name.map((item, index) => (
                <InputML
                  key={index}
                  formData={formData}
                  handleChange={handleChange}
                  label={label[index]}
                  name={item}
                />
              ))}

              <div>
                <label
                  htmlFor="crop_type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Crop Type
                </label>
                <select
                  id="crop_type"
                  name="crop_type"
                  required
                  onChange={handleCropChange}
                  value={formData.crop_type} // Set value to state variable
                  className="block w-full mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                >
                  <option value="" disabled>
                    Select Crop Type
                  </option>
                  {cropTypes.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="soil_type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Soil Type
                </label>
                <select
                  id="soil_type"
                  name="soil_type"
                  required
                  onChange={handleSoilChange}
                  value={formData.soil_type} // Set value to state variable
                  className="block w-full mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                >
                  <option value="" disabled>
                    Select Soil Type
                  </option>
                  {soilTypes.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {error && (
                <div className="p-4">
                  <div className="flex justify-start items-center">
                    <h3 className="text-md font-medium text-red-600">
                      *{error}
                    </h3>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-12 gap-2">
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="w-full flex col-span-10 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Predict
                </button>
                <button
                  onClick={handleReset}
                  className="w-full col-span-2 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <RotateCcw />
                </button>
              </div>
            </form>
          </div>
        </div>

        {recommended_fertilizer && (
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white p-4 shadow sm:rounded-lg sm:px-10 flex justify-center items-center">
              <p className="text-center text-xl">Recommanded fertilizer is </p>
              <p className="font-bold text-2xl text-green-600 ml-2 capitalize">
                {recommended_fertilizer}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default FertilizerPrediction;

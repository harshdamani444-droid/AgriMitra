import React, { useState } from "react";
import { Wheat, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import YardIcon from "@mui/icons-material/Yard";
import InputML from "./InputML";
import axios from "axios";

function CropPrediction() {
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const [formData, setFormData] = useState({
    N: 90,
    P: 42,
    K: 43,
    temperature: 20.87,
    humidity: 82.01,
    ph: 6.51,
    rainfall: 202.93,
  });

  const intialValue = {
    N: 90,
    P: 42,
    K: 43,
    temperature: 20.87,
    humidity: 82.01,
    ph: 6.51,
    rainfall: 202.93,
  };

  const label = [
    "Nitrogen (N)",
    "Phosphorus (P)",
    "Potassium (K)",
    "Temperature",
    "Humidity",
    "pH",
    "Rainfall",
  ];

  const name = ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"];

  const [recommandedCrop, setRecommandedCrop] = useState("");

  const handleReset = (e) => {
    e.preventDefault();
    setFormData(intialValue);
    setRecommandedCrop("");
  };

  const handleChange = (e) => {
    if (e.target.value === "") {
      setFormData({ ...formData, [e.target.name]: "" });
      return;
    }
    setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios
      .post(`${API_URL}/predict/crop-prediction`, formData, {
        withCredentials: true,
      })
      .then((res) => res.data);

    // console.log(response);
    setRecommandedCrop(response.data.recommended_crop);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <Wheat size={35} className="text-green-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Predict best crop
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

        {recommandedCrop && (
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white p-4 shadow sm:rounded-lg sm:px-10 flex justify-center items-center">
              <p className="text-center text-xl">The best crop to grow is</p>
              <p className="font-bold text-2xl text-green-600 ml-2 capitalize">
                {recommandedCrop}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CropPrediction;

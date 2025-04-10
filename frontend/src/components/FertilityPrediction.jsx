import React, { useState } from "react";
import { RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import YardIcon from "@mui/icons-material/Yard";
import InputML from "./InputML";
import axios from "axios";

function FertilityPrediction() {
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const [formData, setFormData] = useState({
    N: 358,
    P: 13.2,
    K: 444,
    ph: 7.8,
    ec: 0.29,
    oc: 0.49,
    S: 4.52,
    zn: 0.26,
    fe: 5.26,
    cu: 1.25,
    Mn: 6.25,
    B: 0.48,
  });

  const intialValue = {
    N: 358,
    P: 13.2,
    K: 444,
    ph: 7.8,
    ec: 0.29,
    oc: 0.49,
    S: 4.52,
    zn: 0.26,
    fe: 5.26,
    cu: 1.25,
    Mn: 6.25,
    B: 0.48,
  };

  const label = [
    "Nitrogen (N)",
    "Phosphorus (P)",
    "Potassium (K)",
    "pH",
    "Electrical Conductivity (EC)",
    "Organic Carbon (OC)",
    "Sulphur (S)",
    "Zinc (Zn)",
    "Iron (Fe)",
    "Copper (Cu)",
    "Manganese (Mn)",
    "Boron (B)",
  ];

  const name = [
    "N",
    "P",
    "K",
    "ph",
    "ec",
    "oc",
    "S",
    "zn",
    "fe",
    "cu",
    "Mn",
    "B",
  ];

  const fertilityType = {
    0: "Low",
    1: "Moderate",
    2: "High",
  };

  const [fertility, setFertility] = useState();

  const handleReset = (e) => {
    e.preventDefault();
    setFormData(intialValue);
    setFertility(null);
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
      .post(`${API_URL}/predict/soil-fertility-prediction`, formData, {
        withCredentials: true,
      })
      .then((res) => res.data);

    // console.log(response);
    setFertility(response.data.fertility + 1);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <YardIcon fontSize="large" className="text-green-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Predict soil fertility
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

        {fertility && (
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white p-4 shadow sm:rounded-lg sm:px-10 flex justify-center items-center">
              {fertility === 1 && (
                <p className="font-bold text-2xl text-red-500">
                  Soil Fertility : {fertilityType[fertility - 1]}
                </p>
              )}

              {fertility === 2 && (
                <p className="font-bold text-2xl text-yellow-500">
                  Soil Fertility : {fertilityType[fertility - 1]}
                </p>
              )}

              {fertility === 3 && (
                <p className="font-bold text-2xl text-green-500">
                  Soil Fertility : {fertilityType[fertility - 1]}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default FertilityPrediction;

import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Archive,
  Wheat,
  Apple,
  Flower2,
  MountainSnow,
  Sprout,
} from "lucide-react";
import YardIcon from "@mui/icons-material/Yard";

const MLPredictionPage = () => {
  const navigate = useNavigate();

  const models = [
    {
      title: "Fertilizer Prediction",
      description: "Get accurate fertilizer recommendations for your crops.",
      icon: <Archive className="h-7 w-7 text-green-600" />,
      route: "/fertilizer",
    },
    {
      title: "Soil Fertility Prediction",
      description: "Analyze your soil's fertility and optimize your yields.",
      icon: <YardIcon className="text-green-600" fontSize="medium" />,
      route: "/fertility",
    },
    {
      title: "Crop Prediction",
      description:
        "Predict the most suitable crop for your land and conditions.",
      icon: <Wheat className="h-7 w-7 text-green-600" />,
      route: "/crop",
    },
    {
      title: "Crop Yield Prediction",
      description: "Estimate your crop yield using machine learning models.",
      icon: <Sprout className="h-7 w-7 text-green-600" />,
      route: "/crop-yield",
    },
    {
      title: "Mango Disease Detection",
      description: "Detect common mango plant diseases using image analysis.",
      icon: <Apple className="h-7 w-7 text-green-600" />,
      route: "/mango-prediction",
    },
    {
      title: "Rice Type Prediction",
      description: "Identify different rice varieties using AI.",
      icon: <MountainSnow className="h-7 w-7 text-green-600" />,
      route: "/rice-prediction",
    },
    {
      title: "Cotton Disease Detection",
      description: "Get instant detection of diseases affecting cotton plants.",
      icon: <Flower2 className="h-7 w-7 text-green-600" />,
      route: "/cotton-prediction",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-green-700 mb-12">
          Smart Agriculture ML Tools
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {models.map((model, index) => (
            <div
              key={index}
              onClick={() => navigate(model.route)}
              className="group cursor-pointer bg-white shadow-xl rounded-2xl p-6 transition-transform hover:scale-105 hover:shadow-2xl border border-green-100"
            >
              <div className="flex items-center justify-center w-14 h-14 bg-green-100 rounded-full mb-4">
                {model.icon}
              </div>
              <h2 className="text-xl font-semibold text-gray-800 group-hover:text-green-600">
                {model.title}
              </h2>
              <p className="text-gray-500 mt-2 text-sm">{model.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MLPredictionPage;

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import axios from "axios";

const predictSoilFertily = async (req, res) => {
    const requiredFields = ["N", "P", "K", "ph", "ec", "oc", "S", "zn", "fe", "cu", "Mn", "B"];
    for (const field of requiredFields) {
        if (!req.body.hasOwnProperty(field) || req.body[field] === "") {
            return res.status(400).json({ error: `Field "${field}" is required and cannot be empty.` });
        }
    }
    const featureArray = requiredFields.map(field => Number(req.body[field]));

    try {
        const response = await axios.post("http://localhost:5000/predict/soil", {
            features: featureArray
        });
        return res.status(200).json(new ApiResponse({
            statusCode: 200,
            data: response.data,
            message: "Soil fertility prediction generated successfully"
        }));
    } catch (error) {
        throw new ApiError(500, "Token generation failed", error);
    }
};

const predictCrop = async (req, res) => {
    const requiredFields = ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"];
    for (const field of requiredFields) {
        if (!req.body.hasOwnProperty(field) || req.body[field] === "") {
            return res.status(400).json({ error: `Field "${field}" is required and cannot be empty.` });
        }
    }
    const featureArray = requiredFields.map(field => Number(req.body[field]));

    try {
        const response = await axios.post("http://localhost:5000/predict/crop", {
            features: featureArray
        });
        return res.status(200).json(new ApiResponse({
            statusCode: 200,
            data: response.data,
            message: "Crop prediction generated successfully"
        }));
    } catch (error) {
        throw new ApiError(500, "Token generation failed", error);
    }
};

const predictFertilizer = async (req, res) => {
    const requiredFields = ["temperature", "humidity", "moisture", "soil_type", "crop_type", "nitrogen", "potassium", "phosphorous"];
    for (const field of requiredFields) {
        if (!req.body.hasOwnProperty(field) || req.body[field] === "") {
            return res.status(400).json({ error: `Field "${field}" is required and cannot be empty.` });
        }
    }

    if (!["Black", "Clayey", "Loamy", "Red", "Sandy"].includes(req.body.soil_type)) {
        return res.status(400).json({ error: `Invalid soil type.` });
    }

    if (!["Maize", "Sugarcane", "Cotton", "Tobacco", "Paddy", "Barley", "Wheat", "Millets", "Ground Nuts", "Oil seeds", "Pulses"].includes(req.body.crop_type)) {
        return res.status(400).json({ error: `Invalid crop type.` });
    }

    const featureArray = [
        Number(req.body.temperature),
        Number(req.body.humidity),
        Number(req.body.moisture),
        req.body.soil_type,
        req.body.crop_type,
        Number(req.body.nitrogen),
        Number(req.body.potassium),
        Number(req.body.phosphorous)
    ];

    try {
        const response = await axios.post("http://localhost:5000/predict/fertilizer", {
            features: featureArray
        });
        return res.status(200).json(new ApiResponse({
            statusCode: 200,
            data: response.data,
            message: "Fertilizer prediction generated successfully"
        }));
    } catch (error) {
        throw new ApiError(500, "Token generation failed", error);
    }
};

const predictRice = asyncHandler(async (req, res) => {
    if (!req?.files?.image?.[0]?.path) {
        throw new ApiError(400, "Image is required");
    }

    const imageLocalPath = req.files.image[0].path;

    try {
        const response = await axios.post("http://localhost:5000/predict/rice", {
            image_path: imageLocalPath,
        });

        return res.status(200).json(new ApiResponse({
            statusCode: 200,
            data: response.data,
            message: "Rice prediction generated successfully",
        }));
    } catch (error) {
        throw new ApiError(500, "Rice prediction failed", error);
    }
});

const predictCottonLeafDisease = asyncHandler(async (req, res) => {
    if (!req?.files?.image?.[0]?.path) {
        throw new ApiError(400, "Image is required");
    }

    const imageLocalPath = req.files.image[0].path;

    try {
        const response = await axios.post("http://localhost:5000/predict/cotton", {
            image_path: imageLocalPath,
        });

        return res.status(200).json(new ApiResponse({
            statusCode: 200,
            data: response.data,
            message: "Cotton leaf disease prediction generated successfully",
        }));
    } catch (error) {
        throw new ApiError(500, "Cotton leaf disease prediction failed", error);
    }
});

const predictCropYieldPrediction = asyncHandler(async (req, res) => {
    const requiredFields = [
        "Soil_Type", "Crop", "Weather_Condition",
        "Temperature_Celsius", "Rainfall_mm", "Days_to_Harvest",
        "Fertilizer_Used", "Irrigation_Used"
    ];

    for (const field of requiredFields) {
        if (!req.body.hasOwnProperty(field) || req.body[field] === "") {
            return res.status(400).json({ error: `Field "${field}" is required and cannot be empty.` });
        }
    }

    const inputData = {
        Soil_Type: req.body.Soil_Type,
        Crop: req.body.Crop,
        Weather_Condition: req.body.Weather_Condition,
        Temperature_Celsius: Number(req.body.Temperature_Celsius),
        Rainfall_mm: Number(req.body.Rainfall_mm),
        Days_to_Harvest: Number(req.body.Days_to_Harvest),
        Fertilizer_Used: req.body.Fertilizer_Used === "true" || req.body.Fertilizer_Used === true,
        Irrigation_Used: req.body.Irrigation_Used === "true" || req.body.Irrigation_Used === true
    };

    try {
        const response = await axios.post("http://localhost:5000/predict/yield", inputData);

        return res.status(200).json(new ApiResponse({
            statusCode: 200,
            data: response.data,
            message: "Crop yield prediction generated successfully"
        }));
    } catch (error) {
        throw new ApiError(500, "Crop yield prediction failed", error);
    }
});


export { predictSoilFertily, predictCrop, predictFertilizer, predictRice, predictCottonLeafDisease, predictCropYieldPrediction };

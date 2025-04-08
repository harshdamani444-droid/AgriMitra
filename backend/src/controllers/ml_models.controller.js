import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import path from "path";

const predictSoilFertily = async (req, res) => {
    const requiredFields = ["N", "P", "K", "ph", "ec", "oc", "S", "zn", "fe", "cu", "Mn", "B"];

    // Ensure all required fields are present and not empty
    for (const field of requiredFields) {
        if (!req.body.hasOwnProperty(field) || req.body[field] === "") {
            return res.status(400).json({ error: `Field "${field}" is required and cannot be empty.` });
        }
    }

    // Convert named fields into an array
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

    // Validate all required fields
    for (const field of requiredFields) {
        if (!req.body.hasOwnProperty(field) || req.body[field] === "") {
            return res.status(400).json({ error: `Field "${field}" is required and cannot be empty.` });
        }
    }

    // Convert named fields into an array
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

    // Validate all required fields
    for (const field of requiredFields) {
        if (!req.body.hasOwnProperty(field) || req.body[field] === "") {
            return res.status(400).json({ error: `Field "${field}" is required and cannot be empty.` });
        }
    }

    if (!["Black", "Clayey", "Loamy", "Red", "Sandy"].includes(req.body.soil_type)) {
        return res.status(400).json({ error: `Invalid soil type. Must be one of: "clay", "silt", "loam"` });
    }

    if (!["Maize", "Sugarcane", "Cotton", "Tobacco", "Paddy", "Barley", "Wheat", "Millets", "Ground Nuts", "Oil seeds", "Pulses"].includes(req.body.crop_type)) {
        return res.status(400).json({ error: `Invalid crop type. Must be one of: "rice", "wheat", "maize", "cotton", "sugarcane"` });
    }

    // Convert named fields into an array
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

export { predictSoilFertily, predictCrop, predictFertilizer };

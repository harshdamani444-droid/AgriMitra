import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import path from "path";
const API_URL = process.env.PYTHON_API_URL;

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
        const response = await axios.post(`${API_URL}/predict/soil`, {
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
        const response = await axios.post(`${API_URL}/predict/crop`, {
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
        const response = await axios.post(`${API_URL}/predict/fertilizer`, {
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

const predictMango = async (req, res) => {
    const image = req.file.path;

    if (!image) {
        return res.status(400).json({ error: "Image file is required" });
    }

    const form = new FormData();
    form.append('image', fs.createReadStream(image));
    try {
        const response = await axios.post(`${API_URL}/predict/mango`, form, {
            headers: form.getHeaders(),
        });

        fs.unlink(image, (err) => {
            throw new ApiError(500, "Image deletion failed", err);
        });

        return res.status(200).json(new ApiResponse({
            statusCode: 200,
            data: response.data,
            message: "Mango Leaf Disease prediction generated successfully"
        }));


    } catch (error) {
        fs.unlink(image, (err) => {

        });
        throw new ApiError(500, "Token generation failed", error);

    }

}

const predictRice = asyncHandler(async (req, res) => {
    if (!req?.files?.image?.[0]?.path) {
        throw new ApiError(400, "Image is required");
    }

    const imageLocalPath = req.files.image[0].path;

    try {
        // Create a FormData instance
        const formData = new FormData();

        // Append the image file as a readable stream
        formData.append('image', fs.createReadStream(imageLocalPath));

        // Send FormData with proper headers to Flask API
        const response = await axios.post(`${API_URL}/predict/rice`, formData, {
            headers: {
                ...formData.getHeaders()
            },
            // Increase timeout if needed for large images
            timeout: 30000
        });

        // Delete the temporary image after prediction
        fs.unlink(imageLocalPath, (err) => {
            // if (err) console.error(`Failed to delete image: ${imageLocalPath}`, err);
        });

        return res.status(200).json(new ApiResponse({
            statusCode: 200,
            data: response.data,
            message: "Rice prediction generated successfully",
        }));
    } catch (error) {
        // Make sure to delete the image even if the prediction fails
        fs.unlink(imageLocalPath, (err) => {
            // if (err) console.error(`Failed to delete image: ${imageLocalPath}`, err);
        });
        throw new ApiError(500, "Rice prediction failed", error);
    }
});

const predictCottonLeafDisease = asyncHandler(async (req, res) => {
    if (!req?.files?.image?.[0]?.path) {
        throw new ApiError(400, "Image is required");
    }

    const imageLocalPath = req.files.image[0].path;

    try {
        // Create a FormData instance
        const formData = new FormData();

        // Append the image file as a readable stream
        formData.append('image', fs.createReadStream(imageLocalPath));

        // Send FormData with proper headers to Flask API
        const response = await axios.post(`${API_URL}/predict/cotton`, formData, {
            headers: {
                ...formData.getHeaders()
            },
            // Increase timeout if needed for large images
            timeout: 30000
        });

        // Delete the temporary image after prediction
        fs.unlink(imageLocalPath, (err) => {
            // if (err) console.error(`Failed to delete image: ${imageLocalPath}`, err);
        });

        return res.status(200).json(new ApiResponse({
            statusCode: 200,
            data: response.data,
            message: "Cotton leaf disease prediction generated successfully",
        }));
    } catch (error) {
        // Make sure to delete the image even if the prediction fails
        fs.unlink(imageLocalPath, (err) => {
            // if (err) console.error(`Failed to delete image: ${imageLocalPath}`, err);
        });
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
        const response = await axios.post(`${API_URL}/predict/yield`, inputData);

        return res.status(200).json(new ApiResponse({
            statusCode: 200,
            data: response.data,
            message: "Crop yield prediction generated successfully"
        }));
    } catch (error) {
        throw new ApiError(500, "Crop yield prediction failed", error);
    }
});

export { predictSoilFertily, predictCrop, predictFertilizer, predictMango, predictRice, predictCottonLeafDisease, predictCropYieldPrediction }; 

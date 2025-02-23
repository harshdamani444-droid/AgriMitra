import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import axios from "axios";

const predictSoilFertily = asyncHandler(async (req, res) => {
    try {
        const response = await axios.post("http://localhost:5000/predict/soil", req.body);

        return res.status(200).json(new ApiResponse({
            statusCode: 200,
            data: response.data,
            message: "Soil fertility prediction generated successfully"
        }));
    } catch (error) {
        throw new ApiError(500, "Token generation failed", error);
    }
});

const predictCrop = asyncHandler(async (req, res) => {
    console.log(req.body);
    try {
        const response = await axios.post("http://localhost:5000/predict/crop", req.body);

        return res.status(200).json(new ApiResponse({
            statusCode: 200,
            data: response.data,
            message: "Crop prediction generated successfully"
        }));
    } catch (error) {
        throw new ApiError(500, "Token generation failed", error);
    }
});

const predictFertilizer = asyncHandler(async (req, res) => {
    console.log(req.body);
    try {
        const response = await axios.post("http://localhost:5000/predict/fertilizer", req.body);

        return res.status(200).json(new ApiResponse({
            statusCode: 200,
            data: response.data,
            message: "Fertilizer prediction generated successfully"
        }));
    } catch (error) {
        throw new ApiError(500, "Token generation failed", error);
    }
});

export { predictSoilFertily, predictCrop, predictFertilizer };
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { GEMINI_API_URL } from "../constants.js";
import axios from "axios";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const RESTRICTION_MESSAGE =
    "🚜 I can only assist with agriculture-related topics. Please ask about farming, crops, weather, soil, or agricultural products!";

const chat = asyncHandler(async (req, res) => {
    const { message, history } = req.body;

    if (!message) {
        throw new ApiError(400, "Message is required");
    }

    if (!history || !Array.isArray(history)) {
        throw new ApiError(400, "History must be an array");
    }

    // Format chat history for Gemini API
    const formattedHistory = history.map((msg) => ({
        role: msg.role === "assistant" ? "model" : msg.role,
        parts: [{ text: msg.content + 'give response with emojis' }],
    }));


    // Append the new message to history
    formattedHistory.push({ role: "user", parts: [{ text: message }] });


    // Step 1: Get AI response
    const response = await axios.post(
        `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
        {
            contents: formattedHistory,
        }
    );

    const aiMessage =
        response.data.candidates[0]?.content?.parts[0]?.text ||
        "Sorry, I couldn't process that.";

    // Step 2: Send AI response back to Gemini for verification
    const verificationPrompt = `Is the following response related to farming, crops, weather, soil, or agricultural products? Answer only "yes" or "no". Response: "${aiMessage}"`;

    const verificationResponse = await axios.post(
        `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
        {
            contents: [{ role: "user", parts: [{ text: verificationPrompt }] }],
        }
    );

    const verificationAnswer =
        verificationResponse.data.candidates[0]?.content?.parts[0]?.text.toLowerCase() ||
        "no";

    // Step 3: Send final reply based on verification
    const finalReply = verificationAnswer.includes("yes") ? aiMessage : RESTRICTION_MESSAGE;

    // res.json({ reply: finalReply });

    return res.status(200).json(new ApiResponse({
        statusCode: 200,
        data: { reply: finalReply },
        message: "Chat response generated successfully"
    }));
});

export { chat };
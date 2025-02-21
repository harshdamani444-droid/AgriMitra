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

    // Format chat history for Gemini API
    const formattedHistory = history.map((msg) => ({
        role: msg.role === "assistant" ? "model" : msg.role, // ✅ Fix here
        parts: [{ text: msg.content }],
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









// import { asyncHandler } from "../utils/asyncHandler.js";
// import { ApiError } from "../utils/ApiError.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
// import { GEMINI_API_URL } from "../constants.js";
// import axios from "axios";

// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// const RESTRICTION_MESSAGE =
//     "🚜 I can only assist with agriculture-related topics. Please ask about farming, crops, weather, soil, or agricultural products!";

// const chat = asyncHandler(async (req, res) => {
//     try {
//         const { message, history } = req.body;

//         console.log("✅ Incoming Chat Request");
//         console.log("Message:", message);
//         console.log("History:", history);

//         // Format chat history for Gemini API
//         // Format chat history for Gemini API
//         const formattedHistory = history.map((msg) => ({
//             role: msg.role === "assistant" ? "model" : msg.role, // ✅ Fix here
//             parts: [{ text: msg.content }],
//         }));


//         // Append the new message to history
//         formattedHistory.push({ role: "user", parts: [{ text: message }] });

//         console.log("\n📜 Formatted History for Gemini API:");
//         console.log(JSON.stringify(formattedHistory, null, 2));

//         // Step 1: Get AI response
//         const apiUrl = `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`;
//         console.log("\n🌐 Sending Request to Gemini API:");
//         console.log("URL:", apiUrl);

//         const response = await axios.post(apiUrl, {
//             contents: formattedHistory,
//         });

//         console.log("\n✅ Gemini API Response:");
//         console.log(JSON.stringify(response.data, null, 2));

//         const aiMessage =
//             response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
//             "Sorry, I couldn't process that.";

//         console.log("\n💬 AI Message:", aiMessage);

//         // Step 2: Send AI response back to Gemini for verification
//         const verificationPrompt = `Is the following response related to farming, crops, weather, soil, or agricultural products? Answer only "yes" or "no". Response: "${aiMessage}"`;

//         console.log("\n🔍 Verification Prompt:");
//         console.log(verificationPrompt);

//         const verificationResponse = await axios.post(apiUrl, {
//             contents: [{ role: "user", parts: [{ text: verificationPrompt }] }],
//         });

//         console.log("\n✅ Verification API Response:");
//         console.log(JSON.stringify(verificationResponse.data, null, 2));

//         const verificationAnswer =
//             verificationResponse.data.candidates?.[0]?.content?.parts?.[0]?.text.toLowerCase() || "no";

//         console.log("\n🟢 Verification Answer:", verificationAnswer);

//         // Step 3: Send final reply based on verification
//         const finalReply = verificationAnswer.includes("yes") ? aiMessage : RESTRICTION_MESSAGE;

//         console.log("\n🚀 Final Reply to User:", finalReply);

//         return res.status(200).json(
//             new ApiResponse({
//                 statusCode: 200,
//                 data: { reply: finalReply },
//                 message: "Chat response generated successfully",
//             })
//         );
//     } catch (error) {
//         console.error("\n❌ Error during chat processing:");
//         console.error(error);

//         return res.status(500).json(
//             new ApiResponse({
//                 statusCode: 500,
//                 data: null,
//                 message: error.message || "Internal server error",
//             })
//         );
//     }
// });

// export { chat };

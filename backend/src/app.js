import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { logger } from "./utils/logger.js";
import { ApiResponse } from "./utils/ApiResponse.js";

import rateLimit from "express-rate-limit";

// Api Rate limiter
export const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,            // 1 minutes
  max: 2,                             // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
  headers: true,                      // Send rate limit headers
});


const app = express();

// CORS options on the backend
const corsOptions = {
  origin: 'http://localhost:5173',  // Match the frontend origin
  credentials: true,                // Allow sending cookies
};
app.use(cors(corsOptions));

// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true,
//   })
// );

app.use(bodyParser.json());

app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

app.use(express.static("public"));

app.use(cookieParser());

// Middleware to log each request
app.use((req, res, next) => {
  logger.info({
    message: "Incoming request",
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
  });
  next();
});

// routes import
import userRoutes from "./routes/user.routes.js";

import productRoutes from "./routes/product.routes.js";

import cartRoutes from "./routes/cart.routes.js";

import chatRoutes from "./routes/chatbot.routes.js";

import mlPredictRoutes from "./routes/ml_models.routes.js";

import Wishlist from "./routes/wishlist.routes.js";

import ratings from "./routes/ratings.routes.js";

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/chatBot", chatRoutes);
app.use("/api/v1/predict", limiter, mlPredictRoutes);
app.use("/api/v1/wishlist", Wishlist);
app.use("/api/v1/ratings", ratings);

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error({
    message: err.message,
    status: err.statusCode || 500,
    stack: err.stack,
  });

  res.status(err.statusCode || 500).json(
    new ApiResponse({
      statusCode: err.statusCode || 500,
      message: err.message,
      data: null,
      success: false,
    })
  );
});

export { app };

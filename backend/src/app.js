import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { logger } from "./utils/logger.js";
import { ApiResponse } from "./utils/ApiResponse.js";

const app = express();
// CORS options on the backend
const corsOptions = {
  origin: 'http://localhost:5173', // Match the frontend origin
  credentials: true, // Allow sending cookies
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

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/chatBot", chatRoutes);

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

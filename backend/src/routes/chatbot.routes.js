import { Router } from "express";

import { chat } from "../controllers/chatbot.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// router.route("/chat").post(verifyJWT, chatbot);
router.route("/chat").post(chat);

export default router;
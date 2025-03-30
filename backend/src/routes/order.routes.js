import { Router } from "express";
import { createOrder, complteOrder } from "../controllers/order.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create-order").post(verifyJWT, createOrder);
router.route("/capture-order").post(verifyJWT, complteOrder);

export default router;
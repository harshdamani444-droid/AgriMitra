import { Router } from "express";
import {
  createOrder,
  complteOrder,
  getOrderByConsumerId,
  getOrderByFarmerId,
  getOrderById,
  getOrderByIdForFarmer,
} from "../controllers/order.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create-order").post(verifyJWT, createOrder);
router.route("/capture-order").post(verifyJWT, complteOrder);
router.route("/farmer-orders").get(verifyJWT, getOrderByFarmerId);
router.route("/consumer-orders").get(verifyJWT, getOrderByConsumerId);
router.route("/get-order-by-id/:id").get(verifyJWT, getOrderById);
router.route("/get-order-by-id-farmer/:id").get(verifyJWT, getOrderByIdForFarmer);

export default router;

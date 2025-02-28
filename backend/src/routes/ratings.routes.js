import { Router } from "express";
import { createRating, getRatings } from "../controllers/ratings.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create-rating").post(verifyJWT, createRating);

router.route("/get-ratings/:productId").get(getRatings);

export default router;
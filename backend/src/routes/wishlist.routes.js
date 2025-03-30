import { Router } from "express";
import { getWishlist, addToWishlist, removeFromWishlist } from "../controllers/whishlist.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/get-wishlist").get(verifyJWT, getWishlist);

router.route("/add-to-wishlist").post(verifyJWT, addToWishlist);

router.route("/remove-from-wishlist").delete(verifyJWT, removeFromWishlist);

export default router;
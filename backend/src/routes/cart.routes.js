import { Router } from "express";
import { getCart, addToCart, removeFromCart, updateQuantityOfProduct } from "../controllers/cart.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/get-cart").get(verifyJWT, getCart);

router.route("/add-to-cart").post(verifyJWT, addToCart);

router.route("/remove-from-cart").delete(verifyJWT, removeFromCart);

router.route("/update-quantity").patch(verifyJWT, updateQuantityOfProduct);

export default router;
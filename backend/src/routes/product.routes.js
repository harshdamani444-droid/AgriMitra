import { Router } from "express";
import { createProduct } from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create-product").post(
  verifyJWT,
  upload.fields([
    {
      name: "images",
      maxCount: 5,
    },
  ]),
  createProduct
);

export default router;
import { Router } from "express";
import {
  createProduct,
  getAllProduct,
  getProductByCategory,
  getProductBetweenPriceRange,
  getProductById,
  getProductByFarmer,
  deleteProductById,
  updateProductById,
} from "../controllers/product.controller.js";
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

router.route("/get-all-product").get(getAllProduct);

router.route("/get-product-by-category").get(getProductByCategory);

router
  .route("/get-product-between-price-range")
  .post(getProductBetweenPriceRange);

router.route("/get-product-by-id/:id").get(getProductById);

router.route("/get-product-by-farmer/:farmerId").get(getProductByFarmer);

router.route("/delete-product-by-id/:id").delete(verifyJWT, deleteProductById);

router.route("/update-product-by-id/:id").patch(verifyJWT, updateProductById);

export default router;

import { Router } from "express";

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import { predictSoilFertily, predictCrop, predictFertilizer, predictRice, predictCottonLeafDisease, predictCropYieldPrediction } from "../controllers/ml_models.controller.js";

const router = Router();

router.route("/soil-fertility-prediction").post(predictSoilFertily);

router.route("/crop-prediction").post(predictCrop);

router.route("/fertilizer-prediction").post(predictFertilizer);

router.route("/crop-yield-prediction").post(predictCropYieldPrediction);

router.route("/rice-prediction").post(
    upload.fields([
      {
        name: "image",
        maxCount: 1,
      },
    ]),
    predictRice
);

router.route("/cotton-leaf-disease-prediction").post(
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  predictCottonLeafDisease
);

export default router;
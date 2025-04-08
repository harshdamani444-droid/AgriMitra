import { Router } from "express";

<<<<<<< HEAD
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import { predictSoilFertily, predictCrop, predictFertilizer, predictRice, predictCottonLeafDisease, predictCropYieldPrediction } from "../controllers/ml_models.controller.js";
=======
import { predictSoilFertily, predictCrop, predictFertilizer } from "../controllers/ml_models.controller.js";
>>>>>>> 1dce92c52e2c6a29cf17be35bf423f2db4460095

const router = Router();

router.route("/soil-fertility-prediction").post(predictSoilFertily);

router.route("/crop-prediction").post(predictCrop);

router.route("/fertilizer-prediction").post(predictFertilizer);

<<<<<<< HEAD
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

=======
>>>>>>> 1dce92c52e2c6a29cf17be35bf423f2db4460095
export default router;
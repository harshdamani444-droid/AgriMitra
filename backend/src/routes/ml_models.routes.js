import { Router } from "express";

import { predictSoilFertily, predictCrop, predictFertilizer } from "../controllers/ml_models.controller.js";

const router = Router();

router.route("/soil-fertility-prediction").post(predictSoilFertily);

router.route("/crop-prediction").post(predictCrop);

router.route("/fertilizer-prediction").post(predictFertilizer);

export default router;
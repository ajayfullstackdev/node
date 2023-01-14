import express from "express";

import { productsInfo } from "../controllers/productController.js";

const router = express.Router();

router.route("/api/productsInfo").get(productsInfo);

export default router;

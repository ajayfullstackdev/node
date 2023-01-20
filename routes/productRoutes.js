import express from "express";

import {
  insertProduct,
  getProducts,
  getProductById,
} from "../controllers/productControllers.js";

const router = express.Router();

router.route("/products").post(insertProduct).get(getProducts);

router.route("/products/:id").get(getProductById);

export default router;

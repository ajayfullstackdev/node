import express from "express";

import {
  insertProduct,
  getProducts,
  getProductById,
  updateProductDetails,
  updateProduct,
  deleteProduct,
  aggregateProducts,
  productAdmin,
} from "../controllers/productControllers.js";
import { protect, restrictRoles } from "../controllers/userControllers.js";

const router = express.Router();

router
  .route("/products")
  .post(insertProduct)
  .get(protect, getProducts)
  .patch(updateProductDetails)
  .delete(deleteProduct);

router.route("/products/aggregate").get(aggregateProducts);
router.route("/products/:id").get(getProductById).patch(updateProduct);
router
  .route("/productAdmin")
  .get(protect, restrictRoles("associate", "admin"), productAdmin);

export default router;

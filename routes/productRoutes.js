import express from "express";

import {
  insertProduct,
  getProducts,
  getProductById,
  updateProductDetails,
  updateProduct,
  deleteProduct,
} from "../controllers/productControllers.js";

const router = express.Router();

router
  .route("/products")
  .post(insertProduct)
  .get(getProducts)
  .patch(updateProductDetails)
  .delete(deleteProduct);

router.route("/products/:id").get(getProductById).patch(updateProduct);

export default router;

import express from "express";

import { categoryInfo } from "../controllers/categoryController.js";

const router = express.Router();

router.route("/api/categoryInfo").get(categoryInfo);

export default router;

import express from "express";

import {
  insertAirline,
  getAirlines,
  getAirlineById,
  deleteAirlineById,
  updateAirlineById,
} from "../controllers/AirlineControllers.js";

const router = express.Router();

router.route("/airlines").post(insertAirline).get(getAirlines);

router.route("/airlines/:id").get(getAirlineById);
router.route("/airlines/:id").delete(deleteAirlineById);
router.route("/airlines/:id").patch(updateAirlineById);

export default router;

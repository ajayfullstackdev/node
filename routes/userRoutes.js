import express from "express";

import {
  insertUser,
  getUsers,
  getUserById,
  deleteUserById,
  updateUserById,
} from "../controllers/userControllers.js";

const router = express.Router();

router.route("/users").post(insertUser).get(getUsers);

router
  .route("/users/:id")
  .get(getUserById)
  .delete(deleteUserById)
  .patch(updateUserById);

export default router;

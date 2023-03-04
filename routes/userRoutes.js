import express from "express";
import { signUp, signIn } from "../controllers/userControllers.js";

const routerAuth = express.Router();

routerAuth.route("/signup").post(signUp);
routerAuth.route("/signin").post(signIn);

export default routerAuth;

import express from "express";
import { Login, SignUp } from "../controller/authController.js";
const authRoute = express.Router();
//login
authRoute.post("/login", Login);
//signUp
authRoute.post("/signUp", SignUp);
export default authRoute;

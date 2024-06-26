import express from "express";
import projectRoute from "./projectRoute.js";
import authRoute from "./authRoute.js";
const rootRoute = express.Router();

rootRoute.use("/project", projectRoute);
rootRoute.use("/auth", authRoute);

export default rootRoute;

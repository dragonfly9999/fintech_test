// import { verify } from "jsonwebtoken";
import {
  createProject,
  deleteProject,
  getProject,
  updateProject,
} from "../controller/projectController.js";
import express from "express";
import { midVerifyToken } from "../config/jwt.js";

const projectRoute = express.Router();

projectRoute.get("/get-project", getProject);
projectRoute.post("/create-project", createProject);
projectRoute.delete("/delete-project", deleteProject);
projectRoute.put("/update-project", updateProject);
export default projectRoute;

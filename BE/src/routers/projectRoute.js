import { createProject, getProject } from "../controller/projectController.js";
import express from "express";
const projectRoute = express.Router();

projectRoute.get("/get-project", getProject);
projectRoute.post("/create-project", createProject);

export default projectRoute;

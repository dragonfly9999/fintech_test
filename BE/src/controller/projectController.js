// import Project from "../models/tasks.js";
import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { responseApi } from "../config/response.js";

const model = initModels(sequelize);
let getProject = async (req, res) => {
  let data = await model.tasks.findAll();
  // res.send(data);
  responseApi(res, 200, data, "Thành công");
  // console.log(data);
};

let createProject = (req, res) => {
  res.send("create project");
};
export { getProject, createProject };

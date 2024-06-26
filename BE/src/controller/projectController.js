// import Project from "../models/tasks.js";
import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { responseApi } from "../config/response.js";

const model = initModels(sequelize);
let getProject = async (req, res) => {
  let data = await model.tasks.findAll();
  // res.send(data);
  responseApi(res, 200, data, "success");
  // console.log(data);
};

let createProject = async (req, res) => {
  try {
    let { id, title, description, status, due_date } = req.body;

    const project = await model.tasks.create({
      id,
      title,
      description,
      status,
      due_date,
    });

    responseApi(res, 200, "", "success");
  } catch (error) {
    res.status(500).send(`Backend error: ${error}`);
  }
};

let deleteProject = async (req, res) => {
  try {
    let { id } = req.body;

    const result = await model.tasks.destroy({
      where: {
        id,
      },
    });

    if (result === 0) {
      console.log(`No task found with ID ${id}`);
      res.status(404).send(`No task found with ID ${id}`);
    } else {
      console.log(`Task with ID ${id} was deleted.`);
      res.status(200).send(`Task with ID ${id} was deleted.`);
    }
  } catch (error) {
    res.status(500).send(`Backend error: ${error.message}`);
  }
};
let updateProject = async (req, res) => {
  try {
    let { id, title, description, status, due_date } = req.body;

    const currentProject = await model.tasks.findOne({
      where: {
        id: id,
      },
    });

    if (currentProject) {
      const [updated] = await model.tasks.update(
        {
          title: title ? title : currentProject.title,
          description: description ? description : currentProject.description,
          status: status ? status : currentProject.status,
          due_date: due_date ? due_date : currentProject.due_date,
        },
        {
          where: { id },
        }
      );

      if (updated) {
        await model.tasks.findOne({ where: { id } });
        res.status(200).send(`Project with ID ${id} was updated.`);
      } else {
        res.status(404).send(`No project found with ID ${id}`);
      }
    }
  } catch (error) {
    res.status(500).send(`Backend error: ${error.message}`);
  }
};

export { getProject, createProject, deleteProject, updateProject };

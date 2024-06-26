import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _tasks from  "./tasks.js";
import _users from  "./users.js";

export default function initModels(sequelize) {
  const tasks = _tasks.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);


  return {
    tasks,
    users,
  };
}

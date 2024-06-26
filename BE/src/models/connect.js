import { Sequelize } from "sequelize";
import config from "../config/config.js";
const sequelize = new Sequelize(config.database, config.user, config.pass, {
  host: config.host,
  port: config.port,
  dialect: config.dialect,
});

// try{
// await sequelize.authenticate()
// console.log('ok')
// }catch{
// console.log('error')
// }

export default sequelize;

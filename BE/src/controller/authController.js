import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { responseApi } from "../config/response.js";
import bcrypt from "bcrypt";
import { createToken } from "../config/jwt.js";
// import { ResponseApi } from "express";}

const model = initModels(sequelize);

const Login = async (req, res) => {
  // findata
  let { email, password } = req.body;

  let checkEmail = await model.users.findOne({
    where: {
      email,
    },
  });
  if (checkEmail) {
    //check password
    if (bcrypt.compareSync(password, checkEmail.password)) {
      // chuỗi mã hoá chưa thông tin user
      let token = createToken({ userId: checkEmail.dataValues.id });
      responseApi(res, 200, token, "Login success");
    } else {
      responseApi(res, 400, "", "Password is incorrect.");
    }
  } else {
    responseApi(res, 400, "", "Email is incorrect");
  }
};

const SignUp = async (req, res) => {
  try {
    //create data
    let { userName, email, password } = req.body;

    let newUser = {
      username: userName,
      email: email,
      password: bcrypt.hashSync(password, 10),
    };
    let checkEmail = await model.users.findOne({
      where: {
        email: email,
      },
    });
    //email không trùng
    if (checkEmail) {
      responseApi(res, 400, "", "Email already exists");
      return;
    }
    await model.users.create(newUser);
    responseApi(res, 200, "", "Register success");
  } catch {
    responseApi(res, 500, "", "Can not register");
  }
};

export { Login, SignUp };

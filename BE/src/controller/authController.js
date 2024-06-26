import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { responseApi } from "../config/response.js";
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
    if (checkEmail.password == password) {
      responseApi(res, 200, "token", "Login thành công");
    } else {
      responseApi(res, 400, "", "Mật khẩu không đúng");
    }
  } else {
    responseApi(res, 400, "", "Email không đúng");
  }
};

const SignUp = async (req, res) => {
  try {
    //create data
    let { userName, email, password } = req.body;

    let newUser = {
      username: userName,
      email: email,
      password: password,
    };
    let checkEmail = await model.users.findOne({
      where: {
        email: email,
      },
    });
    //email không trùng
    if (checkEmail) {
      responseApi(res, 400, "", "Email đã tồn tại");
      return;
    }
    await model.users.create(newUser);
    responseApi(res, 200, "", "Đăng ký thành công");
  } catch {
    responseApi(res, 500, "", "Đăng ký không thành công");
  }
};

export { Login, SignUp };

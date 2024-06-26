import jwt from "jsonwebtoken";
import { responseApi } from "../config/response.js";

// create token
export const createToken = (data) =>
  jwt.sign(data, "BI_MAT", { algorithm: "HS256", expiresIn: "5y" });

//check token
// err=null => token ok
// err!=null => token not ok
export const checkToken = (token) =>
  jwt.verify(token, "BI_MAT", (err) => {
    return err;
  });

// giải mã token
export const dataToken = (token) => jwt.decode(token);

export const midVerifyToken = (req, res, next) => {
  let { token } = req.headers;
  let check = checkToken(token);
  console.log(check);
  if (check == null) next();
  else responseApi(res, 401, "", "không có quyền truy cập ");
};

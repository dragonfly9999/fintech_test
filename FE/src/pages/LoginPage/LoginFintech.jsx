import React from "react";
import * as loginAnimation from "../../assets/Animation/AnimationLogin.json";
import Lottie from "react-lottie";
import { useFormik } from "formik";
import * as Yup from "yup";
import { message } from "antd";
import { saveLocalStore, getLocalStore } from "../../utils/local.js";
import { Link, useNavigate } from "react-router-dom";
// import "../../utils/demoFix/style.css"

const LoginFintech = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        taiKhoan: "",
        matKhau: "",
      },
      onSubmit: (values) => {
        const registeredUser = getLocalStore("user_info");

        if (
          registeredUser &&
          values.taiKhoan === registeredUser.taiKhoan &&
          values.matKhau === registeredUser.matKhau
        ) {
          // Thông báo đăng nhập thành công
          messageApi.open({
            type: "success",
            content: "Đăng nhập thành công",
          });

          // Lưu thông tin đăng nhập vào localStorage
          saveLocalStore(
            { isLoggedIn: true, taiKhoan: values.taiKhoan },
            "user_login"
          );

          // Chuyển hướng người dùng tới trang chủ
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          // Thông báo lỗi đăng nhập
          messageApi.open({
            type: "error",
            content: "Tài khoản hoặc mật khẩu không chính xác",
          });
        }
      },
      validationSchema: Yup.object({
        taiKhoan: Yup.string().required("Vui lòng không bỏ trống"),
        matKhau: Yup.string().required("Vui lòng không bỏ trống"),
      }),
    });

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loginAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      {contextHolder}
    <h1 className="bg-red-500">checklogin</h1>

      <div className="h-screen flex justify-center items-center">
        <div className="container">
          <div className="grid md:grid-cols-2 sm:grid-cols-1">
            <div className="col_left">
              <Lottie options={defaultOptions} height={400} width={400} />
            </div>
            <div className="col_right ">
              <form
                onSubmit={handleSubmit}
                className="fixDaForm space-y-5 mr-5 "
              >
                <h2 className="font-bold text-3xl block sm:text-center">
                  Login Now
                </h2>
                <div>
                  <label
                    htmlFor="taiKhoan"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Tài khoản
                  </label>
                  <input
                    type="text"
                    id="taiKhoan"
                    name="taiKhoan"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Vui lòng nhập tài khoản"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.taiKhoan}
                  />
                  {errors.taiKhoan && touched.taiKhoan ? (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.taiKhoan}
                    </p>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor="matKhau"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Mật khẩu
                  </label>
                  <input
                    type="password"
                    id="matKhau"
                    name="matKhau"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Vui lòng nhập mật khẩu"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.matKhau}
                  />
                  {errors.matKhau && touched.matKhau ? (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.matKhau}
                    </p>
                  ) : null}
                </div>
                <div className="flex">
                  <button
                    type="submit"
                    className="py-2 px-5 mr-5 bg-black text-white rounded-md hover:bg-opacity-70 duration-500"
                  >
                    Đăng nhập
                  </button>
                  <Link
                    to={"/signup"}
                    className="py-2 px-5 mx-5 bg-black text-white rounded-md hover:bg-opacity-70 duration-500"
                  >
                    Đăng ký
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginFintech;

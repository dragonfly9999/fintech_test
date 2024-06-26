import React from "react";
import * as loginAnimation from "../../assets/Animation/AnimationLogin.json";
import Lottie from "react-lottie";
import { useFormik } from "formik";
import * as Yup from "yup";
import { message } from "antd";
import { saveLocalStore, getLocalStore } from "../../utils/local.js";
import { Link, useNavigate } from "react-router-dom";
import { END_POINT } from "../../constant/endpoint.constant.js";
import https from "../../services/configServ.js";
import { TOKEN_USER } from "../../constant/auth.constant.js";
// import "../../utils/demoFix/style.css"

const LoginFintech = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: (values) => {
        https
          .post(END_POINT.AUTH.LOGIN(), {
            email: values.email,
            password: values.password,
          })
          .then(({ data }) => {
            console.log(data);
            //  Thông báo đăng nhập thành công
            messageApi.open({
              type: "success",
              content: "Login success",
            });

            // Lưu thông tin đăng nhập vào localStorage
            // saveLocalStore(
            //   { isLoggedIn: true, email: values.email },
            //   "user_login"
            // );

            localStorage.setItem(TOKEN_USER, data.data);
            // chuyển hướng đến admin
            setTimeout(() => {
              navigate("/admin");
            }, 1000);
          })
          .catch((data) => {
            console.log(data);
            // Thông báo lỗi đăng nhập
            messageApi.open({
              type: "error",
              content: data.response.data.message,
            });
          });
        // const registeredUser = getLocalStore("user_info");

        // if (
        //   registeredUser &&
        //   values.email === registeredUser.email &&
        //   values.password === registeredUser.password
        // ) {

        //   // Chuyển hướng người dùng tới trang chủ
        //   setTimeout(() => {
        //     navigate("/");
        //   }, 1000);
        // } else {
        //   // Thông báo lỗi đăng nhập
        //   messageApi.open({
        //     type: "error",
        //     content: "Tài khoản hoặc mật khẩu không chính xác",
        //   });
        // }
      },
      validationSchema: Yup.object({
        email: Yup.string().required("Please do not leave blank"),
        password: Yup.string().required("Please do not leave blank"),
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

      <div className="h-screen flex justify-center items-center">
        <div className="container">
          <div className="grid md:grid-cols-2 sm:grid-cols-1 bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden p-5">
            <div className="col_left">
              <Lottie options={defaultOptions} height={400} width={400} />
            </div>
            <div className="col_right ">
              <form
                onSubmit={handleSubmit}
                className="fixDaForm space-y-5 mr-5 mt-5 "
              >
                <div className="font-bold text-3xl block sm:text-center mb-12">
                  <h2>Sign in to your account</h2>
                  <p className="text-xl">
                    or
                    <Link
                      to={"/signup"}
                      className="ml-1 text-blue-500 hover:text-blue-700"
                    >
                      Resgister
                    </Link>
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Please enter email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  {errors.email && touched.email ? (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Mật khẩu
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Please enter a password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  {errors.password && touched.password ? (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password}
                    </p>
                  ) : null}
                </div>
                <div className="flex">
                  <button
                    type="submit"
                    className="py-2 px-5 mr-5 bg-black text-white rounded-md hover:bg-opacity-70 duration-500"
                  >
                    Sign in
                  </button>
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

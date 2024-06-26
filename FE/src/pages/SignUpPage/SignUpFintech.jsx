import React from "react";
import * as loginAnimation from "../../assets/Animation/AnimationSignUp.json";
import Lottie from "react-lottie";
import { ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { message } from "antd";
import { Link } from "react-router-dom";
import https from "../../services/configServ";
import { saveLocalStore } from "../../utils/local";
import { END_POINT } from "../../constant/endpoint.constant";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const SignUpFintech = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    resetForm,
  } = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await https.post(END_POINT.AUTH.SIGNUP(), {
          userName: values.username,
          email: values.email,
          password: values.username,
        });

        resetForm();
        console.log(response.data);
        // Thông báo thành công
        messageApi.open({
          type: "success",
          content: response.data.message,
        });

        // Lưu thông tin người dùng vào local storage
        saveLocalStore(response.data, "user_info");

        // Chuyển hướng người dùng tới trang chủ hoặc trang đã đăng nhập thành công
        setTimeout(() => {
          navigate("/");
        }, 1000);
        // Thêm code chuyển hướng tại đây
      } catch (error) {
        console.log(error);
        // Xử lý lỗi khi đăng ký không thành công
        messageApi.open({
          type: "error",
          content: error.response.data.message,
        });
        console.error("Đăng ký không thành công:", error);
      }
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please do not leave blank"),
      password: Yup.string().required("Please do not leave blank"),
      email: Yup.string()
        .email("Invalid email")
        .required("Please do not leave blank"),
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
      <div className="h-screen flex justify-center items-center px-4 ">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden p-10">
            <div className="col_left mt-10 md:mt-18 flex justify-center">
              <Lottie options={defaultOptions} height={300} width={300} />
            </div>
            <div className="col_right">
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="font-bold mb-5 text-2xl md:text-3xl">
                  Register
                </h2>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Please enter account"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                  />
                  {errors.username && touched.username ? (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.username}
                    </p>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Please enter password"
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

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Please enter email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  {errors.email && touched.email ? (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  ) : null}
                </div>

                <div className="flex flex-col md:flex-row items-center md:space-x-5">
                  <button
                    type="submit"
                    className="py-2 px-5 bg-black text-white rounded-md hover:bg-opacity-70 duration-500"
                  >
                    Register
                  </button>
                </div>
                <div>
                  <p>
                    Do you have a account?
                    <Link
                      to={"/login"}
                      className="ml-1 text-blue-500 hover:text-blue-900"
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpFintech;

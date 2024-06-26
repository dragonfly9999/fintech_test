import React from "react";
import * as loginAnimation from "../../assets/Animation/AnimationSignUp.json";
import Lottie from "react-lottie";
import { useFormik } from "formik";
import * as Yup from "yup";
import { message } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { saveLocalStore } from "../../utils/local";

const SignUpFintech = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    reset,
  } = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      nhapLaiMatKhau: "",
      email: "",
      soDt: "",
      hoTen: "",
    },
    onSubmit: (values, { resetForm }) => {
      axios
        .post("https://jsonplaceholder.typicode.com/users", values)
        .then((res) => {
          resetForm();
          console.log(res);
          // thông báo thành công
          messageApi.open({
            type: "success",
            content: "Đăng kí thành công",
          });
          // lưu thông tin người dùng
          saveLocalStore(res.data, "user_info");
          // chuyển hướng người dùng tới trang chủ
        })
        .catch((err) => {
          // lỗi không đăng ký được
          messageApi.open({
            type: "error",
            content: "Đăng ký không thành công",
          });
          console.log(err);
        });
    },
    validationSchema: Yup.object({
      taiKhoan: Yup.string().required("Vui lòng không bỏ trống"),
      matKhau: Yup.string().required("Vui lòng không bỏ trống"),
      nhapLaiMatKhau: Yup.string().required("Vui lòng không bỏ trống"),
      email: Yup.string().required("Vui lòng không bỏ trống"),
      soDt: Yup.string().required("Vui lòng không bỏ trống"),
      hoTen: Yup.string().required("Vui lòng không bỏ trống"),
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
      <div className="h-screen flex justify-center items-center px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col_left mt-10 md:mt-18 flex justify-center">
              <Lottie options={defaultOptions} height={300} width={300} />
            </div>
            <div className="col_right">
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="font-bold mb-5 text-2xl md:text-3xl">Register</h2>
                <div>
                  <label
                    htmlFor="taiKhoan"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Tài Khoản
                  </label>
                  <input
                    type="text"
                    id="taiKhoan"
                    name="taiKhoan"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
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
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Mật Khẩu
                  </label>
                  <input
                    type="password"
                    id="matKhau"
                    name="matKhau"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
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

                <div>
                  <label
                    htmlFor="nhapLaiMatKhau"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Nhập lại mật khẩu
                  </label>
                  <input
                    type="password"
                    id="nhapLaiMatKhau"
                    name="nhapLaiMatKhau"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Vui lòng nhập lại mật khẩu"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.nhapLaiMatKhau}
                  />
                  {errors.nhapLaiMatKhau && touched.nhapLaiMatKhau ? (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.nhapLaiMatKhau}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label
                    htmlFor="hoTen"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Họ tên
                  </label>
                  <input
                    type="text"
                    id="hoTen"
                    name="hoTen"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Vui lòng nhập họ tên"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.hoTen}
                  />
                  {errors.hoTen && touched.hoTen ? (
                    <p className="text-red-500 text-xs mt-1">{errors.hoTen}</p>
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
                    placeholder="Vui lòng nhập email"
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
                    htmlFor="soDt"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    id="soDt"
                    name="soDt"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Vui lòng nhập số điện thoại"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.soDt}
                  />
                  {errors.soDt && touched.soDt ? (
                    <p className="text-red-500 text-xs mt-1">{errors.soDt}</p>
                  ) : null}
                </div>
                <div className="flex flex-col md:flex-row items-center md:space-x-5">
                  <button
                    type="submit"
                    className="py-2 px-5 bg-black text-white rounded-md hover:bg-opacity-70 duration-500"
                  >
                    Đăng ký
                  </button>
                  <Link
                    to={"/login"}
                    className="mt-2 md:mt-0 py-2 px-5 bg-black text-white rounded-md hover:bg-opacity-70 duration-500"
                  >
                    Đăng nhập <span aria-hidden="true">→</span>
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

export default SignUpFintech;

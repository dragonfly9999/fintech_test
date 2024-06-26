import axios from "axios";

export const https = axios.create({
  // baseURL là đoạn đầu URl dùng chung của tất cả các request
  baseURL: "http://localhost:8080",
  // timeout giúp ngưng gọi dữ liệu khi quá thời gian
  timeout: 15000,
  
});

// https.interceptors.request.use(
//   async function  (config) {
//      config.url = `${api.defaults.baseURL}${config.url}`;

//     // lấy token từ localstorage
//      const token = localStorage.getItem('TOKEN_USER')
//      if (token) config.headers.Authorization = `${token}`;
//      return config;
//   },
//   function (error) {
//      return Promise.reject(error);
//   }
// );
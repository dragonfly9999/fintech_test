import axios from "axios";

export const https = axios.create({
  // baseURL là đoạn đầu URl dùng chung của tất cả các request
  baseURL: "",
  // timeout giúp ngưng gọi dữ liệu khi quá thời gian
  timeout: 15000,
});

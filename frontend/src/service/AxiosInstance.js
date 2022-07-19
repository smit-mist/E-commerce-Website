import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/",
});

axiosInstance.interceptors.request.use((config) => {
  console.log(config);
  return config;
});

export default axiosInstance;

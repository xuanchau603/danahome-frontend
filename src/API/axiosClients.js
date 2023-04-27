import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: "https://backend-danahome.onrender.com/",
  data: null,
  headers: {
    "Content-Type": "application/json ",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  //Handle token here
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return error.response.data;
  },
);

export default axiosClient;

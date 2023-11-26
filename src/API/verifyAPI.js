import axiosClient from "./axiosClients";

const verifyAPI = {
  getCode: (data) => {
    const url = "/verifyCode/create";
    return axiosClient.post(url, data);
  },
  responseReview: (data) => {
    const url = "/verifyCode/response-review";
    return axiosClient.post(url, data);
  },
};

export default verifyAPI;

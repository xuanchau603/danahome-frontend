import axiosClient from "./axiosClients";

const verifyAPI = {
  getCode: (data) => {
    const url = "/verifyCode/create";
    return axiosClient.post(url, data);
  },
};

export default verifyAPI;

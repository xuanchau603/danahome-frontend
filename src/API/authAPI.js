import axiosClient from "./axiosClients";

const authAPI = {
  loginUser: (accountData) => {
    const url = "/users/login";
    return axiosClient.post(url, accountData);
  },
  registerUser: (userInfo) => {
    const url = "/users/register";
    return axiosClient.post(url, userInfo);
  },
  getUserById: (userId, token) => {
    const url = `/users/${userId}`;
    return axiosClient.get(url, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  },
};

export default authAPI;

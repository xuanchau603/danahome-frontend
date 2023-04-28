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
  editUser: (userData, token) => {
    return fetch("https://backend-danahome.onrender.com/users/edit", {
      method: "put",
      headers: {
        token: `Bearer ${token}`,
      },
      body: userData,
    });
  },
};

export default authAPI;

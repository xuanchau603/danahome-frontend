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
    // return fetch("http://localhost:8002/users/edit", {
    //   method: "put",
    //   headers: {
    //     token: `Bearer ${token}`,
    //   },
    //   body: userData,
    // });

    return fetch("https://backend-danahome.onrender.com/users/edit", {
      method: "put",
      headers: {
        token: `Bearer ${token}`,
      },
      body: userData,
    });
  },
  resetPassword: (userId, password, newPassword, token) => {
    const url = `/users/resetPassword`;
    return axiosClient.post(
      url,
      {
        userId,
        password,
        newPassword,
      },
      {
        headers: {
          token: `Bearer ${token}`,
        },
      },
    );
  },
  getAllUsers: (params, token) => {
    const url = `/users/`;
    return axiosClient.get(url, {
      headers: {
        token: `Bearer ${token}`,
      },
      params,
    });
  },
};

export default authAPI;

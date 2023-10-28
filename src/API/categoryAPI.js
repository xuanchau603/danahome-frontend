import axiosClient from "./axiosClients";

const categoryAPI = {
  getAllCategoryRooms: () => {
    return axiosClient.get("/category/rooms");
  },
  getAllCategoryNews: () => {
    return axiosClient.get("/category/news");
  },
  createCategoryNews: (data, token = null) => {
    const url = `/category/news/create`;
    return axiosClient.post(url, data, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  },
  editCategoryNews: (data, token = null) => {
    const url = `/category/news/update`;
    return axiosClient.put(url, data, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  },

  createCategoryRooms: (data, token = null) => {
    const url = `/category/rooms/create`;
    return axiosClient.post(url, data, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  },
  editCategoryRooms: (data, token = null) => {
    const url = `/category/rooms/update`;
    return axiosClient.put(url, data, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  },

};

export default categoryAPI;

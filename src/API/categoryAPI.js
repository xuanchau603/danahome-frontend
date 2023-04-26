import axiosClient from "./axiosClients";

const categoryAPI = {
  getAllCategoryRooms: () => {
    return axiosClient.get("/category/rooms");
  },
  getAllCategoryNews: () => {
    return axiosClient.get("/category/news");
  },
};

export default categoryAPI;

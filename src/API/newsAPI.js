import axiosClient from "./axiosClients";

const NewsAPI = {
  getAllNews: (params) => {
    const url = "/news";
    return axiosClient.get(url, { params });
  },
  getHotNews: () => {
    const url = "/news/hot";
    return axiosClient.get(url);
  },
  getDetailNewsById: (id) => {
    const url = `/news/${id}`;
    return axiosClient.get(url);
  },
  createNews: (newsData, token) => {
    return fetch("https://backend-danahome.onrender.com/news/create", {
      method: "post",
      headers: {
        token: `Bearer ${token}`,
      },
      body: newsData,
    });
  },
};

export default NewsAPI;

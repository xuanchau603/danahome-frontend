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
  createNews: (newsData, token) => {
    return fetch("https://danahome.onrender.com/news/create", {
      method: "post",
      headers: {
        token: `Bearer ${token}`,
      },
      body: newsData,
    });
  },
};

export default NewsAPI;

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
    return fetch("http://localhost:802/news/create", {
      method: "post",
      headers: {
        token: `Bearer ${token}`,
      },
      body: newsData,
    });
  },
};

export default NewsAPI;

import axiosClient from "./axiosClients";

const NewsAPI = {
  getAllNews: (params) => {
    const url = "/news";
    return axiosClient.get(url, { params });
  },
  getHotNews: (params) => {
    const url = "/news/hot";
    return axiosClient.get(url, { params });
  },
  getDetailNewsById: (id) => {
    const url = `/news/${id}`;
    return axiosClient.get(url, {});
  },
  createNews: (newsData, token) => {
    // return fetch("http://localhost:8002/news/create", {
    //   method: "post",
    //   headers: {
    //     token: `Bearer ${token}`,
    //   },
    //   body: newsData,
    // });
    return fetch("https://backend-danahome.onrender.com/news/create", {
      method: "post",
      headers: {
        token: `Bearer ${token}`,
      },
      body: newsData,
    });
  },
  editNews: (newsData, token) => {
    // return fetch("http://localhost:8002/news/update", {
    //   method: "put",
    //   headers: {
    //     token: `Bearer ${token}`,
    //   },
    //   body: newsData,
    // });
    return fetch("https://backend-danahome.onrender.com/news/update", {
      method: "put",
      headers: {
        token: `Bearer ${token}`,
      },
      body: newsData,
    });
  },
  searchNews: (params) => {
    return axiosClient.get("/news/", { params });
  },
  deleteImage: (body, token) => {
    return axiosClient.delete("/news/image/delete", {
      data: body,
      headers: {
        token: `Bearer ${token}`,
      },
    });
  },
  deleteNews: (id, token, body = {})=>{
    return axiosClient.delete(`/news//delete/${id}`, {
      data: body,
      headers: {
        token: `Bearer ${token}`,
      },
    });
  }
};

export default NewsAPI;

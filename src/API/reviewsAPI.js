import axiosClient from "./axiosClients";

const reviewsAPI = {
  getAllReviews: (token) => {
    const url = `/reviews`;
    return axiosClient.get(url, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  },
  createReview: (data, token) => {
    const url = `/reviews/create`;
    return axiosClient.post(url, data, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  },

  GetStatictis: (token)=>{
    const url = `/statistics`;
    return axiosClient.get(url, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  }
};

export default reviewsAPI;

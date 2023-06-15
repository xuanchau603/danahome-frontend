import axiosClient from "./axiosClients";

const statisticsAPI = {
  getStatistics: (token) => {
    const url = `/statistics`;
    return axiosClient.get(url, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  },
};

export default statisticsAPI;

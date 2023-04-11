import axiosClient from "./axiosClients";

const addressAPI = {
  getProvince: async () => {
    try {
      const url = "";
      const response = await axiosClient.get(url, {
        baseURL: "https://provinces.open-api.vn/api/?depth=1",
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
  getDistrictByCode: async (code) => {
    try {
      const url = "";
      const response = await axiosClient.get(url, {
        baseURL: `https://provinces.open-api.vn/api/p/${code}?depth=2`,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
  getWardsByCode: async (code) => {
    try {
      const url = "";
      const response = await axiosClient.get(url, {
        baseURL: `https://provinces.open-api.vn/api/d/${code}?depth=2`,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default addressAPI;

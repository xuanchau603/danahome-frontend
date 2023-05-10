import axiosClient from "./axiosClients";

const paymentAPI = {
  createPayment: (paymentInfo, token) => {
    return axiosClient.post("/payment/create", paymentInfo, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  },
  payWithMomo: (orderInfo, token) => {
    return axiosClient.post("/payment/pay-with-momo", orderInfo, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  },
  ipnMomo: (params, token) => {
    return axiosClient.post(
      "/payment/ipn-momo",
      {},
      {
        params,
        headers: {
          token: `Bearer ${token}`,
        },
      },
    );
  },
  payWithVNPay: (orderInfo, token) => {
    return axiosClient.post("/payment/pay-with-vnpay", orderInfo, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
  },
  ipnVNPAY: (params, token) => {
    return axiosClient.post(
      "/payment/ipn-vnpay",
      {},
      {
        params,
        headers: {
          token: `Bearer ${token}`,
        },
      },
    );
  },
  getPayment: (userId, token, params) => {
    return axiosClient.get(`/payment/${userId}`, {
      headers: {
        token: `Bearer ${token}`,
      },
      params,
    });
  },
};

export default paymentAPI;

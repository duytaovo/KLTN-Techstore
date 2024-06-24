import http, { httpNew } from "src/utils/http";

export const historyService = {
  getHistoryOrder({ body, params }: any) {
    return httpNew.post(`/order`, body, {
      params,
    });
  },
  changeProductOrder(data: string) {
    return httpNew.post(`/order/return-change`, data);
  },
  updateReceiveOrder(data: string) {
    return httpNew.post(`/order/receive?orderId=${data}`);
  },
  updateCancelOrder({ orderId, reasone }: any) {
    return httpNew.post(`/order/cancel?orderId=${orderId}&reason=${reasone}`);
  },

  getHistoryDetailOrder({ orderId }: any) {
    return httpNew.get(`/order/history?orderId=${orderId}`);
  },
};


import http, { httpNew } from "src/utils/http";

export const historyService = {
  getHistoryOrder({ body, params }: any) {
    return httpNew.post(`/order`, body, {
      params,
    });
  },
  updateHistoryOrder(id: string, data: string) {
    return http.patch(`/orders/${id}`, data);
  },
};


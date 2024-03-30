import http from "src/utils/http";

export const customerService = {
  getCustomerByPhone(number: string) {
    return http.get(`/customers?phone=${number}`);
  },
  postCustomer(data: any) {
    return http.post(`/customers`, data);
  },
};

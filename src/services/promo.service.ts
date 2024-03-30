import http from "src/utils/http";

export const promoService = {
  getPromo() {
    return http.get(`/promo`);
  },
};

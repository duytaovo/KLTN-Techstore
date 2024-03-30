import http, { httpNew } from "src/utils/http";

export const searchService = {
  getResultSearchApi(params: any) {
    return httpNew.get(`/product/search`, { params });
  },
};

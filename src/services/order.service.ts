import { SuccessResponse } from "src/types/utils.type";
import { httpNew } from "src/utils/http";

const URL = "/order";

export const orderService = {
  getPurchases(params: any) {
    return httpNew.get<SuccessResponse<any[]>>(`${URL}`, {
      params,
    });
  },
  buyProducts(body: any[]) {
    return httpNew.post<SuccessResponse<any[]>>(`${URL}/create`, body);
  },
  updateSuccessOrder(params: any) {
    return httpNew.post<SuccessResponse<any[]>>(`${URL}`, {
      params,
    });
  },
};


import { SuccessResponse } from "src/types/utils.type";
import { httpNew } from "src/utils/http";

export const productService = {
  getProducts({ body, params }: any) {
    return httpNew.post<SuccessResponse<any>>("/product", body, {
      params,
    });
  },

  getDetailProduct(params: any) {
    return httpNew.get<SuccessResponse<any[]>>(`/product/${params}`);
  },
  
};


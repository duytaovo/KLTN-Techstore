import { SuccessResponse } from "src/types/utils.type";
import http, { httpNew } from "src/utils/http";

const brandService = {
  getBrands(params: any) {
    return httpNew.get<SuccessResponse<any>>("/brand", { params });
  },

  getDetailBrand(params: any) {
    return httpNew.get<SuccessResponse<any[]>>(`/brand/${params}`);
  },
};

export default brandService;

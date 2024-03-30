import { SuccessResponse } from "src/types/utils.type";
import http, { httpNew } from "src/utils/http";

const categoryService = {
  getcategorys(params: any) {
    return httpNew.get<SuccessResponse<any>>("/category", { params });
  },

  getDetailcategory(params: any) {
    return httpNew.get<SuccessResponse<any[]>>(`/category/${params}`);
  },
};

export default categoryService;


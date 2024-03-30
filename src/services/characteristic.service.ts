import { SuccessResponse } from "src/types/utils.type";
import http, { httpNew } from "src/utils/http";

const CharactericsService = {
  getCharactericss(params: any) {
    return httpNew.get<SuccessResponse<any>>("/characteristic", { params });
  },

  getDetailcharacteristic(params: any) {
    return httpNew.get<SuccessResponse<any[]>>(`/characteristic/${params}`);
  },
};

export default CharactericsService;

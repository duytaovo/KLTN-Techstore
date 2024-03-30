import { SuccessResponse } from "src/types/utils.type";
import { httpNew } from "src/utils/http";

const dataApi = {
  getDataUser() {
    return httpNew.get<SuccessResponse<any>>("/user/ui", {});
  },
  getData() {
    return httpNew.get<SuccessResponse<any>>("/manage/ui", {});
  },
  updateText({ key, data }: any) {
    return httpNew.put(`/manage/ui/update/${key}`, data);
  },

  uploadImage(key: string, body: FormData) {
    return httpNew.put(`/manage/ui/update/${key}`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default dataApi;


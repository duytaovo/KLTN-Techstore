import { SuccessResponse } from "src/types/utils.type";
import http, { httpNew } from "src/utils/http";

export const commentService = {
  getCommentById(id: string) {
    return httpNew.get(`/feedback/${id}`);
  },
  getCommentByProductId(id: string) {
    return httpNew.get(`/feedback/product/${id}`);
  },

  postComment(data: any) {
    return httpNew.post(`/feedback/create`, data);
  },
  putComment({ id, data }: any) {
    return httpNew.put(`/feedback/${id}`, data);
  },
  uploadManyImages(body: any) {
    return httpNew.post<SuccessResponse<string>>("/file/s3/upload", body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

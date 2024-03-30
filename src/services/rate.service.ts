import http from "src/utils/http";

export const ratingService = {
  getRating(id: string) {
    return http.get(`/rating/?product=${id}`);
  },
  postRating(data: any) {
    return http.post(`/rating`, data);
  },
  patchRating(id: string, data: string) {
    return http.patch(`/rating/${id}`, data);
  },
};

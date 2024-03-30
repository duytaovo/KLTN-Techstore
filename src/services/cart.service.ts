import { SuccessResponse } from "src/types/utils.type";
import { httpNew } from "src/utils/http";

export const cartService = {
  getProductByProductSlugId({ slug, id }: { slug: string; id: string }) {
    return httpNew.get(`/product/${slug}/${id}`);
  },
  getProductByProductSlug({ slug, params }: { slug: string; params: any }) {
    return httpNew.get(`/product/${slug}`, { params });
  },
  getProductsFilterAccess({ body, params }: any) {
    return httpNew.post(`/search/filter`, body, { params: params });
  },
};


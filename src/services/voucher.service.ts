import { SuccessResponse } from "src/types/utils.type";
import { httpNew } from "src/utils/http";

const voucherService = {
  addVoucherUser(lstCode: string[]) {
    return httpNew.post<SuccessResponse<any>>(`/voucher/user/add`, lstCode);
  },
  getVouchers() {
    return httpNew.get<SuccessResponse<any>>("/voucher");
  },
  getVoucherDetail(code: string) {
    return httpNew.get<SuccessResponse<any>>(`/voucher/${code}`);
  },
  getVoucherUser() {
    return httpNew.get<SuccessResponse<any>>(`/voucher/user`);
  },
};

export default voucherService;


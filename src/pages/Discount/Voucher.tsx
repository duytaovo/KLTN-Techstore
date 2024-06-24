import { FunctionComponent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import { getVouchers } from "src/store/voucher/voucherSlice";
import CardVoucher from "./Card";

interface VoucherProps {}

const Voucher: FunctionComponent<VoucherProps> = () => {
  const dispatch = useAppDispatch();
  const { vouchers } = useAppSelector((state) => state.voucher);
  console.log(vouchers);
  useEffect(() => {
    const getData = async () => {
      const res = await dispatch(getVouchers(""));
      // unwrapResult(res);
    };
    getData();
  }, [dispatch]);

  return (
    <div className="max-w-[1200px] m-auto flex gap-8">
      {vouchers?.data.map((item, index) => <CardVoucher item={item} />)}
      {/* <CardVoucher item={data} /> */}
    </div>
  );
};

export default Voucher;


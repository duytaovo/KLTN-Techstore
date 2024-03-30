import { FunctionComponent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import { getVouchers } from "src/store/voucher/voucherSlice";
import CardVoucher from "./Card";

interface VoucherProps {}

const Voucher: FunctionComponent<VoucherProps> = () => {
  const dispatch = useAppDispatch();
  const { vouchers } = useAppSelector((state) => state.voucher);
  useEffect(() => {
    const getData = async () => {
      const res = await dispatch(getVouchers(""));
      // unwrapResult(res);
    };
    getData();
  }, [dispatch]);
  const data = {
    id: 3,
    name: "string2",
    code: "string2",
    startDate: "2023-03-17",
    endDate: "2024-03-17",
    price: 10.0,
    discount: 9.0,
    gift: "null",
  };
  return (
    <div className="max-w-[1200px] m-auto">
      {vouchers?.data.map((item, index) => <CardVoucher item={item} />)}
      <CardVoucher item={data} />
    </div>
  );
};

export default Voucher;


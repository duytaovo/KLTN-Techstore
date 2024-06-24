import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { Button } from "antd";
import {
  addVoucherUser,
  getVoucherDetail,
  getVoucherUser,
} from "src/store/voucher/voucherSlice";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import { toast } from "react-toastify";

interface Props {
  item: {
    id: number;
    name: string;
    code: string;
    startDate: string;
    endDate: string;
    price: number;
    discount: number;
    gift?: string;
  };
}

const CardVoucher = ({ item }: Props) => {
  const [loadings, setLoadings] = useState<boolean>();
  const dispatch = useAppDispatch();
  const { userWithId } = useAppSelector((state) => state.user);
  const body = [item.code];
  const handleAddVoucher = async () => {
    setLoadings(true);
    console.log(userWithId);

    if (userWithId.id > 0) {
      const isVoucherGet = (await dispatch(getVoucherUser(""))).payload.data
        ?.data;
      console.log(isVoucherGet);
      const voucherExists = isVoucherGet.some(
        (voucher: any) => voucher.code == body,
      );
      console.log(voucherExists)
      if (voucherExists) {
        toast.error("Mã giảm giá đã được thêm trước đó!!!");
        setLoadings(false);
        return;
      } else {
        await dispatch(addVoucherUser(body));
        toast.success("Thêm mã giảm giá thành công");
        setLoadings(false);
      }
    } else {
      toast.error("Vui lòng đăng nhập trước khi thêm mã giảm giá");
      setLoadings(false);
      return;
    }
  };
  return (
    <Card
      size="small"
      style={{ width: 200 }}
      cover={
        <img
          alt="example"
          src="https://lh6.googleusercontent.com/jO_cEr2BmpBaWvW0dajO3Q-En72dgctZi2InwR4UH2ka263JtegSlU-7LHg49Kk6XUW01vwenKfSpp65KTZ6swl1Y9raYF0PC0AM4l7VF2s8SUoQ_qbeJwqRR3trTRY2ER62FAcDy2fp2tPp6bwBRxQ"
        />
      }
    >
      <p>Tên: {item.name}</p>
      <p>Mã: {item.code}</p>
      {item?.discount > 0 ? <p>Giảm:{item.discount}%</p> : null}
      {item?.price > 0 ? <p>Giảm:{item.price}đ</p> : null}
      {item?.gift ? <p>Giảm:{item.gift}</p> : null}
      <p className="flex">Bắt đầu: {item.startDate}</p>
      <p>Kết thúc: {item.endDate}</p>
      <Button
        className="bg-black"
        type="primary"
        loading={loadings}
        onClick={() => handleAddVoucher()}
      >
        Thêm
      </Button>
    </Card>
  );
};

export default CardVoucher;


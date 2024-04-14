import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { Button } from "antd";
import { addVoucherUser } from "src/store/voucher/voucherSlice";
import { useAppDispatch } from "src/hooks/useRedux";

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
  const body = {
    lstCode: [item.code],
  };
  const handleAddVoucher = async () => {
    setLoadings(true);
    await dispatch(addVoucherUser(body));
    setLoadings(false);
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
      actions={[<EditOutlined key="edit" />]}
    >
      <p>{item.name}</p>
      <p>{item.code}</p>
      <p>{item.discount}</p>
      <p>{item.price}</p>
      <p>{item.startDate}</p>
      <p>{item.endDate}</p>
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


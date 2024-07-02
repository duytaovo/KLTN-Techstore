import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import OrderTable from "./OrderTable";
import path from "src/constants/path";
import { handleFilterStore } from "src/store/product/productsSlice";

const EmptyOrder = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onClick = () => {
    dispatch(handleFilterStore([]));
    navigate(path.home);
  };
  return (
    <div className="flex flex-col items-center justify-center my-8">
      <img
        src="https://www.thegioididong.com/lich-su-mua-hang/images/gio-hang-rong-desk.png"
        title="Tiếp tục mua sắm"
      ></img>

      <p>Bạn chưa có đơn hàng nào</p>
      <Link className="" to="/" onClick={onClick}>
        Về trang chủ
      </Link>
      <div>
        Khi cần hỗ trợ vui lòng gọi <a href="tel:18001060">1800.1234</a> (7h30 -
        22h)
      </div>
    </div>
  );
};
const PurchaseHistory = () => {
  const { historyOrder } = useAppSelector((state) => state.historyOrders);
  return <div>{<OrderTable />}</div>;
  // return <div>{<OrderTable />}</div>;
};
export default PurchaseHistory;


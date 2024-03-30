import { useEffect, useState } from "react";
import Info from "./Info";
import { Helmet } from "react-helmet-async";
import { getHistoryOrders } from "src/store/history/historyOrdersSlice";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import { Pagination } from "antd";

const History = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
  const pageSize = 10; // Số phần tử trên mỗi trang
  const { historyOrder } = useAppSelector((state) => state.historyOrders);
  
  useEffect(() => {
    const body = {
      orderStatus: [],
      buyDateFrom: null,
      buyDateTo: null,
      paymentStatus: [],
    };
    dispatch(
      getHistoryOrders({
        body: body,
        params: { pageNumber: currentPage, pageSize: 10 },
      }),
    );
  }, [currentPage]);
  const handlePageChange = (page: number) => {
    setCurrentPage(page - 1);
  };
  return (
    <div>
      {" "}
      <Helmet>
        <title>Trang lịch sử mua hàng </title>
        <meta name="description" content="Trang lịch sử mua hàng" />
      </Helmet>
      <Info />
      <div className="mb-5">
        <Pagination
          current={currentPage + 1}
          pageSize={pageSize}
          total={historyOrder?.data?.totalElements}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};
export default History;


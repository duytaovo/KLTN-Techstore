import { useState, Fragment, useEffect } from "react";
import "./table.scss";
import OrderDetail from "./OrderDetail";
import { Table } from "flowbite-react";
import numberWithCommas from "src/utils/numberWithCommas";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import { Button } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { getHistoryOrders } from "src/store/history/historyOrdersSlice";
import Filter from "src/components/Filter/Filter";
import { DateRange } from "@mui/x-date-pickers-pro";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { handleFilterStore } from "src/store/product/productsSlice";
import Skeleton from "src/components/Skeleton";
const data = [
  {
    id: 1,
    title: "Trạng thái đơn hàng",
    detail: [
      {
        id: 1,
        name: "Đã đặt",
      },
      {
        id: 2,
        name: "Đã xác nhận",
      },
      {
        id: 3,
        name: "Đang giao hàng",
      },
      {
        id: 4,
        name: "Đã giao hàng",
      },
      {
        id: 5,
        name: "Đã huỷ",
      },
    ],
  },
  {
    id: 2,
    title: "Trạng thái thanh toán",
    detail: [
      {
        id: 0,
        name: "Chưa thanh toán",
      },
      {
        id: 1,
        name: "Đang chờ thanh toán",
      },
      {
        id: 2,
        name: "Thanh toán thành công",
      },
      {
        id: 3,
        name: "Thanh toán thất bại",
      },
    ],
  },
];
const OrderTable = () => {
  const { historyOrder } = useAppSelector((state) => state.historyOrders);
  const loading = useAppSelector((state) => state.loading.loading);

  const style = (text: string) => {
    switch (text) {
      case "Ordered":
        return "text-blue-400 uppercase text-xl font-bold";
      case "Delivering":
        return "text-blue-400 uppercase text-xl font-bold";
      case "Cancelled":
        return "text-red-400 uppercase text-xl font-bold";
      case "Confirmed":
        return "text-green-400 font-bold uppercase text-xl";
      case "Delivered":
        return "text-yellow-400 font-bold uppercase text-xl";
    }
  };
  const dispatch = useAppDispatch();
  const [dataFilterLocal, setDataFilterLocal] = useState<any>();
  const filter = useAppSelector((state) => state.products.filter.data); // Lấy tất cả
  const [value, setValue] = useState<DateRange<Dayjs>>([
    dayjs("2023-01-01"),
    dayjs(),
  ]);
  const [orderDetail, setOrderDetail] = useState({ index: -1, id: null });
  const handleDetail = (index: number, order: any) => {
    setOrderDetail((current) => {
      return current.index === index
        ? {
            index: -1,
            id: order.id,
          }
        : {
            index,
            id: order.id,
          };
    });
  };
  useEffect(() => {
    dispatch(handleFilterStore([]));
  }, []);
  useEffect(() => {
    const separateArrays = (data: any) => {
      const result: any = {};

      data.forEach((item: any) => {
        const key = Object.keys(item)[0]; // Lấy tên thuộc tính (ví dụ: 'Hãng', 'Giá', ...)

        if (!result[key]) {
          result[key] = [];
        }

        result[key].push(item[key]);
      });

      return result;
    };
    // Gọi hàm tách mảng
    const separatedArrays = separateArrays(filter);
    setDataFilterLocal(separatedArrays);
  }, [filter]);

  // Kết quả
  if (dataFilterLocal) {
    var {
      "Trạng thái đơn hàng": Trangthaidonhang,
      "Trạng thái thanh toán": Phuongthucthanhtoan,
    } = dataFilterLocal;
  }
  const PhuongthucthanhtoanNumber: number[] = Phuongthucthanhtoan?.map(
    (str: string) => parseInt(str, 10),
  );
  const TrangthaidonhangNumber: number[] = Trangthaidonhang?.map(
    (str: string) => parseInt(str, 10),
  );
  useEffect(() => {
    const body = {
      shippingId: null,
      completeDateFrom: null,
      completeDateTo: null,
      productName: null,
      customerName: null,
      customerAddress: null,
      orderStatus: TrangthaidonhangNumber ? TrangthaidonhangNumber : [],
      buyDateFrom: value[0]?.format("YYYY-MM-DD") || null,
      buyDateTo: value[1]?.format("YYYY-MM-DD") || null,
      paymentStatus: PhuongthucthanhtoanNumber ? PhuongthucthanhtoanNumber : [],
    };
    dispatch(
      getHistoryOrders({
        body: body,
        params: { pageNumber: 0, pageSize: 10 },
      }),
    );
  }, [value[0], value[1], Trangthaidonhang, Phuongthucthanhtoan]);

  const stringStatus = (text: string) => {
    switch (text) {
      case "Ordered":
        return "Đơn hàng đã đặt";
      case "Confirmed":
        return "Đơn hàng đã xác nhận";
      case "Requesting":
        return "Đơn hàng đang được shipper yêu cầu";
      case "Working":
        return "Đơn hàng đang chờ shipper lấy";
      case "Delivering":
        return "Đơn hàng đang trên đường giao đến bạn";
      case "Change_Delivering":
        return "Đơn hàng đang được chuyển cho shipper khác";
      case "Changed_Delivering":
        return "Đơn hàng đã chuyển cho shipper khác";
      case "Delivering_Fail_1":
        return "Đơn hàng vận chuyển thất bại lần 1";
      case "Delivering_Fail_2":
        return "Đơn hàng vận chuyển thất bại lần 2";
      case "Delivering_Fail_3":
        return "Đơn hàng vận chuyển thất bại lần 3";
      case "Delivered":
        return "Shipper giao thành công";
      case "RequestChange":
        return "Yêu cầu đổi hàng";
      case "Changing":
        return "Đang đổi hàng";
      case "Changed":
        return "Đã đổi hàng";
      case "RequestChangeAndReturn":
        return "Yêu cầu đổi và trả hàng";
      case "ChangingAndReturning":
        return "Đang đổi và trả hàng";
      case "ChangedAndReturned":
        return "Đã đổi và trả hàng";
      case "RequestReturn":
        return "Yêu cầu trả hàng";
      case "Returning":
        return "Đơn hàng đang trả lại";
      case "Returned":
        return "Đơn hàng trả lại shop thành công";
      case "Received":
        return "Đơn hàng đã được nhận";
      case "Success":
        return "Đơn hàng thành công";
      case "Failed":
        return "Đơn hàng thất bại";
      case "Cancelled":
        return "Đơn hàng đã bị huỷ";
      default:
        return "Trạng thái không xác định";
    }
  };

  return (
    <div>
      <div className="text-mainColor max-w-[1200px] ml-5 mb-5 m-auto">
        <Filter handle={() => {}} data={data} />
      </div>
      <div className="space-x-5 ml-5">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateRangePicker
            className="w-1/3"
            value={value}
            onChange={(newValue) => setValue(newValue)}
          />
        </LocalizationProvider>
      </div>
      <Table hoverable={true} className="text-black/50 bg-transparent">
        <caption className="text-left p-4 font-semibold text-2xl">
          Đơn hàng đã mua gần đây
        </caption>
        {loading > 0 ? (
          <Skeleton
            styles={{ height: "50vh" }}
            children={undefined}
            className={undefined}
          />
        ) : (
          <>
            <Table.Head className="bg-mainL1">
              <Table.HeadCell> Mã đơn hàng </Table.HeadCell>
              <Table.HeadCell>Sản phẩm</Table.HeadCell>
              <Table.HeadCell>Số lượng</Table.HeadCell>
              <Table.HeadCell>Tổng tiền</Table.HeadCell>
              <Table.HeadCell> Ngày đặt mua</Table.HeadCell>
              <Table.HeadCell>Trạng thái</Table.HeadCell>
            </Table.Head>
            <Table.Body className="ide-y overflow-hidden">
              {historyOrder?.data?.data?.map((order: any, index: number) => {
                const styleStatus = style(order.orderStatusString);
                const displayDetail = index === orderDetail.index;
                return (
                  <Fragment key={index}>
                    <Table.Row className=" text-2xl dark:border-gray-700 dark:bg-gray-800 flex-[1000]">
                      <Table.Cell className="text-blue-400 ">
                        #{order.id}
                        {/* {order.orderStatus == 12 ? (
                          <span className={"text-blue-500 mx-4"}>
                            Đã yêu cầu đổi
                          </span>
                        ) : order.orderStatus == 18 ? (
                          <span className={"text-blue-500 mx-4"}>
                            Đã yêu cầu trả
                          </span>
                        ) : order.orderStatus == 15 ? (
                          <span className={"text-blue-500 mx-4"}>
                            Đã yêu cầu đổi và trả
                          </span>
                        ) : order.orderStatus == 21 ? (
                          <span className={"text-blue-500 mx-4"}>
                            Đã nhận hàng
                          </span>
                        ) : null} */}
                      </Table.Cell>
                      <Table.Cell className="text-blue-400  cursor-pointer hover:text-blue-700 select-none">
                        <Button
                          type="link"
                          onClick={() => handleDetail(index, order)}
                        >
                          Xem chi tiết
                        </Button>
                      </Table.Cell>
                      <Table.Cell>{order?.orderDetails?.length}</Table.Cell>
                      <Table.Cell className="text-red-400">
                        {numberWithCommas(order?.finalPrice)}₫
                      </Table.Cell>
                      <Table.Cell>
                        <p className="">{order?.buyDate.substring(0, 10)}</p>
                      </Table.Cell>
                      <Table.Cell className={styleStatus}>
                        <div className="flex flex-grow justify-between text-xl font-bold uppercase">
                          {stringStatus(order.orderStatusString)}
                          {order.paymentStatusString === "Payment success" ||
                          order.orderStatus === 11 ||
                          order.orderStatus === 21 ||
                          order.orderStatus === 22 ? (
                            <span className="text-white text-xl bg-green-500 p-2 rounded-lg">
                              ĐÃ THANH TOÁN
                            </span>
                          ) : (
                            <span className="text-white text-xl bg-gray-500 p-2 rounded-lg">
                              CHƯA THANH TOÁN
                            </span>
                          )}
                        </div>
                      </Table.Cell>
                    </Table.Row>
                    {displayDetail && (
                      <Table.Row>
                        <Table.Cell className="" colSpan={7}>
                          <OrderDetail
                            order={order}
                            displayDetail={displayDetail}
                            setOrderDetail={setOrderDetail}
                            index={index}
                          />
                        </Table.Cell>
                      </Table.Row>
                    )}
                  </Fragment>
                );
              })}
            </Table.Body>
          </>
        )}
      </Table>
    </div>
  );
};

export default OrderTable;


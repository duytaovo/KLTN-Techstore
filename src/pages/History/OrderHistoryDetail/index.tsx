import { Table, TableProps, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "src/hooks/useRedux";
import { getHistoryDetailOrder } from "src/store/history/historyOrdersSlice";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Box, AppBar, Toolbar, Palette, Theme } from "@material-ui/core";
import { styled } from "@mui/system";
import { useTheme } from "@material-ui/core/styles";

interface DataType {
  wfOrderId: number;
  orderId: number;
  createdTime: string;
  orderStatus: number;
  statusNameVn: string;
  note: string | null;
  userId: number;
  userName: string;
}

const columns: TableProps<DataType>["columns"] = [
  // {
  //   title: "Mã lịch sử đơn",
  //   dataIndex: "wfOrderId",
  //   key: "wfOrderId",
  //   render: (text) => <a>{text}</a>,
  // },
  // {
  //   title: "Mã đơn",
  //   dataIndex: "orderId",
  //   key: "orderId",
  //   render: (text) => <a>{text}</a>,
  // },
  {
    title: "Ngày tạo",
    dataIndex: "createdTime",
    key: "createdTime",
    render: (tag) => <Tag color="pink">{tag.slice(0, 10)}</Tag>,
  },

  // {
  //   title: "Trạng thái",
  //   key: "orderStatus",
  //   dataIndex: "orderStatus",
  //   render: (tag) => <Tag color={"blue"}>{tag}</Tag>,
  // },
  {
    title: "Tên trạng thái",
    dataIndex: "statusNameVn",
    key: "statusNameVn",
    render: (tag) => {
      // switch (tag) {
      //   case "Ordered":
      //     return "Đơn hàng đã đặt";
      //   case "Confirmed":
      //     return "Đơn hàng đã xác nhận";
      //   case "Requesting":
      //     return "Đơn hàng đang được shipper yêu cầu";
      //   case "Working":
      //     return "Đơn hàng đang chờ shipper lấy";
      //   case "Delivering":
      //     return "Đơn hàng đang trên đường giao đến bạn";
      //   case "Change_Delivering":
      //     return "Đơn hàng đang được chuyển cho shipper khác";
      //   case "Changed_Delivering":
      //     return "Đơn hàng đã chuyển cho shipper khác";
      //   case "Delivering_Fail_1":
      //     return "Đơn hàng vận chuyển thất bại lần 1";
      //   case "Delivering_Fail_2":
      //     return "Đơn hàng vận chuyển thất bại lần 2";
      //   case "Delivering_Fail_3":
      //     return "Đơn hàng vận chuyển thất bại lần 3";
      //   case "Delivered":
      //     return "Đã giao hàng thành công";
      //   case "RequestChange":
      //     return "Yêu cầu đổi hàng";
      //   case "Changing":
      //     return "Đang đổi hàng";
      //   case "Changed":
      //     return "Đã đổi hàng";
      //   case "RequestChangeAndReturn":
      //     return "Yêu cầu đổi và trả hàng";
      //   case "ChangingAndReturning":
      //     return "Đang đổi và trả hàng";
      //   case "ChangedAndReturned":
      //     return "Đã đổi và trả hàng";
      //   case "RequestReturn":
      //     return "Yêu cầu trả hàng";
      //   case "Returning":
      //     return "Đơn hàng đang trả lại";
      //   case "Returned":
      //     return "Đơn hàng trả lại shop thành công";
      //   case "Received":
      //     return "Đơn hàng đã được nhận";
      //   case "Success":
      //     return "Đơn hàng thành công";
      //   case "Failed":
      //     return "Đơn hàng thất bại";
      //   case "Cancelled":
      //     return "Đơn hàng đã bị huỷ";
      //   default:
      //     return "Trạng thái không xác định";
      // }
      return <Tag color={"blue"}>{tag}</Tag>;
    },
  },
  {
    title: "Chú thích",
    dataIndex: "note",
    key: "note",
  },
  {
    title: "Mã người dùng",
    dataIndex: "userId",
    key: "userId",
  },
  {
    title: "Tên người thực hiện",
    dataIndex: "userName",
    key: "userName",
  },
];

interface ExtendedPalette extends Palette {
  gradients: {
    primary: string;
    info: string;
    success: string;
    warning: string;
    error: string;
  };
}

interface ExtendedTheme extends Theme {
  palette: ExtendedPalette;
}

const OrderHistoryDetail: React.FC = () => {
  const theme = useTheme();
  const PRIMARY_MAIN = theme.palette.primary.main;
  const GRADIENTS_MAIN = (theme as ExtendedTheme)?.palette.gradients?.primary;
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [data, setData] = useState<DataType[]>([]);
  const id = location?.pathname.match(/\/(\d+)$/)?.[1] ?? null;

  useEffect(() => {
    const getData = async () => {
      if (id && !isNaN(id as any)) {
        const res = await dispatch(getHistoryDetailOrder({ orderId: id }));
        setData(res.payload.data?.data);
      } else {
        console.log("Invalid or missing ID, not making API call.");
      }
    };

    getData();
  }, [id, dispatch]);

  return (
    <div className="mx-20">
      {/* <Table columns={columns} dataSource={data} />; */}
      <Box sx={{ width: "100%", height: "50vh" }}>
        <Stepper
          alternativeLabel
          activeStep={data.length - 1}
          // orientation="vertical"
        >
          {data.map((item) => (
            <Step key={item.wfOrderId}>
              <StepLabel className="text-[16px] text-blue-500">
                {item.createdTime.slice(0, 10)}
              </StepLabel>
              <div className="flex flex-col justify-center items-center ">
                <div
                  style={{ fontSize: "16px", color: `${PRIMARY_MAIN}` }}
                  className={`text-center text-[13px] text-[${PRIMARY_MAIN}]`}
                >
                  {item.statusNameVn}
                </div>
                <div className="text-center text-[13px]">{item.userName}</div>
              </div>
            </Step>
          ))}
        </Stepper>
      </Box>
    </div>
  );
};

export default OrderHistoryDetail;


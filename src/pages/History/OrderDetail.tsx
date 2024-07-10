import { yupResolver } from "@hookform/resolvers/yup";
import { unwrapResult } from "@reduxjs/toolkit";
import { Button, Form, Modal, Rate, Select } from "antd";
import { useEffect, useState } from "react";
import { CheckCircleFill } from "react-bootstrap-icons";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "src/components/Input";
import InputFile from "src/components/InputFile";
import path from "src/constants/path";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import {
  getCommentById,
  postComments,
  uploadManyImages,
} from "src/store/comment/commentsSlice";
import { ErrorResponse } from "src/types/utils.type";
import numberWithCommas from "src/utils/numberWithCommas";
import { schemaChangeProduct, schemaFeedback } from "src/utils/rules";
import { isAxiosUnprocessableEntityError } from "src/utils/utils";
import QuantityController from "../CartNew/QuantityController";
import Textarea from "src/components/Textarea";
import {
  changeProductOrders,
  updateCancel,
  updateReceived,
} from "src/store/history/historyOrdersSlice";

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
interface Props {
  order: any;
  displayDetail: any;
  setOrderDetail: any;
  index: number;
}
interface FormData {
  comment: string;
  star: string;
}
const OrderDetail = ({ order, index, setOrderDetail }: Props) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenChangeProduct, setIsModalOpenChangeProduct] =
    useState(false);
  const [
    isModalOpenChangAndReturnProduct,
    setIsModalOpenChangAndReturnProduct,
  ] = useState(false);
  const [idProduct, setIdProduct] = useState<string>();
  const [valueStar, setValueStart] = useState(3);
  const [quantityChange, setQuantityChange] = useState(0);
  const [quantityReturn, setQuantityReturn] = useState(0);
  const { commentById } = useAppSelector((state) => state.comments);
  const style = (text: string) => {
    switch (text) {
      case "Đã đặt hàng":
      case "Đặt hàng":
        return "text-green-400";
      case "Đang giao hàng":
        return "text-blue-400";
      case "Đã hủy":
        return "text-red-400";
      case "Đã nhận":
        return "text-gray-400";
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitingChangeProduct, setIsSubmittingChangeProduct] =
    useState(false);

  const {
    handleSubmit,
    formState: { errors },
    setError,
    register,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schemaFeedback),
  });
  const {
    handleSubmit: handleSubmitChangeProduct,
    formState: { errors: errorChangeProduct },
    register: registerChangeProduct,
    setValue: setValueChangeProduct,
  } = useForm({
    resolver: yupResolver(schemaChangeProduct),
  });
  const {
    handleSubmit: handleSubmitChangeAndReturnProduct,
    formState: { errors: errorChangeAndReturnProduct },
    register: registerChangeAndReturnProduct,
    setValue: setValueChangeAndReturnProduct,
  } = useForm({
    resolver: yupResolver(schemaChangeProduct),
  });
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<File[]>();
  const [mainCauseChangeProduct, setMainCauseChangeProduct] = useState<
    number | string
  >(0);

  const [typeChangeProduct, setTypeChangeProduct] = useState<number | string>(
    0,
  );

  const handleIncrementReturn = (max: number) => {
    let _value = Number(quantityReturn) + 1;
    if (max - quantityChange !== undefined && _value > max - quantityChange) {
      _value = max - quantityChange;
      toast.error("Đã vượt số lượng mua hàng");
    }
    setQuantityReturn(_value);
  };

  const handleDecrementReturn = () => {
    let _value = Number(quantityReturn) - 1;
    if (_value < 1) {
      _value = 0;
    }
    setQuantityReturn(_value);
  };
  const handleIncrementChange = (max: number) => {
    let _value = Number(quantityChange) + 1;
    if (max - quantityReturn !== undefined && _value > max - quantityReturn) {
      _value = max - quantityReturn;
      toast.error("Đã vượt số lượng mua hàng");
    }
    setQuantityChange(_value);
  };

  const handleDecrementChange = () => {
    let _value = Number(quantityChange) - 1;
    if (_value < 1) {
      _value = 0;
    }
    setQuantityChange(_value);
  };

  const handleChangeQuantityChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value)) {
      setQuantityChange(value);
    } else {
      setQuantityChange(0);
    }
  };
  const handleChangeQuantityReturn = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value)) {
      setQuantityReturn(value);
    } else {
      setQuantityReturn(0);
    }
  };
  const [
    typeChangeProductChangeAndReturn,
    setTypeChangeProductChangeAndReturn,
  ] = useState<number[] | string[]>([]);

  const [mainCauseChangeAndReturnProduct, setMainCauseChangeAndReturnProduct] =
    useState<number[] | string[]>([]);

  const imageArray = file || []; // Mảng chứa các đối tượng ảnh (File hoặc Blob)

  // Tạo một mảng chứa các URL tạm thời cho ảnh
  const imageUrls: string[] = [];

  for (const image of imageArray) {
    const imageUrl = URL.createObjectURL(image);
    imageUrls.push(imageUrl);
  }
  // useEffect(() => {
  //   dispatch(getCommentById(id));
  // }, [id]);
  useEffect(() => {
    setValue("comment", commentById?.data?.comment);
    setValue("feedbackFilesUrl", []);
    setValue("star", commentById?.data?.star);
    setValueStart(commentById?.data?.star);
  }, [commentById]);
  useEffect(() => {
    const getDataDetailHistory = async () => {
      // const res = await dispatch(getHistoryDetailOrder({ orderId: order.id }));
      // console.log(res);
    };
    getDataDetailHistory();
  }, []);
  //console.log(idProduct);
  const onSubmit = handleSubmit(async (data) => {
    let images: any = [];
    setIsSubmitting(true);
    if (file) {
      const form = new FormData();
      for (let i = 0; i < file.length; i++) {
        form.append("files", file[i]);
      }
      const res = await dispatch(uploadManyImages(form));
      unwrapResult(res);
      const d = res?.payload?.data?.data;
      for (let i = 0; i < d.length; i++) {
        images.push(d[i]?.fileUrl);
      }
    }
    const body = JSON.stringify({
      orderProductId: idProduct,
      comment: data.comment,
      star: Number(valueStar),
      feedbackFilesUrl: images || [],
    });

    try {
      const res = await dispatch(postComments(body));
      unwrapResult(res);
      const d = res?.payload?.data;
      if (d?.code !== 200) return toast.error(d?.message);
      await toast.success("Đánh giá sản phẩm thành công ");
      await navigate(path.home);
      // window.location.reload();
      setIsModalOpen(false);
    } catch (error: any) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
        const formError = error.response?.data.data;
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormData, {
              message: formError[key as keyof FormData],
              type: "Server",
            });
          });
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  });

  const onSubmitChangeProduct = handleSubmitChangeProduct(async (data) => {
    // setIsSubmittingChangeProduct(true);
    const body = {
      orderProductId: idProduct,
      type: typeChangeProduct,
      mainCause: mainCauseChangeProduct,
      quantity: quantityChange,
      customerDescription: data?.customerDescription,
    };
    try {
      const res = await dispatch(changeProductOrders([body]));
      unwrapResult(res);
      const d = res?.payload?.data;
      if (d?.code !== 200) return toast.error(d?.message);
      await toast.success("Gửi yêu cầu thành công ");
      window.location.reload();
      setIsModalOpenChangeProduct(false);
    } catch (error: any) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
        const formError = error.response?.data.data;
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormData, {
              message: formError[key as keyof FormData],
              type: "Server",
            });
          });
        }
      }
    } finally {
      setIsModalOpenChangeProduct(false);
      setIsSubmittingChangeProduct(false);
    }
  });
  const onSubmitChangeAndReturnProduct = handleSubmitChangeProduct(
    async (data) => {
      const isCheckBody1 =
        typeChangeProductChangeAndReturn[0] !== undefined &&
        mainCauseChangeAndReturnProduct[0] !== undefined &&
        quantityChange !== 0;
      const isCheckBody2 =
        typeChangeProductChangeAndReturn[1] !== undefined &&
        mainCauseChangeAndReturnProduct[1] !== undefined &&
        quantityReturn !== 0;
      if (quantityChange + quantityReturn === 1) {
        if (isCheckBody1 && isCheckBody2) {
          toast.error(
            "Bạn chỉ có thể đổi hoặc trả hàng vì số lượng sản phẩm chỉ có 1",
          );
          return;
        }
      }

      console.log(isCheckBody1);
      console.log(isCheckBody2);

      const body1 = {
        orderProductId: idProduct,
        type: typeChangeProductChangeAndReturn[0],
        mainCause: mainCauseChangeAndReturnProduct[0],
        quantity: quantityReturn,
        customerDescription: data?.customerDescription,
      };
      const body2 = {
        orderProductId: idProduct,
        type: typeChangeProductChangeAndReturn[1],
        mainCause: mainCauseChangeAndReturnProduct[1],
        quantity: quantityChange,
        customerDescription: data?.customerDescription,
      };

      try {
        if (isCheckBody1 == true && isCheckBody2 == true) {
          const res = await dispatch(changeProductOrders([body1, body2]));
          unwrapResult(res);
          const d = res?.payload?.data;
          if (d?.code !== 200) return toast.error(d?.message);
          await toast.success("Gửi yêu cầu thành công ");
          // await navigate(path.home);
          window.location.reload();
          setIsModalOpenChangeProduct(false);
          return;
        } else if (isCheckBody1 == true && isCheckBody2 == false) {
          const res = await dispatch(changeProductOrders([body1]));
          unwrapResult(res);
          const d = res?.payload?.data;
          if (d?.code !== 200) return toast.error(d?.message);
          await toast.success("Gửi yêu cầu thành công ");
          // await navigate(path.home);
          window.location.reload();
          setIsModalOpenChangeProduct(false);
          return;
        } else if (isCheckBody1 == false && isCheckBody2 == true) {
          const res = await dispatch(changeProductOrders([body2]));
          unwrapResult(res);
          const d = res?.payload?.data;
          if (d?.code !== 200) return toast.error(d?.message);
          await toast.success("Gửi yêu cầu thành công ");
          // await navigate(path.home);
          window.location.reload();
          setIsModalOpenChangeProduct(false);
          return;
        } else {
          toast.error("Vui lòng nhập các trường thông tin trên cho đúng !!!");
          return;
        }
      } catch (error: any) {
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
          const formError = error.response?.data.data;
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
                type: "Server",
              });
            });
          }
        }
      } finally {
        setIsModalOpenChangeProduct(false);
        setIsSubmittingChangeProduct(false);
      }
    },
  );

  const handleReceived = async (id: number) => {
    setIsSubmitting(true);
    const res = await dispatch(updateReceived(id));
    const data = res.payload;
    if (data?.data?.code === 200) {
      setIsSubmitting(false);
      toast.success("Thành công");
      window.location.reload();
    } else {
      setIsSubmitting(false);
      toast.error("Có lỗi !!!");
      return null;
    }
  };

  const handleCancelOrder = async (id: number) => {
    setIsSubmitting(true);
    const res = await dispatch(
      updateCancel({ orderId: id, reasone: "Lỗi sản phẩm" }),
    );
    const data = res.payload;
    if (data?.data?.code === 200) {
      setIsSubmitting(false);
      toast.success("Thành công");
      window.location.reload();
    } else {
      setIsSubmitting(false);
      toast.error("Có lỗi !!!");
      return null;
    }
  };

  const handleChangeFile = (file?: File[]) => {
    setFile(file);
  };
  const handlePayment = () => {
    navigate(path.payment);
  };

  const handleOk = () => {
    setValue("comment", "");
    setValue("feedbackFilesUrl", []);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setValue("comment", "");
    setValue("feedbackFilesUrl", []);
    setIsModalOpen(false);
  };

  const handleOkChangeProduct = () => {
    setValueChangeProduct("customerDescription", "");
    setIsModalOpenChangeProduct(false);
  };

  const handleCancelChangeProduct = () => {
    setValueChangeProduct("customerDescription", "");
    setIsModalOpenChangeProduct(false);
  };

  const handleOkChangeAndReturnProduct = () => {
    setValueChangeProduct("customerDescription", "");
    setIsModalOpenChangAndReturnProduct(false);
  };

  const handleCancelChangeAndReturnProduct = () => {
    setValueChangeProduct("customerDescription", "");
    setIsModalOpenChangAndReturnProduct(false);
  };

  const onChangeSelectMainCauseChangeProduct = (value: number) => {
    setMainCauseChangeProduct(value);
  };

  const onChangeSelectMainCauseChangeAndReturnProduct = (value: number[]) => {
    setMainCauseChangeAndReturnProduct(value);
  };
  const handleGetQuantityChange = (value: number) => {
    setQuantityChange(value);
  };

  const handleGetQuantityReturn = (value: number) => {
    setQuantityReturn(value);
  };
  const handleQuantityChange = async (
    purchaseIndex: number,
    value: number,
    enable: boolean,
  ) => {
    if (enable) {
      setQuantityChange(value);
    }
  };
  const handleQuantityReturn = async (
    purchaseIndex: number,
    value: number,
    enable: boolean,
  ) => {
    if (enable) {
      setQuantityReturn(value);
    }
  };
  const desc = ["Rất tệ", "Tệ", "Bình thường", "Tốt", "Rất tốt"];
  const checkPayment = order?.paymentStatusString === "Unpaid" ? false : true;
  return (
    <div>
      <div className="">
        <Button
          className="ml-0 p-0"
          onClick={() => {
            navigate(`/history/detail/${order.id}`);
          }}
          type="link"
        >
          Xem chi tiết lịch sử trạng thái
        </Button>
      </div>
      {/* <Link to={`/history/detail/${order.id}`} className="text-2xl"></Link> */}
      <div className="py-8 border-b">
        <div className="flex justify-between">
          <h2 className="font-bold text-3xl">Chi tiết đơn hàng: #{order.id}</h2>
          <p className="text-2xl">
            Trạng thái:{" "}
            {/* <span className={style(order.orderStatusString)}>
              {"Đã đặt hàng"}
            </span> */}
            {order.orderStatus == 12 ? (
              <span className={"text-blue-500"}>Đã yêu cầu đổi</span>
            ) : order.orderStatus == 18 ? (
              <span className={"text-blue-500"}>Đã yêu cầu trả</span>
            ) : order.orderStatus == 15 ? (
              <span className={"text-blue-500"}>Đã yêu cầu đổi và trả</span>
            ) : order.orderStatus == 21 ? (
              <span className={"text-blue-500"}>Đã nhận hàng thành công</span>
            ) : null}
            {/* {checkPayment === false && (
              <Button type="link" onClick={handlePayment}>
                Tiến hành thanh toán
              </Button>
            )} */}
          </p>
        </div>
        <p className="text-2xl">Mua tại docongnghe.com</p>
      </div>

      {order?.orderDetails?.map((item: any, index: number) => {
        console.log(item);
        return (
          <div className="flex justify-between py-4 border-b" key={index}>
            <div className="flex space-x-5">
              <div className="w-28 h-20">
                <img
                  className="object-contain"
                  src={item.image}
                  alt={item.name}
                />
              </div>
              <div>
                <p className="font-medium text-3xl">{item.name}</p>
                <p className="font-medium text-xl">Màu: {item.color}</p>
                <p className="font-medium text-xl">Ram: {item.ram}</p>
                <p className="font-medium text-xl">
                  Bộ nhớ trong: {item.storageCapacity}
                </p>
                <p className="font-medium text-xl">Số lượng: {item.quantity}</p>
                {order.orderStatus != 0 && order.orderStatus == 11 ? (
                  <div className="flex items-start  flex-col">
                    {(item.feedbackId == null && order.orderStatus == 21) ||
                    (item.feedbackId == null && order.orderStatus == 22) ? (
                      <div className="">
                        <Button
                          className="ml-0 p-0"
                          onClick={() => {
                            setIdProduct(item.orderProductId);
                            setIsModalOpen(true);
                          }}
                          type="link"
                        >
                          Đánh giá sản phẩm
                        </Button>
                      </div>
                    ) : (
                      order.orderStatus == 21 ||
                      (order.orderStatus == 22 && (
                        <Button
                          className="ml-0 p-0"
                          onClick={() => {
                            dispatch(getCommentById(item.feedbackId));
                            setIsModalOpen(true);
                          }}
                          type="link"
                        >
                          Xem đánh giá
                        </Button>
                      ))
                    )}

                    {order.orderStatus !== 21 && (
                      <div className="flex flex-col">
                        <Button
                          className="ml-0 p-0 border-2"
                          onClick={() => {
                            setIdProduct(item.orderProductId);
                            setIsModalOpenChangAndReturnProduct(true);
                          }}
                          type="link"
                        >
                          Đổi / Trả hàng
                        </Button>
                        <Button
                          className="ml-0 p-0 border-2"
                          onClick={() => handleReceived(order.id)}
                          type="link"
                        >
                          Đã nhận hàng
                        </Button>
                        {order.orderStatus == 1 && (
                          <Button
                            className="ml-0 p-0 border-2"
                            onClick={() => {
                              handleCancelOrder(order.id);
                            }}
                            type="link"
                          >
                            Huỷ đơn hàng
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="font-medium text-3xl">
              <p className="text-red-400">
                {numberWithCommas(item.salePrice)}đ
              </p>
              <p className="line-through">{numberWithCommas(item.price)}₫</p>
            </div>
            <Modal
              className="h-[80vh] mb-28"
              title="Đổi / trả sản phẩm "
              open={isModalOpenChangAndReturnProduct}
              onOk={handleOkChangeAndReturnProduct}
              onCancel={handleCancelChangeAndReturnProduct}
              centered
            >
              <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 18 }}
                layout="horizontal"
                style={{ maxWidth: 1000, padding: 4 }}
                autoComplete="off"
                noValidate
                // onSubmitCapture={onSubmit}
              >
                <Form.Item
                  label="Chọn loại"
                  name="type"
                  // rules={[{ required: true }]}
                >
                  <Select
                    mode="multiple"
                    showSearch
                    style={{ width: "60%" }}
                    placeholder="Chọn loại"
                    onChange={setTypeChangeProductChangeAndReturn}
                    options={[
                      {
                        label: "Trả hàng",
                        value: 1,
                      },
                      {
                        label: "Đổi hàng",
                        value: 2,
                      },
                    ]}
                  />
                </Form.Item>
                <Form.Item
                  label="Lý do"
                  name="mainCause"
                  // rules={[{ required: true }]}
                >
                  <Select
                    mode="multiple"
                    showSearch
                    style={{ width: "60%" }}
                    placeholder="Chọn lý do chính"
                    onChange={onChangeSelectMainCauseChangeAndReturnProduct}
                    options={[
                      {
                        label: "Sản phẩm",
                        value: 1,
                      },
                      {
                        label: "Vận chuyển",
                        value: 2,
                      },
                    ]}
                  />
                </Form.Item>

                <Form.Item
                  label="Số lượng trả"
                  name="quantityReturn"
                  // rules={[{ required: true }]}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <button
                      className="w-[30px] text-center border px-3 py-2"
                      onClick={handleDecrementReturn}
                    >
                      -
                    </button>
                    <input
                      className="w-[30px] text-center border px-3 py-2"
                      type="number"
                      value={quantityReturn}
                      onChange={handleChangeQuantityReturn}
                      max={item?.quantity}
                    />
                    <button
                      className="w-[30px] text-center border px-3 py-2"
                      onClick={() => handleIncrementReturn(item.quantity)}
                    >
                      +
                    </button>
                  </div>
                </Form.Item>
                <Form.Item
                  label="Số lượng đổi"
                  name="quantityChange"
                  // rules={[{ required: true }]}
                >
                  <div className="flex">
                    <button
                      className="w-[30px] text-center border px-3 py-2"
                      onClick={handleDecrementChange}
                    >
                      -
                    </button>
                    <input
                      className="w-[30px] text-center border px-3 py-2"
                      type="number"
                      value={quantityChange}
                      onChange={handleChangeQuantityChange}
                      max={item?.quantity - quantityReturn}
                    />
                    <button
                      className="w-[30px] text-center border px-3 py-2"
                      onClick={() => handleIncrementChange(item.quantity)}
                    >
                      +
                    </button>
                  </div>
                </Form.Item>

                <Form.Item
                  label="Mô tả"
                  name="customerDescription"
                  // rules={[{ required: true }]}
                >
                  <Textarea
                    id="customerDescription"
                    isUpdate={false}
                    register={registerChangeProduct}
                    setValue={setValueChangeProduct}
                    textAlign={"left"}
                  />
                </Form.Item>

                <div className="flex justify-start">
                  <Form.Item label="" className=" mb-2">
                    <Button
                      className="w-[100px]"
                      onClick={onSubmitChangeAndReturnProduct}
                      type="dashed"
                    >
                      {isSubmitingChangeProduct ? " Loading..." : "Submit"}
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </Modal>
          </div>
        );
      })}
      <div className="border-b p-4 text-2xl leading-[40px]">
        <p>Giá tạm tính: {numberWithCommas(order?.orderPrice)}₫</p>
        <p>
          <span className="">Phí giao hàng: </span>{" "}
          <span>{numberWithCommas(order?.deliveryPrice)}₫</span>
        </p>
        <p>
          <span className="">Giảm giá: </span>{" "}
          <span>{numberWithCommas(order?.discount)}₫</span>
        </p>
        <p>
          <span className="font-bold">Tổng tiền: </span>
          <span className="text-red-500">
            {numberWithCommas(order?.finalPrice)}₫
          </span>
        </p>
        <p>
          <CheckCircleFill className="text-blue-500" />
          <span className="font-bold"> Số tiền đã thanh toán: </span>
          {(checkPayment && order.orderStatus === 11) ||
            (checkPayment && order.orderStatus === 21) ||
            (checkPayment && order.orderStatus === 22 && (
              <span className="text-red-400">
                {numberWithCommas(order?.finalPrice)}₫
              </span>
            ))}
          {(order.orderStatus != 0 && order.orderStatus !== 11) ||
          order.orderStatus !== 21 ||
          order.orderStatus !== 22
            ? checkPayment === false && (
                <>
                  <span className="text-red-400">Chưa thanh toán</span>{" "}
                  <Button type="link" onClick={handlePayment}>
                    Tiến hành thanh toán
                  </Button>
                </>
              )
            : null}
        </p>
      </div>
      <div className="border-b p-4 text-2xl leading-[40px]">
        <p className="font-bold text-2xl">
          Địa chỉ và thông tin người nhận hàng
        </p>
        <ul>
          <li>
            {order?.nameReceiver} - {order?.phoneReceiver}
          </li>
          <li>Địa chỉ nhận hàng {order.addressReceiver}</li>
        </ul>
      </div>
      <Modal
        title="Đánh giá sản phẩm"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 700, padding: 6 }}
          autoComplete="off"
          noValidate
          onSubmitCapture={onSubmit}
        >
          <Form.Item label="Đánh giá" name="name" rules={[{ required: true }]}>
            <Rate tooltips={desc} onChange={setValueStart} value={valueStar} />
            {valueStar ? (
              <span className="ant-rate-text">{desc[valueStar - 1]}</span>
            ) : (
              ""
            )}
          </Form.Item>
          <Form.Item label="Bình luận" name="name" rules={[{ required: true }]}>
            <Input
              defaultValue={commentById?.data?.comment || ""}
              classNameInput="p-3 w-full text-black outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm"
              placeholder="Sản phẩm dùng rất tốt..."
              name="comment"
              register={register}
              type="text"
              className="rounded-md"
              errorMessage={errors.comment?.message}
            />
          </Form.Item>

          <Form.Item
            name="files"
            label="Hình ảnh"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <div className="flex flex-col items-start ">
              <div className=" w-24 justify-between items-center">
                {imageUrls.map((imageUrl, index) => {
                  return (
                    <img
                      key={index}
                      src={imageUrl}
                      className="h-full rounded-md w-full  object-cover"
                      alt="avatar"
                    />
                  );
                })}
              </div>
              <InputFile
                label="Upload ảnh"
                onChange={handleChangeFile}
                id="files"
              />
              <div className="mt-3  flex flex-col items-center text-red-500">
                <div>Dụng lượng file tối đa 2 MB</div>
                <div>Định dạng:.JPEG, .PNG</div>
              </div>
              {/* {errors.images?.message} */}
            </div>
          </Form.Item>
          <div className="flex justify-start">
            <Form.Item label="" className=" mb-2">
              <Button className="w-[100px]" onClick={onSubmit} type="dashed">
                {isSubmitting ? " Loading..." : "Đánh giá"}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
      <Modal
        title="Đổi/trả sản phẩm "
        open={isModalOpenChangeProduct}
        onOk={handleOkChangeProduct}
        onCancel={handleCancelChangeProduct}
        centered
      >
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 18 }}
          layout="horizontal"
          style={{ maxWidth: 1000, padding: 4 }}
          autoComplete="off"
          noValidate
          // onSubmitCapture={onSubmit}
        >
          <Form.Item label="Chọn loại" name="type" rules={[{ required: true }]}>
            <Select
              // mode="multiple"
              showSearch
              style={{ width: "60%" }}
              placeholder="Chọn loại"
              onChange={setTypeChangeProduct}
              options={[
                {
                  label: "Trả hàng",
                  value: 1,
                },
                {
                  label: "Đổi hàng",
                  value: 2,
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Lý do"
            name="mainCause"
            rules={[{ required: true }]}
          >
            <Select
              // mode="multiple"
              showSearch
              style={{ width: "60%" }}
              placeholder="Chọn lý do chính"
              onChange={onChangeSelectMainCauseChangeProduct}
              options={[
                {
                  label: "Sản phẩm",
                  value: 1,
                },
                {
                  label: "Vận chuyển",
                  value: 2,
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Số lượng"
            name="quantity"
            rules={[{ required: true }]}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <button
                className="w-[30px] text-center border px-3 py-2"
                onClick={handleDecrementChange}
              >
                -
              </button>
              <input
                className="w-[30px] text-center border px-3 py-2"
                type="number"
                value={quantityChange}
                onChange={handleChangeQuantityChange}
              />
              <button
                className="w-[30px] text-center border px-3 py-2"
                onClick={handleDecrementChange}
              >
                +
              </button>
            </div>
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="customerDescription"
            rules={[{ required: true }]}
          >
            <Textarea
              id="customerDescription"
              isUpdate={false}
              register={registerChangeProduct}
              setValue={setValueChangeProduct}
              textAlign={"left"}
            />
          </Form.Item>

          <div className="flex justify-start">
            <Form.Item label="" className=" mb-2">
              <Button
                className="w-[100px]"
                // onClick={onSubmitChangeProduct}
                type="dashed"
              >
                {isSubmitingChangeProduct ? " Loading..." : "Submit"}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>

      <div className="flex justify-center py-4">
        <Button
          type="link"
          onClick={() =>
            setOrderDetail((current: any) => {
              return current.index === index
                ? {
                    index: -1,
                    id: order.id,
                  }
                : {
                    index: index,
                    id: order.id,
                  };
            })
          }
        >
          Ẩn xem chi tiết
        </Button>
      </div>
    </div>
  );
};

export default OrderDetail;


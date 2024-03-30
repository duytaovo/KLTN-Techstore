import { yupResolver } from "@hookform/resolvers/yup";
import { unwrapResult } from "@reduxjs/toolkit";
import { Button, Form, Modal, Rate } from "antd";
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
import { schemaFeedback } from "src/utils/rules";
import { isAxiosUnprocessableEntityError } from "src/utils/utils";

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
  const [idProduct, setIdProduct] = useState<string>();
  const [valueStar, setValueStart] = useState(3);
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
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<File[]>();
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
  const desc = ["Rất tệ", "Tệ", "Bình thường", "Tốt", "Rất tốt"];
  const checkPayment = order?.paymentStatusString === "Unpaid" ? false : true;
  return (
    <div>
      <div className="py-8 border-b">
        <div className="flex justify-between">
          <h2 className="font-bold text-3xl">Chi tiết đơn hàng: #{order.id}</h2>
          <p className="text-2xl">
            Trạng thái:{" "}
            <span className={style(order.orderStatusString)}>
              {"Đã đặt hàng"}
            </span>
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
                {item.feedbackId == null ? (
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
                )}
              </div>
            </div>

            <div className="font-medium text-3xl">
              <p className="text-red-400">
                {numberWithCommas(item.salePrice)}đ
              </p>
              <p className="line-through">{numberWithCommas(item.price)}₫</p>
            </div>
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
          {checkPayment && (
            <span className="text-red-400">
              {numberWithCommas(order?.finalPrice)}₫
            </span>
          )}
          {checkPayment === false && (
            <>
              <span className="text-red-400">Chưa thanh toán</span>{" "}
              <Button type="link" onClick={handlePayment}>
                Tiến hành thanh toán
              </Button>
            </>
          )}
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


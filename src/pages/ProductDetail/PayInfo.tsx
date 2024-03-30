import { useState } from "react";
import { CheckCircleFill } from "react-bootstrap-icons";
import { Modal, Button, Alert } from "flowbite-react";
import { Link } from "react-router-dom";
import { discountInfo, discountMore } from "./DiscountContent";
import { useDispatch, useSelector } from "react-redux";
import numberWithCommas from "src/utils/numberWithCommas";
import { CounterQuantity, SelectColor } from "src/components/Selector";
import QuantityController from "../CartNew/QuantityController";

const PayInfo = (props: any) => {
  const {
    price,
    discount,
    title,
    slug,
    img,
    colors,
    brand,
    category,
    handleClickPay,
  } = props.initProductDetail;

  const pays = [{ bank: "vnpay" }];
  const [modalShow, setModalShow] = useState(false);

  const [alertMess, setAlertMess] = useState({});

  const onClick = () => {
    setModalShow(!modalShow);
  };

  const dispatch = useDispatch();

  const color = colors ? colors[0] : "";
  let productForCart = {
    price,
    discount,
    title,
    slug,
    img,
    quantity: 1,
    color,
    brand,
    category,
  };

  return (
    <div className="">
      <div className="border border-gray-400 text-2xl">
        <div className="bg-gray-100 p-4 border-b border-gray-400">
          <strong>Khuyến mãi</strong>
          <p>Giá và khuyến mãi dự kiến áp dụng đến 23:00 31/07</p>
        </div>
        <ul className="p-4">
          {discountInfo.map((item, index) => {
            return (
              <li className="my-6" key={index}>
                <span className="bg-blue-300 rounded-full h-8 w-8 inline-block text-center text-white text-lg">
                  {index + 1}
                </span>
                &emsp;
                <span>{item}</span>
              </li>
            );
          })}
        </ul>
        <p className="p-2">
          (*) Giá hoặc khuyến mãi không áp dụng trả góp lãi suất đặc biệt (0%,
          0.5%, 1%)
        </p>
      </div>

      <div className="m-4 ml-0">
        <strong>Ưu đãi khi thanh toán</strong>
        <div className="overflow-scroll no-scrollbar ">
          <div className="flex gap-4 w-fit">
            {pays.map((item) => {
              return (
                <div
                  className="rounded-lg text-xl border border-gray-300 p-4 w-96"
                  key={item.bank}
                >
                  {/* <div disabled name="pay" /> */}
                  &nbsp;
                  <img
                    className="inline-block w-16 object-cover"
                    src="https://cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/logo/vnpay.png"
                    alt=""
                  />
                  <p>
                    Giảm <b>500.000₫</b>
                  </p>
                  <p>Sản phẩm iPhone</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* <div>
        <button
          className="bg-yellow-300  w-full mb-4 block p-6 rounded-lg text-white font-bold"
          onClick={() => setModalShow(true)}
        >
          MUA NGAY
        </button>
        <Modal show={modalShow} onClose={() => setModalShow(false)} size="4xl">
          <Modal.Header>
            <div className="p-4 text-2xl">
              <p className="">{title}</p>
              <strong className="text-red-400">
                {numberWithCommas(price * (1 - discount))}₫
              </strong>
              <span className="line-through">{numberWithCommas(price)}₫</span>
              <div className="flex-1 w-60 mt-2">
                <img src={img} alt="" />
              </div>
            </div>
          </Modal.Header>
        </Modal>

        <div className="flex gap-2 text-xl">
          <button className="bg-blue-500 p-4 w-1/2 rounded-lg text-white">
            <p>MUA TRẢ GÓP 0%</p>
            <p>Duyệt hồ sơ trong 5 phút</p>
          </button>
          <button className="bg-blue-500 p-4 w-1/2 rounded-lg text-white">
            <p>TRẢ GÓP QUA THẺ</p>
            <p>Visa, Mastercard, JCB, Amex</p>
          </button>
        </div>
      </div> */}
      {/* <p className="text-center">Gọi đặt mua 1800.1060 (7:30 - 22:00)</p>
      <div className="border border-gray-400 text-2xl">
        <div className="bg-gray-100 p-4 border-b border-gray-400">
          <p>
            <strong>4 ưu đãi thêm</strong> Dự kiến áp dụng đến 23:00 31/07
          </p>
        </div>
        <ul className="p-4">
          {discountMore.map((item, index) => {
            return (
              <li className="my-6" key={index}>
                <i className="text-blue-400">
                  <CheckCircleFill />
                </i>
                &emsp;
                <span>{item}</span>
              </li>
            );
          })}
        </ul>
      </div> */}
    </div>
  );
};

export default PayInfo;

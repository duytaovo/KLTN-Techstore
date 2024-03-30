import { useState } from "react";
import { discountBoxContent } from "./DiscountContent";

const DiscountBox = (props: any) => {
  const [modalShow, setModalShow] = useState(false);
  const onClick = () => {
    setModalShow(!modalShow);
  };
  return (
    <div className="bg-red-100 h-fit rounded-lg box">
      <div className="flex bg-red-600 text-white rounded-lg">
        <div>
          <img
            src="https://cdn.tgdd.vn/mwgcart/mwgcore/ContentMwg/images/TGDD/Mobile/title_onlinesaving.png"
            alt=""
            className="h-full"
          />
        </div>
        {/* <div>
          <strong className="text-yellow-400">
            {numberWithCommas(price * (1 - discount))}₫
          </strong>
          <em className="line-through">{numberWithCommas(price)}₫</em>
          <i>(-{discount * 100}%)</i>
          <p className="text-lg">Kết thúc 31/07</p>
        </div> */}
      </div>
      <ul className="ml-10 text-gray-900 leading-normal">
        {discountBoxContent.map((item, index) => (
          <li className="my-4" key={index}>
            {item}
          </li>
        ))}
      </ul>
      {/* <div className="p-2">
        <button
          className="bg-red-600  w-full mb-4 block p-6 rounded-lg text-white font-bold"
          onClick={() => setModalShow(true)}
        >
          MUA NGAY GIÁ {numberWithCommas(price * (1 - discount))}₫
        </button>
        <Modal show={modalShow} onClose={() => setModalShow(false)} size="4xl">
          <Modal.Header>
            <div className="p-4 text-2xl">
              <p className=""></p>
              <strong className="text-red-400"></strong>
              <span className="line-through"></span>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <p>Chọn màu:</p>
              <SelectColor />
              <p>Chọn số lượng:</p>
              <CounterQuantity />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="w-full">
              <button className="bg-yellow-300  w-full mb-4 block p-6 rounded-lg text-white font-bold">
                THÊM VÀO GIỎ HÀNG
              </button>
              <Link
                to="/cart"
                className="text-blue-500 block w-full text-center"
              >
                Xem giỏ hàng
              </Link>
            </div>
          </Modal.Footer>
        </Modal>

        <button className="bg-blue-500 w-full block p-4 rounded-lg text-white">
          <p>TRẢ GÓP QUA THẺ</p>
          <p>Visa, Mastercard, JCB, Amex</p>
        </button>
      </div> */}
    </div>
  );
};

export default DiscountBox;

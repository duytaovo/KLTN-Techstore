import { useState, useEffect } from "react";
import {
  StarFill,
  HeartFill,
  ThreeDots,
  ChatFill,
} from "react-bootstrap-icons";
import { Modal } from "flowbite-react";
import clsx from "clsx";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import PopupInfo from "./PopupInfo";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";

const Rating = ({ onClick }: { onClick: () => void }) => {
  const [numberStar, setNumberStar] = useState(0);

  const active = "text-yellow-300";

  return (
    <div className="cursor-pointer flex gap-6">
      {[...Array(5)].map((e, i) => (
        <i
          key={i}
          onClick={() => {
            setNumberStar(i + 1);
            // onClick(i + 1);
          }}
        >
          <StarFill
            className={clsx("text-5xl", i + 1 <= numberStar && active)}
          />
        </i>
      ))}
    </div>
  );
};
const Star = ({ star }: { star: number }) => {
  return [...Array(star)].map((e, i) => (
    <i key={i}>
      <StarFill />
    </i>
  ));
};

const ProductRating = () => {
  const { title, img, rating, id } = useAppSelector(
    (state) => state.products.productDetail.data
  );

  const dispatch = useAppDispatch();
  const [productRating, setProductRating] = useState(() => {
    return rating ? rating.data?.slice(4) : [];
  });

  const [showModal, setShowModal] = useState<boolean>(false);
  const [showPopupInfo, setShowPopupInfo] = useState<boolean>(false);
  const [star, setStar] = useState<number>(0);
  const [discuss, setDiscuss] = useState<{
    id: number;
    status: boolean;
    data: never[];
  }>({ id, status: false, data: [] });
  const [ratingId, setRatingId] = useState<{ index: number; id: number }>({
    index: -1,
    id,
  });

  let infoRating = {
    id: uuidv4(),
    product: id,
    user: {},
    content: "",
    discuss: [],
    star: 0,
    createdAt: moment().format("HH:MM MM/DD, YYYY"),
  };
  const images: string[] = [
    "https://cdn.tgdd.vn/comment/51982240/7230F870-6211-4567-A752-EAF2DCD900E0ITETG.jpeg",
    "https://cdn.tgdd.vn/comment/51690516/imageA70I9.jpg",
    "https://cdn.tgdd.vn/comment/51690511/imageJI9W2.jpg",
    "https://cdn.tgdd.vn/comment/51341098/IMG_UPLOAD_20220503_162905-20220503162907.jpg",
  ];
  const vote: { star: number; percent: number }[] = [
    {
      star: 5,
      percent: 79,
    },
    {
      star: 4,
      percent: 13,
    },
    {
      star: 3,
      percent: 4,
    },
    {
      star: 2,
      percent: 2,
    },
    {
      star: 1,
      percent: 2,
    },
  ];

  //   const sum = function (items = [], prop) {
  //     return items.reduce(function (a, b) {
  //       const star = b[prop] ? b[prop] : 0;
  //       return a + star;
  //     }, 0);
  //   };

  //   let avgStar = sum(rating, "star") / rating?.length;
  //   avgStar = Number.isNaN(avgStar) ? 0 : avgStar;

  //   const handleDiscuss = (id) => {
  //     setDiscuss((state) => {
  //       const discussData = rating.find((rate) => rate.id === id)?.discuss || [];
  //       const stateHide = {
  //         ...state,
  //         id,
  //         data: [],
  //         status: false,
  //       };
  //       const stateShow = {
  //         ...state,
  //         id,
  //         data: discussData,
  //         status: true,
  //       };
  //       return state.status ? stateHide : stateShow;
  //     });
  //   };
  //   const handleSubmitInfo = async (info) => {
  //     const content = document.getElementById(
  //       `inputDiscuss${ratingId.index}`
  //     ).value;
  //     const newDiscuss = {
  //       id: uuidv4(),
  //       user: {
  //         id: uuidv4(),
  //         ...info,
  //       },
  //       content,
  //     };
  //     const oldDiscuss = rating[ratingId.index]?.discuss || [];
  //     const discussData = [...oldDiscuss, newDiscuss];

  //     const data = JSON.stringify({ discuss: discussData });
  //     const res = await ratingService.patchRating(ratingId.id, data);
  //     if (true) {
  //       dispatch(updateDiscussRating({ idRating: ratingId.id, ...newDiscuss }));
  //       document.getElementById(`inputDiscuss${ratingId.index}`).value = "";
  //       setDiscuss((state) => ({
  //         ...state,
  //         data: [newDiscuss, ...state.data],
  //       }));
  //       alert("Thanh cong");
  //       setShowPopupInfo(false);
  //     } else {
  //       alert("That bai");
  //     }
  //   };
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     const res = await ratingService.postRating(infoRating);
  //     if (res) {
  //       setShowModal(false);
  //       setProductRating((old) => [...old, res]);
  //     }
  //   };
  return (
    <div className="border rounded-lg p-4 w-fit">
      {/* <p className="text-3xl font-bold">Đánh giá {title}</p> */}
      <div className="flex items-center border-b py-4">
        <div className="rating w-96">
          <div className="my-6">
            {/* <span>{Number.parseFloat(avgStar).toFixed(1)}</span> */}
            <span className="text-yellow-300">
              {/* <Star star={Math.floor(avgStar)} /> */}
            </span>
            &nbsp;
            <span>{rating?.length} đánh giá</span>
          </div>
          {vote?.map((item) => {
            const style = { width: `${item.percent}%` };
            return (
              <div className="flex items-center text-2xl" key={item.star}>
                <span className="flex">
                  {item.star}&nbsp;
                  <i>
                    <StarFill />
                  </i>
                </span>
                &nbsp;
                <div className="container bg-gray-200 h-1.5">
                  <div className="bg-yellow-400 h-full" style={style}></div>
                </div>
                &nbsp;
                <span className="text-blue-500 font-bold">{item.percent}%</span>
              </div>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-4 ml-8">
          {images.map((image, index) => {
            return (
              <div className="h-24 w-24 rounded-xl overflow-hidden" key={index}>
                <img
                  src={image}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>
      {showPopupInfo && (
        <PopupInfo
          //   onSubmit={(e) => handleSubmitInfo(e)}
          onClose={() => setShowPopupInfo(false)}
        />
      )}
      {/* {productRating.map((comment, index) => {
        let status;
        if (discuss.id === comment.id) {
          status = discuss.status;
        }
        return (
          <div className="py-8 border-b m-4" key={index}>
            <p>{comment.user.username}</p>
            <span className="text-yellow-300">
              <Star star={comment.star} />
            </span>
            &nbsp;
            <i>
              <HeartFill className="text-red-600" />
            </i>
            &nbsp;
            <span className="text-2xl">
              Sẽ giới thiệu cho bạn bè, người thân
            </span>
            <p className="text-2xl">{comment.content}</p>
            <div>
              <span className="text-blue-500 cursor-pointer select-none">
                Hữu ích
              </span>
              &emsp;
              <span
                className="text-blue-500 cursor-pointer select-none"
                onClick={() => {
                  handleDiscuss(comment.id);
                }}
              >
                <i>
                  <ChatFill />
                </i>
                &nbsp; {comment.discuss.length} thảo luận
              </span>
              &emsp;
              <i>
                <ThreeDots />
              </i>
              <div className={clsx(!status && "hidden")}>
                <input
                  type="text"
                  className="rounded-lg p-4 border mr-8 w-3/4 text-2xl"
                  placeholder="Nhập thảo luận của bạn"
                  id={`inputDiscuss${index}`}
                  onChange={() => setRatingId({ index, id: comment.id })}
                />
                <button
                  onClick={() => {
                    document.getElementById(`inputDiscuss${index}`).value != ""
                      ? setShowPopupInfo(true)
                      : alert("Vui long nhap noi dung");
                  }}
                  className="bg-blue-500 px-6 py-4 rounded-lg text-white"
                >
                  GỬI
                </button>
                {discuss.data.map((item, index) => {
                  return (
                    <div className="p-4 border-b my-2 text-2xl" key={index}>
                      <p>{item.user.username}</p>
                      <p>{item.content}</p>
                      <span className="text-blue-500">Hữu ích</span>&emsp;
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })} */}
      <div className="m-auto flex gap-4 w-full">
        <button
          className="bg-blue-500 p-4 rounded text-white w-1/2"
          onClick={() => setShowModal(true)}
        >
          <i>
            <StarFill />
          </i>
          &nbsp; Viết đánh giá
        </button>
        <Modal show={showModal} onClose={() => setShowModal(false)} size="5xl">
          <Modal.Header>
            <p className="text-2xl font-bold">Đánh giá</p>
          </Modal.Header>
          <Modal.Body>
            <div className="p-8 text-center">
              <div className="font-bold p-4 text-2xl flex items-center justify-center">
                <div className="w-56 mt-2">
                  <img src={img} alt="" />
                </div>
                <p>{title}</p>
              </div>
              <div className="flex justify-center my-4">
                {/* <Rating
                  onClick={(e) => {
                    infoRating = { ...infoRating, star: e };
                  }}
                /> */}
              </div>

              <form
                action=""
                className="flex flex-col items-center gap-4"
                // onSubmit={handleSubmit}
              >
                <textarea
                  className="w-full rounded-xl p-4"
                  id=""
                  name=""
                  cols={30}
                  rows={10}
                  onChange={(e) => {
                    infoRating = { ...infoRating, content: e.target.value };
                  }}
                  placeholder="Mời bạn chia sẻ thêm một số cảm nhận về sản phẩm ..."
                ></textarea>
                <div>
                  <input
                    type=""
                    className="p-4 border outline-none rounded-xl mr-4"
                    placeholder="Họ và tên (bắt buộc)"
                    required
                    onChange={(e) => {
                      let { user } = infoRating;
                      user = { ...user, username: e.target.value };
                      infoRating = { ...infoRating, user };
                    }}
                  />
                  <input
                    type=""
                    className="p-4 border outline-none rounded-xl"
                    placeholder="Số điện thoại (bắt buộc)"
                    required
                    pattern="(84|0[3|5|7|8|9])+([0-9]{8})\b"
                    onChange={(e) => {
                      let { user } = infoRating;
                      user = { ...user, id: e.target.value };
                      infoRating = { ...infoRating, user };
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="p-4 bg-blue-500 rounded-xl text-white"
                >
                  Gửi đánh giá ngay
                </button>
              </form>
              <small>
                Để đánh giá được duyệt, quý khách vui lòng tham khảo Quy định
                duyệt đánh giá
              </small>
            </div>
          </Modal.Body>
        </Modal>
        <button
          onClick={() => setProductRating(rating)}
          className="border border-blue-500 p-4 rounded text-blue-500 w-1/2"
        >
          Xem {rating?.length} đánh giá
        </button>
      </div>
    </div>
  );
};

export default ProductRating;

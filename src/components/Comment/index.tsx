// import { useEffect, useRef, useState } from "react";
// import { CameraFill, PersonFill, CaretUpFill } from "react-bootstrap-icons";
// import styles from "./comment.module.scss";
// import moment from "moment";
// import Commentmini from "./commentmini";
// import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
// import { postComments } from "src/store/comment/commentsSlice";

// const Comment = ({ replies }: any) => {
//   const loadProductDetail = useAppSelector(
//     (state) => state.products.productDetail.data
//   );
//   const [hideModal, setHideMomal] = useState<boolean>(false);
//   const [showboxcomment, setShowboxcomment] = useState<boolean>(false);
//   const [checksex, setChecksex] = useState<number>(-1);
//   const [replyforuserId, setReplyforuserId] = useState(null);
//   const [text, setText] = useState<string>("");
//   const [email, setEmail] = useState<string>("");
//   const [sdt, setSdt] = useState<string>("");
//   const [nameuser, setNameuser] = useState<string>("");
//   const dispatch = useAppDispatch();
//   const ref: any = useRef();

//   useEffect(() => {
//     dispatch(getComments(loadProductDetail?.id));
//   }, [loadProductDetail?.id]);

//   const { comment } = useAppSelector((state) => state.comments);
//   let admin2 = false;
//   const handleClicksend = () => {
//     setHideMomal(true);
//   };
//   const handleClicksend2 = (e: any) => {
//     e.preventDefault();
//     const getAdmin = comment?.data.filter(
//       (item: any) =>
//         item.creator.admin === true && item.creator.id === parseInt(sdt)
//     );
//     if (getAdmin.length > 0) {
//       admin2 = true;
//     } else {
//       admin2 = false;
//     }
//     const body = {
//       id: comment.data[comment.data.length - 1] + 1,
//       content: text,
//       create_date: moment().format("HH:MM MM/DD, YYYY"),
//       creator: {
//         id: parseInt(sdt),
//         name: nameuser,
//         avatar:
//           "https://cafedev.vn/wp-content/uploads/2019/12/cafedev_javascript.png",
//         username: email,
//         admin: admin2,
//         replyforId: replyforuserId,
//       },
//       productId: loadProductDetail.id,
//     };
//     dispatch(postComments(body));
//     setHideMomal(false);
//     setShowboxcomment(false);
//     setReplyforuserId(null);
//     admin2 = false;
//   };
//   const handleCloseModal = () => {
//     setHideMomal(false);
//   };
//   const choiceSex = [
//     {
//       id: 1,
//       content: "Anh",
//     },
//     {
//       id: 2,
//       content: "Chị",
//     },
//   ];
//   const handleClickSex = (id: any) => {
//     setChecksex(id);
//   };
//   const handleChangetext = (e: any) => {
//     setText(e.target.value);
//   };

//   const handleReply = (replyId: any) => {
//     setShowboxcomment(true);
//     ref.current.focus();
//     setReplyforuserId(replyId);
//     setText("");
//     setSdt("");
//     setNameuser("");
//     setEmail("");
//   };

//   const getReplies = (id: string) => {
//     return comment.data
//       ?.filter((item: any) => item.creator.replyforId === parseInt(id))
//       .sort(
//         (a: any, b: any) =>
//           new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
//       );
//   };

//   return (
//     <div className={styles.wrap}>
//       {hideModal && (
//         <div className="text-black/80">
//           <div
//             id="defaultModal"
//             className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex text-black/80"
//             aria-modal="true"
//             role="dialog"
//           >
//             <div className="fixed top-0 right-0 bottom-0 left-0 z-10 bg-black opacity-30 m-auto"></div>
//             <div className="relative p-1 w-full max-w-3xl h-full md:h-auto z-20">
//               <div className="relative bg-white rounded-lg shadow">
//                 <div className="flex flex-col  items-start p-4 rounded-t border-b bg-blue-400">
//                   <div className="flex py-2 gap-x-3 mb-2 justify-between w-full">
//                     <h3 className="text-xl font-bold text-white ">
//                       {" "}
//                       Thông tin người gửi
//                     </h3>
//                     <button
//                       type="button"
//                       className=" text-gray-600 bg-transparent hover:bg-gray-200 hover:text-gray-300 rounded-lg text-sm px-3 py-2 ml-auto inline-flex items-center  dark:hover:bg-gray-600 dark:hover:text-white"
//                       data-modal-toggle="defaultModal"
//                       onClick={handleCloseModal}
//                     >
//                       <svg
//                         aria-hidden="true"
//                         className="w-5 h-5"
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           fill-rule="evenodd"
//                           d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                           clip-rule="evenodd"
//                         ></path>
//                       </svg>
//                       <span className="sr-only">Close modal</span>
//                     </button>
//                   </div>
//                   <div className="w-full flex gap-3 items-center">
//                     {choiceSex.map((item, index) => (
//                       <div key={index}>
//                         <input
//                           className="p-2"
//                           checked={checksex === item.id}
//                           type="radio"
//                           onClick={() => handleClickSex(item.id)}
//                         ></input>
//                         <label className="ml-2 text-white">
//                           {item.content}
//                         </label>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <form className="p-6 space-y-6" onSubmit={handleClicksend2}>
//                   <div className="flex flex-col gap-6">
//                     <input
//                       name="name"
//                       type="text"
//                       className="w-full px-[5px] outline-none border-1  py-[10px] leading-[16px] text-xl"
//                       placeholder="Họ tên (bắt buộc)"
//                       onChange={(e) => setNameuser(e.target.value)}
//                       value={nameuser}
//                     ></input>
//                     <input
//                       name="email"
//                       type="text"
//                       className="w-full px-[5px] outline-none border-1  py-[10px] leading-[16px] text-xl"
//                       placeholder="Email (để nhận phản hồi qua email)"
//                       onChange={(e) => setEmail(e.target.value)}
//                       value={email}
//                     ></input>
//                     <input
//                       name="sdt"
//                       type="text"
//                       className="w-full px-[5px] outline-none border-1  py-[10px] leading-[16px] text-xl"
//                       placeholder="Sdt"
//                       onChange={(e) => setSdt(e.target.value)}
//                       value={sdt}
//                     ></input>
//                   </div>

//                   <div className="flex items-center justify-end p-1 space-x-2 pr-7 py-2 rounded-b border-t border-gray-300 ">
//                     <button
//                       type="submit"
//                       className="cursor-pointer text-white px-7 py-3 bg-blue-400 rounded-md"
//                     >
//                       Gửi
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       <div className={styles.head}>
//         <textarea
//           //   ref={ref}
//           className="w-full outline-none p-2 bg-transparent"
//           rows={10}
//           onChange={handleChangetext}
//           value={text}
//         ></textarea>
//         <div className="flex justify-between border-t border-gray-200 p-2 items-center text-black/80">
//           <div className="text-blue-400 ">
//             <span>
//               <i>
//                 <CameraFill />
//               </i>
//               &nbsp; Gửi ảnh
//             </span>
//             &emsp;
//             <span>Quy định đăng bình luận</span>
//           </div>

//           <button
//             className="bg-blue-500 text-white rounded-lg px-8 py-4"
//             onClick={handleClicksend}
//           >
//             Gửi
//           </button>
//         </div>
//       </div>
//       <div className={styles.filter}>
//         <div className="flex items-center mt-4 mb-4 text-black/80">
//           <strong>10.481 Bình Luận</strong>&emsp;
//           <span>
//             <input type="checkbox" />
//             &nbsp;
//             <label htmlFor="">Xem Bình Luận Kỹ Thuật</label>
//           </span>
//           <input
//             type="search"
//             placeholder="Tìm theo nội dung, người gửi..."
//             className="p-4 outline-none border border-gray-200 rounded-lg ml-auto"
//           />
//         </div>
//         <div className="flex items-center my-8 text-black/80">
//           <span>Sắp xếp theo</span>&emsp;
//           <input type="radio" name="sort" />
//           &nbsp;
//           <label htmlFor="">Độ chính xác</label>&emsp;
//           <input type="radio" name="sort" />
//           &nbsp;
//           <label htmlFor="">Mới nhất</label>
//         </div>
//       </div>
//       <div className={styles.body}>
//         {comment?.data?.map((item: any) => {
//           if (item.creator.replyforId === null) {
//             return (
//               <Commentmini
//                 replies={getReplies(item.id)}
//                 comment={item}
//                 key={item.id}
//                 handleReply={handleReply}
//               ></Commentmini>
//             );
//           }
//         })}

//         <div className="text-black/80">
//           <button className="bg-gray-100 px-6 py-4 rounded">1</button>
//           &emsp;
//           <button className="bg-gray-100 px-6 py-4 rounded">2</button>
//           &emsp;
//           <button className="bg-gray-100 px-6 py-4 rounded">3</button>
//           &emsp;
//           <button className="bg-gray-100 px-6 py-4 rounded">4</button>
//           &emsp;
//         </div>
//       </div>
//       <textarea
//         className="w-full outline-none p-2 bg-transparent border border-gray-100 h-28 mt-4 text-black/80"
//         placeholder="Mời Bạn để lại bình luận..."
//         rows={40}
//       ></textarea>
//     </div>
//   );
// };

// export default Comment;

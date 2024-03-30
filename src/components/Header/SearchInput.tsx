// import { Search } from "../Icons";
// import Tippy from "@tippyjs/react";
// import "tippy.js/dist/tippy.css";
// import { useState, useEffect, useRef } from "react";
// import numberWithCommas from "../../utils/numberWithCommas";
// import useDebound from "./../../hooks/useDebound";
// import { Link, useNavigate } from "react-router-dom";
// import "./header.module.scss";
// import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
// import { getResult, removeResult } from "src/store/search/searchApi";

// const config = {
//   dienthoai: "dienthoai",
//   phone: "dienthoai",
//   điệnthoại: "dienthoai",
//   maytinhbang: "tablet",
//   máytínhbảng: "tablet",
//   tablet: "tablet",
//   phukien: "accessory",
//   phụkiện: "accessory",
//   accessory: "accessory",
//   dongho: "smartwatch",
//   đồnghồ: "smartwatch",
//   watch: "smartwatch",
//   laptop: "laptop",
//   donghothongminh: "smartwatch",
//   đồnghồthôngminh: "smartwatch",
//   smartwatch: "smartwatch",
// };
// const SearchInput = () => {
//   const [value, setValue] = useState<string>("");
//   const [showResult, setShowResult] = useState<boolean>(false);
//   const [checknull, setChecknull] = useState<boolean>(false);
//   const dispatch = useAppDispatch();
//   let keySearch = useDebound(value, 500);
//   const inputRef = useRef<HTMLDivElement>(null);
//   const navigate = useNavigate();
//   let resultSearch = useAppSelector((state) => state.search.search.data);

//   useEffect(() => {
//     if (keySearch.length === 0) {
//       removeResult(dispatch);
//       setShowResult(false);
//       return;
//     }
//     setShowResult(true);
//     setChecknull(false);
//     getResult(dispatch, keySearch);
//   }, [keySearch]);
//   const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setValue(e.target.value);
//     if (value.length < 1) {
//       setShowResult(false);
//     } else {
//       setShowResult(true);
//     }
//   };
//   const hideResultSearch = () => {
//     setValue("");
//     setShowResult(false);
//   };

//   const match = (input: string, obj: any): string => {
//     let matched: any = Object.keys(obj).find(
//       (key) => input.toLowerCase().search(key) > -1
//     );
//     return obj[matched] || null;
//   };

//   const hanleClickSearch = (e: React.SyntheticEvent) => {
//     e.preventDefault();
//     let getValue: string = value.replace(/\s/g, "");
//     let url: string = match(getValue, config);
//     if (url === null) {
//       getResult(dispatch, value);
//       hideResultSearch();
//       navigate(`tim-kiem`);
//     }
//     if (url !== null) {
//       hideResultSearch();
//       navigate(url);
//       return;
//     }
//   };

//   // Đóng khi click ra ngoài
//   const useOutsideAlerter = (ref: any) => {
//     useEffect(() => {
//       const handleClickOutside = (event: any) => {
//         if (ref.current && !ref.current.contains(event.target)) {
//           setShowResult(false);
//         }
//       };
//       // Bind the event listener
//       document.addEventListener("mousedown", handleClickOutside);
//       return () => {
//         // Unbind the event listener on clean up
//         document.removeEventListener("mousedown", handleClickOutside);
//       };
//     });
//   };

//   useOutsideAlerter(inputRef);
//   return (
//     <div className="w-[28%]" ref={inputRef}>
//       <label
//         htmlFor="default-search"
//         className="mb-2 text-xl font-medium text-gray-900 sr-only "
//       >
//         Tìm kiếm
//       </label>
//       <form className="relative outline-none" onSubmit={hanleClickSearch}>
//         <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none outline-none">
//           <Search />
//         </div>
//         <Tippy
//           interactive
//           visible={showResult && resultSearch.length > 0}
//           duration={50}
//           onClickOutside={() => setShowResult(false)}
//           placement="bottom"
//           content={
//             <div className="bg-white  min-h-auto max-h-[265px] rounded-lg flex flex-col gap-2 z-10 overflow-y-auto">
//               {resultSearch.length === 0 && (
//                 <h2>Không có sản phẩm trong hệ thống chúng tôi</h2>
//               )}

//               {resultSearch?.map((item: any) => (
//                 <Link
//                   to={`${item.category}/${item.slug}`}
//                   className="flex items-center justify-between gap-5 p-3"
//                   onClick={hideResultSearch}
//                 >
//                   <div className="w-[45px] h-[45px] rounded-lg">
//                     <img src={item.img}></img>
//                   </div>
//                   <div className="flex flex-col w-full">
//                     <div className="text-[13px] font-semibold align-middle text-black">
//                       {item.title}
//                     </div>
//                     <div className="flex gap-3 items-end">
//                       <div className="text-[12px] text-red-400">
//                         {numberWithCommas(item.price * (1 - item.discount))}đ
//                       </div>
//                       <span className="line-through text-[11px] ">
//                         {numberWithCommas(item.price)}đ
//                       </span>
//                     </div>
//                     <div className="text-[11px] text-gray-500">
//                       Quà 100.000đ
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           }
//         >
//           <input
//             type="search"
//             id="default-search"
//             className="block p-4 pl-12 w-full text-xl text-gray-900 rounded-lg dark:placeholder-gray-400  outline-none border-none"
//             placeholder="Bạn tìm gì..."
//             required
//             autoComplete="off"
//             value={value}
//             onChange={handleText}
//             onFocus={() => {
//               setShowResult(true);
//             }}
//           />
//         </Tippy>
//         <button
//           type="submit"
//           className="absolute right-2.5 bottom-2.5 bg-black text-white hover:bg-mainColor duration-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-sm rounded-lg text-xl px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//           // onClick={hanleClickSearch}
//         >
//           Tìm kiếm
//         </button>
//       </form>
//     </div>

//     //      {resultSearch.length > 1  && showResult && (
//     //         <div className='bg-white w-[328px] rounded-lg flex flex-col gap-2 absolute top-[106%] left-[1.2%] z-10 overflow-y-auto'>
//     //             {/* {resultSearch.length === 0 &&(<h2>Không có sản phẩm trong hệ thống chúng tôi</h2>)} */}

//     //             { resultSearch.map(item=>(
//     //                   <Link to={item.url} className='flex items-center justify-between gap-5 p-3' onClick={hideResultSearch}>
//     //                      <div className='w-[45px] h-[45px] rounded-lg'>
//     //                          <img src={item.img}></img>
//     //                      </div>
//     //                      <div className='flex flex-col w-full'>
//     //                          <div className='text-[13px] font-semibold align-middle '>{item.title}</div>
//     //                          <div className='flex gap-3 items-end'>
//     //                              <div className='text-[12px] text-red-400'>{numberWithCommas(item.price*(1-item.discount))}đ</div>
//     //                              <span className='line-through text-[11px] '>{numberWithCommas(item.price)}đ</span>
//     //                          </div>
//     //                          <div className='text-[11px]'>Quà 100.000đ</div>
//     //                      </div>
//     //                    </Link>
//     //             ))}
//     //        </div>
//     //  )}
//   );
// };

// export default SearchInput;


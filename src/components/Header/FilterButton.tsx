import { Down } from "../Icons";
import { useEffect, useState } from "react";
import { ChevronLeft } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import useLocationForm from "../../components/LocationForm/useLocationForm";
import { MENU_ITEMS } from "src/items";
import Search from "../Search";
function FilterButton() {
  const [hide, setHide] = useState<boolean>(false);
  const [history, setHistory] = useState([{ data: MENU_ITEMS }]);
  const [clickXa, setClickXa] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [showResult, setShowResult] = useState<boolean>(false);

  const { state, onCitySelect, onDistrictSelect, onWardSelect, onSubmit } =
    useLocationForm(false);

  // let locationed = JSON.parse(localStorage.getItem("locationed"));
  let locationed = "";

  const dispatch = useDispatch();
  const [valueLocation, setValueLocation] = useState<string[]>([]);
  let location;
  if (valueLocation.length === 0) {
    location =
      "Quý khách vui lòng cho biết Địa Chỉ Nhận Hàng để biết chính xác thời gian giao hàng";
  } else {
    if (valueLocation.length === 1) {
      location = `Chọn Quận, huyện tại ${valueLocation[0]}`;
    }
    if (valueLocation.length === 2) {
      location = `Chọn Phường xã tại ${valueLocation[1]}, ${valueLocation[0]}`;
    }
  }

  let current = history[history.length - 1];
  const handleCloseModal = () => {
    setHide(!hide);
    setHistory((prev) => prev.slice(0, 1));
    setValueLocation([]);
  };
  const onChange = (item: any) => {
    localStorage.setItem(
      "locationed",
      JSON.stringify([...valueLocation, item.title])
    );
    handleCloseModal();
    setClickXa(!clickXa);
  };
  const hanleremovelocation = () => {
    localStorage.setItem("locationed", JSON.stringify([]));
    setValueLocation([]);
    setClickXa(!clickXa);
  };
  const handleBack = () => {
    setHistory((prev) => {
      return prev.slice(0, history.length - 1);
    });
    setValueLocation(valueLocation.slice(0, valueLocation.length - 1));
  };
  const handleText = (e: any) => {
    setValue(e.target.value);
    if (value.length < 1) {
      setShowResult(false);
    } else {
      setShowResult(true);
    }
  };
  const renderItems = () => {
    return current?.data.map((item, index) => {
      const isParent = !!item.children;

      return (
        <li
          className="cursor-pointer text-black hover:bg-blue-100 rounded-md col-span-1 h-[37px] border-b-1 p-3"
          key={index}
          onClick={() => {
            setValueLocation([...valueLocation, item.title]);
            if (isParent) {
              setHistory((prev: any) => {
                return [...prev, item.children];
              });
            } else {
              onChange(item);
            }
          }}
        >
          {item.title}
        </li>
      );
    });
  };
  ///Click vào xã sẽ render ra dữ liệu
  // let locationChoice = JSON.parse(localStorage.getItem("locationed"));
  let locationChoice = ["1", "2"];
  let province: string;
  if (locationChoice) {
    if (locationChoice?.length > 0) {
      province = locationChoice[0];
      // setProvince(locationChoice[0])
    } else {
      // setProvince('')
      province = "";
      locationChoice = [];
    }
  }

  useEffect(() => {
    if (locationChoice?.length === 0) {
      // getAllProductApi(dispatch);
    } else {
      // getLocation(dispatch, province);
    }
  }, [clickXa]);
  return (
    <div>
      <button
        className="flex bg-mainColor hover:bg-black px-4 py-1 items-center rounded-lg text-lg"
        onClick={handleCloseModal}
      >
        <div>
          <span>Xem giá, tồn kho tại:</span>
          <span className="mr-2 font-bold line-clamp-1 max-w-[90px] w-max">
            {locationed?.length > 1 ? locationed : "Mọi tỉnh thành"}
          </span>
        </div>
        <i>
          <Down />
        </i>
      </button>
      {hide && (
        <div>
          <div
            id="defaultModal"
            tabIndex={-1}
            className=" overflow-y-auto overflow-x-hidden fixed top-40 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex"
            aria-modal="true"
            role="dialog"
          >
            <div className="fixed top-0 right-0 bottom-0 left-0 z-10 bg-black opacity-40 m-auto"></div>
            <div className="relative p-1 w-full max-w-3xl h-full md:h-auto z-20">
              <div className="relative bg-white rounded-lg shadow">
                <div className="flex flex-col  items-start p-4 rounded-t border-b bg-blue-400">
                  <div className="flex py-2 gap-x-3  justify-between w-full">
                    {valueLocation?.length >= 1 && (
                      <ChevronLeft
                        className="cursor-pointer text-3xl text-white"
                        onClick={handleBack}
                      ></ChevronLeft>
                    )}

                    <h3 className="text-xl font-bold text-white ">
                      {" "}
                      {locationed !== null &&
                      valueLocation?.length < 1 &&
                      locationed?.length > 0
                        ? `Địa chỉ đã chọn: ${locationed}`
                        : location}
                    </h3>

                    <button
                      type="button"
                      className=" text-gray-600 bg-transparent hover:bg-gray-200 hover:text-gray-300 rounded-lg text-sm px-3 py-2 ml-auto inline-flex items-center  dark:hover:bg-gray-600 dark:hover:text-white"
                      data-modal-toggle="defaultModal"
                      onClick={handleCloseModal}
                    >
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>
                  <span
                    className="text-[11px] mb-2 w-[59px] text-white cursor-pointer pb-2"
                    onClick={hanleremovelocation}
                  >
                    {locationed !== null &&
                    valueLocation?.length < 1 &&
                    locationed?.length > 0
                      ? "Xóa địa chỉ"
                      : ""}
                  </span>
                  <div className="w-full relative">
                    <input
                      type="search"
                      id="default-search"
                      className="block p-4 pl-12 w-full text-xl text-gray-900 rounded-lg dark:placeholder-gray-400  outline-none border-none"
                      placeholder="Bạn tìm gì..."
                      required
                      autoComplete="off"
                      value={value}
                      onChange={handleText}
                      onFocus={() => {
                        setShowResult(true);
                      }}
                    />
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* {current.data.map((item, index) => {
                                                const isParent = !!item.children
                                                return (
                                                    <div onClick={()=>{
                                                        if(isParent) {
                                                            setHistory((prev) => {
                                                                return [...prev, item.children]
                                                            })
                                                        }else{'
                                                            
                                                        }
                                                    }}>{item.title}</div>
                                                   
                                                )
                                            })} */}
                  {valueLocation.length < 1 && (
                    <h2 className="text-center font-semibold text-2xl">
                      Hoặc chọn tỉnh, thành phố
                    </h2>
                  )}

                  <ul className=" h-[270px] overflow-y-scroll grid gap-x-10 gap-y-6 grid-cols-2">
                    {renderItems()}
                  </ul>
                </div>

                <div className="flex items-center p-1 space-x-2 rounded-b border-t border-gray-300 "></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterButton;

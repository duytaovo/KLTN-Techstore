import { yupResolver } from "@hookform/resolvers/yup";
import { unwrapResult } from "@reduxjs/toolkit";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "src/components/Input";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import { ErrorResponse } from "src/types/utils.type";
import { schemaPayment } from "src/utils/rules";
import {
  formatCurrency,
  generateNameId,
  isAxiosUnprocessableEntityError,
} from "src/utils/utils";
import SelectCustom from "src/components/Select";
import { getUser, getUserById } from "src/store/user/userSlice";
import { ChevronLeft } from "@mui/icons-material";
import { buyPurchases } from "src/store/order/ordersSlice";
import path from "src/constants/path";
import { LocationForm } from "src/components/LocationForm";
import axios from "axios";
import config from "src/constants/configApi";
import { Button, List, message, Modal } from "antd";
import {
  checkCart,
  getValueBuy,
  removeItem,
  removeItemBuy,
  updateItem,
  updateItemBuy,
} from "src/store/shopping-cart/cartItemsSlide";
import { useTheme } from "@material-ui/core";
import { getVoucherUser } from "src/store/voucher/voucherSlice";
import { Select } from "antd";
import { Helmet } from "react-helmet-async";
import { ExtendedPurchase } from "src/types/purchase.type";
interface FormData {}

interface DataVoucherUser {
  data: {
    code: number;
    message: string;
    data: [
      {
        id: number;
        name: string;
        code: string;
        startDate: string;
        endDate: string;
        price: number;
        discount: number;
        gift: string;
      },
    ];
  };
}

interface VoucherType {
  value: string;
  label: string;
}

interface VoucherTypeCheck {
  code: string;
  discount: number;
  endDate: string;
  gift: string;
  id: number;
  name: string;
  price: number;
  startDate: string;
}
interface Warning {
  productId: number;
  typeId: number;
  depotId: number;
  cartQuantity: number;
  stockQuantity: number;
}
const Payment: React.FC = () => {
  const theme = useTheme();
  const PRIMARY_MAIN = theme.palette.primary.main;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [voucher, setVoucherPrice] = useState<number | string>(0);
  const [voucherPercent, setVoucherPercent] = useState<number | string>(0);
  const [voucherFormat, setVoucherFormat] = useState<string>("price");
  const [voucherOfUser, setVoucherOfUser] = useState<VoucherType[]>([]);
  const [voucherOfUserCheck, setVoucherOfUserCheck] = useState<
    VoucherTypeCheck[]
  >([]);
  const [expiringVouchers, setExpiringVouchers] = useState<VoucherTypeCheck[]>(
    [],
  );
  const [expiredVouchers, setExpiredVouchers] = useState<VoucherTypeCheck[]>(
    [],
  );
  const [isModalVisibleVoucher, setIsModalVisibleVoucher] =
    useState<boolean>(false);
  const [voucherOfUserPercent, setVoucherOfUserPercent] = useState<
    VoucherType[]
  >([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOkBuy = async () => {
    // console.log("object");
    navigate(path.cartNew);
    // purchasesInNotGood.forEach(async (product) => {
    //   const warning = warnings.find(
    //     (w) =>
    //       w.productId === product.product_id &&
    //       w.typeId === product.typeId &&
    //       w.depotId === product.depotId,
    //   );
    //   if (warning && warning.stockQuantity === 0) {
    //     console.log("1");
    //     await dispatch(removeItemBuy(product));
    //     await dispatch(getValueBuy());
    //     const _valueBuy = await JSON.parse(
    //       localStorage.getItem("cartItemsBuy") || "",
    //     );
    //     // await location.reload();
    //     if (_valueBuy.length > 0) {
    //       setIsModalOpen(false);
    //       setIsModalVisible(false);
    //     } else {
    //       navigate(path.cartNew);
    //     }
    //   } else if (warning) {
        
    //     dispatch(
    //       await updateItemBuy({ ...product, quantity: warning.stockQuantity }),
    //     );
    //     await dispatch(getValueBuy());
    //     const _valueBuy = await JSON.parse(
    //       localStorage.getItem("cartItemsBuy") || "",
    //     );
    //     // location.reload();
    //     if (_valueBuy.length > 0) {
    //       setIsModalOpen(false);
    //       setIsModalVisible(false);
    //     } else {
    //       navigate(path.cartNew);
    //     }
    //   }
    // });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChangeSelectVoucher = (value: number[] | string[]) => {
    const _value = value?.reduce(
      (acc: any, curr: any) => Number(acc) + Number(curr),
      0,
    );
    setVoucherPrice(_value);
  };

  // const onChangeSelectVoucherPercent = (value: number[] | string[]) => {
  //   const _value = value.reduce((acc, curr) => Number(acc) + Number(curr), 0);
  //   console.log(_value);
  //   setVoucherPercent(_value);
  // };

  const onSearchSelectVoucher = (value: string) => {};

  const filterOption = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const [idMethod, setIdMethod] = useState<number>(0);
  const [fee, setFee] = useState<number>(0);

  const {
    handleSubmit,
    formState: { errors },
    setError,
    register,
    setValue,
  } = useForm({
    resolver: yupResolver(schemaPayment),
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { valueBuy } = useAppSelector((state) => state.cartItems);
  const product_add: any = useAppSelector((state) => state.cartItems.value);
  const { profile, userWithId } = useAppSelector((state) => state.user);
  const [addressOption, setAddresOption] = useState<any>();
  const [methodTransport, setMethodTransport] = useState<any>();
  const [part1Address, setPart1Address] = useState<any>();
  const [part2Address, setPart2Address] = useState<any>();
  const [part3Address, setPart3Address] = useState<any>();

  const addressSelect =
    addressOption?.ward.name +
    ", " +
    addressOption?.district.name +
    ", " +
    addressOption?.city.name;
  useEffect(() => {
    const inputString = userWithId.address;

    if (inputString) {
      // Phần 1: từ đầu đến trước dấu ,
      const part1 = inputString.split(",")[0]?.trim();
      setPart1Address(part1);

      // Phần 2: từ dấu , đến dấu +
      const part2 = inputString
        .split(",")
        .slice(1)
        .join(",")
        .split("+")[0]
        .trim();
      setPart2Address(part2);

      // Phần 3: phần còn lại, bỏ vào mảng có 3 phần tử mỗi phần tử đã được ngăn cách bởi dấu -
      const remainingPart = inputString
        .split("+")[1]
        ?.split("-")
        .map((item: string) => Number(item.trim()));
      setPart3Address(remainingPart);
    }
  }, [userWithId]);

  useEffect(() => {
    axios
      .get(
        "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services",
        {
          params: {
            shop_id: config.shopId,
            from_district: 1442,
            to_district: addressOption?.district.id,
          },
          headers: {
            "Content-Type": "application/json",
            token: "9c800251-8994-11ee-b394-8ac29577e80e",
          },
        },
      )
      .then(function (response) {
        const method = response.data.data.map(
          ({
            service_id,
            short_name,
          }: {
            service_id: number;
            short_name: string;
          }) => ({
            id: service_id,
            name: short_name,
          }),
        );
        setMethodTransport(method);
      })
      .catch(function (error) {
        // toast.error(error.message);
      })
      .finally(function () {
        // always executed
      });
  }, [addressOption]);
  const calculateTotalMassAndDimensions = () => {
    let totalMass = 0;
    let totalLength = 0;
    let totalWidth = 0;
    let totalHeight = 0;
    let dimensionsArray: any = [];

    valueBuy.forEach((product) => {
      totalMass += product.mass || 0;

      const dimensions = product?.dimension?.split(" - ");
      dimensions?.forEach((dimension: any) => {
        const parts = dimension
          ?.split(" ")
          .filter((part: any) => !isNaN(parseFloat(part)));
        if (parts?.length === 1) {
          dimensionsArray.push(parseFloat(parts[0]) || 0);
        }
      });
      totalLength += parseInt(dimensionsArray[0]) * product?.quantity || 0;
      totalWidth += parseInt(dimensionsArray[1]) * product?.quantity || 0;
      totalHeight += parseInt(dimensionsArray[2]) * product?.quantity || 0;
    });

    return {
      totalMass,
      totalLength,
      totalWidth,
      totalHeight,
    };
  };

  const { totalMass, totalLength, totalWidth, totalHeight } =
    calculateTotalMassAndDimensions();

  useEffect(() => {
    axios
      .get(
        "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
        {
          params: {
            from_district_id: 1442,
            to_district_id: addressOption?.district.id,
            service_id: methodTransport && methodTransport[0].id,
            insurance_value: "",
            coupon: "",
            to_ward_code: addressOption?.ward.id,
            weight: totalMass, // Use totalMass here
            length: Math.round(totalLength / 10), // Use totalLength here
            width: Math.round(totalWidth / 10), // Use totalWidth here
            height: Math.round(totalHeight / 10), // Use totalHeight here
          },
          headers: {
            "Content-Type": "application/json",
            token: "9c800251-8994-11ee-b394-8ac29577e80e",
            shop_id: config.shopId,
          },
        },
      )
      .then(function (response) {
        setFee(Math.ceil(response.data.data.total));
      })
      .catch(function (error) {
        // toast.error(error.message);
      })
      .finally(function () {
        // always executed
      });
  }, [methodTransport, addressOption]);

  useEffect(() => {
    setValue("addressReceiver", part1Address);
    setValue("message", "");
    setValue("nameReceiver", userWithId.fullName);
    setValue("paymentMethod", "");
    setValue("phoneReceiver", userWithId.phoneNumber);
  }, [userWithId, part1Address]);

  useEffect(() => {
    const _getData = async () => {
      const res = await dispatch(getUser(""));
      await unwrapResult(res);
      await dispatch(getUserById(res?.payload?.data.data.id));
      await dispatch(getVoucherUser(""))
        .unwrap()
        .then(async (data: any) => {
          setVoucherOfUserCheck(data?.data?.data);
          const _dataPrice = await data?.data?.data
            .filter((item: any) => item?.price && item.price > 0) // Filter items with valid prices
            .map((item: any) => ({
              value: item.price,
              label: item.name,
            }));

          await setVoucherOfUser(_dataPrice);
          const _dataPercent = await data?.data?.data
            .filter((item: any) => item?.discount && item.discount > 0) // Filter items with valid prices
            .map((item: any) => ({
              value: item.discount,
              label: item.name,
            }));

          await setVoucherOfUserPercent(_dataPercent);
        })
        .catch((error) => {
          toast.error(error);
        });
    };
    _getData();
  }, []);
  useEffect(() => {
    const checkVoucherExpiry = () => {
      const now = new Date();
      const expiring: VoucherTypeCheck[] = [];
      const expired: VoucherTypeCheck[] = [];

      voucherOfUserCheck?.forEach((voucher) => {
        const endDate = new Date(voucher.endDate);
        const daysToExpire =
          (endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);

        if (daysToExpire <= 1 && daysToExpire > 0) {
          expiring.push(voucher);
        } else if (daysToExpire <= 0) {
          expired.push(voucher);
        }
      });

      setExpiringVouchers(expiring);
      setExpiredVouchers(expired);
      if (expiring.length > 0 || expired.length > 0) {
        setIsModalVisibleVoucher(true); // Show modal if there are expiring or expired vouchers
      }
    };

    const interval = setInterval(checkVoucherExpiry, 24 * 60 * 60 * 1000); // Check every day

    // Initial check when component mounts
    checkVoucherExpiry();

    return () => clearInterval(interval); // Cleanup on unmount
  }, [voucherOfUserCheck]);

  const totalPurchasePrice = useMemo(
    () =>
      valueBuy.reduce((result, current) => {
        if (current.salePrice > 0) {
          return result + current.salePrice * current.quantity;
        }
        return result + current.price * current.quantity;
      }, 0),
    [valueBuy],
  );
  const handleCheckCart = async () => {
    if (warnings?.length > 0) {
      setIsModalVisible(true);
      const filteredProducts = valueBuy.filter((product: any) =>
        warnings.some(
          (warning: Warning) =>
            warning.productId === product.product_id &&
            warning.typeId === product.typeId &&
            warning.depotId === product.depotId,
        ),
      );
      setPurchasesInNotGood(filteredProducts);
      return;
    }
  };
  const body2 = valueBuy?.map((purchase) => ({
    productId: purchase.product_id,
    typeId: purchase.typeId,
    depotId: purchase.depotId,
    quantity: purchase.quantity,
  }));
  const onSubmit = handleSubmit(async (data) => {
    const _res = await dispatch(checkCart(body2));
    unwrapResult(_res);
    if (_res?.payload?.data?.data?.productIdNotGoods.length > 0) {
      setIsModalVisible(true);
      const filteredProducts = valueBuy.filter(
        (product: any) =>
          _res?.payload?.data?.data?.productIdNotGoods.some(
            (warning: Warning) =>
              warning.productId === product.product_id &&
              warning.typeId === product.typeId &&
              warning.depotId === product.depotId,
          ),
      );
      setPurchasesInNotGood(filteredProducts);
      return;
    } else {
      const deliveryPrice = fee;
      const discountPrice: number | string = voucher;
      const discountPercent: number | string = voucherPercent;

      // console.log(discount);
      setIsModalOpen(true);
      const finalPrice =
        totalPurchasePrice + deliveryPrice - Number(discountPrice);
      const body = JSON.stringify({
        nameReceiver: data.nameReceiver,
        phoneReceiver: data.phoneReceiver,
        addressReceiver: data.addressReceiver + ", " + addressSelect,
        message: data.message,
        orderPrice: Number(totalPurchasePrice),
        deliveryPrice,
        discount: Number(discountPrice),
        finalPrice,
        userId: Number(profile.id),
        paymentMethod: Number(data.paymentMethod),
        orderProducts: valueBuy?.map((item) => ({
          productId: Number(item.product_id),
          typeId: Number(item.typeId),
          depotId: Number(item.depotId),
          quantity: Number(item.quantity),
        })),
      });
      try {
        setIsModalOpen(true);
        setIsSubmitting(true);
        const res = await dispatch(buyPurchases(body));
        unwrapResult(res);
        const d = res?.payload?.data;
        if (d?.code !== 200) return toast.error(d?.message);
        localStorage.removeItem("cartItemsBuy");
        valueBuy.map((purchase) => dispatch(removeItem(purchase)));

        if (Number(data.paymentMethod) === 1) {
          toast.success("Đặt hàng thành công.");
          navigate(path.home);
          return;
        }
        window.location.href = d.data.paymentUrl;
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
        setTimeout(() => setIsSubmitting(false), 3000);
        handleOk();
      }
    }
  });
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [warnings, setWarnings] = useState<Warning[]>([]);
  const [purchasesInNotGood, setPurchasesInNotGood] = useState<
    ExtendedPurchase[]
  >([]);
  console.log(purchasesInNotGood);
  const productsToCheck = valueBuy?.map((product: any) => ({
    productId: product.product_id,
    typeId: product.typeId,
    depotId: product.depotId,
    quantity: product.quantity,
  }));
  useEffect(() => {
    const handleCheckCart = async () => {
      const _res = await dispatch(checkCart(productsToCheck));
      unwrapResult(_res);
      setWarnings(_res?.payload?.data?.data?.productIdNotGoods);
    };
    handleCheckCart();
  }, [valueBuy]);
  useEffect(() => {
    handleCheckCart();
  }, [warnings]);
  const handleCancelBuy = () => {
    setIsModalVisible(false);
    message.info("Hủy mua hàng.");
  };
  return (
    <div className=" bg-mainBackGroundColor/30 ">
      <Helmet>
        <title>Trang thanh toán </title>
        <meta name="description" content="Trang đăng nhập" />
      </Helmet>
      <div className="w-1/2 m-auto">
        <div className="flex justify-between py-4">
          <Link
            to="/"
            className=""
            style={{
              color: `${PRIMARY_MAIN}`,
            }}
          >
            <i>
              <ChevronLeft />
            </i>
            Mua thêm sản phẩm khác
          </Link>
          <p>Giỏ hàng của bạn</p>
        </div>

        <form
          className="bg-white rounded-xl px-14 py-8 shadow-sm"
          onSubmit={onSubmit}
        >
          <div className="flex justify-between py-4  font-bold">
            <span>Tạm tính ({valueBuy.length}) sản phẩm:</span>
            <span className="text-red-500 text-2xl">
              {" "}
              {formatCurrency(totalPurchasePrice)}₫
            </span>
          </div>
          <div className=" border-t py-4">
            <h4>THÔNG TIN KHÁCH HÀNG</h4>
            <div className="my-4">
              <input
                id="male"
                type="radio"
                name="sex"
                value="Anh"
                defaultChecked
              />
              &nbsp;
              <label htmlFor="male">Anh</label>
              &emsp;
              <input
                style={{
                  color: `${PRIMARY_MAIN}`,
                }}
                id="female"
                type="radio"
                name="sex"
                value="Chị"
              />
              &nbsp;
              <label htmlFor="female">Chị</label>
            </div>

            <div className="flex gap-4 ">
              <Input
                placeholder="Nguyen Van A"
                classNameInput="p-3 w-full text-black outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm"
                name="nameReceiver"
                register={register}
                type="text"
                className="w-1/2 "
                errorMessage={errors.nameReceiver?.message}
              />

              <Input
                placeholder="0367119876"
                name="phoneReceiver"
                classNameInput="p-3 w-full text-black outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm"
                register={register}
                type="text"
                className="w-1/2"
                errorMessage={errors.phoneReceiver?.message}
              />
            </div>
          </div>
          <div className="">
            <div className="">
              <div className="border border-gray-300 p-4 rounded-xl space-y-3">
                <Input
                  placeholder="Số nhà, tên đường"
                  name="addressReceiver"
                  classNameInput="p-3 w-full text-black outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm"
                  register={register}
                  type="text"
                  className=""
                  errorMessage={errors.addressReceiver?.message}
                />
                <LocationForm
                  onChange={(e: any) => {
                    setAddresOption(e);
                  }}
                />
                {/* <div className="mt-8">
                  <SelectCustom
                    disabled
                    className={"flex-1 text-black"}
                    id="methodTransport"
                    placeholder="Giao hàng truyền thống"
                    options={methodTransport}
                    register={register}
                    onChange={onChange}
                    value={0}
                  >
                  </SelectCustom>
                </div> */}
                {totalPurchasePrice > 3000000 && voucherOfUser.length > 0 && (
                  <div>
                    <Select
                      // defaultValue={0}
                      mode="multiple"
                      showSearch
                      style={{ width: "60%" }}
                      placeholder="Chọn voucher giảm theo tiền"
                      optionFilterProp="children"
                      onChange={onChangeSelectVoucher}
                      onSearch={onSearchSelectVoucher}
                      filterOption={filterOption}
                      options={voucherOfUser}
                    />
                  </div>
                )}
                {/* {totalPurchasePrice > 3000000 && voucherOfUserPercent.length > 0 && (
                  <div>
                    <Select
                      // defaultValue={0}
                      mode="multiple"
                      showSearch
                      style={{ width: "60%" }}
                      placeholder="Chọn voucher giảm theo %"
                      optionFilterProp="children"
                      onChange={onChangeSelectVoucherPercent}
                      onSearch={onSearchSelectVoucher}
                      filterOption={filterOption}
                      options={voucherOfUserPercent}
                    />
                  </div>
                )} */}
                <p className="text-green-600 mt-6">
                  Phí giao hàng: {formatCurrency(fee)}₫
                </p>

                <h4>CHỌN PHƯƠNG THỨC THANH TOÁN</h4>

                <div className="mt-8">
                  <SelectCustom
                    className={"flex-1 text-black"}
                    id="paymentMethod"
                    placeholder="Cách thức thanh toán"
                    options={[
                      { id: 1, name: "Thanh toán khi nhận hàng" },
                      { id: 2, name: "Thanh toán qua VNPay" },
                    ]}
                    register={register}
                  >
                    {errors.paymentMethod?.message}
                  </SelectCustom>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="mt-8">
              <Input
                placeholder="Ghi chú (không bắt buộc)"
                classNameInput="p-3 w-full text-black outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm"
                name="message"
                register={register}
                type="text"
                className=""
                errorMessage={errors.message?.message}
              />
            </div>
            <div className="my-4">
              <div className="my-4">
                <div className="my-4">
                  <input type="checkbox" />
                  &nbsp;
                  <label htmlFor="">
                    Hướng dẫn sử dụng, giải đáp thắc mắc sản phẩm
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div>
            {/* <div className=" border-b ">
              <button className="p-4 border rounded-lg my-4">
                <i>
                  <TicketPerforated />
                </i>
                &nbsp;
                <span>Sử dụng mã giảm giá</span>&nbsp;
                <i>
                  <ChevronDown />
                </i>
              </button>
              <div className="flex gap-8 border border-gray-300  p-4 rounded-xl">
                <Input
                  placeholder="Nhập mã giảm giá ..."
                  name="nameReceiver"
                  register={register}
                  type="text"
                  className=""
                />

                <button className="py-4 px-10 border bg-blue-600 rounded-lg text-white">
                  Áp dụng
                </button>
              </div>
            </div> */}

            <div className="flex justify-between my-4">
              <strong>Tổng tiền:</strong>
              <strong className="text-red-600 text-2xl">
                {formatCurrency(totalPurchasePrice + fee - Number(voucher))}₫
              </strong>
            </div>
            <button
              style={{
                background: `${PRIMARY_MAIN}`,
              }}
              type="submit"
              className="h-20 my-8  rounded-lg w-full text-black/50 text-2xl hover:bg-yellow-500 hover:text-white transition-all duration-500 font-bold"
            >
              {isSubmitting ? (
                <span className="text-2xl mt-4">Loading...</span>
              ) : (
                <span className="text-2xl mt-4">Đặt hàng</span>
              )}
            </button>
            <small className="block text-center">
              Bạn có thể chọn hình thức thanh toán sau khi đặt hàng
            </small>
          </div>
        </form>
        <small className="text-center text-gray-600 w-full h-24 flex justify-center items-center">
          Bằng cách đặt hàng, bạn đồng ý với Điều khoản sử dụng của
          docongnghe.com
        </small>
      </div>
      <Modal
        title="Thanh toán sản phẩm"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
      >
        <p>Đang xử lý, vui lòng đợi...</p>
      </Modal>
      <Modal
        title="Số lượng hàng cần mua vượt quá số lượng còn lại trong kho !! "
        open={isModalVisible}
        onOk={handleOkBuy}
        onCancel={handleCancelBuy}
        okText="Trở lại giỏ hàng"
        cancelText="Hủy"
        className="text-black"
      >
        {purchasesInNotGood?.map((purchase, index) => (
          <div
            key={purchase.id}
            className="mb-5 grid grid-cols-12 items-center rounded-sm border border-gray-200 bg-white py-5 px-4 text-center text-2xl text-gray-500 first:mt-0"
          >
            <div className="col-span-6">
              <div className="flex">
                <div className="flex-grow">
                  <div className="flex">
                    <Link
                      className="h-20 w-20 flex-shrink-0"
                      to={`${`/${purchase.slug}/detail`}/${generateNameId({
                        slug: purchase.slug,
                        name: purchase.name,
                        id: purchase?.id?.toString(),
                      })}`}
                    >
                      {/* <img alt={purchase.name} src={purchase.image} /> */}
                    </Link>
                    <div className="flex-grow px-2  ">
                      <Link
                        to={`${`/${purchase.slug}/detail`}/${generateNameId({
                          slug: purchase.slug,
                          name: purchase.name,
                          id: purchase?.id?.toString(),
                        })}`}
                        className="text-left line-clamp-2 "
                      >
                        <div className="">
                          <span className="mr-2">{purchase.name}</span>
                          <span>{purchase.selectedRom}</span>
                        </div>
                        <span className="text-blue-500">
                          {purchase.selectedColor}
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-6">
              <div className="grid grid-cols-5 items-center">
                <div className="col-span-2">
                  {purchase.salePrice > 0 ? (
                    <span className="text-red-600">
                      ₫{formatCurrency(purchase.salePrice * purchase.quantity)}
                    </span>
                  ) : (
                    <span className="text-red-600">
                      ₫{formatCurrency(purchase.price * purchase.quantity)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Modal>
      <Modal
        title="Thông báo thời hạn của voucher !!!"
        open={isModalVisibleVoucher}
        onOk={() => setIsModalVisibleVoucher(false)}
        onCancel={() => setIsModalVisibleVoucher(false)}
      >
        <List
          header={<h3 className="font-bold text-2xl">Sắp hết hạn</h3>}
          dataSource={expiringVouchers}
          renderItem={(item) => (
            <List.Item>{item.name} - Sẽ hết hạn trong 1 ngày nữa!!</List.Item>
          )}
        />

        <List
          header={<h3 className="font-bold text-2xl">Đã hết hạn</h3>}
          dataSource={expiredVouchers}
          renderItem={(item) => <List.Item>{item.name} - ĐÃ HẾT HẠN</List.Item>}
        />
      </Modal>
      {/* <InvoiceToolbar invoice={valueBuy} /> */}
    </div>
  );
};

export default () => <Payment />;


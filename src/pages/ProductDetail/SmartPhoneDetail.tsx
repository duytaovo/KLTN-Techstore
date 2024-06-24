import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  formatCurrency,
  formatNumberToSocialStyle,
  generateNameId,
  getIdFromNameId,
  rateSale,
} from "src/utils/utils";
import styles from "./productdetail.module.scss";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { convert } from "html-to-text";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import { Button, Modal, Rate, Select } from "antd";
import DOMPurify from "dompurify";
import QuantityController from "../CartNew/QuantityController";
import { addItem } from "src/store/shopping-cart/cartItemsSlide";
import path from "src/constants/path";
import { getCommentByProductId } from "src/store/comment/commentsSlice";
import RatingFeedback from "./Rating";
import Tag from "./Tag";
import clsx from "clsx";
import PayInfo from "./PayInfo";
import { getDetailBrand } from "src/store/brand/brandsSlice";
import BasicTabs from "./Tabs";
import { useTheme } from "@material-ui/core";
import { getDetailProduct } from "src/store/product/productsSlice";
import axios from "axios";
import Skeleton from "src/components/Skeleton";
import Slider from "react-slick";
import "./productdetail.module.scss";
import { StarFill } from "react-bootstrap-icons";
import { updateText } from "src/store/dataSlice";
import { unwrapResult } from "@reduxjs/toolkit";
const BERT = [
  {
    label: "Bert",
    value: "Bert",
  },
  {
    label: "Bert-faiss",
    value: "Bert-faiss",
  },
  {
    label: "Bert-faiss-ann",
    value: "Bert-faiss-ann",
  },
  {
    label: "Bert-hnsw",
    value: "Bert-hnsw",
  },
];

export default function SmartPhoneDetail() {
  const theme = useTheme();
  const PRIMARY_MAIN = theme.palette.primary.main;
  const { t } = useTranslation(["product"]);
  const [buyCount, setBuyCount] = useState(1);
  const { productSlug } = useParams();
  const dispatch = useAppDispatch();
  const { productDetail } = useAppSelector((state) => state.products);
  const params = getIdFromNameId(productSlug as string);
  const [currentIndexImages, setCurrentIndexImages] = useState([0, 6]);
  const [activeImage, setActiveImage] = useState("");
  const imageRef = useRef<HTMLImageElement>(null);
  const data: any = useAppSelector((state) => state.data.data);
  const { profile, userWithId } = useAppSelector((state) => state.user);
  const [price, setPrice] = useState(
    productDetail?.lstProductTypeAndPrice[0].price,
  );
  const [salePrice, setSalePrice] = useState(
    productDetail?.lstProductTypeAndPrice[0].salePrice,
  );
  const [selectedRom, setSelectedRom] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedRam, setSelectedRam] = useState<string | null>(null);
  const [selectedTypeId, setSelectedTypeId] = useState<number | null>(null);
  const [productSuggestList, setProductSuggestList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const currentImages = useMemo(
    () =>
      productDetail?.lstProductImageUrl
        ? productDetail?.lstProductImageUrl.slice(...currentIndexImages)
        : [],
    [productDetail, currentIndexImages],
  );

  const [isModalOpenDetail, setIsModalOpenDetail] = useState(false);

  const showModalDetail = () => {
    setIsModalOpenDetail(true);
  };

  const handleOkDetail = () => {
    setIsModalOpenDetail(false);
  };

  const handleCancelDetail = () => {
    setIsModalOpenDetail(false);
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (productDetail && productDetail?.lstProductImageUrl?.length > 0) {
      setActiveImage(productDetail?.lstProductImageUrl[0]);
    }
  }, [productDetail]);
  let dataBertValue = data[18]?.value;

  function extractTextBetweenQuotes(text: any) {
    const regex = /"([^"]*)"/; // Biểu thức chính quy để tìm văn bản trong dấu ngoặc kép
    const match = text?.match(regex);
    if (match && match[1]) {
      return match[1]; // Trả về văn bản bên trong dấu ngoặc kép
    } else {
      return null;
    }
  }

  const extractedText = extractTextBetweenQuotes(dataBertValue || "Bert-faiss");
  const [bert, setBert] = useState(extractedText);
  useEffect(() => {
    setBert(extractTextBetweenQuotes(dataBertValue))
  }, [dataBertValue]);
  const fetchProduct = async () => {
    setIsLoading(true);
    const url1 = "bert";
    const url2 = "bert-faiss";
    const url3 = "bert-faiss-ann";
    const url4 = "bert-hnsw";
    const dataBert = await axios.post(
      `http://127.0.0.1:8003/${
        data[18]?.value == '"Bert-hnsw"'
          ? url4
          : data[18]?.value == '"Bert-faiss"'
          ? url2
          : data[18]?.value == '"Bert-faiss-ann"'
          ? url3
          : url1
      }`,
      [Number(params.idProduct)],
    );
    const _data = await dataBert?.data?.Data;

    const promises = _data.map(async (productId: number) => {
      const response = await fetch(
        `http://localhost:8081/api/product/${productId}`,
      );
      const productData = await response.json();
      return productData?.data;
    });

    Promise.all(promises)
      .then((products) => {
        setProductSuggestList(products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      })
      .finally(() => setIsLoading(false));
  };

  const updateBert = async () => {
    const body = {
      key: data[18]?.name,
      data: bert,
    };
    try {
      setIsLoading(true);

      const res = await dispatch(updateText(body)).then(unwrapResult);
      if (res?.data?.code === 200) {
        await fetchProduct();
      }
      toast.success("Đã lưu thay đổi", {
        position: "top-right",
        autoClose: 4000,
      });
      window.location.reload();
    } catch (error) {
      toast.error("Có lỗi" + "" + error, {
        position: "top-center",
        autoClose: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (dataBertValue !== undefined) {
      fetchProduct();
    }
  }, [dataBertValue]);

  useEffect(() => {
    dispatch(getDetailProduct(params.idProduct));
  }, [params.idProduct]);

  useEffect(() => {
    const getData = async () => {
      await dispatch(getCommentByProductId(params.idProduct));
      await dispatch(getDetailBrand(1));
    };
    getData();
  }, [productDetail]);

  const next = () => {
    if (currentIndexImages[1] < productDetail?.lstProductImageUrl?.length) {
      setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1]);
    }
  };

  const prev = () => {
    if (currentIndexImages[0] > 0) {
      setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1]);
    }
  };

  const chooseActive = (img: string) => {
    setActiveImage(img);
  };

  const handleBuyCount = (value: number) => {
    setBuyCount(value);
  };
  const addToCart = async () => {
    const body = {
      id: productDetail.productId,
      product_id: productDetail.productId,
      slug: productDetail.slug,
      quantity: buyCount,
      name: productDetail.name,
      dimension: productDetail.dimension,
      mass: productDetail.mass,
      price,
      salePrice,
      selectedRom,
      selectedColor,
      selectedRam,
      typeId: selectedTypeId,
      depotId: productDetail.lstProductTypeAndPrice[0].depotId,
      quantityInDB: productDetail?.lstProductTypeAndPrice[0]?.quantity,
      image: productDetail.lstProductImageUrl[0],
    };
    await dispatch(addItem(body));

    toast.success("Thêm sản phẩm thành công", {
      // position: "top-center",
      autoClose: 4000,
    });
  };

  const buyNow = async () => {
    const body = {
      id: productDetail.productId,
      product_id: productDetail.productId,
      slug: productDetail.slug,
      quantity: buyCount,
      name: productDetail.name,
      dimension: productDetail.dimension,
      mass: productDetail.mass,
      price,
      salePrice,
      selectedRom,
      selectedRam,
      selectedColor,
      typeId: selectedTypeId,
      depotId: productDetail.lstProductTypeAndPrice[0].depotId,
      quantityInDB: productDetail?.lstProductTypeAndPrice[0]?.quantity,
      image: productDetail.lstProductImageUrl[0],
    };
    const res = await dispatch(addItem(body));
    const purchase = res.payload;
    navigate(path.cartNew, {
      state: {
        purchaseId: purchase.id,
        typeId: purchase.typeId,
      },
    });
  };
  const [showFullDescription, setShowFullDescription] = useState(false);
  const shortDescriptionLength = 350;
  const displayDescription = showFullDescription
    ? productDetail?.description
    : productDetail?.description.slice(0, shortDescriptionLength);

  const getData = ({
    price,
    salePrice,
    selectedRom,
    selectedColor,
    selectedRam,
    typeId,
  }: any) => {
    setPrice(price);
    setSalePrice(salePrice);
    setSelectedRom(selectedRom);
    setSelectedColor(selectedColor);
    setSelectedRam(selectedRam);
    setSelectedTypeId(typeId);
  };
  const handleChange = (value: string) => {
    setBert(value);
  };
  if (!productDetail) return null;
  return (
    <div className="bg-gray-200 py-6">
      <Helmet>
        <title>{productDetail?.name}</title>
        <meta
          name="description"
          content={convert(productDetail?.description, {
            limits: {
              maxInputLength: 3000,
            },
          })}
        />
      </Helmet>
      <div className="content wrapper px-20 py-5 rounded-md">
        <div className="bg-white p-4 shadow rounded-md text-black">
          <div className="grid grid-cols-12 gap-9">
            <div className="col-span-7">
              <div
                className="relative w-full  overflow-hidden pt-[84%] shadow"
                // onMouseMove={handleZoom}
              >
                <img
                  src={activeImage}
                  alt={productDetail?.name}
                  className="absolute left-0 top-0 h-full w-full bg-white object-cover"
                  ref={imageRef}
                />
              </div>
              <div className="relative mt-4 grid grid-cols-6 gap-1">
                <button
                  className="absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white"
                  onClick={prev}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                </button>
                {currentImages?.map((img: any) => {
                  const isActive = img === activeImage;
                  return (
                    <div
                      className="relative w-full pt-[100%]"
                      key={img}
                      onMouseEnter={() => chooseActive(img)}
                    >
                      <img
                        src={img}
                        alt={productDetail?.name}
                        className="absolute left-0 top-0 h-full w-full cursor-pointer bg-white object-cover"
                      />
                      {isActive && (
                        <div className="absolute inset-0 border-2 border-red-600" />
                      )}
                    </div>
                  );
                })}
                <button
                  className="absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white"
                  onClick={next}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="col-span-5">
              <h1 className="text-4xl font-medium uppercase">
                {productDetail?.name}
              </h1>
              <div className="mt-8 flex items-center">
                <div className="flex items-center">
                  <span className="mr-1 ">
                    <Rate
                      allowHalf
                      defaultValue={Number(productDetail?.star) || 4.5}
                      disabled
                      className="text-2xl"
                    />
                  </span>
                </div>
                <div className="mx-4 h-4 w-[1px] bg-gray-300"></div>
                <div className="text-black">
                  <span>
                    {formatNumberToSocialStyle(
                      Number(productDetail?.totalReview),
                    )}
                  </span>
                  <span className="ml-1 text-gray-500"> Đã xem</span>
                </div>
              </div>
              <Link to="/" className="text-blue-500">
                Xem Điện thoại {""} cũ giá từ 24.660.000₫ Tiết kiệm đến 27%
              </Link>
              {/* Giá sản phẩm và lựa chọn */}
              <div className="space-x-3 mt-4 flex justify-start align-baseline">
                <Tag productData={productDetail} onClick={getData} />
              </div>
              <div className="space-y-3 mt-5">{/* <DiscountBox /> */}</div>
              <PayInfo
                initProductDetail={productDetail}
                handleClickPay={buyNow}
              />
              <div className="my-6 flex items-center">
                <div className="capitalize text-gray-600">Chọn số lượng</div>
                <QuantityController
                  onDecrease={handleBuyCount}
                  onIncrease={handleBuyCount}
                  onType={handleBuyCount}
                  value={buyCount}
                  max={productDetail?.lstProductTypeAndPrice[0]?.quantity}
                />
                <div className="ml-6 text-xl text-gray-500">
                  {productDetail?.lstProductTypeAndPrice[0]?.quantity} sản phẩm
                  có sẵn
                </div>
              </div>

              <div className="mt-4 flex flex-col w-full items-center text-black/60">
                <button
                  style={{
                    background: `${PRIMARY_MAIN}`,
                  }}
                  onClick={addToCart}
                  className="flex h-20 items-center w-full justify-center rounded-sm border px-5 capitalize text-white shadow-sm hover:bg-orange-500"
                >
                  <AddShoppingCartIcon
                    className="text-white mr-2"
                    fontSize="large"
                  />
                  Thêm vào giỏ hàng
                </button>
                <button
                  onClick={buyNow}
                  className="fkex mt-4 h-20 min-w-[5rem] w-full items-center justify-center rounded-sm  px-5 capitalize text-white  shadow-sm outline-none bg-buyColor"
                >
                  <ShoppingCartCheckoutIcon
                    className="text-white mr-2"
                    fontSize="large"
                  />
                  Mua ngay
                </button>
              </div>
              {/* <Policy /> */}
            </div>
          </div>
        </div>
        <div className="max-w-8xl m-auto">
          <div className="flex gap-8">
            <div className={clsx(styles.left, "w-3/5")}>
              <div className="mt-8">
                <div className=" py-10">
                  <div className=" bg-white p-4 shadow">
                    <div className="rounded bg-gray-50 p-4 text-4xl capitalize text-slate-700 font-bold">
                      Mô tả sản phẩm
                    </div>
                    <div className="mx-4 mb-4 mt-12 text-2xl leading-loose text-black flex justify-center">
                      <div
                        className="flex justify-center"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(displayDescription),
                        }}
                      />
                    </div>
                    <div className="text-center">
                      {!showFullDescription &&
                        productDetail?.description.length >
                          shortDescriptionLength && (
                          <Button
                            style={{
                              color: `${PRIMARY_MAIN}` || "",
                              border: `1px solid ${PRIMARY_MAIN}` || "",
                            }}
                            type="default"
                            className="border-[1.5px] text-blue-400 border-blue-400 w-1/2 h-16 mt-3"
                            onClick={showModalDetail}
                          >
                            {" "}
                            Xem thêm
                          </Button>
                        )}
                      <Modal
                        open={isModalOpenDetail}
                        onOk={handleOkDetail}
                        onCancel={handleCancelDetail}
                        centered
                        className="p-5 h-screen flex justify-center items-center"
                        width={1200}
                      >
                        <BasicTabs
                          tabDefault={"1"}
                          children1={
                            <div
                              className="flex justify-center flex-col"
                              dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(
                                  productDetail.description,
                                ),
                              }}
                            />
                          }
                          children2={
                            <div className="block space-y-2">
                              <p className="font-bold text-3xl text-gray-800 mb-4">
                                Cấu hình {productDetail?.name}
                              </p>
                              <table className="w-full">
                                <tbody className="space-y-4 p-5">
                                  {productDetail?.lstProductAttribute.map(
                                    (item, index: number) => (
                                      <>
                                        {index % 2 === 0 ? (
                                          <tr
                                            className={"p-6"}
                                            key={item.productAttributeId}
                                          >
                                            <td
                                              colSpan={6}
                                              className="my-4 p-6"
                                            >
                                              {item.nameVn}
                                            </td>
                                            <td colSpan={4}>{item.value}</td>
                                          </tr>
                                        ) : (
                                          <tr
                                            className={"p-6  bg-gray-100"}
                                            key={item.productAttributeId}
                                          >
                                            <td
                                              colSpan={6}
                                              className="my-4 p-6"
                                            >
                                              {item.nameVn}
                                            </td>
                                            <td colSpan={4}>{item.value}</td>
                                          </tr>
                                        )}
                                      </>
                                    ),
                                  )}

                                  <tr className={"bg-gray-100  p-6 "}>
                                    <td colSpan={6} className="my-4 p-6">
                                      Năm ra mắt
                                    </td>
                                    <td colSpan={4}>
                                      {productDetail?.launchTime}
                                    </td>
                                  </tr>
                                  <tr className={" p-6 "}>
                                    <td colSpan={6} className="my-4 p-6">
                                      Phụ kiện
                                    </td>
                                    <td colSpan={4}>
                                      {productDetail?.accessories}
                                    </td>
                                  </tr>
                                  <tr className={"bg-gray-100  p-6 "}>
                                    <td colSpan={6} className="my-4 p-6">
                                      Thiết kế
                                    </td>
                                    <td colSpan={4}>{productDetail?.design}</td>
                                  </tr>
                                  <tr className={" p-6 "}>
                                    <td colSpan={4} className="my-4 p-6">
                                      Kích thước
                                    </td>
                                    <td colSpan={6}>
                                      {productDetail?.dimension}
                                    </td>
                                  </tr>
                                  <tr className={"bg-gray-100  p-6"}>
                                    <td colSpan={4} className="my-4 p-6">
                                      Khối lượng
                                    </td>
                                    <td colSpan={6}>{productDetail?.mass}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          }
                        ></BasicTabs>
                      </Modal>
                    </div>
                    <div className="px-10 py-10 ">
                      <div className="">
                        <div className="uppercase text-gray-700 font-bold text-4xl mb-3 ">
                          Đánh giá {productDetail?.name}
                        </div>
                        <RatingFeedback />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={clsx(styles.right, "w-2/5  py-16 ")}>
              <div className="block space-y-2">
                <p className="font-bold text-3xl text-gray-800 mb-4">
                  Cấu hình {productDetail?.name}
                </p>
                <table className="w-full">
                  <tbody className="space-y-4 p-5">
                    {productDetail?.lstProductAttribute.map(
                      (item, index: number) => (
                        <>
                          {index % 2 === 0 ? (
                            <tr className={"p-6"} key={item.productAttributeId}>
                              <td colSpan={6} className="my-4 p-6">
                                {item.nameVn}
                              </td>
                              <td colSpan={4}>{item.value}</td>
                            </tr>
                          ) : (
                            <tr
                              className={"p-6  bg-gray-100"}
                              key={item.productAttributeId}
                            >
                              <td colSpan={6} className="my-4 p-6">
                                {item.nameVn}
                              </td>
                              <td colSpan={4}>{item.value}</td>
                            </tr>
                          )}
                        </>
                      ),
                    )}

                    <tr className={"bg-gray-100  p-6 "}>
                      <td colSpan={6} className="my-4 p-6">
                        Năm ra mắt
                      </td>
                      <td colSpan={4}>{productDetail?.launchTime}</td>
                    </tr>
                    <tr className={" p-6 "}>
                      <td colSpan={6} className="my-4 p-6">
                        Phụ kiện
                      </td>
                      <td colSpan={4}>{productDetail?.accessories}</td>
                    </tr>
                    <tr className={"bg-gray-100  p-6 "}>
                      <td colSpan={6} className="my-4 p-6">
                        Thiết kế
                      </td>
                      <td colSpan={4}>{productDetail?.design}</td>
                    </tr>
                    <tr className={" p-6 "}>
                      <td colSpan={4} className="my-4 p-6">
                        Kích thước
                      </td>
                      <td colSpan={6}>{productDetail?.dimension}</td>
                    </tr>
                    <tr className={"bg-gray-100  p-6"}>
                      <td colSpan={4} className="my-4 p-6">
                        Khối lượng
                      </td>
                      <td colSpan={6}>{productDetail?.mass}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="ml-20">
          <div className="text-[16px] uppercase text-gray-400 gap-4 flex items-center">
            <div>CÓ THỂ BẠN CŨNG THÍCH</div>
            <div className="flex">
              {profile?.id == 2 && (
                <div className="flex items-center gap-2">
                  <Select
                    onChange={handleChange}
                    options={BERT}
                    // defaultValue={extractedText}
                    value={bert}
                  />

                  <Button
                    style={{
                      color: `${PRIMARY_MAIN}` || "",
                      border: `1px solid ${PRIMARY_MAIN}` || "",
                    }}
                    type="default"
                    className="border-[1.5px] text-black border-blue-400 w-[100px] h-12 "
                    onClick={updateBert}
                  >
                    Cập nhật
                  </Button>
                </div>
              )}
            </div>
          </div>
          {productSuggestList && (
            <div className="w-full mt-16">
              {isLoading === true ? (
                <div style={{ display: "flex", gap: 20, paddingTop: 2 }}>
                  <Skeleton
                    styles={{ height: "35vh" }}
                    children={undefined}
                    className={undefined}
                  />
                  <Skeleton
                    styles={{ height: "35vh" }}
                    children={undefined}
                    className={undefined}
                  />
                  <Skeleton
                    styles={{ height: "35vh" }}
                    children={undefined}
                    className={undefined}
                  />
                  <Skeleton
                    styles={{ height: "35vh" }}
                    children={undefined}
                    className={undefined}
                  />
                  <Skeleton
                    styles={{ height: "35vh" }}
                    children={undefined}
                    className={undefined}
                  />
                </div>
              ) : (
                <div className="">
                  <div className="">
                    <Slider
                      slidesToShow={5}
                      slidesToScroll={5}
                      // nextArrow={<NextArrow />}
                      // prevArrow={<PrevArrow />}
                    >
                      {productSuggestList?.map((product: any) => (
                        <div className="w-full" key={product.title}>
                          <div className="mx-4">
                            <Link
                              to={`/${product?.slug}${"/detail"}/${generateNameId(
                                {
                                  name: product?.name,
                                  slug: "",
                                  id: product?.productId?.toString(),
                                },
                              )}`}
                            >
                              <div className={styles.card}>
                                <div className={styles.wrap}>
                                  <div className={styles.image}>
                                    <img
                                      src={product?.lstProductImageUrl[0]}
                                      alt={product?.name}
                                      className={styles.img}
                                    ></img>
                                    <img
                                      className={styles.imgPolicy}
                                      src="https://cdn.tgdd.vn/ValueIcons/Label_01-05.png"
                                    ></img>
                                  </div>
                                  {/* {props.tag && <p className={styles.tag}>{props.tag}</p>} */}
                                  <p
                                    className={"text-black font-bold text-2xl"}
                                  >
                                    {product?.name}
                                  </p>

                                  <strong className={styles.price}>
                                    {product?.lstProductTypeAndPrice[0]
                                      ?.salePrice > 0 &&
                                    product?.lstProductTypeAndPrice[0]
                                      ?.salePrice !==
                                      product?.lstProductTypeAndPrice[0]
                                        ?.price ? (
                                      <div className="mt-3  items-center">
                                        <div className="max-w-[70%] truncate text-[#333333] flex items-center ">
                                          <span className="text-[14px] leading-4  line-through">
                                            đ
                                            {formatCurrency(
                                              product?.lstProductTypeAndPrice[0]
                                                ?.price,
                                            )}
                                          </span>
                                          <div className="ml-4 rounded-sm  py-[2px] text-lg font-semibold uppercase text-black">
                                            {rateSale(
                                              product?.lstProductTypeAndPrice[0]
                                                ?.salePrice,
                                              product?.lstProductTypeAndPrice[0]
                                                ?.price,
                                            )}{" "}
                                            giảm
                                          </div>
                                        </div>
                                        <div className=" truncate text-[#e83a45] font-bold">
                                          <span className="text-2xl">
                                            đ
                                            {formatCurrency(
                                              product?.lstProductTypeAndPrice[0]
                                                ?.salePrice,
                                            )}
                                          </span>
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="mt-3  items-center">
                                        <div className="truncate text-[#e83a45] font-bold">
                                          <span className="text-2xl  ">
                                            đ
                                            {formatCurrency(
                                              product?.lstProductTypeAndPrice[0]
                                                ?.price,
                                            )}
                                          </span>
                                        </div>
                                      </div>
                                    )}
                                  </strong>
                                  <p>
                                    <span className="text-yellow-400 font-bold">
                                      {product?.star}&ensp;
                                      <i>
                                        <StarFill />
                                      </i>
                                    </span>
                                    <span className="text-gray-400">
                                      &ensp;({product?.totalReview})
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


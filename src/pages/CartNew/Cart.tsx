import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import path from "src/constants/path";
import { Purchase } from "src/types/purchase.type";
import { formatCurrency, generateNameId } from "src/utils/utils";
import produce from "immer";
import keyBy from "lodash/keyBy";
import { toast } from "react-toastify";
import { AppContext } from "src/contexts/app.context";
import noproduct from "src/assets/images/no-product.png";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import QuantityController from "./QuantityController";
import Button from "../Auth/Button";
import {
  addItemBuy,
  removeItem,
  updateItem,
} from "src/store/shopping-cart/cartItemsSlide";
import { useTheme } from "@material-ui/core";

export default function CartNew() {
  const theme = useTheme();
  const PRIMARY_MAIN = theme.palette.primary.main;
  const { extendedPurchases, setExtendedPurchases } = useContext(AppContext);
  const [purchasesInCartData, setPurchasesInCartData] = useState<[]>([]);
  const dispatch = useAppDispatch();
  const product_add: any = useAppSelector((state) => state.cartItems.value);
  const navigate = useNavigate();

  useEffect(() => {
    setPurchasesInCartData(product_add);
  }, [product_add]);

  const location = useLocation();
  const choosenPurchaseIdFromLocation = (
    location.state as { purchaseId: string } | null
  )?.purchaseId;
  const choosenPurchaseTypeIdromLocation = (
    location.state as { typeId: string } | null
  )?.typeId;

  const isAllChecked = useMemo(
    () => extendedPurchases.every((purchase) => purchase.checked),
    [extendedPurchases],
  );

  const checkedPurchases = useMemo(
    () => extendedPurchases.filter((purchase) => purchase.checked),
    [extendedPurchases],
  );

  const checkedPurchasesCount = checkedPurchases.length;

  const totalCheckedPurchasePrice = useMemo(
    () =>
      checkedPurchases.reduce((result, current) => {
        if (current?.salePrice > 0 && current?.price !== current?.salePrice) {
          return result + current.salePrice * current.quantity;
        }
        return result + current.price * current.quantity;
      }, 0),
    [checkedPurchases],
  );

  const totalCheckedPurchaseSavingPrice = useMemo(
    () =>
      checkedPurchases.reduce((result, current) => {
        return result + (current.price - current.salePrice) * current.quantity;
      }, 0),
    [checkedPurchases],
  );

  useEffect(() => {
    setExtendedPurchases((prev) => {
      const extendedPurchasesObject = keyBy(prev, "id");

      return (
        purchasesInCartData?.map((purchase: any) => {
          const isChoosenPurchaseFromLocation =
            choosenPurchaseIdFromLocation === purchase.id &&
            choosenPurchaseTypeIdromLocation === purchase.typeId;
          return {
            ...purchase,
            disabled: false,
            checked:
              isChoosenPurchaseFromLocation ||
              (Boolean(extendedPurchasesObject[purchase.id]?.checked) &&
                Boolean(extendedPurchasesObject[purchase.typeId]?.checked)),
          };
        }) || []
      );
    });
  }, [
    purchasesInCartData,
    choosenPurchaseIdFromLocation,
    choosenPurchaseTypeIdromLocation,
  ]);

  useEffect(() => {
    return () => {
      history.replaceState(null, "");
    };
  }, []);

  const handleCheck =
    (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setExtendedPurchases(
        produce((draft) => {
          draft[purchaseIndex].checked = event.target.checked;
        }),
      );
    };

  const handleCheckAll = () => {
    setExtendedPurchases((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isAllChecked,
      })),
    );
  };

  const handleTypeQuantity = (purchaseIndex: number) => (value: number) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].quantity = value;
      }),
    );
  };

  const handleQuantity = async (
    purchaseIndex: number,
    value: number,
    enable: boolean,
  ) => {
    if (enable) {
      const purchase = extendedPurchases[purchaseIndex];
      setExtendedPurchases(
        produce((draft) => {
          draft[purchaseIndex].disabled = true;
        }),
      );

      dispatch(updateItem({ ...purchase, quantity: value }));
      setPurchasesInCartData(product_add);
    }
  };

  const handleDelete = (purchaseIndex: number) => async () => {
    const purchaseId = extendedPurchases[purchaseIndex];
    dispatch(removeItem(purchaseId));

    setPurchasesInCartData(product_add);
    // if (res.status === 200) {
    toast.success("Xóa thành công", {
      autoClose: 1000,
    });
    // }
  };

  const handleDeleteManyPurchases = async () => {
    checkedPurchases.map((purchase) => dispatch(removeItem(purchase)));

    toast.success("Xóa thành công", {
      autoClose: 1000,
    });
  };

  const handleBuyPurchases = async () => {
    if (checkedPurchases.length > 0) {
      const body = checkedPurchases.map((purchase) => ({
        product_id: purchase.product_id,
        quantity: purchase.quantity,
        price: purchase.price,
        salePrice: purchase.salePrice,
        selectedRom: purchase.selectedRom,
        selectedColor: purchase.selectedColor,
        selectedRam: purchase.selectedRam,
        mass: purchase.mass,
        dimension: purchase.dimension,
        typeId: purchase?.typeId,
        depotId: purchase.depotId,
        totalCheckedPurchasePrice: totalCheckedPurchasePrice,
      }));
      dispatch(addItemBuy(body));
      // checkedPurchases.map((purchase) => dispatch(removeItem(purchase)));
      navigate(path.payment);
    } else {
      toast.error("Vui lòng chọn sản phẩm", {
        autoClose: 1000,
      });
    }
  };

  return (
    <div className="bg-neutral-100 py-16 px-28">
      <div className=" text-black">
        {extendedPurchases.length > 0 ? (
          <>
            <div className="overflow-auto">
              <div className="min-w-[1000px]">
                <div className="grid grid-cols-12 rounded-sm bg-white px-9 py-5 text-lg capitalize text-gray-500 shadow">
                  <div className="col-span-5">
                    <div className="flex items-center">
                      <div className="flex flex-shrink-0 items-center justify-center pr-3">
                        <input
                          type="checkbox"
                          className="h-5 w-5 accent-orange"
                          checked={isAllChecked}
                          onChange={handleCheckAll}
                        />
                      </div>
                      <div className="flex-grow text-black">Sản phẩm</div>
                    </div>
                  </div>
                  <div className="col-span-7">
                    <div className="grid grid-cols-7 text-center">
                      <div className="col-span-3">Đơn giá</div>
                      <div className="col-span-2">Số lượng</div>
                      {/* <div className="col-span-2">Màu</div>
                      <div className="col-span-2">Bộ nhớ trong</div> */}
                      <div className="col-span-1">Số tiền</div>
                      <div className="col-span-1">Thao tác</div>
                    </div>
                  </div>
                </div>
                {extendedPurchases.length > 0 && (
                  <div className="my-3 rounded-sm bg-white p-5 shadow">
                    {extendedPurchases.map((purchase, index) => (
                      <div
                        key={purchase.id}
                        className="mb-5 grid grid-cols-12 items-center rounded-sm border border-gray-200 bg-white py-5 px-4 text-center text-2xl text-gray-500 first:mt-0"
                      >
                        <div className="col-span-6">
                          <div className="flex">
                            <div className="flex flex-shrink-0 items-center justify-center pr-3">
                              <input
                                type="checkbox"
                                className="h-5 w-5 accent-orange"
                                checked={purchase.checked}
                                onChange={handleCheck(index)}
                              />
                            </div>
                            <div className="flex-grow">
                              <div className="flex">
                                <Link
                                  className="h-20 w-20 flex-shrink-0"
                                  to={`${`/${purchase.slug}/detail`}/${generateNameId(
                                    {
                                      slug: purchase.slug,
                                      name: purchase.name,
                                      id: purchase.id.toString(),
                                    },
                                  )}`}
                                >
                                  <img
                                    alt={purchase.name}
                                    src={purchase.image}
                                  />
                                </Link>
                                <div className="flex-grow px-2  ">
                                  <Link
                                    to={`${`/${purchase.slug}/detail`}/${generateNameId(
                                      {
                                        slug: purchase.slug,
                                        name: purchase.name,
                                        id: purchase.id.toString(),
                                      },
                                    )}`}
                                    className="text-left line-clamp-2 "
                                  >
                                    <div className="">
                                      <span className="mr-2">
                                        {purchase.name}
                                      </span>
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
                              <div className="flex items-center justify-center">
                                <span className="text-gray-300 line-through">
                                  ₫{formatCurrency(purchase.price)}
                                </span>
                                {purchase.salePrice > 0 &&
                                  purchase.salePrice !== purchase.price && (
                                    <span className="ml-3">
                                      ₫{formatCurrency(purchase.salePrice)}
                                    </span>
                                  )}
                              </div>
                            </div>
                            <div className="col-span-1">
                              <QuantityController
                                max={purchase.quantityInDB}
                                value={purchase.quantity}
                                classNameWrapper="flex items-center"
                                onIncrease={(value) =>
                                  handleQuantity(
                                    index,
                                    value,
                                    value <= purchase.quantityInDB,
                                  )
                                }
                                onDecrease={(value) =>
                                  handleQuantity(index, value, value >= 1)
                                }
                                // onDecrease={handleBuyCount}
                                // onIncrease={handleBuyCount}
                                onType={handleTypeQuantity(index)}
                                onFocusOut={(value) =>
                                  handleQuantity(
                                    index,
                                    value,
                                    value >= 1 &&
                                      value <= purchase.quantityInDB &&
                                      value !==
                                        (purchasesInCartData as Purchase[])[
                                          index
                                        ].quantityInDB,
                                  )
                                }
                                disabled={purchase.disabled}
                              />
                            </div>
                            <div className="col-span-1">
                              {purchase.salePrice > 0 ? (
                                <span className="text-red-600">
                                  ₫
                                  {formatCurrency(
                                    purchase.salePrice * purchase.quantity,
                                  )}
                                </span>
                              ) : (
                                <span className="text-red-600">
                                  ₫
                                  {formatCurrency(
                                    purchase.price * purchase.quantity,
                                  )}
                                </span>
                              )}
                            </div>
                            <div className="col-span-1">
                              <button
                                onClick={handleDelete(index)}
                                className="bg-none text-black transition-colors hover:text-red-600"
                              >
                                Xóa
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="sticky bottom-0 z-10 mt-8 flex flex-col rounded-sm border border-gray-100 bg-white p-5 shadow sm:flex-row sm:items-center">
              <div className="flex items-center">
                <div className="flex flex-shrink-0 items-center justify-center pr-3">
                  <input
                    type="checkbox"
                    className="h-5 w-5 accent-orange"
                    checked={isAllChecked}
                    onChange={handleCheckAll}
                  />
                </div>
                <button
                  className="mx-3 border-none bg-none"
                  onClick={handleCheckAll}
                >
                  Chọn tất cả ({extendedPurchases.length})
                </button>
                <button
                  className="mx-3 border-none bg-none"
                  onClick={handleDeleteManyPurchases}
                >
                  Xóa
                </button>
              </div>

              <div className="mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center">
                <div>
                  <div className="flex items-center sm:justify-end">
                    <div>
                      Tổng thanh toán ({checkedPurchasesCount} sản phẩm):
                    </div>
                    <div className="ml-2 text-2xl text-orange-600">
                      ₫{formatCurrency(totalCheckedPurchasePrice)}
                    </div>
                  </div>
                  <div className="flex items-center text-2xl sm:justify-end">
                    <div className="text-gray-500">Tiết kiệm</div>
                    <div className="ml-6 text-orange-600">
                      ₫{formatCurrency(totalCheckedPurchaseSavingPrice)}
                    </div>
                  </div>
                </div>
                <Button
                  style={{
                    background: `${PRIMARY_MAIN}`,
                  }}
                  className="mt-5 flex h-10 w-52 items-center justify-center  rounded text-2xl uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0"
                  onClick={handleBuyPurchases}
                  // disabled={buyProductsMutation.isLoading}
                >
                  Mua hàng
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center">
            <img
              src={noproduct}
              alt="no purchase"
              className="mx-auto h-24 w-24"
            />
            <div className="mt-5 font-bold text-gray-400">
              Giỏ hàng của bạn còn trống
            </div>
            <div className="mt-5 text-center">
              <Link
                to={path.home}
                className=" rounded-sm bg-orange px-10 py-2  uppercase text-white transition-all hover:bg-orange/80"
              >
                Mua ngay
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


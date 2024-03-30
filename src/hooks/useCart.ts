import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAppSelector } from "./useRedux";
function useCart() {
  const cartItems = useAppSelector((state) => state);
  //   const totalPrice = cartItems.reduce(
  //     (total: number, item: any) =>
  //       total +
  //       Number(item.quantity) * Number(item.price - item.price * item.discount),
  //     0
  //   );
  //   const totalQuantity = cartItems.reduce(
  //     (total: number, item: any) => total + Number(item.quantity),
  //     0
  //   );

  //   return { cartItems, totalPrice, totalQuantity };
  return { cartItems };
}

export default useCart;

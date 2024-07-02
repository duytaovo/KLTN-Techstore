import useCart from "src/hooks/useCart";
import { Cart } from "../Icons";
import { useSelector } from "react-redux";
import { useAppSelector } from "src/hooks/useRedux";

function CartButton() {
  // const { totalQuantity } = useCart();
  const { value } = useAppSelector((state) => state.cartItems);
  return (
    <div className="relative">
      <div className="absolute  top-0 left-0 translate-x-[85px]  bg-red-600 w-8 h-8 rounded-full flex items-center justify-center">
        <span className="text-white text-xl">{value.length}</span>
      </div>
      <i className="">
        <Cart />
      </i>
      <span className="ml-2">Giỏ hàng</span>
    </div>
  );
}

export default CartButton;


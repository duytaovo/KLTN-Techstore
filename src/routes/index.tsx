import { lazy } from "react";
import Search from "src/pages/Search";
import path from "src/constants/path";
import KhongTimThay from "src/pages/KhongTimThay/NotFound";
import ChangePassword from "src/pages/User/pages/ChangePassword/ChangePassword";
import Voucher from "src/pages/Discount/Voucher";
import OrderHistoryDetail from "src/pages/History/OrderHistoryDetail";

const CodeValidator = lazy(
  () => import("src/pages/Auth/ForgotPasword/ValidatorCode"),
);
const Home = lazy(() => import("src/pages/Home/Home"));
const Payment = lazy(() => import("src/pages/Payment/Payment"));
const CodeValidatorActiveAccount = lazy(
  () => import("src/pages/Auth/AcctiveAccount/ValidatorCode"),
);
const ActiveAccount = lazy(() => import("src/pages/Auth/AcctiveAccount"));
const ForgotPassword = lazy(() => import("src/pages/Auth/ForgotPasword"));
const History = lazy(() => import("src/pages/History/History"));
const ListProductMain = lazy(
  () => import("src/pages/ListProduct/ListProductMain"),
);
const ProductDetail = lazy(
  () => import("src/pages/ProductDetail/SmartPhoneDetail"),
);

const Login = lazy(() => import("src/pages/Auth/Login"));
const Register = lazy(() => import("src/pages/Auth/Register"));

const Profile = lazy(() => import("src/pages/User/pages/Profile"));
const CartNew = lazy(() => import("src/pages/CartNew"));
// const ChangePassword = lazy(
//   () => import("src/pages/User/pages/ChangePassword")
// );

export const routeMain = [
  {
    path: path.home,
    Component: Home,
  },

  {
    path: path.historyDetail,
    Component: OrderHistoryDetail,
  },

  {
    path: path.search,
    Component: Search,
  },
  {
    path: path.cartNew,
    Component: CartNew,
  },
  {
    path: path.voucher,
    Component: Voucher,
  },
  {
    path: "*",
    Component: KhongTimThay,
  },
];

const urlDetails: string[] = [
  "/smartphone/detail/:productSlug",
  "/laptop/detail/:productSlug",
  "/tablet/detail/:productSlug",
  "/watch/detail/:productSlug",
  "/man-hinh-may-tinh/detail/:productSlug",
  "/may-tinh-de-ban/detail/:productSlug",
  "/accessory/detail/:productSlug",
  "/smartwatch/detail/:productSlug",
  "/ram/detail/:productSlug",
  "/rom/detail/:productSlug",
  "/processor/detail/:productSlug",
  "/graphics-card/detail/:productSlug",
  "/mouse/detail/:productSlug",
  "/loudspeaker/detail/:productSlug",
  "/adapter/detail/:productSlug",
  "/microphone/detail/:productSlug",
  "/keyboard/detail/:productSlug",
  "/radiator/detail/:productSlug",
  "/computer-case/detail/:productSlug",
  "/mainboard/detail/:productSlug",
  "/monitor/detail/:productSlug",
  "/computer-power/detail/:productSlug",
];

const urlsProduct: string[] = [
  "/smartphone",
  "/laptop",
  "/tablet",
  "/smartwatch",
  "/ram",
  "/rom",
  "/processor",
  "/graphics-card",
  "/mouse",
  "/loudspeaker",
  "/adapter",
  "/backup-charger",
  "/microphone",
  "/radiator",
  "/keyboard",
  "/earphone",
  "/mainboard",
  "/computer-case",
  "/monitor",
  "/computer-power",
];

export const productRoutes = urlsProduct.map((url) => ({
  path: url,
  Component: ListProductMain,
}));

export const productDetailRoutes = urlDetails.map((url) => ({
  path: url,
  Component: ProductDetail,
}));

export const routeAuth = [
  {
    path: path.login,
    Component: Login,
  },
  {
    path: path.register,
    Component: Register,
  },

  {
    path: path.forgotPassword,
    Component: ForgotPassword,
  },
  {
    path: path.sendCode,
    Component: CodeValidator,
  },
];

export const routeUser = [
  {
    path: path.profile,
    Component: Profile,
  },

  {
    path: path.activeAccount,
    Component: ActiveAccount,
  },
  {
    path: path.sendCodeActive,
    Component: CodeValidatorActiveAccount,
  },
  {
    path: path.changePassword,
    Component: ChangePassword,
  },

  {
    path: path.historyPurchase,
    Component: History,
  },
];

export const routePayment = [
  {
    path: path.payment,
    Component: Payment,
  },
];


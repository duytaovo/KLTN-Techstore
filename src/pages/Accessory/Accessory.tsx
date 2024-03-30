import AccessoryHotDeal from "./AccessoryHotDeal";
import BigBannerAccessory from "./BigBannerAccessory";
import GroupCategory from "./GroupCategory";
import QuickLinkAccessory from "./QuickLinkAccessory";
import AppleAccessory from "./AppleAccessory";
import Pin from "./Pin";
import Cable from "./Cable";
import HeadPhone from "./HeadPhone";
import LoudSpeaker from "./LoudSpeaker";
import SmartHome from "./SmartHome";
import Gaming from "./Gaming";
import MenuTopAccessory from "./MenuTopAccessory";
import { Helmet } from "react-helmet-async";
import { useAppDispatch } from "src/hooks/useRedux";
import { useEffect } from "react";
import { getAllProductByCategory } from "src/store/product/productsSlice";

import "./bigbanneraccessory.scss";
import "./groupcategory.module.scss";
import "./quicklinkaccessory.module.scss";

const Accessory = () => {
  const dispatch = useAppDispatch();
  const category = "accessory";
  useEffect(() => {
    dispatch(getAllProductByCategory(category));
  }, [category]);
  return (
    <>
      <Helmet>
        <title>Trang phụ kiện </title>
        <meta name="description" content="Trang phụ kiện" />
      </Helmet>
      <BigBannerAccessory />
      {/* <GroupCategory /> */}
      <QuickLinkAccessory />
      <div className="ml-[120px] mt-6 rounded">
        <AccessoryHotDeal />
        <AppleAccessory />
        <Pin />
        <Cable />
        <HeadPhone />
        <LoudSpeaker />
        <SmartHome />
        <Gaming />
        <MenuTopAccessory />
      </div>
    </>
  );
};
export default Accessory;


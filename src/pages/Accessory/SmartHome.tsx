import DealMain from "src/components/DealMain/DealMain";
import ProductCard from "src/components/ProductCard";
import ListProduct from "src/components/ListProduct/ListProduct";
import ProductTab from "src/components/ProductTab/ProductTab";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAppSelector } from "src/hooks/useRedux";

const productTab = [
  "Nổi bật",
  "Khóa điện tử",
  "Ổ cắm thông minh",
  "TV Box",
  "Rounter",
];
const SmartHome = () => {
  const { data } = useAppSelector((state) => state.products.allProducts);

  return (
    <>
      <div id="smarthome" className="blocklist">
        <div className="listcontent">
          <DealMain linkImg="https://cdn.tgdd.vn/2022/03/banner/DESKTOPTagline6-1200x150.png" />
          <ProductTab productTab={productTab} />
          {/* <ListProduct products={data} isSlide={false} category="" /> */}
        </div>
      </div>
    </>
  );
};
export default SmartHome;

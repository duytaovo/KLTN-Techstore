import DealMain from "src/components/DealMain/DealMain";
import ListProduct from "src/components/ListProduct/ListProduct";
import ProductTab from "src/components/ProductTab/ProductTab";
import { useState, useEffect } from "react";
import axios from "axios";
const productTab = ["Nổi bật", "Tai nghe", "Adapter sạc", "Cáp sạc", "Ốp lưng"];
import "./quicklinkaccessory.module.scss";

const AppleAccessory = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("https://json.msang.repl.co/products?category=phukien&brand=apple")
      .then((response) => response.data)
      .then((data) => setProducts(data));
  }, []);
  return (
    <>
      <div id="apple" className="blocklist">
        <div className="listcontent">
          <DealMain linkImg="//cdn.tgdd.vn/2022/03/banner/DESKTOPTagline8-1200x150.png"></DealMain>
          <ProductTab productTab={productTab}></ProductTab>
          {/* <ListProduct
            products={products}
            isSlide={false}
            category=""
          ></ListProduct> */}
        </div>
      </div>
    </>
  );
};
export default AppleAccessory;


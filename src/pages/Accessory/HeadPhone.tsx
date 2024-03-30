import DealMain from "src/components/DealMain/DealMain";
import ListProduct from "src/components/ListProduct/ListProduct";
import ProductTab from "src/components/ProductTab/ProductTab";
import { useState, useEffect } from "react";
import axios from "axios";

const productTab = [
  "Nổi bật",
  "Bluetooth",
  "Apple",
  "Không dây - True Wireless",
  "Sony",
];
const HeadPhone = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://json.msang.repl.co/products?category=phukien&nameType=tainghe"
      )
      .then((response) => response.data)
      .then((data) => setProducts(data));
  }, []);
  return (
    <>
      <div id="headphone" className="blocklist">
        <div className="listcontent ">
          <DealMain linkImg="https://cdn.tgdd.vn/2022/03/banner/DESKTOPTagline4-1200x150.png"></DealMain>
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
export default HeadPhone;

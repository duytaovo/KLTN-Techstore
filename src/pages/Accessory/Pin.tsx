import DealMain from "src/components/DealMain/DealMain";
import ProductCard from "src/components/ProductCard";
import ListProduct from "src/components/ListProduct/ListProduct";
import ProductTab from "src/components/ProductTab/ProductTab";
import { useState, useEffect } from "react";
import axios from "axios";

const productTab = [
  "Nổi bật",
  "Dung lượng 10000mAh",
  "Dung lượng 20000mAh",
  "Dưới 300.000đ",
  "Xmobile",
];
const Pin = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("https://json.msang.repl.co/products?category=phukien&nameType=pin")
      .then((response) => response.data)
      .then((data) => setProducts(data));
  }, []);
  return (
    <>
      <div id="pin" className="blocklist">
        <div className="listcontent ">
          <DealMain linkImg="https://cdn.tgdd.vn/2022/03/banner/DESKTOPTagline2-1200x150-3.png" />
          <ProductTab productTab={productTab} />
          {/* <ListProduct products={products} isSlide={false} category="" /> */}
        </div>
      </div>
    </>
  );
};
export default Pin;

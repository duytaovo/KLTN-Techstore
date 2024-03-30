import DealMain from "src/components/DealMain/DealMain";
import ListProduct from "src/components/ListProduct/ListProduct";
import ProductTab from "src/components/ProductTab/ProductTab";
import { useState, useEffect } from "react";
import axios from "axios";

const productTab: string[] = [
  "Nổi bật",
  "Cáp Lightning",
  "Adapter sạc Type-C",
  "Adapter sạc USB",
  "Cáp Type-C",
];

const Cable = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("https://json.msang.repl.co/products?category=phukien&nameType=cap")
      .then((response) => response.data)
      .then((data) => setProducts(data));
  }, []);
  return (
    <>
      <div id="cable" className="blocklist">
        <div className="listcontent">
          <DealMain linkImg="https://cdn.tgdd.vn/2022/03/banner/DESKTOPTagline3-1200x150.png" />
          <ProductTab productTab={productTab} />
          {/* <ListProduct products={products} isSlide={false} category="" /> */}
        </div>
      </div>
    </>
  );
};
export default Cable;

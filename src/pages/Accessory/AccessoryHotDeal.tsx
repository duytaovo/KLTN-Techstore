import ListProduct from "src/components/ListProduct/ListProduct";
import DealMain from "src/components/DealMain/DealMain";
import { useState, useEffect } from "react";
import axios from "axios";

const AccessoryHotDeal = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("https://json.msang.repl.co/products")
      .then((response) => response.data)
      .then((data) => setProducts(data));
  }, []);
  return (
    <>
      <div id="dealsoc" className="blocklist">
        <div
          className="listcontent block__gaming  rounded-md "
          // style={{ backgroundColor: "#a10026" }}
        >
          <DealMain
            linkImg="https://cdn.tgdd.vn/2022/04/banner/DESKTOPTagline11-1200x100-6.png"
            discount="50%"
          />
          <ListProduct products={products} isSlide={true} category="" />
        </div>
      </div>
    </>
  );
};
export default AccessoryHotDeal;

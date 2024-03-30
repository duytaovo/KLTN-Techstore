import { useEffect, useState } from "react";
import "./ListProductPc.scss";
import ListProduct from "src/components/ListProduct/ListProduct";
import axios from "axios";
function ListProductPc({}) {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("https://json.msang.repl.co/products?category=dienthoai")
      .then((res) => res.data)
      .then((datas) => {
        setData(datas);
      });
  }, []);

  return (
    <div className="pc__content">
      <div className="listcontent">
        {/* <ListProduct products={data} isSlide={false}></ListProduct> */}
      </div>
    </div>
  );
}

export default ListProductPc;

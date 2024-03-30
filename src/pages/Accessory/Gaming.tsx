import DealMain from "src/components/DealMain/DealMain";
import ListProduct from "src/components/ListProduct/ListProduct";
import ProductTab from "src/components/ProductTab/ProductTab";

import { useAppSelector } from "src/hooks/useRedux";

const productTab = ["Nổi bật", "Chuột", "Bàn phím", "Tai nghe", "Webcam"];
const Gaming = () => {
  const { data } = useAppSelector((state) => state.products.allProducts);

  return (
    <>
      <div
        id="gaming"
        className="blocklist"
        // style={{ backgroundColor: "#f1f1f1" }}
      >
        <div className="listcontent ">
          <DealMain linkImg="https://cdn.tgdd.vn/2022/03/banner/DESKTOPTagline7-1200x138.png"></DealMain>
          <ProductTab productTab={productTab}></ProductTab>
          {/* <ListProduct
            products={data}
            isSlide={false}
            category=""
          ></ListProduct> */}
        </div>
      </div>
    </>
  );
};
export default Gaming;

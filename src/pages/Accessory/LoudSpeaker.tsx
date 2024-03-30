import DealMain from "src/components/DealMain/DealMain";
import ListProduct from "src/components/ListProduct/ListProduct";
import ProductTab from "src/components/ProductTab/ProductTab";
import { useAppSelector } from "src/hooks/useRedux";

const productTab = ["Nổi bật", "Loa Bluetooth", "JBL", "Harman Kardon", "Sony"];

const LoudSpeaker = () => {
  const { data } = useAppSelector((state) => state.products.allProducts);

  return (
    <>
      <div id="loudspeaker" className="blocklist">
        <div className="listcontent ">
          <DealMain linkImg="https://cdn.tgdd.vn/2022/03/banner/DESKTOPTagline5-1200x147-1.png" />
          <ProductTab productTab={productTab} />
          {/* <ListProduct products={data} isSlide={false} category="" /> */}
        </div>
      </div>
    </>
  );
};
export default LoudSpeaker;

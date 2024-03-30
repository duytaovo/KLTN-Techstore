import ProductCard from "../ProductCard";
import Slider from "react-slick";
import "./slideproduct.scss";
import NextArrow from "../Slick/NextArrow";
import PrevArrow from "../Slick/PrevArrow";

interface Props {
  products: any;
}
const SlideProduct = (props: Props) => {
  const products = props.products;
  return (
    <div className="slidebar">
      <div className="w-full">
        <Slider
          slidesToShow={5}
          slidesToScroll={5}
          nextArrow={<NextArrow />}
          prevArrow={<PrevArrow />}
        >
          {products?.data?.data?.map((product: any) => (
            <div className="w-full" key={product.title}>
              <div className="mx-4">
                <ProductCard
                  category={product[0]?.slug}
                  key={product?.title}
                  product={product}
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
export default SlideProduct;

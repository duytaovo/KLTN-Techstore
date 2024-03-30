import { useState, useEffect, useRef } from "react";
import { X } from "react-bootstrap-icons";
import Section from "../Section";
import ProductCard from "../ProductCard";
import NextArrow from "../Slick/NextArrow";
import PrevArrow from "../Slick/PrevArrow";
import Slider from "react-slick";
import { productHistory } from "src/helpers/localStorage";

function ProductHistory({ styleTitle }: { styleTitle: string }) {
  const section: any = useRef<HTMLDivElement>();
  const [products, setProducts] = useState([]);
  const handleClick = () => {
    section.current.remove();
    productHistory.clearProductHistory();
  };

  useEffect(() => {}, []);
  return (
    <Section
      title="Sản phẩm bạn đã xem"
      styleTitle={styleTitle}
      styles=""
      rightOption={
        <span onClick={handleClick} className="cursor-pointer">
          <span>{styleTitle ? "XÓA LỊCH SỬ" : "Xóa lịch sử"}</span>
          <i>
            <X />
          </i>
        </span>
      }
      ref={section}
    >
      <div className="w-full text-black/80">
        <Slider
          slidesToShow={5}
          slidesToScroll={5}
          nextArrow={<NextArrow />}
          prevArrow={<PrevArrow />}
        >
          {products.map((product: any) => (
            <div className="w-full" key={product.title}>
              <div className="mx-4">
                <ProductCard key={product.title} {...product} />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </Section>
  );
}

export default ProductHistory;

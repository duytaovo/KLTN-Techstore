import { useState, useEffect } from "react";

import Section from "src/components/Section/Section";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import { Pagination } from "antd";
import Slider from "react-slick";
import NextArrow from "src/components/Slick/NextArrow";
import PrevArrow from "src/components/Slick/PrevArrow";
import ProductCard from "src/components/ProductCard/ProductCard";

const PromoFirst = () => {
  const { banner } = useAppSelector((state) => state.banner.promo.firstpromo);
  const dispatch = useAppDispatch();

  const { products } = useAppSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
  const pageSize = 10; // Số phần tử trên mỗi trang

  useEffect(() => {
    // dispatch(getSmartPhones({ pageNumber: currentPage }));
  }, [currentPage]);
  const handlePageChange = (page: number) => {
    setCurrentPage(page - 1);
  };
  return (
    <Section styles={`rounded-xl overflow-hidden `}>
      <>
        <div>{/* <img src={banner} className="w-full object-cover" /> */}</div>
        <div className="w-full mt-16 ">
          {/* <ListProduct
            products={smartPhone?.data}
            isSlide={false}
            category={"smartphone"}
          /> */}
          <Slider
            slidesToShow={5}
            slidesToScroll={1}
            nextArrow={<NextArrow />}
            prevArrow={<PrevArrow />}
          >
            {products &&
              products?.data?.data?.map((product: any) => (
                <div className="w-full" key={""}>
                  <div className="mx-4">
                    <ProductCard
                      docquyen
                      key={product.id}
                      category="smartphone"
                      product={product}
                    />
                  </div>
                </div>
              ))}
          </Slider>
        </div>
      </>
    </Section>
  );
};

export default PromoFirst;

import { useState, useEffect } from "react";
import Section from "src/components/Section/Section";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import Skeleton from "src/components/Skeleton";
import { getProducts } from "src/store/product/productsSlice";
import ListProduct from "src/components/ListProduct";

const PromoFirst = () => {
  const loading = useAppSelector((state) => state.loading.loading);

  const dispatch = useAppDispatch();

  const { products } = useAppSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
  useEffect(() => {
    const body = {
      slug: "",
      brandId: null,
      characteristicId: null,
      priceFrom: null,
      specialFeatures: [],
      name: null,
    };
    dispatch(
      getProducts({
        body: body,
        params: { pageNumber: currentPage, pageSize: 10 },
      }),
    );
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Section styles={`rounded-xl overflow-hidden `}>
      <>
        {/* <div>
          <Image
            id={data[1]?.name}
            className="w-full object-cover"
            src={data[1]?.value.substring(1, data[1]?.value.length - 1)}
            alt="banner-home"
            classNameContainer="w-fit"
          />
        </div> */}
        <div className="w-full mt-16 ">
          {loading > 0 ? (
            <div style={{ display: "flex", gap: 20, paddingTop: 2 }}>
              <Skeleton
                styles={{ height: "35vh" }}
                children={undefined}
                className={undefined}
              />
              <Skeleton
                styles={{ height: "35vh" }}
                children={undefined}
                className={undefined}
              />
              <Skeleton
                styles={{ height: "35vh" }}
                children={undefined}
                className={undefined}
              />
              <Skeleton
                styles={{ height: "35vh" }}
                children={undefined}
                className={undefined}
              />
              <Skeleton
                styles={{ height: "35vh" }}
                children={undefined}
                className={undefined}
              />
            </div>
          ) : (
            <ListProduct
              products={products?.data}
              isSlide={false}
              category={""}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          )}
        </div>
      </>
    </Section>
  );
};

export default PromoFirst;


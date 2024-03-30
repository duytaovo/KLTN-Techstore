import { Pagination } from "antd";
import "./search.scss";
import { useState } from "react";
import ListProduct from "src/components/ListProduct";
import ProductCard from "src/components/ProductCard";
import { useAppSelector } from "src/hooks/useRedux";
const Search = () => {
  const optionsFillter = [
    {
      id: 1,
      name: "Nổi bật",
    },
    {
      id: 2,
      name: "% giảm nhiều",
    },
    {
      id: 3,
      name: "Giá thấp đến cao",
    },
  ];
  const [fillterLocation, setFillterLocation] = useState(false);
  const [checked, setChecked] = useState(1);
  let resultSearch = useAppSelector((state) => state.search.search.data);
  //   let products = useSelector((state) => state.products.location.data);
  let product;
  //   if (fillterLocation) {
  //     product = resultSearch.filter((item1) =>
  //       products.find((item2) => item1.location === item2.location)
  //     );
  //   } else {
  //     product = [...resultSearch];
  //   }
  const handleClickFillter = (e: any) => {
    // var value = e.options[e.selectedIndex].value;
    // setChecked(value);
    let idSelect = e.target.options[e.target.options.selectedIndex].value;
    setChecked(parseInt(idSelect));
  };
  const handlelocation = () => {
    setFillterLocation(!fillterLocation);
  };
  // if (checked === 1) {
  //   product = resultSearch?.sort(
  //     (a: any, b: any) => -parseInt(a.star) + parseInt(b.star),
  //   );
  // }
  // if (checked === 2) {
  //   product = resultSearch?.sort(
  //     (a: any, b: any) =>
  //       -a?.lstProductTypeAndPrice[0]?.salePrice +
  //       b?.lstProductTypeAndPrice[0]?.salePrice,
  //   );
  // }
  // if (checked === 3) {
  //   product = resultSearch?.sort(
  //     (a: any, b: any) =>
  //       a?.lstProductTypeAndPrice[0]?.price -
  //       b?.lstProductTypeAndPrice[0]?.price,
  //   );
  // }

  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
  const pageSize = 10; // Số phần tử trên mỗi trang
  const handlePageChange = (page: number) => {
    setCurrentPage(page - 1);
  };

  return (
    <div>
      <h2 className="phone__content font-semibold text-blue-400 py-4">
        Tất cả kết quả tìm kiếm
      </h2>
      <div className="phone__content">
        <div className="flex flex-col items-center px-5 mb-6 pr-[17px]"></div>
        <div className="listcontent">
          {resultSearch?.length > 0 ? (
            <div className="">
              {/* <select
                className="inline-block mb-4 text-black"
                onChange={(e) => handleClickFillter(e)}
              >
                {optionsFillter.map((item) => (
                  <option value={item.id}>{item.name} </option>
                ))}
              </select> */}

              <div className="mt-6 grid grid-cols-5 gap-7 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {resultSearch?.map((product: any, index: number) => (
                  <div className="col-span-1" key={product.id}>
                    <ProductCard
                      product={product}
                      category={product?.slug}
                      docquyen
                    />
                  </div>
                ))}
              </div>
              <div className="my-8  m-auto bg-white/40 w-fit text-white flex justify-center">
                <Pagination
                  current={currentPage + 1}
                  pageSize={pageSize}
                  // total={products?.totalElements}
                  onChange={handlePageChange}
                />
              </div>
            </div>
          ) : (
            <h2>Không có sản phẩm này tại hệ thống chúng tôi</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;


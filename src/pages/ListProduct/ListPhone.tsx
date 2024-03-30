import "./phone.scss";
import { useState } from "react";
import BoxSort from "src/components/BoxSort/BoxSort";
import ListProduct from "src/components/ListProduct/ListProduct";
import { useAppSelector } from "src/hooks/useRedux";

export interface DataListPhone {
  id: number;
  title: string;
  link: string;
  type?: string;
}
const dataFake: DataListPhone[] = [
  {
    id: 2,
    title: "Giảm giá",
    link: "",
    type: "% Giảm",
  },

  {
    id: 3,
    title: "Mới",
    link: "",
    type: "Mới nhất",
  },
];
const dataSelected: { id: number; type: string }[] = [
  { id: 1, type: "Giá cao đến thấp" },
  { id: 2, type: "Giá thấp đến cao" },
  {
    id: 3,
    type: "Mới nhất",
  },
  {
    id: 4,
    type: "Bán chạy",
  },
  {
    id: 5,
    type: "% Giảm",
  },
];

interface Props {
  choose?: ConcatArray<never> | string | any;
  isOpen: boolean;
  handlePageChange: any;
  currentPage: number;
  chooseBox?: any;
  setChooseBox?: any;
  handleSetChooseBox: any;
  category: string;
  idCategory: number | string;
}

const ListPhone = ({
  choose,
  isOpen,
  handlePageChange,
  currentPage,
  handleSetChooseBox,
  category,
  idCategory,
}: Props) => {
  const [selected, setSelected] = useState<boolean>(false);
  const [chooseBoxSort, setChooseBoxSort] = useState<number>(0);
  const [checked, setChecked] = useState<any[]>([]);
  const { products, filter } = useAppSelector<any>((state) => state.products);
  let dataAfter = products?.data;
  // if (filter?.data?.length !== 0) {
  //   dataAfter = handleData(smartPhone, filter?.data);
  // }

  const handleClick = (index: number) => {
    setChooseBoxSort(index);
    handleSetChooseBox(index);
  };

  return (
    <>
      <BoxSort
        chooseBoxSort={chooseBoxSort}
        data={dataFake}
        onclick={handleClick}
        dataSelected={dataSelected}
        selected={selected}
        setSelected={setSelected}
        choose={choose}
        checked={checked}
        setChecked={setChecked}
        category={category}
        countProduct={products?.data?.totalElements}
      />
      <div className="phone__content">
        <div className="">
          {isOpen === false ? (
            <ListProduct
              products={products?.data}
              isSlide={false}
              category={category}
              handlePageChange={handlePageChange}
              currentPage={currentPage}
            />
          ) : (
            <ListProduct
              products={dataAfter}
              category={category}
              isSlide={false}
              handlePageChange={handlePageChange}
              currentPage={currentPage}
            />
          )}
        </div>
      </div>
    </>
  );
};
export default ListPhone;


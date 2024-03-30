import { useEffect } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import { getCategory } from "src/store/category/categorysSlice";
import path from "src/constants/path";
const AccesContent = () => {
  const dispatch = useAppDispatch();

  const { category } = useAppSelector<any>((state) => state.category);
  useEffect(() => {
    dispatch(getCategory({ categorySlug: "smartphone" }));
  }, []);
  return (
    <div className="grid grid-cols-4 text-gray-800">
      {category?.data?.map((item: any, index: number) => {
        if (
          item?.name === "Smartphone" ||
          item?.name === "Laptop" ||
          item?.name === "Computer" ||
          item?.name === "Tablet" ||
          item?.name === "Thiết bị mạng"
        ) {
          return null;
        }
        return (
          <ul
            key={index}
            className={clsx(
              index === 0 && "row-start-1 row-end-4",
              "mx-4 my-2",
            )}
          >
            <li className="font-bold text-2xl border-b py-2 uppercase">
              {item.name}
            </li>
            {item?.childCategories?.map((content: any, index: number) => {
              return (
                <li className="py-2 hover:text-blue-600" key={index}>
                  <Link to={`${content?.slug}`}>
                    {content.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        );
      })}
    </div>
  );
};

export default AccesContent;


import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./productcategory.module.scss";
import Section from "src/components/Section/Section";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";

const ProductCategory = () => {
  const [categories, setCategories] = useState([]);
  const dispatch = useAppDispatch();

  // const { smartPhone } = useAppSelector((state) => state.);
  // useEffect(() => {
  //   dispatch(getSmartPhones(queryConfig));
  // }, []);
  useEffect(() => {
    axios
      .get("https://json.msang.repl.co/categories")
      .then((response) => response.data)
      .then((data) => setCategories(data));
  }, []);
  return (
    <Section title="DANH MỤC NỔI BẬT" styles="bg-white">
      <div className="flex ">
        {categories.map((item: any) => (
          <Link to={"/"} key={item.title}>
            <div className={styles.cateIcon}>
              <img src={item.img} alt="" className={styles.image} />
              <p className={styles.title}>{item.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
};

export default ProductCategory;


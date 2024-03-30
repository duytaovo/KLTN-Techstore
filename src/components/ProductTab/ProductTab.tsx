import clsx from "clsx";
import styles from "./producttab.module.scss";
import { useState } from "react";
const ProductTab = (props: any) => {
  const [checked, setChecked] = useState(0);
  const productTab = props.productTab;
  return (
    <ul className={styles.productTab}>
      {productTab.map((item: any, index: number) => (
        <li
          className={clsx(styles.item, checked === index ? styles.active : "")}
          onClick={() => setChecked(index)}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};
export default ProductTab;

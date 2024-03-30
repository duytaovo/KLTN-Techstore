import styles from "./boxsort.module.scss";
import { clsx } from "clsx";
import { Link } from "react-router-dom";
import { DataListPhone } from "src/pages/ListProduct/ListPhone";

type Props = {
  data: any;
  onclick: (value: number) => void;
  dataSelected: { type: string }[];
  selected: boolean;
  setSelected: (value: boolean) => void;
  choose: any;
  countProduct?: number;
  checked: any;
  setChecked: any;
  category: string;
  chooseBoxSort: number;
};

const BoxSort = ({
  category,
  checked,
  choose,
  countProduct,
  data,
  dataSelected,
  onclick,
  selected,
  setChecked,
  setSelected,
  chooseBoxSort,
}: Props) => {
  const handleChecked = (id: any) => {
    setChecked((prev: any) => {
      const isCheck = checked.includes(id);
      if (isCheck) {
        return checked.filter((item: any) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };
  return (
    <div className={styles.boxsort}>
      <div className={styles.boxsort__body}>
        <p className={styles.boxsort__total}>
          <b>{countProduct}</b>
          <> </>
          <strong className="text-white/90 uppercase">{category}</strong>
          <> </>
          <b className="text-white/90">{choose?.type?.toUpperCase()}</b>
        </p>
        {/* <div className={styles.checkbox}>
          {data.map((item: DataListPhone, index: number) => (
            <div
              className={styles.checkboxItem}
              key={index}
              onClick={() => handleChecked(item.id)}
            >
              <span
                className={clsx(
                  styles.tickCheckbox,
                  checked.includes(item.id) && styles.active,
                )}
              ></span>

              <span className={styles.itemTitle}>{item.title}</span>
            </div>
          ))}
        </div> */}
      </div>
      <p className={styles.click} onClick={() => setSelected(!selected)}>
        <span>Xếp theo: {dataSelected[chooseBoxSort - 1]?.type}</span>
        {selected && (
          <div className={styles.select}>
            {dataSelected.map((item: any, index: number) => (
              <p>
                <Link
                  to={""}
                  className={`${chooseBoxSort - 1 === index && styles.check}`}
                  onClick={() => {
                    onclick(item.id);
                  }}
                >
                  <i className="text-black text-xl">{item.type}</i>
                </Link>
              </p>
            ))}
            {/* <SelectCustom
              // className={`${choose === index && styles.check}`}
              id="boxPhone"
              placeholder="Vui lòng chọn"
              defaultValue={""}
              options={["Điện thoại", "Laptop", "Tablet", "Phụ kiện"]}
              // onChange={handleOnChangeCarBrand}
            ></SelectCustom> */}
          </div>
        )}
      </p>
    </div>
  );
};
export default BoxSort;


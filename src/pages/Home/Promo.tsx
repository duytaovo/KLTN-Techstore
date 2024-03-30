import { Text } from "src/components/Edition/Text";
import styles from "./promo.module.scss";
import { useAppSelector } from "src/hooks/useRedux";

const Promo = () => {
  const data: any = useAppSelector((state) => state.data.data);
  return (
    <div className={styles.promo}>
      <div className={styles.tag}>
        <i>
          <img src="/images/frame.png" />
        </i>
        <Text
          id={data[4]?.name}
          tag="span"
          content={data[4]?.value.substring(1, data[4]?.value.length - 1)}
        />
        {/* <span>Chỉ giảm online</span> */}
      </div>

      <div className={styles.tag}>
        <i>
          <img src="/images/frame.png" />
        </i>
        <Text
          id={data[5]?.name}
          tag="span"
          content={data[5]?.value.substring(1, data[5]?.value.length - 1)}
        />
        {/* <span>Đồng giá từ 99k</span> */}
      </div>

      <div className={styles.tag}>
        <i>
          <img src="/images/frame.png" />
        </i>
        <Text
          id={data[6]?.name}
          tag="span"
          content={data[6]?.value.substring(1, data[6]?.value.length - 1)}
        />
        {/* <span>Xả hàng giảm sốc</span> */}
      </div>

      <div className={styles.tag}>
        <i>
          <img src="/images/frame.png" />
        </i>
        <Text
          id={data[7]?.name}
          tag="span"
          content={data[7]?.value.substring(1, data[7]?.value.length - 1)}
        />
        {/* <span>Điện thoại độc quyền</span> */}
      </div>
    </div>
  );
};

export default Promo;


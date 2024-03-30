import Section from "src/components/Section/Section";
import css from "./home.module.scss";
const images: string[] = [
  "https://cdn.tgdd.vn/2022/06/banner/khaitruong-new-760-400-760x400.png",
  "https://cdn.tgdd.vn/2022/07/banner/Kids-380x2002x-(1)-(1)-(1)-(1)-760x400-1.jpg",
  "https://cdn.tgdd.vn/2022/07/banner/Sport-380x2002x-760x400-2.jpg",
];
const ProductDeal = () => {
  return (
    <Section title="CHUỖI MỚI DEAL KHỦNG" styleTitle="text-textWhiteMain">
      <>
        {images.map((src: string, index: number) => {
          return (
            <div className={css.cover} key={index}>
              <img src={src} />
            </div>
          );
        })}
      </>
    </Section>
  );
};

export default ProductDeal;

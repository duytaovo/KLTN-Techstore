import Section from "src/components/Section/Section";
import { Link } from "react-router-dom";
interface Image {
  thumbnail: string;
  link: string;
}
const images: Image[] = [
  {
    thumbnail: "https://cdn.tgdd.vn/2022/05/banner/samsung-390-210-390x210.png",
    link: "/samsung",
  },
  {
    thumbnail:
      "https://cdn.tgdd.vn/2022/07/banner/6BD1D926-AFFA-45E4-A5C6-DE9386EED1CB-390x210.png",
    link: "/apple",
  },
  {
    thumbnail: "https://cdn.tgdd.vn/2022/06/banner/lenovoLaptop-390x210-1.png",
    link: "/lenovo",
  },
];
function ProductBrand() {
  return (
    <Section title="CHUỖI MỚI DEAL KHỦNG" styles="text-textWhiteMain">
      <>
        {images.map((item: Image, index: number) => {
          return (
            <Link key={index} to={item.link} className="w-30">
              <div className="w-full h-full">
                <img
                  src={item.thumbnail}
                  className="w-full object-cover rounded-2xl"
                />
              </div>
            </Link>
          );
        })}
      </>
    </Section>
  );
}

export default ProductBrand;

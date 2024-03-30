import { Link } from "react-router-dom";
import Section from "src/components/Section/Section";
interface Product {
  name: string;
  content: string;
  image: string;
}
const products: Product[] = [
  {
    name: "Điện thoại",
    content: "Galaxy M Series",
    image: "https://cdn.tgdd.vn/2022/04/banner/dongho-280x235-1.png",
  },
  {
    name: "Laptop Acer Gaming",
    content: "Giảm đến 30%",
    image: "https://cdn.tgdd.vn/2022/04/banner/phukien-280x235.png",
  },
  {
    name: "Tai nghe không dây",
    content: "Giảm đến 50%",
    image:
      "https://cdn.tgdd.vn/2022/07/banner/xu-huong-acer-gaming-desk-280x235.png",
  },
  {
    name: "Smartwatch",
    content: "Giảm đến 50%++",
    image: "https://cdn.tgdd.vn/2022/06/banner/Deskx1-280x235.png",
  },
];
const ProductTrend = () => {
  return (
    <Section title="XU HƯỚNG MUA SẮM" styles="bg-red-300">
      <>
        {products.map((product, index) => {
          return (
            <Link to="/" className="relative" key={index}>
              <img src={product.image} />
              <p className="absolute bottom-20 left-4">{product.name}</p>
              <p className="absolute bottom-8 left-4 text-blue-600">
                {product.content}
              </p>
            </Link>
          );
        })}
      </>
    </Section>
  );
};

export default ProductTrend;


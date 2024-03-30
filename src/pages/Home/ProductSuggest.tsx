import { useState } from "react";
import ProductCard from "src/components/ProductCard/ProductCard";
import Section from "src/components/Section/Section";

const ProductSuggest = () => {
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState<number>(10);

  const number = 25;
  const handleClick = () => {
    setLimit(number);
  };

  return (
    <Section title="GỢI Ý HÔM NAY" styles="bg-white">
      <>
        <div className="flex flex-wrap gap-8 w-full">
          {products?.slice(0, limit).map((product: any) => {
            return <ProductCard key={product.title} {...product} />;
          })}
          <div className="w-full">
            {limit !== number && (
              <button
                className="m-auto block bg-white/40 text-black rounded-lg px-56 py-4 border outline-none"
                onClick={handleClick}
              >
                {"Xem thêm"}
              </button>
            )}
          </div>
        </div>
      </>
    </Section>
  );
};

export default ProductSuggest;

import Slider from "react-slick";
import Section from "src/components/Section/Section";
import NextArrow from "src/components/Slick/NextArrow";
import PrevArrow from "src/components/Slick/PrevArrow";

const images: string[] = [
  "https://cdn.tgdd.vn/2022/05/banner/380x200-380x200-3.jpg",
  "https://cdn.tgdd.vn/2022/06/banner/VNPay-Toan-bo-san-pham-380x200.png",
  "https://cdn.tgdd.vn/2022/04/banner/VNPaySamsungGarmin-380x200.png",
  "https://cdn.tgdd.vn/2022/04/banner/VNPayAppleWatch-380x200.png",
  "https://cdn.tgdd.vn/2022/06/banner/EXB-500k-380x200.png",
  "https://cdn.tgdd.vn/2022/04/banner/VnPaylaptop-380x200.png",
  "https://cdn.tgdd.vn/2022/04/banner/VnPaylaptop-380x200.png",
  "https://cdn.tgdd.vn/2022/04/banner/TPBank-380x200.png",
];
function DiscountOnline() {
  return (
    <Section title="GIẢM THÊM KHI THANH TOÁN ONLINE" styles="bg-white">
      <>
        <div className="w-full">
          <Slider
            slidesToShow={3}
            autoplay={true}
            autoplaySpeed={2000}
            slidesToScroll={3}
            nextArrow={<NextArrow />}
            prevArrow={<PrevArrow />}
          >
            {images.map((src: string, index: number) => (
              <div className="w-full" key={index}>
                <div className="mx-4">
                  <a href="#">
                    <img src={src} key={src} />
                  </a>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </>
    </Section>
  );
}

export default DiscountOnline;

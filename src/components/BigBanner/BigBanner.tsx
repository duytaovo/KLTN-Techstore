import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import NextArrow from "../Slick/NextArrow";
import PrevArrow from "../Slick/PrevArrow";
import { useAppSelector } from "src/hooks/useRedux";
import { Image } from "../Edition/Image";
import { useEffect, useState } from "react";

const BigBanner = () => {
  const data: any = useAppSelector((state) => state.data.data);
  const [urlArray, setUrlArray] = useState<string[]>([]);
  const loading = useAppSelector((state) => state.loading.loading);

  useEffect(() => {
    // Tách chuỗi thành mảng bằng dấu phẩy
    const splittedUrls = data[8]?.value?.split(",");

    setUrlArray(splittedUrls);
  }, [data]);
  return (
    <div className="w-full flex justify-center ">
      <div className="flex max-w-[1200px] h-auto w-full ">
        <div className="w-[800px]">
          <Slider
            dots={true}
            slidesToShow={1}
            slidesToScroll={1}
            autoplay={true}
            autoplaySpeed={2000}
            nextArrow={<NextArrow />}
            prevArrow={<PrevArrow />}
          >
            {urlArray?.map((src: string, index: number) => (
              <div key={index} className="owl-item" style={{ width: 800 }}>
                <div className="item">
                  <Image
                    id={data[8]?.name}
                    src={data[8]?.value.substring(1, data[8]?.value.length - 1)}
                    alt="slider-home"
                    classNameContainer="w-fit"
                  />
                  {/* <img src={src} alt="" /> */}
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="pl-[10px] flex flex-col">
          <div className="">
            <Image
              id={data[9]?.name}
              src={data[9]?.value.substring(1, data[9]?.value.length - 1)}
              alt="slider-home"
            />
            {/* <img src="" alt="" /> */}
          </div>
          <div>
            <Image
              id={data[10]?.name}
              src={data[10]?.value.substring(1, data[10]?.value.length - 1)}
              alt="slider-home"
            />
            {/* <img src="" alt="" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BigBanner;


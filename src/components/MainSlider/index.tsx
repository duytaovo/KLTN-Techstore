import PortfolioIndustry from "src/components/PortfolioIndustry";
import Container from "src/layouts/container";
import { useEffect, useRef, useState } from "react";
import { bannerBottomAdvertise, mainSliderImgs } from "src/dummydata";
import { Image } from "../Edition/Image";
import { useAppSelector } from "src/hooks/useRedux";
import useSettings from "src/hooks/useSettings";
import PrevBtn from "../Elements/PrevBtn";
import NextBtn from "../Elements/NextBtn";

const imageCollection = mainSliderImgs;

const MainSlider = () => {
  const data: any = useAppSelector((state) => state.data.data);
  const { themeHeader } = useSettings();
  const [sliderIndex, setSliderIndex] = useState<number>(1);
  const bannerTimeout = useRef<ReturnType<typeof setInterval> | null>(null);
  const prevClickHandler = () => {
    if (sliderIndex === 0) {
      setSliderIndex(imageCollection.length - 1);
    } else {
      setSliderIndex(sliderIndex - 1);
    }
  };

  const nextClickHandler = () => {
    if (sliderIndex === imageCollection.length - 1) {
      setSliderIndex(0);
    } else {
      setSliderIndex(sliderIndex + 1);
    }
  };

  const handleClickDotSlider = (index: number) => {
    setSliderIndex(index);
  };

  useEffect(() => {
    bannerTimeout.current = setInterval(() => {
      if (sliderIndex === imageCollection.length - 1) {
        setSliderIndex(0);
      } else {
        setSliderIndex(sliderIndex + 1);
      }
    }, 50000);

    return () => {
      if (bannerTimeout.current) {
        clearInterval(bannerTimeout.current);
      }
    };
  }, [sliderIndex]);
  return (
    <Container>
      <div className="top">
        {themeHeader === "old" ? <div /> : <PortfolioIndustry />}
        {/* <PortfolioIndustry /> */}
        <div className="banner relative">
          <div
            className="banner__btn-prev absolute top-[250px]"
            onClick={prevClickHandler}
          >
            <PrevBtn />
          </div>
          <div
            className="banner__btn-next absolute top-[250px] right-0"
            onClick={nextClickHandler}
          >
            <NextBtn />
          </div>
          {/* <ul className="banner__dot">
              {imageCollection.map((img, index) => (
                <li
                  onClick={() => handleClickDotSlider(index)}
                  key={index}
                  className={
                    index === sliderIndex
                      ? "banner__dot-item banner__dot-item--active"
                      : "banner__dot-item"
                  }
                ></li>
              ))}
            </ul> */}
        </div>

        {sliderIndex === 1 ? (
          <Image
            id={data[13]?.name}
            className=""
            src={data[13]?.value.substring(1, data[13]?.value.length - 1)}
            alt="banner-home"
          />
        ) : sliderIndex === 2 ? (
          <Image
            id={data[14]?.name}
            className=""
            src={data[14]?.value.substring(1, data[14]?.value.length - 1)}
            alt="banner-home"
          />
        ) : (
          <Image
            id={data[15]?.name}
            className=""
            src={data[15]?.value.substring(1, data[15]?.value.length - 1)}
            alt="banner-home"
          />
        )}

        {/* <Link to="#ad1"> */}
        {/* <div className="ad-img-wrap">
          <Image
            id={data[11]?.name}
            className="ad-img"
            src={data[11]?.value.substring(1, data[11]?.value.length - 1)}
            alt="banner-home"
          />
        </div>

        <div className="ad-img-wrap">
          <Image
            id={data[12]?.name}
            className="ad-img"
            src={data[12]?.value.substring(1, data[12]?.value.length - 1)}
            alt="banner-home"
          />
        </div> */}
      </div>
      {/* <ShortBanner images={bannerBottomAdvertise} numberItem={4} /> */}
    </Container>
  );
};
export default MainSlider;


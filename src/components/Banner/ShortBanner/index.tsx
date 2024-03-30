import NextArrow from "src/components/Slick/NextArrow";
import PrevArrow from "src/components/Slick/PrevArrow";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import Slider from "react-slick";
import { StyledBannerItem, StyledBannerWrap } from "./ShortBanner";
import { Image } from "src/components/Edition/Image";
import { useAppSelector } from "src/hooks/useRedux";

interface Image {
  imageUrl: string;
  link: string;
  name?: string;
}

interface Props {
  images: Image[];
  title?: string;
  numberItem: number;
}

const ShortBanner = (props: Props) => {
  const { title, images, numberItem } = props;
  const data: any = useAppSelector((state) => state.data.data);

  const settings = useMemo(() => {
    return {
      infinite: true,
      speed: 500,
      autoplay: false,
      slidesToShow: numberItem,
      slidesToScroll: numberItem,
      prevArrow: <PrevArrow />,
      nextArrow: <NextArrow />,
    };
  }, [numberItem]);

  return (
    // <StyledBannerWrapper title={title}>
    //   {title && <div className="banner-title">{title}</div>}
    //   {images.length > 4 && (
    //     <>
    //       <NextBtn />
    //       <PrevBtn />
    //     </>
    //   )}
    //   <StyledShortBanner>
    //     {images.slice(0, 4).map((image, index) => (
    //       <div key={index}>
    //         <Link href={`#${index}`}>
    //           <a className="banner-item">
    //             <div className="banner-item__img-wrap">
    //               <img
    //                 src={`/access/banner-ngan-4/${image.imageUrl}`}
    //                 alt=""
    //                 className="banner-item__img"
    //               />
    //             </div>
    //           </a>
    //         </Link>
    //         {image.name && <div className="banner-item__name">{image.name}</div>}
    //       </div>
    //     ))}
    //   </StyledShortBanner>
    // </StyledBannerWrapper>
    <StyledBannerWrap title={title}>
      {title && <div className="banner-title">{title}</div>}
      <Slider {...settings}>
        {images.map((image, index) => (
          <StyledBannerItem key={index}>
            {/* <Link to={`#${index}`}> */}
            <div className="banner-item">
              <div className="banner-item__img-wrap">
                <Image
                  id={data[index]?.name}
                  className="rounded-xl"
                  src={data[index]?.value.substring(1, data[index]?.value.length - 1)}
                  // src={`/images/banner-ngan-4/${image.imageUrl}`}
                  alt="banner-home"
                  classNameContainer="w-fit"
                />
                {/* <img
                    className="banner-img"
                    src={`/images/banner-ngan-4/${image.imageUrl}`}
                    alt=""
                  /> */}
              </div>
            </div>
            {/* </Link> */}
            {image.name && (
              <div className="banner-item__name">{image.name}</div>
            )}
          </StyledBannerItem>
        ))}
      </Slider>
    </StyledBannerWrap>
  );
};

export default ShortBanner;


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

import { useAppSelector } from "src/hooks/useRedux";
import { Image } from "src/components/Edition/Image";

interface Props {
  banner: {
    img: string;
  };
}
const BigBanner = ({ banner }: Props) => {
  // const { bigImage } = useAppSelector((state) => state.banner.promo.bigbanner);
  const data: any = useAppSelector((state) => state.data.data);

  return (
    <div className={"h-full object-cover bg-transparent  rounded-2xl mb-6"}>
      <Image
        id={data[0]?.name}
        className="rounded-xl"
        src={data[0]?.value.substring(1, data[0]?.value.length - 1)}
        alt="banner-home"
        classNameContainer="w-fit"
      />
    </div>
  );
};

export default BigBanner;


import "./quickFilterBtn.scss";
import { Link } from "react-router-dom";

interface Props {
  data: {
    link: string;
    img: string;
    id: string;
    text: string;
  };
  slug: {
    slug: string;
  };
}
function QuickFilterBtn({ data, slug }: Props) {
  return (
    <Link
      to={data?.link}
      className={`quickbtnPc ${
        slug?.slug == data?.id ? "activePc" : ""
      } mx-[1rem] mb-[0.6rem] w-[120px] cursor-pointer`}
      id={data?.id}
    >
      <img
        className="imgQuick items-center rounded-[50%] flex justify-center h-[60px] w-60px mx-auto"
        src={data?.img}
        alt="Máy in"
      />
      <span className="text text-[1.3rem] leading-[1.7rem] max-w-[96px] mx-auto mt-[0.5rem] text-center block">
        {data?.text}
      </span>
    </Link>
  );
}

export default QuickFilterBtn;

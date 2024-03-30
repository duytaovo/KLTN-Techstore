import css from "./home.module.scss";
import { ArrowUp } from "react-bootstrap-icons";
import { Image } from "src/components/Edition/Image";
import { useAppSelector } from "src/hooks/useRedux";

const Ticket = ({ show }: { show: boolean }) => {
  const data: any = useAppSelector((state) => state.data.data);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {show && (
        <>
          <Image
            id={data[16]?.name}
            className={` ${css.ticketLeft} fixed top-80 duration-500`}
            src={data[16]?.value.substring(1, data[16]?.value.length - 1)}
            alt="ticket-home"
            classNameContainer="w-fit"
          />
          {/* <img
            className={` ${css.ticketLeft} fixed top-80 duration-500`}
            src="https://cdn.tgdd.vn/2022/08/banner/Trai-79x271-2.png"
          /> */}
          <Image
            id={data[17]?.name}
            className={` ${css.ticketRight} fixed top-80 duration-500`}
            src={data[17]?.value.substring(1, data[17]?.value.length - 1)}
            alt="ticket-home"
            classNameContainer="w-fit"
          />

          {/* <img
            className={` ${css.ticketRight} fixed top-80 duration-500`}
            src="https://cdn.tgdd.vn/2022/08/banner/Phai-79x271-7.png"
          /> */}
          <button
            className="rounded-full fixed right-4 bottom-4 h-14 w-14"
            onClick={scrollToTop}
          >
            <ArrowUp />
          </button>
        </>
      )}
    </div>
  );
};

export default Ticket;


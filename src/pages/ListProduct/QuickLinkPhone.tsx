import QuickLink from "src/components/QuickLink/ButtonQuickLink";
import "./quicklinkphone-module.scss";
import { Link } from "react-router-dom";
import clsx from "clsx";

interface Props {
  handleSetChoose: (text: any) => void;
  handleSetChooseCharac: (text: any) => void;
  choose: any;
  chooseCharac: any;
  brand: any;
  characteristic: any;
}
const QuickLinkPhone = ({
  handleSetChooseCharac,
  handleSetChoose,
  chooseCharac,
  choose,
  brand,
  characteristic,
}: Props) => {
  return (
    <>
      <div className="container__phone space-y-4 mt-4">
        <div className="">
          <div className="flex justify-between flex-wrap gap-3">
            {brand?.data?.data?.map((item: any, index: number) => {
              const active = item?.id === choose?.id;

              return (
                <div key={index}>
                  <QuickLink
                    active={active}
                    type={item.name}
                    id={item.id}
                    link={item.imageUrl.substring("https:".length)}
                    handleSetChoose={handleSetChoose}
                    isImg={true}
                  />
                </div>
              );
            })}
          </div>
        </div>
        {/* <div className="container__quicklink-demand">
          <div className="">
            <div className=" space-y-4">
              <h4 className="text-[14px] ">Chọn điện thoại theo nhu cầu:</h4>
              <div className="flex justify-between items-center flex-wrap gap-3">
                {characteristic?.data?.map((item: any, index: number) => {
                  const active = item?.id === chooseCharac;
                  const className = clsx(
                    active && "border-[1px] rounded-xl border-blue-700  ",
                  );
                  return (
                    <div key={index}>
                      <Link
                        to={""}
                        onClick={() => handleSetChooseCharac(item.id)}
                        className={`rounded-xl border-solid border-[1px] m-[0px_8px_10px_0px] p-[6px_13px] ${className}`}
                      >
                        {item.name}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default QuickLinkPhone;


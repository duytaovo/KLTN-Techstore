import { Link } from "react-router-dom";
import "./buttonquicklink-module.scss";
import clsx from "clsx";
interface Props {
  handleSetChoose: (text: any) => void;
  type: string;
  id?: number;
  demand?: string;
  link?: string;
  isImg?: boolean;
  active?: boolean;
}
const QuickLink = ({
  handleSetChoose,
  type,
  demand,
  link,
  isImg,
  id,
  active,
}: Props) => {
  const className = clsx(
    active && "border-[2px] rounded-xl text-blue-400 border-blue-700  ",
  );
  return (
    <Link
      to={""}
      onClick={() =>
        handleSetChoose({
          id,
          type,
        })
      }
      className={` ml-4 `}
    >
      {demand}
      {isImg == true && (
        <div className={className}>
          <img
            className={`w-[90px] h-[25px] rounded-md  bg-white object-contain`}
            src={`https:` + link}
            alt={type}
          />
        </div>
      )}
    </Link>
  );
};
export default QuickLink;


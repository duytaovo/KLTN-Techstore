import { AngleRight } from "../Icons";
interface Props {
  className?: string;
  onClick?: () => void;
}
function NextArrow(props: Props) {
  const { className, onClick } = props;
  return (
    <button
      className={className}
      onClick={onClick}
      style={{
        fontSize: "40px",
        display: "block",
        zIndex: "2",
        right: 0,
        height: "40px",
        width: "40px",
        opacity: "0.8",
        color: "white",
      }}
    >
      <span className="shadow-md absolute flex items-center justify-center top-0 right-0 bg-white rounded-full  w-full h-full">
        <AngleRight className="text-blue-800" />
      </span>
    </button>
  );
}

export default NextArrow;

import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import mess from "src/assets/images/messenger (1).png";
import telephoneImage from "src/assets/images/telephone-call.png";
import { useNavigate } from "react-router-dom";
import "./styles.scss";
type Props = {
  styleClass: string;
  telephone?: boolean;
};
export const SwitchMode = ({ styleClass, telephone }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        window.location.href = "https://www.facebook.com/";
      }}
      className={`transition-all text-6xl shadow-lg text-mainL1 flex justify-center items-center  fixed bottom-10 right-5 z-[999999999999999] bg-white h-16 w-16 rounded-full cursor-pointer hover:scale-110 active:scale-100  ${styleClass}`}
    >
      {telephone ? (
        <i className="icon osc-rotation">
          <img src={telephoneImage} alt="" />
        </i>
      ) : (
        <img src={mess} alt="" />
      )}
    </div>
  );
};


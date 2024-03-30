import { AiOutlineEdit } from "react-icons/ai";
import { BsEyeglasses } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import { toggleActiveEdit } from "src/store/user/userSlice";

export const SwitchEdit: React.FC = () => {
  const dispatch = useAppDispatch();
  const { profile, isActiveEdit, userWithId } = useAppSelector(
    (state) => state?.user,
  );
  console.log(userWithId);
  return userWithId.level === 5 ? (
    <div
      onClick={() => dispatch(toggleActiveEdit())}
      className="transition-all text-2xl shadow-lg text-mainL1 flex justify-center items-center  fixed bottom-8 left-5 z-[999999999999999] bg-white h-16 w-16 rounded-full cursor-pointer hover:scale-110 active:scale-100"
    >
      {isActiveEdit ? <BsEyeglasses /> : <AiOutlineEdit />}
    </div>
  ) : null;
};


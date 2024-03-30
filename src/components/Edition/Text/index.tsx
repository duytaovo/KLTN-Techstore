import { unwrapResult } from "@reduxjs/toolkit";
import { FC, useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import TransitionsModalText from "../../Modal/ModalText";
import { OptionWrapper } from "../OptionWrapper";
import Button from "@mui/material/Button";
import { _getDataUser, updateData, updateText } from "src/store/dataSlice";

interface IBody {
  id: string;
  value: string;
  content: string;
  setEnable: React.Dispatch<React.SetStateAction<boolean>>;
  setVal: React.Dispatch<React.SetStateAction<string>>;
}
interface IiOffset {
  w: number;
  h: number;
}

interface Iprops {
  id: string;
  tag: keyof JSX.IntrinsicElements;
  className?: string;
  content: string;
  style?: React.CSSProperties;
}

export const Text: FC<Iprops> = ({ id, tag, className, content, ...props }) => {
  const [isLoading, setIsLoading] = useState(false);

  const editOptions = [
    {
      id: 3,
      title: "Huỷ",
      callback: ({ id, value, setEnable }: IBody) => {
        setEnable(false);
      },
      variant: "outlined",
    },

    {
      id: 1,
      title: "Đặt lại",
      callback: ({ setVal, content }: IBody) => {
        setVal(content);
      },
      variant: "contained",
    },

    {
      id: 0,
      title: isLoading === false ? "Lưu" : "Đang xử lý",
      callback: ({ id, value, setEnable }: IBody) => {
        _updateText(id, value);
      },
      variant: "contained",
    },
  ];
  const Wrapper = tag;

  const iRef = useRef<HTMLTextAreaElement>(null);
  const cRef = useRef<HTMLDivElement>(null);

  const { userWithId, isActiveEdit } = useAppSelector((state) => state?.user);

  const [iOffset, setIOffset] = useState<IiOffset>({
    w: 100,
    h: 100,
  });
  const [val, setVal] = useState<string>(content);
  const [enable, setEnable] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const show = () => {
    userWithId.level == 5 && isActiveEdit && setEnable(true);
  };
  const hidden = () => setEnable(false);

  const handleChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e?.target?.value;
    setVal(value);
  };

  useEffect(() => {
    enable &&
      (() => {
        iRef.current?.focus();
        setVal(content);
      })();
  }, [enable]);

  useEffect(() => {
    const w = cRef?.current?.offsetWidth || 100;
    const h = cRef?.current?.offsetHeight || 100;
    setIOffset({ w, h });
  }, []);

  var _updateText = async (id: string, value: string) => {
    setIsLoading(true);
    const body = {
      key: id,
      data: value,
    };
    try {
      await dispatch(updateText(body)).then(unwrapResult);
      await dispatch(_getDataUser(""));
      toast.success("Đã lưu thay đổi", {
        position: "top-right",
        autoClose: 4000,
      });
      hidden();
      return;
    } catch (error) {
      toast.error("Có lỗi" + "" + error, {
        position: "top-center",
        autoClose: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {userWithId.level == 5 && enable && isActiveEdit ? (
        <div>
          <div className="">
            <div ref={cRef} className="">
              <Wrapper
                onClick={show}
                className={`${className}  border border-transparent ${
                  userWithId.level == 5 && isActiveEdit
                    ? "border-dashed hover:border-slate-400"
                    : ""
                }`}
                {...props}
              >
                {content}
              </Wrapper>
            </div>
          </div>
          <TransitionsModalText
            setEnable={setEnable}
            title="Chỉnh sửa đoạn văn bản"
          >
            <div className="flex flex-col item-center relative">
              <div className="flex justify-between">
                <div className="flex items-center text-gray-500">
                  Tổng cộng {val?.length || "?"} kí tự
                </div>
                <OptionWrapper>
                  {editOptions.map((option, index) => {
                    const body: IBody = {
                      id: id,
                      value: val,
                      content,
                      setEnable,
                      setVal,
                    };

                    return (
                      <Button
                        disabled={isLoading}
                        sx={{ marginLeft: "4px", background: "inherit" }}
                        // variant={
                        //   option?.variant != "outlined" &&
                        //   option?.variant != "contained"
                        //     ? "outlined"
                        //     : option?.variant
                        // }
                        key={index}
                        onClick={() => option?.callback(body)}
                      >
                        {option?.title}
                      </Button>
                    );
                  })}
                </OptionWrapper>
              </div>

              <textarea
                style={{ width: "100%", color: "black" }}
                ref={iRef}
                value={val}
                onChange={handleChangeInput}
                rows={5}
                cols={20}
                className={`${
                  "className" || ""
                } rounded resize-y outline-none text-black bg-transparent border border-slate-400 px-4 py-4`}
              ></textarea>
            </div>
          </TransitionsModalText>
        </div>
      ) : (
        <div ref={cRef}>
          <Wrapper
            onClick={show}
            className={`${className} border border-transparent ${
              userWithId.level == 5 && isActiveEdit
                ? "border-dashed hover:border-slate-400"
                : ""
            }`}
            {...props}
          >
            {content}
          </Wrapper>
        </div>
      )}
    </div>
  );
};


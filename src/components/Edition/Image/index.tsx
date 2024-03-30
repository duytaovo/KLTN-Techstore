import { FC, useState, useEffect, useRef } from "react";
import TransitionsModalText from "src/components/Modal/ModalText";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import { toast } from "react-toastify";
import {
  _getDataUser,
  updateData,
  updateImage,
  updateText,
} from "src/store/dataSlice";

import config from "src/constants/configApi";
import { OptionWrapper } from "../OptionWrapper";
import Button from "@mui/material/Button";
import { unwrapResult } from "@reduxjs/toolkit";
import { uploadManyImages } from "src/store/comment/commentsSlice";

interface IBody {
  id: string;
  value: string;
  src: string;
  setEnable: React.Dispatch<React.SetStateAction<boolean>>;
  setVal: React.Dispatch<React.SetStateAction<string>>;
  iRef: HTMLInputElement | null;
  imgFile?: File;
}
interface IiOffset {
  w: number;
  h: number;
}

interface Iprops {
  id: string;
  className?: string;
  src: string;
  style?: React.CSSProperties;
  alt: string;
  classNameContainer?: string;
}

export const Image: FC<Iprops> = ({
  id,
  className,
  classNameContainer,
  src,
  alt,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const editOptions = [
    {
      id: 0,
      title: "Huỷ",
      callback: ({ id, value, setEnable, src, setVal }: IBody) => {
        setEnable(false);
        setVal(src);
      },
      variant: "outlined",
    },
    {
      id: 1,
      title: "Chọn ảnh",
      callback: ({ id, src, setEnable, iRef }: IBody) => {
        iRef && iRef?.click();
      },
      variant: "outlined",
    },
    {
      id: 2,
      title: "Đặt lại",
      callback: ({ setVal, src }: IBody) => {
        setVal(src);
      },
      variant: "outlined",
    },

    {
      id: 3,
      title: isLoading === false ? "Lưu" : "Đang xử lý",
      callback: async ({ id, value, setEnable, imgFile }: IBody) => {
        handleUploadImage(id, imgFile, value);
      },
      variant: "outlined",
    },
  ];

  const iRef = useRef<HTMLInputElement>(null);
  const cRef = useRef<HTMLDivElement>(null);
  const { userWithId, isActiveEdit } = useAppSelector((state) => state?.user);
  const [iOffset, setIOffset] = useState<IiOffset>({
    w: 100,
    h: 1000,
  });
  const [val, setVal] = useState<string>(src);
  const [imgFile, setImgFile] = useState<File>();
  const [enable, setEnable] = useState<boolean>(false);

  const show = () => userWithId.level == 5 && isActiveEdit && setEnable(true);
  const hidden = () => setEnable(false);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e?.target?.files ? e?.target?.files[0] : null;
    if (!value) return;
    if (
      value &&
      (value.size >= config.maxSizeUploadImage || !value.type.includes("image"))
    ) {
      toast.error(
        `Dụng lượng file tối đa 2 MB. Định dạng:.JPEG, .PNG, .JPG`,
        {},
      );
    } else {
      const s = window.URL.createObjectURL(value);
      setImgFile(value);
      setVal(s);
    }
  };

  useEffect(() => {
    enable &&
      (() => {
        iRef.current?.focus();
        setVal(src);
      })();
  }, [enable]);

  useEffect(() => {
    setVal(src);
  }, [src]);

  useEffect(() => {
    const w = cRef?.current?.offsetWidth || 100;
    const h = cRef?.current?.offsetHeight || 100;
    setIOffset({ w, h });
  }, []);
  const dispatch = useAppDispatch();
  // const previewImage = useMemo(() => {
  //   return file ? URL.createObjectURL(file) : ''
  // }, [file])

  const handleUploadImage = async (
    id: string,
    imgFile: File | undefined,
    value: string,
  ) => {
    let images;
    try {
      if (imgFile) {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("files", imgFile);
        const res = await dispatch(uploadManyImages(formData));
        unwrapResult(res);
        const d = res?.payload?.data?.data;
        images = d[0].fileUrl;
        if (res?.payload.data.code == 200) {
          await dispatch(updateText({ key: id, data: images }));
          await dispatch(_getDataUser(""));
          toast.success("Đã lưu thay đổi", {
            position: "top-right",
            autoClose: 4000,
          });
        }
        // location.reload();
        hidden();
        return;
      } else {
        toast.warn("Bạn chưa chọn file ảnh", {
          position: "top-right",
          autoClose: 4000,
        });
        hidden();
      }
    } catch (error) {
      toast.error("Có lỗi" + " " + error, {
        position: "top-right",
        autoClose: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={` ${classNameContainer} flex-grow`}>
      <input
        ref={iRef}
        type="file"
        id="img"
        name="img"
        accept="image/png, image/jpg, image/jpeg"
        onChange={handleChangeInput}
        className={`hidden`}
      ></input>
      {userWithId.level == 5 && enable && isActiveEdit ? (
        <div>
          <img
            src={val}
            alt={alt}
            onClick={show}
            className={`${className} border border-transparent ${
              userWithId.level == 5
                ? "border-dashed hover:border-slate-400"
                : ""
            }`}
            {...props}
          />
          <TransitionsModalText
            title="Chỉnh sửa hình ảnh"
            setEnable={setEnable}
          >
            <div className="flex flex-col item-center relative ">
              <div className="flex justify-between">
                <div className="flex items-center text-gray-500">
                  Lưu ý: Dung lượng file tối đa 2 MB, định dạng cho phép: .JPEG,
                  .PNG, .JPG
                </div>

                <OptionWrapper>
                  <>
                    {editOptions.map((option, index) => {
                      const body: IBody = {
                        id: id,
                        value: val,
                        src,
                        setEnable,
                        setVal,
                        iRef: iRef.current,
                        imgFile,
                      };

                      return (
                        <Button
                          disabled={isLoading}
                          sx={{ marginLeft: "4px", background: "inherit" }}
                          variant={
                            option?.variant != "outlined" &&
                            option?.variant != "contained"
                              ? "outlined"
                              : option?.variant
                          }
                          key={index}
                          onClick={() => option?.callback(body)}
                        >
                          {option?.title}
                        </Button>
                      );
                    })}
                  </>
                </OptionWrapper>
              </div>
              <div className="w-full flex justify-center items-center mt-3">
                <img
                  src={val}
                  alt={alt}
                  onClick={show}
                  className={`h-80 w-auto border border-transparent ${
                    userWithId.level == 5
                      ? "border-dashed focus:border-slate-400 hover:border-slate-400"
                      : ""
                  }`}
                  {...props}
                />
              </div>
              {/* <div className='flex flex-col justify-center items-center text-gray-400 text-sm ml-5'>
              <div>Dụng lượng file tối đa 2 MB</div>
              <div>Định dạng:.JPEG, .PNG, .JPG</div>
            </div> */}
            </div>
          </TransitionsModalText>
        </div>
      ) : (
        <div ref={cRef}>
          <img
            src={val}
            alt={alt}
            onClick={show}
            className={`${className} border border-transparent ${
              userWithId.level == 5 && isActiveEdit
                ? "border-dashed hover:border-slate-400"
                : ""
            }`}
            {...props}
          />
        </div>
      )}
    </div>
  );
};


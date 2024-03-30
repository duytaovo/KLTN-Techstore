import { useContext, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Input from "src/components/Input";
import { AppContext } from "src/contexts/app.context";
import { ErrorResponse } from "src/types/utils.type";
import { isAxiosUnprocessableEntityError } from "src/utils/utils";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import { unwrapResult } from "@reduxjs/toolkit";
import { getUser, getUserById, updateProfile } from "src/store/user/userSlice";
import SelectCustom from "src/components/Select";
import { useNavigate } from "react-router-dom";
import path from "src/constants/path";
import { Helmet } from "react-helmet-async";
import { setProfileToLS } from "src/utils/auth";
import Button from "./Button";
import { uploadManyImages } from "src/store/comment/commentsSlice";
import { LocationForm } from "src/components/LocationForm";
import InputFile from "./InputFile";

interface FormData {
  gender: string | undefined;
  phoneNumber: string;
  email: string;
  password: string;
  fullName: string | undefined;
  address: string;
  imageUrl: string | undefined;
}

export default function Profile() {
  const { setProfile } = useContext(AppContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrls, setImages] = useState<string[]>([]);
  // Tạo một mảng chứa các URL tạm thời cho ảnh
  const [addressOption, setAddresOption] = useState<any>();
  const addressSelect =
    addressOption?.ward.name +
    " " +
    addressOption?.district.name +
    " " +
    addressOption?.city.name;
  const addressIdSelect =
    addressOption?.ward.id +
    "-" +
    addressOption?.district.id +
    "-" +
    addressOption?.city.id;
  const [file, setFile] = useState<File>();

  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : "";
  }, [file]);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<FormData>();
  const avatar = watch("imageUrl");

  const [part1Address, setPart1Address] = useState<any>();
  const [part2Address, setPart2Address] = useState<any>();
  const [part3Address, setPart3Address] = useState<any>();
  const { profile, userWithId } = useAppSelector((state) => state.user);
  const [_data, setData] = useState<any>();

  useEffect(() => {
    const _getData = async () => {
      const res = await dispatch(getUser(""));
      await unwrapResult(res);
      await setData(res?.payload?.data);
      await dispatch(getUserById(res?.payload?.data.data.id));
    };
    _getData();
  }, []);
  useEffect(() => {
    const inputString = userWithId.address;

    // Phần 1: từ đầu đến trước dấu ,
    const part1 = inputString?.split(",")[0]?.trim();
    setPart1Address(part1);
    // Phần 2: từ dấu , đến dấu +
    const part2 = inputString
      ?.split(",")
      .slice(1)
      .join(",")
      .split("+")[0]
      .trim();
    setPart2Address(part2);

    // Phần 3: phần còn lại, bỏ vào mảng có 3 phần tử mỗi phần tử đã được ngăn cách bởi dấu -
    const remainingPart = inputString
      ?.split("+")[1]
      .split("-")
      .map((item: string) => Number(item.trim()));
    setPart3Address(remainingPart);
  }, [userWithId]);
  useEffect(() => {
    // setImages(userWithId.imageUrl);

    setValue("fullName", userWithId.fullName);
    setValue("phoneNumber", userWithId.phoneNumber);
    setValue("address", part1Address);
    setValue("imageUrl", userWithId.imageUrl);
    setValue("email", userWithId.email);
    // setValue("gender", userWithId.gender);
  }, [userWithId, setValue, part1Address]);

  const onSubmit = handleSubmit(async (data) => {
    let images;
    if (file) {
      const form = new FormData();
      form.append("files", file);
      const res = await dispatch(uploadManyImages(form));
      unwrapResult(res);
      const d = res?.payload?.data?.data;
      images = d[0].fileUrl;
      setValue("imageUrl", d[0].fileUrl);
    }
    const body = {
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      password: data.password || "123456",
      email: data.email,
      gender: Number(data.gender),
      address: data.address + ", " + addressSelect + " + " + addressIdSelect,
      imageUrl: images,
      // isEnable: true,
    };
    setIsSubmitting(true);

    try {
      const res = await dispatch(
        updateProfile({ id: userWithId.id, body }),
      ).then(unwrapResult);

      setProfile(res.data.data);
      setProfileToLS(res.data.data);
      toast.success("Cập nhật thành công");
      dispatch(getUserById(userWithId.id));
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
        const formError = error.response?.data.data;
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormData, {
              message: formError[key as keyof FormData],
              type: "Server",
            });
          });
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  });

  const handleChangeFile = (file?: File) => {
    setFile(file);
  };
  return (
    <div className="container rounded-sm bg-white px-2 pl-5 pb-10 shadow md:px-7 md:pb-20">
      <Helmet>
        <title>Hồ sơ của tôi </title>
        <meta name="description" content="Trang đăng nhập" />
      </Helmet>
      <div className="border-b border-b-gray-200 py-6">
        <h1 className="text-2xl font-medium capitalize text-gray-900">
          Hồ Sơ Của Tôi
        </h1>
        <div className="mt-1 text-xl text-gray-700">
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </div>
      </div>

      <form
        className="mt-8 flex flex-col-reverse md:flex-row md:items-start"
        onSubmit={onSubmit}
        noValidate
      >
        <div className="mt-6 flex-grow md:mt-0 md:pr-12">
          <div>
            {" "}
            {userWithId.isEnable ? (
              <Button
                style={{}}
                disabled
                className="flex h-12 cursor-text  w-full items-center border-yellow-200 border-solid  rounded-sm   text-center text-2xl text-blue-500 "
                type="reset"
              >
                Tài khoản đã kích hoạt
              </Button>
            ) : (
              <Button
                style={{}}
                className="cursor-pointer flex h-12 decoration-solid  underline hover:text-red-300 w-full items-center border-yellow-200 border-solid  rounded-sm   text-center text-2xl text-blue-500 "
                type="reset"
                onClick={() => navigate(path.sendCodeActive)}
              >
                Kích hoạt tài khoản
              </Button>
            )}
          </div>
          <Button
            style={{}}
            className="cursor-pointer flex h-12 decoration-solid underline hover:text-red-300   w-full items-center border-yellow-200 border-solid  rounded-sm   text-center text-2xl text-blue-500 "
            type="reset"
            onClick={() => navigate(path.changePassword)}
          >
            Đổi mật khẩu
          </Button>
          <div className="mt-6 flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
              Email:
            </div>
            <div className="sm:w-[80%] sm:pl-5">
              <Input
                classNameInput="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
                register={register}
                name="email"
                type="text"
                placeholder="Họ Tên"
                defaultValue={profile?.email}
                errorMessage={errors.email?.message}
              />
            </div>
          </div>
          <div className="mt-6 flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
              Họ Tên:
            </div>
            <div className="sm:w-[80%] sm:pl-5">
              <Input
                classNameInput="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
                register={register}
                name="fullName"
                type="text"
                placeholder="Họ Tên"
                errorMessage={errors.fullName?.message}
              />
            </div>
          </div>
          <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
              Số điện thoại:
            </div>
            <div className="sm:w-[80%] sm:pl-5">
              <Input
                classNameInput="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
                register={register}
                name="phoneNumber"
                type="text"
                placeholder="Họ Tên"
                errorMessage={errors.phoneNumber?.message}
              />
            </div>
          </div>
          {/* <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
              Mật khẩu
            </div>
            <div className="sm:w-[80%] sm:pl-5">
              <Input
                classNameInput="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
                register={register}
                name="password"
                type="text"
                placeholder="*********"
                errorMessage={errors.password?.message}
              />
            </div>
          </div> */}
          <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
              Địa chỉ:
            </div>
            <div className="sm:w-[80%] sm:pl-5">
              <Input
                classNameInput="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
                register={register}
                name="address"
                type="text"
                placeholder="Số nhà, tên đường..."
                errorMessage={errors.address?.message}
              />
              <LocationForm
                onChange={(e: any) => {
                  setAddresOption(e);
                }}
              />
            </div>
          </div>
          <SelectCustom
            className={"flex-1 text-black"}
            id="gender"
            defaultValue={1}
            placeholder="Giới tính"
            options={[
              { id: 1, name: "Nam" },
              { id: 2, name: "Nữ" },
            ]}
            register={register}
          >
            {errors.gender?.message}
          </SelectCustom>
          <Button
            className="flex h-12 w-12 items-center border-blue-500 border-solid  rounded-sm   text-center text-2xl text-black "
            type="submit"
          >
            {/* {isSubmitting ? "Loading..." : "Lưu"} */}
          </Button>
          <div className="mt-2 flex flex-row justify-start flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right" />
            <div className="sm:w-[80%] sm:pl-5 "></div>
          </div>
        </div>
        <div className="flex justify-center md:w-72 md:border-l md:border-l-gray-200">
          <div className="flex flex-col items-center">
            <div className="my-5 h-24 w-24">
              <img
                src={previewImage || avatar}
                alt=""
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <InputFile onChange={handleChangeFile} />
            <div className="mt-3 text-gray-400">
              <div>Dụng lượng file tối đa 1 MB</div>
              <div>Định dạng:.JPEG, .PNG</div>
            </div>
          </div>
        </div>
      </form>
      <Button className="w-[100px] h-12 rounded bg-blue-200" onClick={onSubmit}>
        {isSubmitting ? "Loading..." : "Lưu"}
      </Button>
      <div className="sm:w-[80%] sm:pl-5">
        <Button
          style={{}}
          className="cursor-pointer flex h-12 decoration-solid underline hover:text-red-300   w-full items-center border-yellow-200 border-solid  rounded-sm   text-center text-2xl text-blue-500 "
          type="reset"
          onClick={() => navigate("/")}
        >
          Quay về trang chủ
        </Button>
      </div>
    </div>
  );
}


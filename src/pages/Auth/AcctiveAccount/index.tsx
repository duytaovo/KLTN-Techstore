import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "src/hooks/useRedux";
import { useForm } from "react-hook-form";
import { ErrorResponse } from "src/types/utils.type";
import { toast } from "react-toastify";
import Input from "src/components/Input";
import { SchemaForGot, schemaForgot } from "src/utils/rules";
import { yupResolver } from "@hookform/resolvers/yup";
import { unwrapResult } from "@reduxjs/toolkit";
import { activeAccount } from "src/store/user/userSlice";
import { isAxiosUnprocessableEntityError } from "src/utils/utils";
import { Helmet } from "react-helmet-async";
import Button from "../Button";
import path from "src/constants/path";
import { useTheme } from "@material-ui/core";

const ActiveAccount = () => {
  const theme = useTheme();
  const PRIMARY_MAIN = theme.palette.primary.main;
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors },
    setError,
    register,
  } = useForm({
    resolver: yupResolver(schemaForgot),
  });

  const onSubmit = handleSubmit(async (data) => {
    const body = {
      phoneNumber: data.phoneNumber,
      validatorCode: data.validatorCode,
    };
    try {
      await setIsSubmitting(true);
      const res = await dispatch(activeAccount(body));
      unwrapResult(res);
      const d = res?.payload.data;
      if (d?.code !== 200) return toast.error("Lỗi kích hoạt tài khoản");
      toast.success("Kích hoạt tài khoản thành công");
      navigate(path.profile);
    } catch (error: any) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<SchemaForGot>>(error)) {
        const formError = error.response?.data.data;
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof SchemaForGot, {
              message: formError[key as keyof SchemaForGot],
              type: "Server",
            });
          });
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <div className="container px-52 items-start  flex justify-center  h-screen">
      <Helmet>
        <title>Kích hoạt tài khoản </title>
        <meta name="description" content="Trang đăng nhập" />
      </Helmet>
      <div className="lg:col-span-2 lg:col-start-4  bg-mainColor/30 w-full md:w-full justify-center m-10 rounded-2xl">
        <div className="flex items-center justify-center rounded-2xl mt-3">
          {/* <img src={logo} alt="logo" className="w-30 h-20 md:hidden"></img> */}
        </div>
        <form
          className="rounded p-10 md:p-2 shadow-sm"
          onSubmit={onSubmit}
          noValidate
        >
          <div className=" flex items-center justify-center text-[25px] text-black">
            Kích hoạt tài khoản
          </div>

          <Input
            name="phoneNumber"
            register={register}
            type="text"
            className="mt-8"
            errorMessage={errors.phoneNumber?.message}
            placeholder="Số điện thoại"
          />

          <Input
            name="validatorCode"
            register={register}
            type="text"
            className="mt-2"
            classNameEye="absolute right-[5px] h-5 w-5 cursor-pointer top-[12px]"
            errorMessage={errors.validatorCode?.message}
            placeholder="Mã xác nhận"
            autoComplete="on"
          />
          <div className="mt-3 flex justify-center space-x-2 items-center ">
            <Button
              style={{ fontSize: "16px", background: `${PRIMARY_MAIN}` }}
              type="submit"
              className="flex w-full items-center justify-center mt-2 rounded-[30px]  py-3 px-2 text-sm uppercase text-white hover:opacity-80"
            >
              {isSubmitting ? (
                <span className="text-2xl mt-4">Loading...</span>
              ) : (
                <span className="text-2xl mt-4">Kích hoạt tài khoản</span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActiveAccount;


import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { Modal } from "antd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "src/components/Input";
import { useAppDispatch } from "src/hooks/useRedux";
import { updatePasswordUser } from "src/store/user/userSlice";
import { ErrorResponse } from "src/types/utils.type";
import { PasswordSchema, passwordSchema } from "src/utils/rules";
import { isAxiosUnprocessableEntityError } from "src/utils/utils";

type FormData = Pick<
  PasswordSchema,
  "phoneNumber" | "oldPassword" | "new_password" | "confirm_password"
>;

export default function ChangePassword() {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    reset,
  } = useForm({
    defaultValues: {
      oldPassword: "",
      confirm_password: "",
      new_password: "",
    },
    resolver: yupResolver(passwordSchema),
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = handleSubmit(async (data) => {
    showModal();
    const body = {
      phoneNumber: data.phoneNumber,
      oldPassword: data.oldPassword,
      newPassword: data.new_password,
    };
    //console.log(body);
    try {
      const res = await dispatch(updatePasswordUser(body));
      unwrapResult(res);
      reset();
      toast.success("Đổi mật khẩu thành công", {
        position: "top-center",
        autoClose: 3000,
      });
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
        const formError = error.response?.data.data;
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormData, {
              // message: formError[key as keyof FormData],
              type: "Server",
            });
          });
        }
      }
    } finally {
      handleOk();
    }
  });

  return (
    <div className="rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20 pl-5">
      <div className="border-b border-b-gray-200 py-6">
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
        <h1 className="text-2xl font-medium capitalize text-gray-900">
          Đổi mật khẩu
        </h1>
        <div className="mt-1 text-xl text-gray-700">
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </div>
      </div>
      <form className="mt-8 mr-auto max-w-2xl" onSubmit={onSubmit}>
        <div className="mt-6 flex-grow md:mt-0 md:pr-12">
          <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
              Số điện thoại:
            </div>
            <div className="sm:w-[80%] sm:pl-5">
              <Input
                classNameInput="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
                className="relative "
                register={register}
                name="phoneNumber"
                type="text"
                placeholder="0352811521"
                errorMessage={errors.phoneNumber?.message}
              />
            </div>
          </div>
          <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
              Mật khẩu cũ:
            </div>
            <div className="sm:w-[80%] sm:pl-5">
              <Input
                classNameInput="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
                className="relative "
                register={register}
                name="oldPassword"
                type="password"
                placeholder="Mật khẩu cũ"
                errorMessage={errors.oldPassword?.message}
              />
            </div>
          </div>
          <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
              Mật khẩu mới:
            </div>
            <div className="sm:w-[80%] sm:pl-5">
              <Input
                classNameInput="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
                className="relative "
                register={register}
                name="new_password"
                type="password"
                placeholder="Mật khẩu mới"
                errorMessage={errors.new_password?.message}
              />
            </div>
          </div>
          <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
              Nhập lại mật khẩu:
            </div>
            <div className="sm:w-[80%] sm:pl-5">
              <Input
                classNameInput="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
                className="relative "
                register={register}
                name="confirm_password"
                type="password"
                placeholder="Nhập lại mật khẩu"
                errorMessage={errors.confirm_password?.message}
              />
            </div>
          </div>
          <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right" />
            <div className="sm:w-[80%] sm:pl-5">
              <Button
                style={{
                  backgroundColor: "Highlight",
                }}
                className="flex h-12 w-12 items-center border-yellow-200 border-solid  rounded-sm  px-8 text-center text-sm text-black "
                type="submit"
              >
                Lưu
              </Button>
            </div>
          </div>
        </div>
      </form>
      <Modal
        title="Thay đổi mật khẩu"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
      >
        <p>Đang xử lý, vui lòng đợi...</p>
      </Modal>
    </div>
  );
}


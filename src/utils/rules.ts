import type { RegisterOptions, UseFormGetValues } from "react-hook-form";
import * as yup from "yup";

type Rules = {
  [key in "email" | "password" | "confirm_password"]?: RegisterOptions;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: "Email là bắt buộc",
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: "Email không đúng định dạng",
    },
    maxLength: {
      value: 160,
      message: "Độ dài từ 5 - 160 ký tự",
    },
    minLength: {
      value: 5,
      message: "Độ dài từ 5 - 160 ký tự",
    },
  },
  password: {
    required: {
      value: true,
      message: "Password là bắt buộc",
    },
    maxLength: {
      value: 160,
      message: "Độ dài từ 6 - 160 ký tự",
    },
    minLength: {
      value: 6,
      message: "Độ dài từ 6 - 160 ký tự",
    },
  },
  confirm_password: {
    required: {
      value: true,
      message: "Nhập lại password là bắt buộc",
    },
    maxLength: {
      value: 160,
      message: "Độ dài từ 6 - 160 ký tự",
    },
    minLength: {
      value: 6,
      message: "Độ dài từ 6 - 160 ký tự",
    },
    validate:
      typeof getValues === "function"
        ? (value) =>
            value === getValues("password") || "Nhập lại password không khớp"
        : undefined,
  },
});

const handleConfirmPasswordYup = (refString: string) => {
  return yup
    .string()
    .required("Nhập lại password là bắt buộc")
    .min(6, "Độ dài từ 6 - 160 ký tự")
    .max(160, "Độ dài từ 6 - 160 ký tự")
    .oneOf([yup.ref(refString)], "Nhập lại password không khớp");
};

export const schema = yup.object({
  phone: yup.string().required("Số điện thoại là bắt buộc"),
  password: yup
    .string()
    .required("Password là bắt buộc")
    .min(6, "Độ dài từ 6 - 160 ký tự")
    .max(160, "Độ dài từ 6 - 160 ký tự"),
  confirm_password: handleConfirmPasswordYup("password"),
});

export const schemaFeedback = yup.object({
  star: yup.number(),
  comment: yup.string(),
  feedbackFilesUrl: yup.array(),
});

export const schemaChangeProduct = yup.object({
  customerDescription: yup.string(),
});


export const schemaAddUser = yup.object({
  gender: yup.string(),
  phoneNumber: yup
    .string()
    .required("Số điện thoại là bắt buộc")
    .min(10, "Độ dài từ 10 chữ số")
    .matches(
      /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
      "Số điện thoại không đúng định dạng",
    ),
  fullName: yup.string().required("Họ Tên là bắt buộc"),
  email: yup.string().required("Email là bắt buộc"),
  password: yup.string().required("Password là bắt buộc"),
  address: yup.string().required("Địa chỉ là bắt buộc"),
  imageUrl: yup.string(),
});

export const schemaUpdateUser = yup.object({
  gender: yup.string(),
  phoneNumber: yup
    .string()
    .required("Số điện thoại là bắt buộc")
    .min(10, "Độ dài từ 10 chữ số")
    .matches(
      /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
      "Số điện thoại không đúng định dạng",
    ),
  fullName: yup.string(),
  email: yup.string(),
  address: yup.string(),
  imageUrl: yup.string(),
});

export const schemaForgot = yup.object({
  phoneNumber: yup
    .string()
    .required("Số điện thoại là bắt buộc")
    .min(10, "Độ dài từ 10 chữ số")
    .matches(
      /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
      "Số điện thoại không đúng định dạng",
    ),
  newPassword: yup.string(),
  email: yup.string(),
  validatorCode: yup.string(),
});

export const userSchema = yup.object({
  name: yup.string().max(160, "Độ dài tối đa là 160 ký tự"),
  phone: yup.string().max(20, "Độ dài tối đa là 20 ký tự"),
  avatar: yup.string().max(1000, "Độ dài tối đa là 1000 ký tự"),
  password: yup.string(),
  gender: yup.string(),
  phoneNumber: yup.string(),
  fullName: yup.string(),
  email: yup.string(),
  address: yup.string(),
  imageUrl: yup.string(),
});
export const schemaPayment = yup.object({
  nameReceiver: yup.string().required("Trường này là bắt buộc"),
  phoneReceiver: yup.string().required("Trường này là bắt buộc"),
  addressReceiver: yup.string().required("Trường này là bắt buộc"),
  message: yup.string(),
  paymentMethod: yup.string().required("Trường này là bắt buộc"),
  deliveryPrice: yup.string(),
  discount: yup.string(),
});

export const passwordSchema = yup.object({
  phoneNumber: yup.string().required("Trường này là bắt buộc"),
  oldPassword: schema.fields["password"],
  new_password: schema.fields["password"],
  confirm_password: handleConfirmPasswordYup("new_password"),
});

export type UserSchema = yup.InferType<typeof schemaAddUser>;
export type PasswordSchema = yup.InferType<typeof passwordSchema>;

export type Schema = yup.InferType<typeof schema>;
export type SchemaForGot = yup.InferType<typeof schemaForgot>;
export type SchemaRegister = yup.InferType<typeof schemaAddUser>;


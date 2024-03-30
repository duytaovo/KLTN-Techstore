import { User } from "src/types/user.type";
import { SuccessResponse } from "src/types/utils.type";
import http, { httpNew } from "src/utils/http";

interface BodyUpdatePassword {
  phoneNumber: string;
  newPassword: string;
  validatorCode: string;
}

interface BodyUpdateProfile {
  fullName: string;
  phoneNumber: string;
  password: string;
  email: string;
  gender: number;
  address: string;
  imageUrl: string;
  isEnable?: true;
}

export const userService = {
  getUserById(id: number) {
    return httpNew.get(`/user/profile/${id}`);
  },

  updateProfile({ id, body }: any) {
    return httpNew.put<SuccessResponse<any>>(
      `/user/update-profile/${id}`,
      body,
    );
  },
  updatePasswordUser(body: any) {
    //console.log(body);
    return httpNew.put<SuccessResponse<User>>(`/user/change-password`, body);
  },
  activeAccount(data: any) {
    return httpNew.put("/user/active-account", data);
  },
  updatePassword(body: BodyUpdatePassword) {
    return httpNew.put<SuccessResponse<User>>(`/user/forgot-password`, body);
  },
  sendCode(data: any) {
    return httpNew.post("/user/send-code", data);
  },
  uploadAvatar(body: FormData) {
    return http.post<SuccessResponse<string>>("user/upload-avatar", body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};


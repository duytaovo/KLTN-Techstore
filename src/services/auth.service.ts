import http, { httpNew } from "src/utils/http";

export const authService = {
  login(data: any) {
    return httpNew.post("/authenticate", data);
  },
  register(data: any) {
    return httpNew.post("/user/sign-up", data);
  },
  logout() {
    return httpNew.post("/logout", {});
  },
  getUser() {
    return httpNew.get(`/authenticate/user`);
  },
};


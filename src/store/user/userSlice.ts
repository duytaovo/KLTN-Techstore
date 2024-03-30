import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userService } from "src/services";
import { authService } from "src/services/auth.service";
import { payloadCreator } from "src/utils/utils";

export const login = createAsyncThunk(
  "auth/login",
  payloadCreator(authService.login),
);
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  payloadCreator(authService.register),
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  payloadCreator(authService.logout),
);

export const getUserById = createAsyncThunk(
  "auth/getUserById",
  payloadCreator(userService.getUserById),
);

export const getUser = createAsyncThunk(
  "auth/getUser",
  payloadCreator(authService.getUser),
);

export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  payloadCreator(userService.updatePassword),
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  payloadCreator(userService.updateProfile),
);

export const updatePasswordUser = createAsyncThunk(
  "auth/updatePasswordUser",
  payloadCreator(userService.updatePasswordUser),
);

export const activeAccount = createAsyncThunk(
  "auth/activeAccount",
  payloadCreator(userService.activeAccount),
);

export const getCodeValidator = createAsyncThunk(
  "auth/getCodeValidator",
  payloadCreator(userService.sendCode),
);

type User = {
  id: number;
  fullName: string;
  phoneNumber: string;
  password?: string;
  email: string;
  gender: number;
  address: string;
  imageUrl?: string;
  level?: number;
  levelString?: string;
  isEnable: boolean;
};

interface IUser {
  name: string;
  accessToken: string;
  token: string;
  user: User[];
  profile: any;
  userWithId: User;
  isActiveEdit?: boolean;
}

const initialState: IUser = {
  name: "",
  accessToken: "",
  token: "",
  user: [],
  isActiveEdit: true,
  profile: {},
  userWithId: {
    id: 1,
    address: "",
    email: "",
    fullName: "",
    gender: 0,
    imageUrl: "",
    level: 1,
    phoneNumber: "",
    isEnable: false,
  },
};
const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleActiveEdit: (state) => {
      state.isActiveEdit = !state.isActiveEdit;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.accessToken = payload.data.data.accessToken;
      state.token = payload.data.data.token;
    });

    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.profile = payload.data.data;
    });

    builder.addCase(getUserById.fulfilled, (state, { payload }) => {
      state.userWithId = payload.data.data;
    });
  },
});
export const { toggleActiveEdit } = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import voucherService from "src/services/voucher.service";
import { payloadCreator } from "src/utils/utils";

export const getVouchers = createAsyncThunk(
  "voucher/getVouchers",
  payloadCreator(voucherService.getVouchers),
);

export const getVoucherDetail = createAsyncThunk(
  "voucher/getVoucherDetail",
  payloadCreator(voucherService.getVoucherDetail),
);

export const getVoucherUser = createAsyncThunk(
  "voucher/getVoucherUser",
  payloadCreator(voucherService.getVoucherUser),
);

export const addVoucherUser = createAsyncThunk(
  "voucher/addVoucherUser",
  payloadCreator(voucherService.addVoucherUser),
);

const initialState = {
  vouchers: {
    code: 200,
    message: "Requested completed!",
    data: [],
  },
  voucherDetail: {},
};
export const voucher = createSlice({
  name: "voucher",
  initialState,
  reducers: {
    postOrder: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(getVouchers.fulfilled, (state, { payload }) => {
      state.vouchers = payload.data;
    });
    builder.addCase(getVoucherDetail.fulfilled, (state, { payload }) => {
      state.voucherDetail = payload.data.data;
    });
  },
});

const voucherReducer = voucher.reducer;
export default voucherReducer;


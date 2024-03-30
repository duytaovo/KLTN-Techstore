import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { historyService } from "src/services";
import { payloadCreator } from "src/utils/utils";

export const getHistoryOrders = createAsyncThunk(
  "historyOrders/getHistoryOrders",
  payloadCreator(historyService.getHistoryOrder)
);
const datamau = {
  code: 0,
  message: "",
  data: {
    pageNumber: 0,
    pageSize: 10,
    totalPages: 1,
    totalElements: 2,
    data: [],
  },
};

export const historyOrders = createSlice({
  name: "historyOrders",
  initialState: {
    historyOrder: datamau,
  },

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHistoryOrders.fulfilled, (state, { payload }) => {
      state.historyOrder = payload.data;
    });
  },
});
const historyReducer = historyOrders.reducer;
export default historyReducer;

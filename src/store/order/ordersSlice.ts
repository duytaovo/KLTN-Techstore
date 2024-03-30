import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { orderService } from "src/services";
import { payloadCreator } from "src/utils/utils";

export const getPurchases = createAsyncThunk(
  "orders/getPurchases",
  payloadCreator(orderService.getPurchases)
);

export const buyPurchases = createAsyncThunk(
  "orders/buyPurchases",
  payloadCreator(orderService.buyProducts)
);

export const orders = createSlice({
  name: "orders",
  initialState: {},
  reducers: {
    postOrder: (state, action) => {},
  },
});
export const { postOrder } = orders.actions;
export default orders.reducer;

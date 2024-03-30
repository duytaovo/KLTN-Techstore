import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import brandService from "src/services/brand.service";
import { payloadCreator } from "src/utils/utils";

export const getBrand = createAsyncThunk(
  "brand/getBrand",
  payloadCreator(brandService.getBrands)
);

export const getDetailBrand = createAsyncThunk(
  "brand/getDetailBrand",
  payloadCreator(brandService.getDetailBrand)
);
const initialState = {
  brand: [],
  brandDetail: {},
};
export const brand = createSlice({
  name: "brand",
  initialState,
  reducers: {
    postOrder: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(getBrand.fulfilled, (state, { payload }) => {
      state.brand = payload.data;
    });
    builder.addCase(getDetailBrand.fulfilled, (state, { payload }) => {
      state.brandDetail = payload.data.data;
    });
  },
});
export default brand.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryService from "src/services/category.service";
import { payloadCreator } from "src/utils/utils";

export const getCategory = createAsyncThunk(
  "category/getCategory",
  payloadCreator(categoryService.getcategorys),
);

export const getDetailcategory = createAsyncThunk(
  "category/getDetailcategory",
  payloadCreator(categoryService.getDetailcategory),
);

const initialState = {
  category: [],
  categoryDetail: {},
};
export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    postOrder: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(getCategory.fulfilled, (state, { payload }) => {
      state.category = payload.data;
    });
    builder.addCase(getDetailcategory.fulfilled, (state, { payload }) => {
      state.categoryDetail = payload.data.data;
    });
  },
});
export default categorySlice.reducer;


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productService } from "src/services";
import { ProductDetail } from "src/types/allProductsType.interface";
import { payloadCreator } from "src/utils/utils";

export const getProducts = createAsyncThunk(
  "product/getProducts",
  payloadCreator(productService.getProducts),
);

export const getDetailProduct = createAsyncThunk(
  "product/getDetailProduct",
  payloadCreator(productService.getDetailProduct),
);

export type product = {
  data: any[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
};
interface IProduct {
  products: any;
  productDetail: ProductDetail;
  filter: product;
}
const dataDetail: ProductDetail = {
  productId: 8,
  productCode: "",
  name: "",
  description: "",
  design: "",
  dimension: "",
  mass: 0,
  launchTime: 0,
  accessories: "",
  productStatus: 0,
  lstProductTypeAndPrice: [
    {
      typeId: 1,
      ram: "",
      storageCapacity: "256 GB",
      color: "Đen",
      price: 45000000,
      salePrice: 44000000,
      quantity: 1000,
      depotId: 1,
    },
  ],
  lstProductImageUrl: [],
  star: 0,
  totalReview: 0,
  lstProductAttribute: [
    {
      productAttributeId: 1,
      name: "monitor",
      nameVn: "Màn hình",
      value: "b",
    },
  ],
  brandId: 1,
  brandName: "Apple",
  brandImages: "",
  characteristicId: 1,
  characteristicName: "Gaming",
  categoryId: 1,
  categoryName: "Smartphone",
  slug: "smartphone",
};

const data = {
  data: [],
  pageNumber: 0,
  pageSize: 10,
  totalElements: 1,
  totalPages: 1,
};

const initialState: IProduct = {
  products: [],
  productDetail: dataDetail,
  filter: data,
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    handleFilterStore: (state, action) => {
      state.filter.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      state.products = payload.data;
    });
    builder.addCase(getDetailProduct.fulfilled, (state, { payload }) => {
      state.productDetail = payload.data.data;
    });
  },
});
export const { handleFilterStore } = productSlice.actions;

const productReducer = productSlice.reducer;
export default productReducer;


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { cartService } from "src/services/cart.service";
import { payloadCreator } from "src/utils/utils";
const data = {
  data: [],
  pageNumber: 0,
  pageSize: 10,
  totalElements: 1,
  totalPages: 1,
};
const items =
  localStorage.getItem("cartItems") !== null
    ? JSON.parse(localStorage.getItem("cartItems") || "")
    : [];

const itemsBuy =
  localStorage.getItem("cartItemsBuy") !== null
    ? JSON.parse(localStorage.getItem("cartItemsBuy") || "")
    : [];
export const getProductByProductSlugId = createAsyncThunk(
  "cartItems/getProductByProductSlugId",
  payloadCreator(cartService.getProductByProductSlugId),
);
export const getProductByProductSlug = createAsyncThunk(
  "cartItems/getProductByProductSlugId",
  payloadCreator(cartService.getProductByProductSlug),
);

export const getProductsFilterAccess = createAsyncThunk(
  "cartItems/getProductsFilterAccess",
  payloadCreator(cartService.getProductsFilterAccess),
);

export const checkCart = createAsyncThunk(
  "cartItems/checkCart",
  payloadCreator(cartService.checkCart),
);
export const getValueBuy = createAsyncThunk(
  "cartItems/getValueBuy",
  async (_, { getState }) => {
    const state:any = getState();
    return state.valueBuy;
  },
);
interface Cart {
  value: any[];
  valueBuy: any[];
  productBySlug: any;
}

const initialState: Cart = {
  value: items,
  valueBuy: itemsBuy,
  productBySlug: data,
};
export const cartItemsSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const duplicate = state.value.filter(
        (e: any) =>
          e.product_id === newItem.product_id &&
          e.selectedColor === newItem.selectedColor &&
          e.selectedRom === newItem.selectedRom &&
          e.selectedRam === newItem.selectedRam,
      );
      //console.log("duplicate", duplicate);
      if (duplicate.length > 0) {
        state.value = state.value.filter(
          (e: any) =>
            e.product_id !== newItem.product_id ||
            e.selectedColor !== newItem.selectedColor ||
            e.selectedRom !== newItem.selectedRom ||
            e.selectedRam !== newItem.selectedRam,
        );

        state.value = [
          ...state.value,
          {
            id: duplicate[0].id,
            product_id: duplicate[0].product_id,
            slug: newItem.slug,
            color: newItem.color,
            price: newItem.price,
            salePrice: newItem.salePrice,
            selectedRom: newItem.selectedRom,
            selectedRam: newItem.selectedRam,
            selectedColor: newItem.selectedColor,
            name: newItem.name,
            typeId: newItem.typeId,
            depotId: newItem.depotId,
            quantityInDB: newItem.quantityInDB,
            image: newItem.image,
            quantity: newItem.quantity + duplicate[0].quantity,
          },
        ];
      } else {
        state.value = [
          ...state.value,
          {
            ...action.payload,
            // id:
            //   state.value.length > 0
            //     ? state.value[state.value.length - 1].id + 1
            //     : 1,
          },
        ];
      }
      localStorage.setItem(
        "cartItems",
        JSON.stringify(
          state.value.sort((a: any, b: any) =>
            a.id > b.id ? 1 : a.id < b.id ? -1 : 0,
          ),
        ),
      );
    },

    addItemBuy: (state, action) => {
      state.valueBuy = [...action.payload];
      localStorage.setItem(
        "cartItemsBuy",
        JSON.stringify(
          state.value.sort((a: any, b: any) =>
            a.id > b.id ? 1 : a.id < b.id ? -1 : 0,
          ),
        ),
      );
    },
    updateItemBuy: (state, action) => {
      const newItem = action.payload;
      const itemIndex = state.valueBuy.findIndex(
        (e: any) =>
          e.product_id === newItem.product_id &&
          e.selectedColor === newItem.selectedColor &&
          e.selectedRom === newItem.selectedRom &&
          e.selectedRam === newItem.selectedRam,
      );

      if (itemIndex !== -1) {
        // Update the quantity of the existing item
        state.valueBuy[itemIndex].quantity = newItem.quantity;

        localStorage.setItem(
          "cartItemsBuy",
          JSON.stringify(
            state.valueBuy.sort((a: any, b: any) =>
              a.id > b.id ? 1 : a.id < b.id ? -1 : 0,
            ),
          ),
        );
      }
    },
    updateItem: (state, action) => {
      const newItem = action.payload;
      const itemIndex = state.value.findIndex(
        (e: any) =>
          e.product_id === newItem.product_id &&
          e.selectedColor === newItem.selectedColor &&
          e.selectedRom === newItem.selectedRom &&
          e.selectedRam === newItem.selectedRam,
      );

      if (itemIndex !== -1) {
        // Update the quantity of the existing item
        state.value[itemIndex].quantity = newItem.quantity;

        localStorage.setItem(
          "cartItems",
          JSON.stringify(
            state.value.sort((a: any, b: any) =>
              a.id > b.id ? 1 : a.id < b.id ? -1 : 0,
            ),
          ),
        );
      }
    },
    removeItem: (state, action) => {
      console.log(action.payload);
      const itemToRemove = action.payload;
      state.value = state.value.filter(
        (e: any) =>
          e.product_id !== itemToRemove.product_id ||
          e.selectedColor !== itemToRemove.selectedColor ||
          e.selectedRom !== itemToRemove.selectedRom,
      );

      localStorage.setItem(
        "cartItems",
        JSON.stringify(
          state.value.sort((a: any, b: any) =>
            a.id > b.id ? 1 : a.id < b.id ? -1 : 0,
          ),
        ),
      );
    },
    removeItemBuy: (state, action) => {
      const itemToRemove = action.payload;
      state.valueBuy = state.valueBuy.filter(
        (e: any) =>
          e.product_id !== itemToRemove.product_id ||
          e.selectedColor !== itemToRemove.selectedColor ||
          e.selectedRom !== itemToRemove.selectedRom,
      );

      localStorage.setItem(
        "cartItemsBuy",
        JSON.stringify(
          state.valueBuy.sort((a: any, b: any) =>
            a.id > b.id ? 1 : a.id < b.id ? -1 : 0,
          ),
        ),
      );
    },

    clearCart: (state, action) => {
      state.value = [];
      localStorage.removeItem("cartItems");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductByProductSlug.fulfilled, (state, { payload }) => {
      state.productBySlug = payload.data;
    });
    builder.addCase(getProductsFilterAccess.fulfilled, (state, { payload }) => {
      state.productBySlug = payload.data;
    });
  },
});

export const {
  addItem,
  removeItem,
  updateItem,
  removeItemBuy,
  updateItemBuy,
  clearCart,
  addItemBuy,
} = cartItemsSlice.actions;

const cartItemReducer = cartItemsSlice.reducer;
export default cartItemReducer;


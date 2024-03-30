import { createSlice } from "@reduxjs/toolkit";
import { Banner, ItemSlider, Sale } from "src/items/home/home";

const initialState = {
  slider: ItemSlider,
  banner: Banner,
  sale: Sale,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    // updateBodyTop: (state, action: PayloadAction<IBodyTop>) => {
    //   state.bodyTop = action.payload;
    // },
    // addSlider: (state, action: PayloadAction<IItemSlider>) => {
    //   state.sliders.push(action.payload);
    // },
    // updateSlider: (
    //   state,
    //   action: PayloadAction<{ index: number; slider: IItemSlider }>,
    // ) => {
    //   const { index, slider } = action.payload;
    //   state.sliders[index] = slider;
    // },
  },
  extraReducers: (builder) => {},
});

// export const { updateBodyTop, addSlider, updateSlider } =
//   homeSlice.actions;
const homeReducer = homeSlice.reducer;
export default homeReducer;


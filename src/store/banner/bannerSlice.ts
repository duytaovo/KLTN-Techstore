import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { payloadCreator } from "src/utils/utils";
import { promoService } from "src/services";

export const getPromo = createAsyncThunk(
  "banner/promo",
  payloadCreator(promoService.getPromo)
);

interface IPromo {
  promo: {
    bigbanner: {
      bigImage: string;
      slider: string[];
    };
    firstpromo: {
      banner: string;
      query: string;
      value: string;
      theme: string;
    };
    secondpromo: {
      title: string;
      slider: string[];
      query: string;
      value: string;
      theme: string;
    };
  };
}

const initialState: IPromo = {
  promo: {
    bigbanner: {
      bigImage:
        "https://cdn.tgdd.vn/2022/08/banner/Banner-Big-Hero-seasonallll-1920x450.png",
      slider: [
        "https://cdn.tgdd.vn/2022/08/banner/w5-720-220-720x220-1.png",
        "https://cdn.tgdd.vn/2022/07/banner/720-220-720x220-183.png",
        "https://cdn.tgdd.vn/2022/08/banner/720-220-720x220-78.png",
        "https://cdn.tgdd.vn/2022/08/banner/720-220-720x220-76.png",
        "https://cdn.tgdd.vn/2022/06/banner/720-220-720x220-199.png",
        "https://cdn.tgdd.vn/2022/06/banner/720-220-720x220-199.png",
      ],
    },
    firstpromo: {
      banner:
        "https://cdn.tgdd.vn/2022/08/banner/TGDD---Tagline-hotsale-1200x95-1200x95.png",
      query: "category",
      value: "watch",
      theme: "bg-yellow-300",
    },
    secondpromo: {
      title: "TUẦN LỄ Samsung",
      slider: [
        "https://cdn.tgdd.vn/2022/07/banner/380-x-200-380x200.png",
        "https://cdn.tgdd.vn/2022/07/banner/Desktop-380x200-1-380x200-3.png",
        "https://cdn.tgdd.vn/2022/07/banner/Desktop-380x200-380x200-4.png",
        "https://cdn.tgdd.vn/2022/07/banner/380x200-380x200-3.png",
        "https://cdn.tgdd.vn/2022/07/banner/Desktop-380x200-1-380x200-2.png",
        "https://cdn.tgdd.vn/2022/07/banner/Desktop-380x200-2-380x200-3.png",
      ],
      query: "title_like",
      value: "Samsung",
      theme: "bg-gray-600",
    },
  },
};
const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    updatePromo: (state, action: { payload: any }) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(getPromo.fulfilled, (state, { payload }) => {
      state.promo = payload.data;
    });
  },
});

export const { updatePromo } = bannerSlice.actions;
const bannerReducer = bannerSlice.reducer;
export default bannerReducer;

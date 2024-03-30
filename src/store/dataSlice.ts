import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import dataApi from "src/services/data/data.service";

import { payloadCreator } from "src/utils/utils";

export const _getDataUser = createAsyncThunk(
  "data/getData",
  payloadCreator(dataApi.getDataUser),
);


export const _getData = createAsyncThunk(
  "data/getData",
  payloadCreator(dataApi.getData),
);

export const updateText = createAsyncThunk(
  "data/updateText",
  payloadCreator(dataApi.updateText),
);

export const updateImage = createAsyncThunk(
  "data/updateImage",
  payloadCreator(dataApi.uploadImage),
);

const initialState = {
  data: {},
};

const dataSlice = createSlice({
  name: "data",
  initialState: initialState,
  reducers: {
    updateData: (state, action: { payload: any }) => {
      state.data = { ...state?.data, ...action?.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(_getData.fulfilled, (state, { payload }) => {
      state.data = payload.data.data;
    });
  },
});

export const { updateData } = dataSlice.actions;
const dataReducer = dataSlice.reducer;
export default dataReducer;


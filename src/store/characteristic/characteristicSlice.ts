import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CharactericsService from "src/services/characteristic.service";
import { payloadCreator } from "src/utils/utils";

export const getCharacteristic = createAsyncThunk(
  "characteristic/getCharacteristic",
  payloadCreator(CharactericsService.getCharactericss)
);

export const getDetailcharacteristic = createAsyncThunk(
  "characteristic/getDetailcharacteristic",
  payloadCreator(CharactericsService.getDetailcharacteristic)
);
const initialState = {
  characteristic: [],
  characteristicDetail: {},
};
export const characteristic = createSlice({
  name: "characteristic",
  initialState,
  reducers: {
    postOrder: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(getCharacteristic.fulfilled, (state, { payload }) => {
      state.characteristic = payload.data;
    });
    builder.addCase(getDetailcharacteristic.fulfilled, (state, { payload }) => {
      state.characteristicDetail = payload.data.data;
    });
  },
});
export default characteristic.reducer;

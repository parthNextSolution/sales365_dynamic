import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {},
  reducers: {
    storeData: (state, action) => {
      return action.payload;
    },
    clearData: (state, action) => {
      return {};
    },
  },
});

export const { storeData, clearData } = dataSlice.actions;
export default dataSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const loadSlice = createSlice({
  name: "loading",
  initialState: {
    load: {
      loadding: false,
    },
  },
  reducers: {
    loadingStart: (state) => {
      state.load.loadding = true;
    },
    loadingEnd: (state) => {
      state.load.loadding = false;
    },
  },
});

export const { loadingStart, loadingEnd } = loadSlice.actions;

export default loadSlice.reducer;

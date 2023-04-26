import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categoryRooms: [],
    categoryNews: [],
  },
  reducers: {
    InitCategoryRooms: (state, action) => {
      state.categoryRooms = action.payload;
    },
    InitCategoryNews: (state, action) => {
      state.categoryNews = action.payload;
    },
  },
});

export const { InitCategoryRooms, InitCategoryNews } = categorySlice.actions;

export default categorySlice.reducer;

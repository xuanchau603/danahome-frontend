import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import loadReducer from "./loadingSlice";
import listNewsFavoriteReducer from "./newsFavoriteSlice";
import category from "./categorySlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    load: loadReducer,
    listNewsFavorite: listNewsFavoriteReducer,
    category,
  },
});

export default store;

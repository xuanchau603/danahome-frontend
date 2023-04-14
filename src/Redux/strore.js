import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import loadReducer from "./loadingSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    load: loadReducer,
  },
});

export default store;
